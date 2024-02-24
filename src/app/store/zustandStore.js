import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";
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
      clearCart: (cart) => set(() => ({ cart: {}, subTotal: 0 })), // Clear user data on clearCart
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const wishlist = create(
  persist(
    (set, get) => ({
      wishlistCart: {},
      subTotal: 0,
      wishlistSubTotal: (subTotal) => set(() => ({ subTotal: subTotal })),
      clearCart: (wishlistCart) =>
        set(() => ({ wishlistCart: {}, subTotal: 0 })), // Clear user data on clearCart
    }),
    {
      name: "wishlistCart",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const useQuickBuy = create(
  persist(
    (set, get) => ({
      QuickBuyCart: {},
      subTotal: 0,
      quickBuySubTotal: (subTotal) => set(() => ({ subTotal: subTotal })),
      clearCart: (QuickBuyCart) =>
        set(() => ({ QuickBuyCart: {}, subTotal: 0 })), // Clear user data on clearCart
    }),
    {
      name: "QuickBuyCart",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const filter = create((set) => ({
  filterData: {
    budget: [500, 5000],
    size: "",
    color: "",
    brand: "",
    category: "",
    subCategory: "",
  },
  updateField: (fieldName, newValue) =>
    set((state) => ({
      filterData: { ...state.filterData, [fieldName]: newValue },
    })),
  resetFilter: () =>
    set({
      filterData: {
        budget: [500, 2000],
        size: "",
        color: "",
        brand: "",
        category: "",
        subCategory: "",
      },
    }),
}));
