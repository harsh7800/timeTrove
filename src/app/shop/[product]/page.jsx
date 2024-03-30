import Product from "@/app/models/Product";
import connectDb from "@/lib/mongoose";
import { Facebook, Instagram, TwitterIcon } from "lucide-react";
import Image from "next/image";
import ProductChoice from "./ProductChoice";

const Page = async ({ params }) => {
  async function getProduct() {
    "use server";
    await connectDb();
    const product = await Product.findOne({ slug: params.product }).lean();
    const variants = await Product.find({ title: product.title }).lean();
    let colourSizeSlug = {};
    for (let item of variants) {
      if (Object.keys(colourSizeSlug).includes(item.color)) {
        colourSizeSlug[item.color][item.size] = {
          slug: item.slug,
          availableQty: item.availableQty,
        };
      } else {
        colourSizeSlug[item.color] = {};
        colourSizeSlug[item.color][item.size] = {
          slug: item.slug,
          availableQty: item.availableQty,
        };
      }
    }
    return colourSizeSlug ? { variants: colourSizeSlug, product: product } : [];
  }
  let data = await getProduct();

  // let cart = {
  //   [params.product]: {
  //     qty: 1,
  //     price: data.product.price,
  //     name: data.product.title,
  //     size: data.product.size,
  //     color: data.product.color,
  //     img: data.product.img,
  //     slug: params.product,
  //   },
  // };
  return (
    <section className="border h-[90dvh] text-gray-600 body-font overflow-scroll scroll">
      <div className="w-full flex justify-center lg:justify-around xl:justify-center py-[50px] flex-wrap gap-7">
        <div className="border w-[90%] sm:w-[300px] lg:w-[350px] 2xl:w-[500px] flex items-center rounded-lg">
          <Image
            alt="ecommerce"
            className="w-full rounded-lg"
            width={200}
            height={200}
            src={data.product.img}
          />
        </div>

        <div className="w-[90%] sm:w-[80%] lg:w-3/4 xl:max-w-[600px]">
          <h2 className="text-sm font-bold text-gray-500 tracking-widest">
            PRODUCT NAME
          </h2>
          <h1 className="text-gray-900 text-2xl sm:text-3xl font-semibold mb-3 capitalize">
            {data.product.title}
          </h1>
          <span className="font-medium text-xl text-gray">
            Rs {data.product.price}.00
          </span>
          {/* <div className="flex mb-4">
            <span className="flex items-center">
              <svg
                fill="currentColor"
                stroke="currentColor"
                stroke-linecap="round"
                strokeLinejoin="round"
                stroke-width="2"
                className="w-4 h-4 text-purple"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              <svg
                fill="currentColor"
                stroke="currentColor"
                stroke-linecap="round"
                strokeLinejoin="round"
                stroke-width="2"
                className="w-4 h-4 text-purple"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              <svg
                fill="currentColor"
                stroke="currentColor"
                stroke-linecap="round"
                strokeLinejoin="round"
                stroke-width="2"
                className="w-4 h-4 text-purple"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              <svg
                fill="currentColor"
                stroke="currentColor"
                stroke-linecap="round"
                strokeLinejoin="round"
                stroke-width="2"
                className="w-4 h-4 text-purple"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                strokeLinejoin="round"
                stroke-width="2"
                className="w-4 h-4 text-purple"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              <span className="text-gray-600 ml-3">4 Reviews</span>
            </span>
            <span className="flex gap-1 ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
              <Facebook size={20} className="text-purple" />
              <TwitterIcon size={20} className="text-purple" />
              <Instagram size={20} className="text-purple" />
            </span>
          </div> */}
          <p className="leading-relaxed font-noto_serif_display">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione
            obcaecati nulla sit quia nam culpa soluta provident reiciendis
            corrupti voluptatum! Earum quo exercitationem maiores molestiae
            commodi esse non animi eaque architecto debitis, perferendis est.
          </p>

          <ProductChoice
            siz={data.product.size}
            clr={data.product.color}
            variants={data.variants}
            slug={params.product}
            availableQty={data.product.availableQty}
            price={data.product.price}
            title={data.product.title}
            img={data.product.img}
            category={data.product.category}
          />
        </div>
      </div>
    </section>
  );
};

export default Page;
