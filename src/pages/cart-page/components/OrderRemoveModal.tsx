import {AlertDialog,AlertDialogAction,AlertDialogCancel,AlertDialogContent,AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,AlertDialogTitle,AlertDialogTrigger,} from "@/components/ui/alert-dialog"
import useRemove from "@/hooks/useRemove";
import { MdDeleteForever } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";

export default function OrderRemoveModal({removeAll,order}) {
    
    const handle=()=>{
        // alert("modal delete")
    
        removeAll(order)
    }
    
    return (
        <div className="">
            <AlertDialog>
                <AlertDialogTrigger>
                    <div  className="flex justify-center items-center w-9 bg-red-400 h-9 rounded-lg text-xl text-white cursor-pointer hover:bg-red-300 transition"><RiDeleteBin6Fill/></div>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-bl1 flex flex-col items-center gap-8">
                    <AlertDialogHeader className="flex flex-col items-center gap-3">
                        <AlertDialogTitle>حذف از سبد خرید</AlertDialogTitle>
                        <AlertDialogDescription>
                            آیا از حذف {order.name} مطمئن هستید ؟
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="gap-6">
                        <AlertDialogAction className="bg-red-100 text-gray-500 w-20 border-red-200 hover:bg-red-300 border transition" onClick={handle}>حذف</AlertDialogAction>
                        <AlertDialogCancel className="bg-blue-100 text-gray-500 w-20 border border-blue-200 hover:bg-blue-300 transition">انصراف</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
  