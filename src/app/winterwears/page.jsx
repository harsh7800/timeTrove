import React from "react";
import { GenderCategoryTabs } from "../utilities/GenderCategoryTabs";

const Page = () => {
  return (
    <GenderCategoryTabs
      section="Winterwears"
      allData="all"
      menData="men"
      womenData="women"
    />
  );
};

export default Page;
