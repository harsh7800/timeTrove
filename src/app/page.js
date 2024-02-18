import { AsideNav } from "./common/asideNav";
import { TopNav } from "./common/topNav";
import { getData } from "./helpers/getData";
import ShopPage from "./shop/page";
import { GenderCategoryTabs } from "./utilities/GenderCategoryTabs";
import ProductCard from "./utilities/productCard";

export default async function Page() {
  let data = await getData();

  return (
    <div className="w-full">
      <GenderCategoryTabs section="" allData={data} />
    </div>
  );
}
