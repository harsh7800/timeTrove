const jwt = require("jsonwebtoken");

export async function decodeJWT(token) {
  let secret = process.env.JWT_SECRET_KEY;
  const data = jwt.decode(token, secret);
  return data;
}

export async function addToCart(
  IniCart,
  itemCode,
  qty,
  price,
  name,
  size,
  variant,
  img,
  updateSubTotal
) {
  let newCart = IniCart;
  if (itemCode in IniCart) {
    // console.log(newCart[itemCode]);
    newCart[itemCode].qty = IniCart[itemCode].qty + qty;
  } else {
    newCart[itemCode] = { qty: 1, price, name, size, variant, img };
  }
  saveCart(newCart, updateSubTotal);
}

export const saveCart = (myCart, updateSubTotal) => {
  localStorage.setItem("cart", JSON.stringify(myCart));
  let subt = 0;
  let key = Object.keys(myCart);
  for (let i = 0; i < key.length; i++) {
    subt += myCart[key[i]].price * myCart[key[i]].qty;
  }
  updateSubTotal(subt);
};
