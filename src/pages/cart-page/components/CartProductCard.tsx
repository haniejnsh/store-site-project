import { useNumberConverter } from "@/hooks/useNumberConverter"
import { useState } from "react"
import { RiDeleteBin6Fill } from "react-icons/ri"

export default function CartProductCard() {
    const newPrice=useNumberConverter(Number(8500000-(8500000*(3/100))))
    const [orderCount,setOrderCount]=useState(1)
  return (
    <div className="flex border px-2 py-3 items-center rounded-lg  border-bl2 gap-2">

        <div className="flex w-[10%] max-w-24 min-w-12"><img src={"http://localhost:8000/images/products/images/products-66f90052a4c4996cc5eae8c0-1727594578635-1.webp"} alt="order" className="w-full h-full"/></div>

        <p className="flex w-[45%] font-bold">یخچال فریزر دوقلو 40 فوت دوو مدل DLF-2036</p>

        <div className="flex flex-col w-[25%] px-3">
            <div className="flex justify-center gap-2 items-center">
                <p className="flex text-sm text-white bg-red-500 justify-center items-center w-7 h-5 rounded-md">
                  <span>{useNumberConverter(3)}</span>
                  <span>%</span>
                </p>
                <p className="flex gap-1 items-center">
                  <span className="font-bold text-md">{newPrice}</span>
                  <span className="w-8 text-sm">تومان</span>
                </p>
            </div>
            <div className="flex justify-center">
                <span className="line-through text-gray-400 text-md">{useNumberConverter(8500000)}</span>
                {/* <span className="w-9"></span> */}
            </div>
        </div>

        <div className="flex justify-center items-center h-full max-h-10 gap-2 w-[20%] px-2">
            <div className="flex items-center w-[75%] border border-bl2 rounded-lg h-full justify-around text-lg font-bold">
                <span onClick={()=>{if(orderCount<10){setOrderCount(t=>t+1)}}} className="cursor-pointer hover:text-blue-400 transition">+</span>
                <span>{orderCount}</span>
                <span onClick={()=>{if(orderCount>1){setOrderCount(t=>t-1)}}}  className="cursor-pointer hover:text-blue-400 transition">-</span>
            </div>
            <div onClick={()=>setOrderCount(0)} className="flex justify-center items-center w-[25%] bg-red-400 h-full rounded-lg text-xl text-white cursor-pointer hover:bg-red-300 transition"><RiDeleteBin6Fill/></div>
        </div>

    </div>
  )
}
