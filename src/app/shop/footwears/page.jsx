import React from "react";
import { GenderCategoryTabs } from "../../utilities/GenderCategoryTabs";
import connectDb from "@/lib/mongoose";
import Product from "@/app/models/Product";

export default async function Page() {
  let allData = await fetchData("footwear");
  let menData = await fetchData("footwear", "men");
  let womenData = await fetchData("footwear", "men");

  return (
    <GenderCategoryTabs
      section="Footwears"
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
