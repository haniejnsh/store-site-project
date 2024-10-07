import { useDispatch, useSelector } from "react-redux";
import CartProductCard from "./components/CartProductCard";
import PaymentCard from "./components/PaymentCard";
import { addToCart,removeAllFromCart,removeFromCart } from "@/redux/cart/cartSlice";

export default function CartPage() {
  const dispatch = useDispatch();
  const { cartItems,totalPrice,totalDiscount } = useSelector((store) => store.cart);
  console.log("button cartitems2: ",cartItems);
  return (
    <div className="w-[80%] flex flex-col mx-auto py-8">
      <div className="flex gap-4">
        <div className="flex flex-col gap-4 w-[75%]">
          {cartItems?.map(item=>{
            return (<CartProductCard product={item} remove={(i) => dispatch(removeFromCart( i ))} removeAll={(i) => dispatch(removeAllFromCart( i ))} add={(i) => dispatch(addToCart( i ))}/>)
          })}
          {/* <CartProductCard/>
          <CartProductCard/> */}
        </div>
        <div className="flex flex-col w-[25%]">
          <PaymentCard totalPrice={totalPrice} totalDiscount={totalDiscount}/>
          <div className="bg-blue-500 flex justify-center items-center rounded-lg text-white h-14 hover:bg-blue-400 mt-4 text-lg font-bold shadow-inner shadow-blue-200 cursor-pointer transition">ثبت سفارش</div>
        </div>
      </div>
    </div>
  )
}
