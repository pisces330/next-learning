"use server";

import { Product } from "@/typings";
import { revalidateTag } from "next/cache";

export const addProduct = async (e: FormData) => {
  const product = e.get("product")?.toString();
  const price = e.get("price")?.toString();

  if (!product || !price) return;

  const newProduct = {
    product: product,
    price: price,
  };

  await fetch("https://64dc7a83e64a8525a0f68d4e.mockapi.io/products", {
    method: "POST",
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json",
    },
  });

  //"products"태그와 관련된 페이지의 데이터를 갱신
  revalidateTag("products");
};
