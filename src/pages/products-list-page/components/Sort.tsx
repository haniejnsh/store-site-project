import { useState } from "react"

export default function Sort() {
    const options=[["پیش فرض",""],["کمترین قیمت","pricLow"],["بیشترین قیمت","priceHigh"],["تخفیف","discount"]]
    const [selected,setSelected]=useState("")
  return (
    <div className="flex bg-bl1 h-8 items-center text-sm px-3 gap-3">
        <p className="font-bold">ترتیب بر اساس :</p>
        <div className="flex items-center gap-4">
            {options.map(op=>{
                return(
                    <div
                     onClick={()=>setSelected(op[1])}
                     className={`cursor-pointer transition ${
                      selected === op[1] ? "text-blue-500" : "text-gray-500"
                    } hover:text-blue-300`}
                     >{op[0]}</div>
                )
            })}
        </div>
        
        
    </div>
  )
}
