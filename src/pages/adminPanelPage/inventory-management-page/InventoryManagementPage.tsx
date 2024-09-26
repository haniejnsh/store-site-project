import { useState } from "react";
import InventoryManagementTable from "./components/InventoryManagementTable";
import usePatchAllReactQuery from "@/hooks/usePatchAllReactQuery";
import { PRODUCT_URL } from "@/services/api";

export default function InventoryManagementPage() {
      const [changeList,setChangeList] = useState({})
      const [editFields, setEditFields] = useState({});
      let isDisabled=true
      if(Object.keys(changeList).length !== 0){isDisabled=false}
      const {mutate}=usePatchAllReactQuery(PRODUCT_URL)
  const handle=()=>{
    
    let newList=[]
    Object.entries(changeList).forEach(([key, value])=>{
      const formData = new FormData();
      let obj={id:key,info:{}}
      if(value.quantity_value){formData.append("quantity",value.quantity_value )}
      if(value.price_value){formData.append("price",value.price_value )}
      obj["info"]=formData
      if(value.price_value || value.quantity_value){newList.push(obj)}

    })
    mutate(newList)
    setEditFields({})
    setChangeList({})
  }
  return (
    <div>
      <div className="flex w-full">
      <div className="flex flex-col w-[80%] mx-auto">
        <div className="flex justify-between py-4">
          <p className="text-2xl font-bold text-slate-500">مدیریت موجودی و قیمت</p>
          <button className={`"flex items-center gap-1 font-bold text-slate-500 cursor-pointer transition" ${!isDisabled?"hover:text-blue-300":""}` } disabled={isDisabled} onClick={handle} >
            ثبت تغییرات
            
          </button>
        </div>
        <div>
          <InventoryManagementTable change={(t) =>{setChangeList(t)}} setEditFields={setEditFields} editFields={editFields}/>
        </div>
      </div>
    </div>
    </div>
  )
}
