import React from "react";
import { GenderCategoryTabs } from "../../utilities/GenderCategoryTabs";
import ProductCard from "../../utilities/productCard";
import Loading from "./loading";

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
  let allData = await getData("winterwear");
  let menData = await getData("winterwear", "men");
  let womenData = await getData("winterwear", "women");

  return (
    <>
      <GenderCategoryTabs
        section="Winterwears"
        allData={allData}
        menData={menData}
        womenData={womenData}
      />
    </>
  );
}
