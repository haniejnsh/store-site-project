import { FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function UnsuccessfulResult() {
  const navigate =useNavigate()
  localStorage.removeItem('additionalInformation');
  
  return (
    <div className="flex flex-col items-center mx-auto w-full my-16">
      <FaExclamationTriangle className="text-9xl text-red-500"/>
      <p className="text-red-800 mt-8 text-xl">متاسفانه پرداخت شما موفقیت آمیز نبود</p>
      <p className="text-red-700 mt-10">سفارش شما در انتظار پرداخت میباشد</p>
      
      <p onClick={()=>navigate("/shipping")} className="text-blue-500 bg-bl2 px-2 py-2 rounded-lg hover:bg-blue-200 transition cursor-pointer font-bold mt-6">بازگشت به صفحه پرداخت</p>
      
    </div>
  )
}
