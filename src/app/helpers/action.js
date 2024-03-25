// Server action function
"use server";
import Product from "../models/Product";

export async function getProductData(slug) {
  const product = await Product.findOne({ slug: slug }).lean();
  if (!product) {
    // Handle the case where no product is found
    return null; // Or throw an error, or handle it according to your application's logic
  }
  const variants = await Product.find({ title: product.title } || {}).lean();
  let colourSizeSlug = {};
  for (let item of variants) {
    if (Object.keys(colourSizeSlug).includes(item.color)) {
      colourSizeSlug[item.color][item.size] = {
        slug: item.slug,
        img: item.img,
      };
    } else {
      colourSizeSlug[item.color] = {};
      colourSizeSlug[item.color][item.size] = {
        slug: item.slug,
        img: item.img,
      };
    }
  }
  return colourSizeSlug ? { variants: colourSizeSlug, product: product } : {};
}

export async function ProductVariants(title) {
  console.log(title);
  const products = await Product.find({ title: title }).lean();

  let productMap = {};
  for (let item of products) {
    if (!productMap[item.title]) {
      productMap[item.title] = {}; // Create nested object for variations
    }

    productMap[item.title][item.color] =
      productMap[item.title][item.color] || {};
    productMap[item.title][item.color][item.size] = {
      slug: item.slug,
      img: item.img,
    };
  }

  console.log(productMap);
  return productMap ? productMap : [];
}
