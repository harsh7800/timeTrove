import { Suspense } from "react";
import { GenderCategoryTabs } from "../utilities/GenderCategoryTabs";
import ProductCard from "../utilities/productCard";

export default async function ShopPage() {
  "use server";
  async function getData(productFor = "") {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/products/getProduct?productFor=${productFor}`,
      { cache: "force-cache" }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  }
  let allData = await getData();
  let menData = await getData("men");
  let womenData = await getData("women");
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="w-full">
        <GenderCategoryTabs
          section=""
          allData={allData}
          menData={menData}
          womenData={womenData}
        />
      </div>
    </Suspense>
  );
}
