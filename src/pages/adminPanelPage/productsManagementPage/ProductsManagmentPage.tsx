import ProductsManagementTable from "./components/ProductsManagementTable";
import AdminPanelProductAdd from "./components/AdminPanelProductAdd";
import { useToast } from "@/hooks/use-toast"

export default function ProductsManagmentPage() {
  // const { toast } = useToast()
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
        {/* <button
      onClick={() => {
        toast({
          description: "Your message has been sent.",
          duration: 2000,
        })
      }}
    >
      Show Toast
    </button> */}
      </div>
    </div>
  )
}
