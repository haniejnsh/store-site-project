import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function SuccessfulResult() {
  const navigate =useNavigate()
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
