import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useStore = create(
  persist(
    (set, get) => ({
      user: {
        email: "",
        username: "",
        token: "",
        billingAddress: [],
      },
      login: (data) => set({ user: data }),
      updateField: (fields) =>
        set((state) => ({
          user: { ...state.user, ...fields },
        })),
      logout: () => set({ user: {} }), // Clear user data on logout
    }),
    {
      name: "user-details",
      storage: createJSONStorage(() => localStorage),
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
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const wishlist = create(
  persist(
    (set, get) => ({
      wishlistCart: {},
      subTotal: 0,
      wishlistSubTotal: (subTotal) => set(() => ({ subTotal: subTotal })),
      updateField: (fields) =>
        set((state) => ({
          wishlistCart: { ...state.wishlistCart, ...fields },
        })),
      updateItem: (slug, updatedData) => {
        if (get().wishlistCart[slug]) {
          set((state) => (get().wishlistCart[slug] = updatedData));
        }
      },

      clearCart: () => {
        set(() => ({ wishlistCart: {}, subTotal: 0 }));
      },
    }),
    {
      name: "wishlistCart",
      storage: createJSONStorage(() => localStorage),
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
        budget: [500, 5000],
        size: "",
        color: "",
        brand: "",
        category: "",
        subCategory: "",
      },
    }),
}));

export const Address = create((set) => ({
  addressData: {
    addressName: "",
    firstName: "",
    lastName: "",
    phoneNum: "",
    state: "",
    city: "",
    pincode: "",
    landmark: "",
  },
  updateAddress: (data) => set(() => ({ addressData: data })),
  resetAddress: (data) => set(() => ({ addressData: {} })),
}));
