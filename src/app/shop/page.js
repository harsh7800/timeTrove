import { GenderCategoryTabs } from "../utilities/GenderCategoryTabs";
import Product from "../models/Product";
import connectDb from "@/lib/mongoose";

export default async function Page() {
  "use server";
  async function getData(productFor = "") {
    const query = productFor ? { productFor } : {};
    await connectDb();
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
    return items;
  }

  let allData = await getData();
  let menData = await getData("men");
  let womenData = await getData("women");
  return (
    <div className="w-full">
      <GenderCategoryTabs
        section=""
        allData={allData}
        menData={menData}
        womenData={womenData}
      />
    </div>
  );
}
