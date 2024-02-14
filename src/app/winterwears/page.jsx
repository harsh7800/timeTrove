import React from "react";
import { GenderCategoryTabs } from "../utilities/GenderCategoryTabs";
import ProductCard from "../utilities/productCard";

const Page = () => {
  return (
    <>
      <GenderCategoryTabs
        section="Winterwears"
        allData={<AllData />}
        menData={<MenData />}
        womenData={<WomenData />}
      />
    </>
  );
};

export default Page;

const AllData = async () => {
  let Data = await getData("winterwear");
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
  let Data = await getData("winterwear", "men");
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
  let Data = await getData("winterwear", "women");
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

async function getData(category = "", productFor = "") {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/products/getProduct?productFor=${productFor}&category=${category}`,
    { cache: "no-cache" }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
