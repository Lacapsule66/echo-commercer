import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WishlistItem } from "@/types/wishlistItem";

type InitialState = {
  items: WishlistItem[];
};

const initialState: InitialState = {
  items: [],
};

// Load wishlist items from local storage if available
let initialItemsState: WishlistItem[] = [];

if (typeof window !== "undefined" && window.localStorage) {
  const storedItems = localStorage.getItem("wishlistItems");
  initialItemsState = storedItems ? JSON.parse(storedItems) : [];
}

export const wishlist = createSlice({
  name: "wishlist",
  initialState: { items: initialItemsState },
  reducers: {
    addItemToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const {
        _id,
        name,
        price,
        quantity,
        thumbnails,
        discountedPrice,
        status,
      } = action.payload;
      const existingItem = state.items.find((item) => item._id === _id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          _id,
          name,
          price,
          thumbnails,
          discountedPrice,
          status,
          quantity: 1,
          reviews: [],
        });

        if (typeof window !== "undefined" && window.localStorage) {
          localStorage.setItem("wishlistItems", JSON.stringify(state.items));
        }
      }
    },
    removeItemFromWishlist: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item._id !== itemId);
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("wishlistItems", JSON.stringify(state.items));
      }
    },

    removeAllItemsFromWishlist: (state) => {
      state.items = [];
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("wishlistItems", JSON.stringify(state.items));
      }
    },
  },
});

export const {
  addItemToWishlist,
  removeItemFromWishlist,
  removeAllItemsFromWishlist,
} = wishlist.actions;
export default wishlist.reducer;
