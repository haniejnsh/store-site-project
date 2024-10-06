import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: []
};
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {

            const selected = action.payload;
            console.log("action : ",action.payload);
            const exist = state.cartItems.find((item) => item._id === selected._id);
            if (exist) {
                exist.qty += 1;
            } else {
                state.cartItems.push({ ...selected, qty: 1 });
            }
            console.log("action2 : ",exist);
        },
        removeFromCart: (state, action) => {
            const selected = action.payload;
            const exist = state.cartItems.find((item) => item._id === selected._id);
            if (exist.qty === 1) {
              state.cartItems = state.cartItems.filter(
                (item) => item._id !== selected._id
              );
            } else {
              exist.qty -= 1;
            }
          },
    },
});


export const { addToCart,removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
