import OrdersManagementTable from "./components/OrdersManagementTable";

export default function OrdersManagementPage() {
  return (
    <div>
      <div className="flex w-full">
      <div className="flex flex-col w-[80%] mx-auto">
        <div className="flex justify-between py-4">
          <p className="text-2xl font-bold text-slate-500">مدیریت سفارش ها</p>
          <div className="flex items-center gap-1 font-bold text-slate-500 cursor-pointer hover:text-blue-300 transition">
            <span>ثبت تغییرات</span>
            
          </div>
        </div>
        <div>
          <OrdersManagementTable/>
        </div>
      </div>
    </div>
    </div>
  )
}
