"use server";
export async function getData(productFor = "") {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/products/getProduct?productFor=${productFor}`,
    { cache: "no-store" }
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  let data = res.json();
  return data;
}
