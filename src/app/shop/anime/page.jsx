import React from "react";
import { GenderCategoryTabs } from "../../utilities/GenderCategoryTabs";
import ProductCard from "../../utilities/productCard";

export default async function Page() {
  "use server";
  async function getData(category = "", productFor = "") {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/products/getProduct?productFor=${productFor}&category=${category}`,
      { cache: "force-cache" }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  }
  let allData = await getData("anime");
  let menData = await getData("anime", "men");
  let womenData = await getData("anime", "women");

  return (
    <GenderCategoryTabs
      section="Anime"
      allData={allData}
      menData={menData}
      womenData={womenData}
    />
  );
}
