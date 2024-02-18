import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
export const useStore = create(
  persist(
    (set, get) => ({
      user: {},
      login: (data) => set({ user: data }),
      logout: () => set({ user: {} }), // Clear user data on logout
    }),
    {
      name: "user-details",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
export const useCart = create(
  persist(
    (set, get) => ({
      cart: {},
      subTotal: 0,
      updateSubTotal: (subTotal) => set(() => ({ subTotal: subTotal })),
      saveCart: (cart) => {
        console.log(cart);
        set((state) => {
          let subt = 0;
          let key = Object.keys(cart);
          for (let i = 0; i < key.length; i++) {
            subt += cart[key[i]].price * cart[key[i]].qty;
          }
          // Save the updated cart to session storage
          set({ cart: cart, subTotal: subt });
          //     set({ subtotal: qty * price });
          //     saveCart(newCart);
        });
      },
      clearCart: (cart) => set(() => sessionStorage.removeItem("cart")), // Clear user data on clearCart
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
