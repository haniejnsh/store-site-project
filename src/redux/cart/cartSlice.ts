import { createSlice } from "@reduxjs/toolkit";

let localCart=JSON.parse(localStorage.getItem('cart')) || []
const initialState = {
  cartItems: localCart,
  totalPrice: localCart.length > 0 ? localCart.reduce((acc, item) => acc + (item.price*item.qty), 0) : 0,
  totalDiscount:localCart.length > 0 ? localCart.reduce((acc, item) => acc + item.qty*(item.price*(item.discount/100)), 0) : 0,
  totalNumber:localCart.length,
};
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {

            const selected = action.payload;
            const exist = state.cartItems.find((item) => item._id === selected._id);
            if (exist) {
                exist.qty += 1;
            } else {
                state.cartItems.push({ ...selected, qty: 1 });
                state.totalNumber+=1
            }
            state.totalPrice += selected.price
            state.totalDiscount += selected.price*(selected.discount/100)
            localStorage.setItem('cart', JSON.stringify(state.cartItems))
    
        },
        removeFromCart: (state, action) => {
            const selected = action.payload;
            const exist = state.cartItems.find((item) => item._id === selected._id);
            if (exist.qty === 1) {
              state.cartItems = state.cartItems.filter(
                (item) => item._id !== selected._id
              );
              state.totalNumber-=1
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
          state.totalNumber-=1
          localStorage.setItem('cart', JSON.stringify(state.cartItems));
        },

        emptyCart:(state) => {
          state.cartItems=[]
          state.totalPrice = 0
          state.totalDiscount = 0
          state.totalNumber=0
          localStorage.removeItem('cart');
        },
    },
});


export const { addToCart,removeFromCart,removeAllFromCart,emptyCart} = cartSlice.actions;
export default cartSlice.reducer;
