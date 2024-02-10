import { GenderCategoryTabs } from "./utilities/GenderCategoryTabs";

export default function Page({ children }) {
  return (
    <GenderCategoryTabs
      section=""
      allData="all"
      menData="men"
      womenData="women"
    />
  );
}
