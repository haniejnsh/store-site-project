import {AlertDialog,AlertDialogAction,AlertDialogCancel,AlertDialogContent,AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,AlertDialogTitle,AlertDialogTrigger,} from "@/components/ui/alert-dialog"
import { FaEdit } from "react-icons/fa";
import EditProductForm from "./EditProductForm";

export default function EditProductModal({infoPro}) {
  return (
    <div className="">
            <AlertDialog>
                <AlertDialogTrigger>
                    <FaEdit className="text-lg text-blue-400 hover:text-yellow-500 cursor-pointer transition "/>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-bl1 flex flex-col items-center gap-8 ">
                    <AlertDialogHeader className="flex flex-col items-center gap-3 w-full">
                        <AlertDialogTitle className="text-gray-500">ویرایش محصول</AlertDialogTitle>
                        <AlertDialogDescription className="w-full max-h-[460px] overflow-y-scroll">
                            <EditProductForm infoPro={infoPro}/>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="gap-6">
                        <AlertDialogAction className="bg-blue-100 text-gray-500 w-20 border-blue-200 hover:bg-blue-300 border transition" >ویرایش</AlertDialogAction>
                        <AlertDialogCancel className="bg-blue-100 text-gray-500 w-20 border border-blue-200 hover:bg-blue-300 transition">انصراف</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
  )
}

