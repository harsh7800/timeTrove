import React, { Suspense } from "react";
import { GenderCategoryTabs } from "../../utilities/GenderCategoryTabs";
import Product from "@/app/models/Product";
import connectDb from "@/lib/mongoose";

export default async function Page() {
  const allData = await fetchData("winterwear");
  const menData = await fetchData("winterwear", "men");
  const womenData = await fetchData("winterwear", "women");

  return (
      <GenderCategoryTabs
        section="Winterwears"
        allData={allData}
        menData={menData}
        womenData={womenData}
      />
  );
}

async function fetchData(category = "", productFor = "") {
  "use server";
  await connectDb();
  const query = productFor ? { category, productFor } : { category };
  const products = await Product.find(query).lean();

  let items = {};

  for (let item of products) {
    const key = item.title;
    if (key in items) {
      if (item.availableQty > 0) {
        if (!items[key].color.includes(item.color)) {
          items[key].color.push(item.color);
        }
        if (!items[key].size.includes(item.size)) {
          items[key].size.push(item.size);
        }
      }
    } else {
      if (item.availableQty > 0) {
        items[key] = {
          ...item,
          color: [item.color],
          size: [item.size],
        };
      }
    }
  }

  console.log(items);
  return items;
}
