import { Navigate, useNavigate } from "react-router-dom";
import UserInformationForm from "./components/UserInformationForm";
import OrderInformation from "./components/OrderInformation";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast"

export default function ShippingPage() {
  const token=localStorage.getItem("access");
  const role=localStorage.getItem("role");
  const [errorInformation,setErrorInformation]=useState(true)
  const [errorOrder,setErrorOrder]=useState(true)
  const { toast } = useToast()
  const navigate=useNavigate()
  // if(!errorInformation && !errorOrder){
  //   setDisable(false)
  // }
  console.log("disable : ",errorInformation,errorOrder);
  
  const handle=()=>{
    
    if(!errorInformation && !errorOrder){
      console.log("submit");
      console.log("disable : ",errorInformation,errorOrder);
    }
    else if(errorInformation && !errorOrder){
      toast({
        description: "لطفا اطلاعات دریافت کننده سفارش را کامل کنید.",
        duration: 2500,
        className:"w-[350px] bg-red-50 border border-red-100 text-gray-500"
      })
    }
    else if(!errorInformation && errorOrder){
      toast({
        description: "لطفا نوع ارسال را مشخص کنید.",
        duration: 2500,
        className:"w-[350px] bg-red-50 border border-red-100 text-gray-500"
      })
    }
    else{
      toast({
        description: "لطفا اطلاعات خواسته شده را کامل کنید.",
        duration: 2500,
        className:"w-[350px] bg-red-50 border border-red-100 text-gray-500"
      })
    }
  }

  return (
    <>
      {(token && role=="USER")?(
        <div className="flex flex-col w-[80%] mx-auto py-8">
          <div className="flex w-full gap-6">
            <div className="flex w-[55%]"><UserInformationForm errorInformation={(t)=>setErrorInformation(t)}/></div>
            <div className="flex w-[45%]"><OrderInformation errorOrder={(t)=>setErrorOrder(t)}/></div>
          </div>
          <div className="flex w-full items-center justify-center mt-8 gap-4 text-gray-500">
            <div onClick={()=>navigate("/cart")} className="bg-blue-500 flex justify-center items-center rounded-lg text-white  hover:bg-blue-400 text-lg font-bold shadow-inner shadow-blue-200 cursor-pointer transition w-40 py-2">برگشت به سبد خرید</div>
            <button  onClick={handle} className="bg-blue-500 flex justify-center items-center rounded-lg text-white  hover:bg-blue-400 text-lg font-bold shadow-inner shadow-blue-200 cursor-pointer transition w-40 py-2">پرداخت</button>
          </div>
        </div>
      ):(
        <Navigate to={"/userlogin"}/>
      )}
        
    </>
  )
}
