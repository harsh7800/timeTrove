import React from "react";
import { GenderCategoryTabs } from "../utilities/GenderCategoryTabs";

const Page = () => {
  return (
    <GenderCategoryTabs
      section="New Arrivals"
      allData="all"
      menData="men"
      womenData="women"
    />
  );
};

export default Page;
