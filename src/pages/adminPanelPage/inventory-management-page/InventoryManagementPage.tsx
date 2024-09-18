import InventoryManagementTable from "./components/InventoryManagementTable";

export default function InventoryManagementPage() {
  return (
    <div>
      <div className="flex w-full">
      <div className="flex flex-col w-[80%] mx-auto">
        <div className="flex justify-between py-4">
          <p className="text-2xl font-bold text-slate-500">مدیریت موجودی و قیمت</p>
          <div className="flex items-center gap-1 font-bold text-slate-500 cursor-pointer hover:text-blue-300 transition">
            <span>ثبت تغییرات</span>
            
          </div>
        </div>
        <div>
          <InventoryManagementTable/>
        </div>
      </div>
    </div>
    </div>
  )
}
