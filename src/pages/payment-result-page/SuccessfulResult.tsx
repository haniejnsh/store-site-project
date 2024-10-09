import usePostReactQuery from "@/hooks/usePostReactQuery";
import { ORDER_URL } from "@/services/api";
import { useEffect } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function SuccessfulResult() {
  const navigate =useNavigate()
  const {mutate}=usePostReactQuery(ORDER_URL)
  const cartLocal=JSON.parse(localStorage.getItem('cart'))||[]
  const userLocal=JSON.parse(localStorage.getItem('user'))
  const addInfoLocal=JSON.parse(localStorage.getItem('additionalInformation'))||[]
  const cartItem=cartLocal?.map(({ _id, qty }) => ({
    product:_id,
    count:qty
  }));
  // console.log(cartItem);
  
  const order={
    user: userLocal._id,
    products: cartItem,
    deliveryDate:addInfoLocal.deliveryDate,
    deliveryStatus: false,
    sideCost:addInfoLocal?.deliveryDate?.addPrice
  }
  console.log("order",order);
  useEffect(() => {
    if(cartLocal != []){
      mutate(order);
    }
    
  }, []);
  localStorage.removeItem("additionalInformation")
  return (
    
    <div className="flex flex-col items-center mx-auto w-full my-16">
      <IoMdCheckmarkCircleOutline className="text-9xl text-green-600"/>
      <p className="text-green-800 mt-8 text-xl">پرداخت شما موفقیت آمیز بود</p>
      <p className="text-green-600 mt-10 flex flex-col items-center">
        <span>با تشکر از خرید شما</span>
        <span> میتوانید در صفحه پیگیری سفارش سفارش خود را پیگیری کنید.</span>
      </p>
      
      <p onClick={()=>navigate("/")} className="text-blue-500 bg-bl2 px-2 py-2 rounded-lg hover:bg-blue-200 transition cursor-pointer font-bold mt-8">بازگشت به صفحه اصلی</p>
      
    </div>
  )
}
