import { RiMenuAddFill } from "react-icons/ri";
import ProductsManagementTable from "./ProductsManagementTable";
import AdminPanelProductAdd from "./components/AdminPanelProductAdd";

export default function ProductsManagmentPage() {
  return (
    <div className="flex w-full">
      <div className="flex flex-col w-[80%] mx-auto">
        <div className="flex justify-between py-4">
          <p className="text-2xl font-bold text-slate-500">مدیریت کالاها</p>
          <AdminPanelProductAdd/>
          <div className="flex items-center gap-1 font-bold text-slate-500 cursor-pointer hover:text-blue-300 transition">
            <span>افزودن کالا</span>
            
            <RiMenuAddFill/>
          </div>
        </div>
        <div>
          <ProductsManagementTable/>
        </div>
      </div>
    </div>
  )
}
