import { useState } from "react";
import DeliveryFilter from "./components/DeliveryFilter";
import OrdersManagementTable from "./components/OrdersManagementTable";

export default function OrdersManagementPage() {
  const [filterUrl,setFilterUrl]=useState("")
  console.log("filter url : ",filterUrl);
  
  return (
    <div>
      <div className="flex w-full">
      <div className="flex flex-col w-[80%] mx-auto">
        <div className="flex justify-between py-4">
          <p className="text-2xl font-bold text-slate-500">مدیریت سفارش ها</p>
          
            <DeliveryFilter filterSet={(f)=>setFilterUrl(f)}/>
            
        </div>
        <div>
          <OrdersManagementTable filterUrl={filterUrl}/>
        </div>
      </div>
    </div>
    </div>
  )
}
