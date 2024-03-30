// Server action function
"use server";
import connectDb from "@/lib/mongoose";
import Product from "../models/Product";
import Order from "../models/Order";
import User from "../models/User";
const jwt = require("jsonwebtoken");
import CryptoJS from "crypto-js";

export async function getProductData(slug) {
  await connectDb();
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

export async function ProductVariants(title, wishlistCart) {
  // if (!wishlistCart[title]) {
  await connectDb();
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
  // }
}

export async function fetchUserOrders(email) {
  await connectDb();
  try {
    const orders = await Order.find({ email, status: "Paid" }).lean();
    let totalOrders = orders.length;

    const simplifiedOrders = orders
      .filter((order) => Object.keys(order.products).length === 1) // Filter orders with one product
      ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by descending creation date
      .slice(0, 2) // Limit to 3 most recent
      .map((order, i) => {
        // Create a new Order object based on client-side interface
        return {
          orderId: order.orderId,
          products: {
            name: order.products[Object.keys(order.products)[0]].name,
            qty: order.products[Object.keys(order.products)[0]].qty,
            color: order.products[Object.keys(order.products)[0]].color,
            size: order.products[Object.keys(order.products)[0]].size,
            img: order.products[Object.keys(order.products)[0]].img,
          },
          amount: order.amount,
          createdAt: order.createdAt,
        };
      });

    return simplifiedOrders ? { items: simplifiedOrders, totalOrders } : [];
  } catch (error) {
    console.log(error);
  }
}

export async function changeUsernameAndEmail(username, email, newEmail, token) {
  let newData;
  await connectDb();
  try {
    let decodeJwt = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (email == decodeJwt.email) {
      newData = await User.findOneAndUpdate(
        { email },
        {
          $set: {
            email: newEmail,
            username: username,
            // other fields you want to update
          },
        },
        { new: true, useFindAndModify: true }
      );
      await Order.updateMany({ email: newEmail });
    }
    return { newEmail, username };
  } catch (error) {
    console.log(error);
  }
}

export async function updatePassword(pass, newPass, email) {
  await connectDb();
  let user = await User.findOne({ email });

  let bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET_KEY);
  let decryptedpass = bytes.toString(CryptoJS.enc.Utf8);
  if (pass === decryptedpass) {
    // Encrypt the new password before updating
    let encryptedNewPassword = CryptoJS.AES.encrypt(
      newPass,
      process.env.AES_SECRET_KEY
    ).toString();

    // Update the password
    await User.updateOne({ email }, { password: encryptedNewPassword });

    return { message: "Password Changed", success: true };
  } else {
    return { message: "Invalid Pasword", success: false };
  }
}

export async function FetchAllColors() {
  await connectDb();
  const products = await Product.find().lean();

  // Extract unique colors from products
  const colorsSet = new Set();
  products.forEach((product) => {
    if (product.color && Array.isArray(product.color)) {
      product.color.forEach((color) => colorsSet.add(color));
    } else if (product.color && typeof product.color === "string") {
      colorsSet.add(product.color);
    }
  });

  // Convert Set to array
  const colors = Array.from(colorsSet);

  return colors;
}

export async function FetchAllSizes() {
  await connectDb();
  const products = await Product.find().lean();

  // Extract unique colors from products
  const colorsSet = new Set();
  products.forEach((product) => {
    if (product.color && Array.isArray(product.color)) {
      product.color.forEach((color) => colorsSet.add(color));
    } else if (product.color && typeof product.color === "string") {
      colorsSet.add(product.color);
    }
  });

  // Convert Set to array
  const colors = Array.from(colorsSet);

  return colors;
}

export async function FetchAllCategory() {
  await connectDb();
  const products = await Product.find().lean();

  // Extract unique colors from products
  const categorySet = new Set();
  products.forEach((product) => {
    if (product.category && Array.isArray(product.category)) {
      product.category.forEach((category) => colorsSet.add(category));
    } else if (product.category && typeof product.category === "string") {
      categorySet.add(product.category);
    }
  });
  // Convert Set to array
  const category = Array.from(categorySet);

  return category;
}

export async function FetchAllSubCategory() {
  await connectDb();
  const products = await Product.find().lean();

  // Extract unique colors from products
  const categorySet = new Set();
  products.forEach((product) => {
    if (product.subCategory && Array.isArray(product.subCategory)) {
      product.subCategory.forEach((subCategory) => colorsSet.add(subCategory));
    } else if (product.subCategory && typeof product.subCategory === "string") {
      categorySet.add(product.subCategory);
    }
  });
  // Convert Set to array
  const subCategory = Array.from(categorySet);

  return subCategory;
}

export async function GetProducts() {
  try {
    await connectDb();
    const products = await Product.find().lean();

    // Create a Set to store unique titles
    const uniqueTitles = new Set();

    // Filter out duplicate products based on title
    const uniqueProducts = products.filter((product) => {
      if (uniqueTitles.has(product.title)) {
        // Duplicate product, return false to filter it out
        return false;
      } else {
        // Unique product, add its title to the Set
        uniqueTitles.add(product.title);
        return true;
      }
    });

    return uniqueProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Return empty array in case of error
  }
}

export async function getOrder(email) {
  await connectDb();
  const order = await Order.find({ email: email, status: "Paid" }).lean();
  return order ? order : [];
}
