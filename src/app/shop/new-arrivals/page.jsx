import React from "react";
import { GenderCategoryTabs } from "../../utilities/GenderCategoryTabs";
import ProductCard from "../../utilities/productCard";
import Product from "@/app/models/Product";
import connectDb from "@/lib/mongoose";

export default async function Page() {
  let allData = await fetchData();
  let menData = await fetchData("men");
  let womenData = await fetchData("women");

  return (
    <GenderCategoryTabs
      section="New Arrivals"
      allData={allData}
      menData={menData}
      womenData={womenData}
    />
  );
}

async function fetchData(category = "", productFor = "") {
  "use server";
  await connectDb();
  const query = productFor ? { productFor } : {};
  const products = await Product.find(query).lean();

  // Sort products array by creation date in descending order
  products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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
