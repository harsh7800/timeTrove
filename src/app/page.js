import { getData } from "./helpers/getData";
import { GenderCategoryTabs } from "./utilities/GenderCategoryTabs";

export default async function Page() {
  let data = await getData();

  return (
    <div className="w-full">
      <GenderCategoryTabs section="" allData={data} />
    </div>
  );
}
