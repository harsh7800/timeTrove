import { Check, Cross, Loader2, X } from "lucide-react";

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
  updateSubTotal,
  router
) {
  let newCart = IniCart;
  if (itemCode in IniCart) {
    console.log(itemCode);
    // console.log(newCart[itemCode]);
    newCart[itemCode].qty = IniCart[itemCode].qty + qty;
  } else {
    newCart[itemCode] = { qty: 1, price, name, size, variant, img };
    console.log(itemCode);
  }
  let subt = 0;
  let key = Object.keys(newCart);
  for (let i = 0; i < key.length; i++) {
    subt += newCart[key[i]].price * newCart[key[i]].qty;
  }
  updateSubTotal(subt);
  router?.refresh();
}

export const removeFromCart = (
  IniCart,
  itemCode,
  qty,
  updateSubTotal,
  router
) => {
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
  router?.refresh();
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
  updateSubTotal
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

export async function Checkout(
  subTotal,
  email,
  cart,
  userData,
  router,
  setloading,
  toast,
  clearCart
) {
  try {
    // console.log(userData);
    toast({
      title: (
        <div className="flex items-center gap-3 text-black text-md">
          <Loader2 className="animate-spin" />
          <p>Loading..</p>
        </div>
      ),
      duration: 5000, // Adjust the duration as needed
      className: "bg-white",
    });
    setloading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/payment/preTransaction`,
      {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ subTotal, email, cart, userData }),
      }
    );
    const data = await response.json();
    if (data.success) {
      var options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        // Enter the Key ID generated from the Dashboard
        name: "TimeTrove Pvt Ltd",
        currency: data.currency,
        amount: data.amount,
        order_id: data.id,
        description: "Thankyou for your test donation",
        image: "",
        modal: {
          ondismiss: async function () {
            let cancellation = await fetch(
              `${process.env.NEXT_PUBLIC_HOST}/api/payment/handleCancellation`,
              {
                method: "PATCH",
                body: JSON.stringify({
                  order_id: data.id,
                }),
              }
            );
            if (cancellation.status == 201) {
              setloading(false);
              toast({
                title: (
                  <div className="flex items-center gap-3 text-black text-md">
                    <X className="text-[red]" />
                    <p>Payment Cancelled</p>
                  </div>
                ),
                duration: 1500, // Adjust the duration as needed
                className: "bg-white",
              });
            }
          },
        },
        handler: async function (response) {
          let postTransaction = await fetch(
            `${process.env.NEXT_PUBLIC_HOST}/api/payment/postTransaction`,
            {
              method: "PATCH",
              body: JSON.stringify({
                response: response,
                orderId: data.id,
                amount: data.amount,
                currency: data.currency,
              }),
            }
          );
          if (postTransaction.status === 201) {
            if (clearCart && typeof clearCart === "function") {
              clearCart();
            }
            setloading(false);
            router.refresh();
            router.push(`/shop/account/${data.id}`);
            toast({
              title: (
                <div className="flex items-center gap-3 text-black text-md">
                  <Check className="text-[green]" />
                  <p>payment Success</p>
                </div>
              ),
              duration: 1500, // Adjust the duration as needed
              className: "bg-white",
            });
          }
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature);
        },
        prefill: {
          name: userData.firstName,
          email: email,
          contact: userData.phoneNum,
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } else {
      setloading(false);
      toast({
        title: (
          <div className="flex items-center gap-3 text-black text-md">
            <X className="text-[red]" />
            <p>Something Went Wrong Try Again</p>
          </div>
        ),
        duration: 10000, // Adjust the duration as needed
        className: "bg-white",
      });
    }
  } catch (error) {
    setloading(false);
    toast({
      title: (
        <div className="flex items-center gap-3 text-black text-md">
          <X className="text-[red]" />
          <p>Payment Failed</p>
        </div>
      ),
      duration: 10000, // Adjust the duration as needed
      className: "bg-white",
    });
    console.log(error);
  }
}
