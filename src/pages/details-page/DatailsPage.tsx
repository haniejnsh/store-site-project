import useGetReactQuery from "@/hooks/useGetReactQuery";
import { PRODUCT_URL } from "@/services/api";
import { useEffect, useState } from "react";
import { ImSad2 } from "react-icons/im";
import { useParams } from "react-router-dom"
import { RiDeleteBin6Fill } from "react-icons/ri";

export default function DatailsPage() {
  // const loc=useLocation()
  const params=useParams()
  const product=params.productId.slice(1)
  console.log("param",product)
  const {isLoading,data,isError,error, refetch}=useGetReactQuery(`${PRODUCT_URL}/${product}`)
  const [orderCount,setOrderCount]=useState(0)
  
  console.log(data);
  

  useEffect(() => {
    refetch()
  }, [refetch]);

  if(isLoading){
    return (
        <div className="flex justify-center items-center my-20 text-blue-400 text-xl font-bold">در حال بارگزاری . . .</div>
    )
  }

  if(isError){
    
    return (
        <div className="flex justify-center my-20 text-red-500 items-center gap-1">
          <ImSad2 />
          <span>"متاسفانه با خطا رو به رو شدید"</span>
        </div>
    )
  }
  const information=data.data.product
  const newPrice=information.price-(information.price*(information.discount/100))
  return (
    <div className="flex w-[80%] mx-auto mt-8">

      <div className="w-[40%]"></div>

      <div className="w-[60%] flex flex-col text-gray-500">
        <div className="flex">
          <div className="flex flex-col w-[60%]"></div>
          <div className="flex flex-col w-[40%] border border-bl2 rounded-md px-2 py-2">
            <div className="flex flex-col rounded-md bg-bl1 px-3 py-3">
              <div className="flex justify-between gap-3 items-center">
                <p className="flex text-sm text-white bg-red-500 justify-center items-center w-9 h-5 rounded-md">
                  <span>{information.discount}</span>
                  <span>%</span>
                </p>
                <p className="flex gap-1 items-center">
                  <span className="font-bold text-lg">{newPrice}</span>
                  <span className="w-8">تومان</span>
                </p>
              </div>
              <div className="flex justify-end">
                  <span className="line-through text-gray-400">{information.price}</span>
                  <span className="w-9"></span>
              </div>
            </div>
            {(orderCount==0)?(
              <div onClick={()=>setOrderCount(t=>t+1)} className="bg-blue-500 flex justify-center items-center rounded-lg text-white h-14 hover:bg-blue-400 mt-6 text-lg font-bold shadow-inner shadow-blue-200 cursor-pointer transition">افزودن به سبد خرید</div>
            ):(
              <div className="flex justify-center items-center h-14 mt-6 gap-3">
                <div className="flex items-center w-[75%] border border-bl2 rounded-lg h-full justify-around text-xl font-bold">
                  <span onClick={()=>{if(orderCount<information.quantity){setOrderCount(t=>t+1)}}} className="cursor-pointer hover:text-blue-400 transition">+</span>
                  <span>{orderCount}</span>
                  <span onClick={()=>{if(orderCount>1){setOrderCount(t=>t-1)}}}  className="cursor-pointer hover:text-blue-400 transition">-</span>
                </div>
                <div onClick={()=>setOrderCount(0)} className="flex justify-center items-center w-[25%] bg-red-400 h-full rounded-lg text-2xl text-white cursor-pointer hover:bg-red-300 transition"><RiDeleteBin6Fill/></div>
              </div>
            )}

          </div>
        </div>
        <div></div>
      </div>
    </div>
  )
}
