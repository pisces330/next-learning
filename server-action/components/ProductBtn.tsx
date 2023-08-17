"use client";

import { addProduct } from "@/action/serverAction";
import { useTransition } from "react";

const ProductBtn = () => {
  const [isPending, startTransition] = useTransition();
  const formData = new FormData();

  formData.append("product", "iPhone 13");
  formData.append("price", "999.99");
  return (
    <button
      onClick={() => startTransition(() => addProduct(formData))}
      className="right-10 border  bg-green-500 fixed bottom-10 text-white p-2 rounded-md w-48"
    >
      {isPending ? "추가중..." : "iPhone 13 추가"}
    </button>
  );
};
export default ProductBtn;
