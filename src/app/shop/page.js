import { GenderCategoryTabs } from "../utilities/GenderCategoryTabs";
import ProductCard from "../utilities/productCard";

export default async function ShopPage() {
  "use server";
  async function getData(productFor = "") {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/products/getProduct?productFor=${productFor}`,
      { cache: "force-cache" }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
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

// const AllData = async () => {
//   let Data = await getData();
//   return (
//     <>
//       {Data.map((data) => {
//         return (
//           <ProductCard
//             key={data._id}
//             category={data.subCategory}
//             ImageURL={data.img}
//             price={data.price}
//             title={data.title}
//           />
//         );
//       })}
//     </>
//   );
// };

// const MenData = async () => {
//   let Data = await getData("men");
//   return (
//     <>
//       {Data.map((data) => {
//         return (
//           <ProductCard
//             key={data._id}
//             category={data.category}
//             ImageURL={data.img}
//             price={data.price}
//             title={data.title}
//           />
//         );
//       })}
//     </>
//   );
// };

// const WomenData = async () => {
//   let Data = await getData("women");
//   return (
//     <>
//       {Data.map((data) => {
//         return (
//           <ProductCard
//             key={data._id}
//             category={data.subCategory}
//             ImageURL={data.img}
//             price={data.price}
//             title={data.title}
//           />
//         );
//       })}
//     </>
//   );
// };

// export async function getData(productFor = "") {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_HOST}/api/products/getProduct?productFor=${productFor}`,
//     { cache: "no-store" }
//   );
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.

//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }
