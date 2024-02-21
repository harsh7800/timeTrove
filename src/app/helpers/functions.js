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
  let subt = 0;
  let key = Object.keys(newCart);
  for (let i = 0; i < key.length; i++) {
    subt += newCart[key[i]].price * newCart[key[i]].qty;
  }
  updateSubTotal(subt);
}

export const removeFromCart = (IniCart, itemCode, qty, updateSubTotal) => {
  let newCart = IniCart; // Create a shallow copy of the original cart

  if (itemCode in newCart) {
    newCart[itemCode].qty = newCart[itemCode].qty - qty;

    if (newCart[itemCode].qty <= 0) {
      console.log("Before deletion:", newCart);
      delete newCart[itemCode];
      console.log("After deletion:", newCart);
    }
  }

  let subt = 0;
  let key = Object.keys(newCart);
  for (let i = 0; i < key.length; i++) {
    subt += newCart[key[i]].price * newCart[key[i]].qty;
  }
  updateSubTotal(subt);
};

export const QuickBuy = (
  IniCart,
  itemCode,
  qty,
  price,
  name,
  size,
  variant,
  img,
  updateSubTotal,
  clearCart
) => {
  if (Object.keys(IniCart).length == 0) {
    let newCart = IniCart; // Create a new cart object with a copy of IniCart
    // Add the new product if the cart is empty
    newCart[itemCode] = { qty: 1, price, name, size, variant, img };
  } else {
    let newCart = {}; // Create a new cart object with a copy of IniCart
    delete newCart[itemCode];
    newCart[itemCode] = { qty, price, name, size, variant, img };
  }
  let subt = 0;
  let key = Object.keys(IniCart);
  for (let i = 0; i < key.length; i++) {
    subt += IniCart[key[i]].price * IniCart[key[i]].qty;
  }
  updateSubTotal(subt);
};

export async function addToWishlist(
  IniCart,
  itemCode,
  qty,
  price,
  name,
  size,
  variant,
  img,
  wishlistSubTotal
) {
  let newCart = IniCart;
  if (itemCode in IniCart) {
    // console.log(newCart[itemCode]);
    newCart[itemCode].qty = IniCart[itemCode].qty + qty;
  } else {
    newCart[itemCode] = { qty: 1, price, name, size, variant, img };
  }
  let subt = 0;
  let key = Object.keys(newCart);
  for (let i = 0; i < key.length; i++) {
    subt += newCart[key[i]].price * newCart[key[i]].qty;
  }
  wishlistSubTotal(subt);
}

export const removeFromWishlist = (
  IniCart,
  itemCode,
  qty,
  wishlistSubTotal
) => {
  let newCart = IniCart; // Create a shallow copy of the original cart

  if (itemCode in newCart) {
    newCart[itemCode].qty = newCart[itemCode].qty - qty;

    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode];
    }
  }
  let subt = 0;
  let key = Object.keys(newCart);
  for (let i = 0; i < key.length; i++) {
    subt += newCart[key[i]].price * newCart[key[i]].qty;
  }
  wishlistSubTotal(subt);
};

export async function addToCartFromWishlist(
  IniCart,
  wishlistItems,
  updateSubTotal
) {
  console.log(IniCart);
  let newCart = IniCart;

  for (const itemCode in wishlistItems) {
    const item = wishlistItems[itemCode];

    if (itemCode in newCart) {
      // If item is already in the cart, increment quantity
      newCart[itemCode].qty += item.qty;
      console.log(newCart[itemCode]);
    } else {
      // If item is not in the cart, add it
      newCart[itemCode] = item;
      console.log(newCart);
    }
  }

  let subt = 0;
  let key = Object.keys(newCart);
  for (let i = 0; i < key.length; i++) {
    subt += newCart[key[i]].price * newCart[key[i]].qty;
  }
  updateSubTotal(subt);
}
