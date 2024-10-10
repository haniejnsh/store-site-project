import { useDispatch, useSelector } from "react-redux";
import CartProductCard from "./components/CartProductCard";
import PaymentCard from "./components/PaymentCard";
import { addToCart,removeAllFromCart,removeFromCart } from "@/redux/cart/cartSlice";
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const dispatch = useDispatch();
  const { cartItems,totalPrice,totalDiscount } = useSelector((store) => store.cart);
  const navigate=useNavigate()
  return (
    <div className="w-[80%] flex flex-col mx-auto py-8">
      {(totalPrice)?(
        <div className="flex gap-4">
        <div className="flex flex-col gap-4 w-[75%]">
          {cartItems?.map(item=>{
            return (<CartProductCard product={item} remove={(i) => dispatch(removeFromCart( i ))} removeAll={(i) => dispatch(removeAllFromCart( i ))} add={(i) => dispatch(addToCart( i ))}/>)
          })}
        </div>
        <div className="flex flex-col w-[25%]">
          <PaymentCard totalPrice={totalPrice} totalDiscount={totalDiscount}/>
          <div className="bg-blue-500 flex justify-center items-center rounded-lg text-white h-14 hover:bg-blue-400 mt-4 text-lg font-bold shadow-inner shadow-blue-200 cursor-pointer transition" onClick={()=>navigate("/shipping")}>ثبت سفارش</div>
        </div>
      </div>
      ):(
        <div className="flex flex-col items-center gap-6 py-16">
          <FaCartShopping className="text-7xl text-bl2"/>
          <p className="text-lg text-blue-300">سبد خرید شما خالی میباشد</p>
        </div>
      )}
      
    </div>
  )
}
