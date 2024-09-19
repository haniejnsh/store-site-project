import ProductsManagementTable from "./components/ProductsManagementTable";
import AdminPanelProductAdd from "./components/AdminPanelProductAdd";

export default function ProductsManagmentPage() {
  return (
    <div className="flex w-full">
      <div className="flex flex-col w-[80%] mx-auto">
        <div className="flex justify-between py-4">
          <p className="text-2xl font-bold text-slate-500">مدیریت کالاها</p>
          <AdminPanelProductAdd/>
        </div>
        <div>
          <ProductsManagementTable/>
        </div>
      </div>
    </div>
  )
}
