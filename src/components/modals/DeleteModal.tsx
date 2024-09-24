import {AlertDialog,AlertDialogAction,AlertDialogCancel,AlertDialogContent,AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,AlertDialogTitle,AlertDialogTrigger,} from "@/components/ui/alert-dialog"
import useRemove from "@/hooks/useRemove";
import { MdDeleteForever } from "react-icons/md";
  
export default function DeleteModal({idPro,namePro,titleModal,url}) {
    const {mutate}=useRemove(url)
    const handle=()=>{
        // alert("modal delete")
        mutate(idPro)
    }
    return (
        <div className="">
            <AlertDialog>
                <AlertDialogTrigger>
                    <MdDeleteForever className="text-2xl text-blue-400 hover:text-red-500 cursor-pointer transition"/>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-bl1 flex flex-col items-center gap-8">
                    <AlertDialogHeader className="flex flex-col items-center gap-3">
                        <AlertDialogTitle>{titleModal}</AlertDialogTitle>
                        <AlertDialogDescription>
                            آیا از حذف {namePro} مطمئن هستید ؟
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
  