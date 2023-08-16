import { addProduct } from "@/action/serverAction";
import { Product } from "@/typings";

export default async function Home() {
  const res = await fetch(
    "https://64dc7a83e64a8525a0f68d4e.mockapi.io/products",
    {
      /*
				"no-cache"
					- HTTP 요청에서 캐시를 사용하지 않도록함
					- 요청한 데이터가 실시간으로 변경되거나 업데이트되는 경우
					- 개인정보가 포함된 응답이라면, 민감한 정보가 캐시에 저장되지 않도록
					- 동적으로 생성되는 콘텐츠인 경우, 항상 서버에서 새로운 콘텐츠를 가져와야 하므로
				*/
      cache: "no-cache",
      // Data Revalidation 설정,
      // 해당 태그를 가진 페이지의 데이터가 업데이트될 때 데이터 리벨리데이션을 수행
      next: {
        tags: ["products"],
      },
    }
  );

  const products: Product[] = await res.json();

  return (
    <main className="">
      <h1 className="text-3xl font-bold text-center">제품 창고</h1>

      <form
        action={addProduct}
        className="flex flex-col gap-5 max-w-lx mx-auto p-5"
      >
        <input
          name="product"
          type="text"
          placeholder="제품명을 입력하세요.."
          className="border border-gray-300 p-2 rounded-md"
        />
        <input
          name="price"
          type="text"
          placeholder="가격을 입력하세요.."
          className="border border-gray-300 p-2 rounded-md"
        />

        <button className="border bg-blue-500 text-white rounded-md p-2">
          제품 추가하기
        </button>
      </form>

      <h2 className="font-bold p-5">제품 목록</h2>
      <div className="flex flex-wrap gap-5">
        {products.map((product) => (
          <div key={product.id} className="border border-gray-300 p-5 shadow">
            <p className="font-bold">{product.product}</p>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
