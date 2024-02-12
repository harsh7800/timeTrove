import { GenderCategoryTabs } from "./utilities/GenderCategoryTabs";
import ProductCard from "./utilities/productCard";

export default function Page({ children }) {
  return (
    <GenderCategoryTabs
      section=""
      allData={<AllData />}
      menData="men"
      womenData="women"
    />
  );
}

const AllData = () => {
  const allData = [
    {
      category: "Winterwears",
      imag: "https://blackberrys.com/cdn/shop/files/Hoodie_Zipper_Jacket_In_Dark_Blue_Liam-CZPM0484B3SA23FL-image1.jpg?v=1697877719",
      price: "499",
      title: "Nike Air-Jordna",
    },
    {
      category: "Footewears",
      imag: "https://sneakernews.com/wp-content/uploads/2020/10/jordan-1-black-mocha-555088-105-2.jpg",
      price: "499",
      title: "Nike Air-Jordna",
    },
    {
      category: "Footewears",
      imag: "https://th.bing.com/th/id/OIP.BdaME7hqlZ2Cnx-dRqz9dQHaHa?rs=1&pid=ImgDetMain",
      price: "499",
      title: "Nike Air-Jordna",
    },
    {
      category: "Tshirts",
      imag: "https://blackberrys.com/cdn/shop/files/textured-polo-t-shirt-in-black-heka-blackberrys-clothing-1.jpg?v=1685958627",
      price: "499",
      title: "Nike Air-Jordna",
    },
    {
      category: "Anime",
      imag: "https://i5.walmartimages.com/asr/23530690-7d57-43f6-8a22-e03a88bf481c_1.cf4105638b43415bd61c5a9cd4c503c0.jpeg",
      price: "499",
      title: "Nike Air-Jordna",
    },
    {
      category: "Winterwears",
      imag: "https://i5.walmartimages.com/asr/23530690-7d57-43f6-8a22-e03a88bf481c_1.cf4105638b43415bd61c5a9cd4c503c0.jpeg",
      price: "499",
      title: "Nike Air-Jordna",
    },
    {
      category: "Winterwears",
      imag: "https://i5.walmartimages.com/asr/4478ec9b-ad23-4faf-a7eb-57d8ab64791d_1.486301d42281d082b46e1a7904385dc4.jpeg",
      price: "799",
      title: "Sherpa Pullover Hoodie",
    },
    {
      category: "Footewears",
      imag: "https://sneakernews.com/wp-content/uploads/2020/10/jordan-1-black-mocha-555088-105-2.jpg",
      price: "499",
      title: "Nike Air-Jordan",
    },
  ];
  return (
    <>
      {allData.map((data, index) => {
        return (
          <ProductCard
            key={index}
            category={data.category}
            img={data.imag}
            price={data.price}
            title={data.title}
          />
        );
      })}
    </>
  );
};
