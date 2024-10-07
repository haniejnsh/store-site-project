import { useNumberConverter } from "@/hooks/useNumberConverter"
import { useState } from "react"
import { RiDeleteBin6Fill } from "react-icons/ri"
import { NavLink } from "react-router-dom"

export default function CartProductCard({product,remove,add,removeAll}) {
    const newPrice=useNumberConverter(Number(product.price-(product.price*(product.discount/100))))
    // const [orderCount,setOrderCount]=useState(0)
    const { qty, ...newProduct } = product;
    console.log("product in cart : ",product.qty);
    
  return (
    <div className="flex border px-2 py-3 items-center rounded-lg  border-bl2 gap-2 text-gray-500 shadow-lg shadow-bl1 h-28">

        <div className="flex w-[10%] max-w-24 min-w-12"><img src={`http://${product?.images[0]}`} alt="order" className="w-full h-full"/></div>

        <NavLink to={`/details/:${product._id}`} className="flex w-[45%] font-bold mr-3 hover:text-gray-400 transition">{product.name}</NavLink>

        <div className="flex flex-col w-[25%] px-3">
            <div className="flex justify-center gap-2 items-center">
                <p className="flex text-sm text-white bg-red-500 justify-center items-center w-8 h-5 rounded-md">
                  <span>{useNumberConverter(product.discount)}</span>
                  <span>%</span>
                </p>
                <p className="flex gap-1 items-center">
                  <span className="font-bold text-md">{newPrice}</span>
                  <span className="w-8 text-sm">تومان</span>
                </p>
            </div>
            <div className="flex justify-center">
                <span className="line-through text-gray-400 text-md">{useNumberConverter(product.price)}</span>
                {/* <span className="w-9"></span> */}
            </div>
        </div>

        <div className="flex justify-center items-center h-full max-h-10 gap-2 w-[20%] px-2">
            <div className="flex items-center w-[75%] border border-bl2 rounded-lg h-full justify-around text-lg font-bold">
                <span onClick={()=>{add(newProduct)}} className="cursor-pointer hover:text-blue-400 transition">+</span>
                <span>{product.qty}</span>
                <span onClick={()=>{remove(newProduct)}}  className="cursor-pointer hover:text-blue-400 transition">-</span>
            </div>
            <div onClick={()=>{removeAll(newProduct)}} className="flex justify-center items-center w-[25%] bg-red-400 h-full rounded-lg text-xl text-white cursor-pointer hover:bg-red-300 transition"><RiDeleteBin6Fill/></div>
        </div>

    </div>
  )
}
