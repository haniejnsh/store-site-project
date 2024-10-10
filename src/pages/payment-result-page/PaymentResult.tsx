import { FaExclamationTriangle } from "react-icons/fa";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import usePostReactQuery from "@/hooks/usePostReactQuery";
import { ORDER_URL } from "@/services/api";
import { useEffect } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";


export default function PaymentResult() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate =useNavigate()
  const {mutate}=usePostReactQuery(ORDER_URL)
  const result=searchParams.get("result") || ""
  const userLocal=JSON.parse(localStorage.getItem('user'))
  const cartLocal=JSON.parse(localStorage.getItem('cart'))||[]
  const addInfoLocal=JSON.parse(localStorage.getItem('additionalInformation'))||[]
  const cartItem=cartLocal?.map(({ _id, qty }) => ({
    product:_id,
    count:qty
  }));
  const order={
    user: userLocal._id,
    products: cartItem,
    deliveryDate:addInfoLocal.deliveryDate,
    deliveryStatus: false,
    sideCost:addInfoLocal?.deliveryDate?.addPrice
  }
  useEffect(() => {
    if(cartLocal.length > 0 && result=="success"){
      mutate(order);
    }
    
  }, [])
  
  localStorage.removeItem("additionalInformation")
  
  
  return (
    <>
    {(result=="success")?(
      <div className="flex flex-col items-center mx-auto w-full my-16">
      <IoMdCheckmarkCircleOutline className="text-9xl text-green-600"/>
      <p className="text-green-800 mt-8 text-xl">پرداخت شما موفقیت آمیز بود</p>
      <p className="text-green-600 mt-10 flex flex-col items-center">
        <span>با تشکر از خرید شما</span>
        <span> میتوانید در صفحه پیگیری سفارش سفارش خود را پیگیری کنید.</span>
      </p>
      
      <p onClick={()=>navigate("/")} className="text-blue-500 bg-bl2 px-2 py-2 rounded-lg hover:bg-blue-200 transition cursor-pointer font-bold mt-8">بازگشت به صفحه اصلی</p>
      
    </div>
    ):(result=="unsuccess")?(
      <div className="flex flex-col items-center mx-auto w-full my-16">
      <FaExclamationTriangle className="text-9xl text-red-500"/>
      <p className="text-red-800 mt-8 text-xl">متاسفانه پرداخت شما موفقیت آمیز نبود</p>
      <p className="text-red-700 mt-10">سفارش شما در انتظار پرداخت میباشد</p>
      
      <p onClick={()=>navigate("/shipping")} className="text-blue-500 bg-bl2 px-2 py-2 rounded-lg hover:bg-blue-200 transition cursor-pointer font-bold mt-6">بازگشت به صفحه پرداخت</p>
      
    </div>
    ):(
      <Navigate to={"/"}/>
    )}
    </>
  )
}
