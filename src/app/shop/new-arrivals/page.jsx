import React from "react";
import { GenderCategoryTabs } from "../../utilities/GenderCategoryTabs";
import ProductCard from "../../utilities/productCard";

export default async function Page() {
  "use server";
  async function getData(productFor = "") {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/products/getProduct?productFor=${productFor}`,
      { cache: "force-cache" }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const products = await res.json();

    // Sort products by createdAt in descending order
    const sortedProducts = products.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return sortedProducts;
  }
  let allData = await getData();
  let menData = await getData("men");
  let womenData = await getData("women");

  return (
    <GenderCategoryTabs
      section="New Arrivals"
      allData={allData}
      menData={menData}
      womenData={womenData}
    />
  );
}
