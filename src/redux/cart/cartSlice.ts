import { createSlice } from "@reduxjs/toolkit";

let localCart=JSON.parse(localStorage.getItem('cart')) || []
const initialState = {
  cartItems: localCart,
  totalPrice: localCart.length > 0 ? localCart.reduce((acc, item) => acc + (item.price*item.qty), 0) : 0,
  totalDiscount:localCart.length > 0 ? localCart.reduce((acc, item) => acc + item.qty*(item.price*(item.discount/100)), 0) : 0,
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
            state.totalPrice += selected.price
            state.totalDiscount += selected.price*(selected.discount/100)
            localStorage.setItem('cart', JSON.stringify(state.cartItems))
            // console.log("action2 : ",exist);
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
            state.totalPrice -= selected.price
            state.totalDiscount -= selected.price*(selected.discount/100)
            localStorage.setItem('cart', JSON.stringify(state.cartItems));
          },
          removeAllFromCart:(state, action) => {
          const selected = action.payload;
          state.cartItems.forEach(item=>{
            if(item._id==selected._id){
              state.totalPrice -= (selected.price*item.qty)
              state.totalDiscount -= item.qty*(selected.price*(selected.discount/100))
            }
          })
          state.cartItems = state.cartItems.filter(
            (item) => item._id !== selected._id
          );
          
          // state.totalPrice -= selected.price*state.cartItems
          localStorage.setItem('cart', JSON.stringify(state.cartItems));
        },
    },
});


export const { addToCart,removeFromCart,removeAllFromCart} = cartSlice.actions;
export default cartSlice.reducer;
