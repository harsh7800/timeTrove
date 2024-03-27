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
      .slice(0, 3) // Limit to 3 most recent
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
