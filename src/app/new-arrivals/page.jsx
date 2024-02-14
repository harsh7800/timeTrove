import React from "react";
import { GenderCategoryTabs } from "../utilities/GenderCategoryTabs";
import ProductCard from "../utilities/productCard";

const Page = () => {
  return (
    <GenderCategoryTabs
      section="New Arrivals"
      allData={<AllData />}
      menData={<MenData />}
      womenData={<WomenData />}
    />
  );
};

export default Page;

const AllData = async () => {
  let Data = await getData();
  return (
    <>
      {Data?.map((data, index) => {
        return (
          <ProductCard
            key={index}
            category={data.category}
            ImageURL={data.img}
            price={data.price}
            title={data.title}
          />
        );
      })}
    </>
  );
};
const MenData = async () => {
  let Data = await getData("men");
  return (
    <>
      {Data?.map((data, index) => {
        return (
          <ProductCard
            key={index}
            category={data.category}
            ImageURL={data.img}
            price={data.price}
            title={data.title}
          />
        );
      })}
    </>
  );
};
const WomenData = async () => {
  let Data = await getData("women");
  return (
    <>
      {Data?.map((data, index) => {
        return (
          <ProductCard
            key={index}
            category={data.category}
            ImageURL={data.img}
            price={data.price}
            title={data.title}
          />
        );
      })}
    </>
  );
};

async function getData(productFor = "") {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/products/getProduct?productFor=${productFor}`,
    { cache: "no-cache" }
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
