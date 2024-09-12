import { RiMenuAddFill } from "react-icons/ri";
import ProductsManagementTable from "./ProductsManagementTable";

export default function ProductsManagmentPage() {
  return (
    <div className="flex w-full">
      <div className="flex flex-col w-[80%]">
        <div className="flex">
          <p>مدیریت کالاها</p>
          <div>
            <span>افزودن کالا</span>
            <RiMenuAddFill/>
          </div>
        </div>
        <ProductsManagementTable/>
      </div>
    </div>
  )
}
