import {AlertDialog,AlertDialogAction,AlertDialogCancel,AlertDialogContent,AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,AlertDialogTitle,AlertDialogTrigger,} from "@/components/ui/alert-dialog"
import { RxCrossCircled } from "react-icons/rx";
import useRemove from "@/hooks/useRemove";
import { MdDeleteForever } from "react-icons/md";
import * as shamsi from 'shamsi-date-converter';
import OrderInformationDetails from "./OrderInformationDetails";
import usePatchReactQuery from "@/hooks/usePatchReactQuery";
import { ORDER_URL } from "@/services/api";

export default function OrderInformationModal({infoOrder}) {
    // const {mutate}=useRemove(url)
    const {mutate}=usePatchReactQuery(`${ORDER_URL}/${infoOrder._id}`)
    const handle=()=>{
        alert("modal information")
        mutate({deliveryStatus: true})
    }
    
    return (
        <div className="">
            <AlertDialog >
                <AlertDialogTrigger>
                    <span className="hover:text-blue-300 cursor-pointer transition text-blue-400 text-lg">مشاهده سفارش</span>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-bl1 flex flex-col items-center gap-6 max-w-[600px]">
                    <AlertDialogHeader className="flex flex-col items-center justify-start  w-full">
                        <div className="w-full h-2">
                            <AlertDialogCancel className=" text-red-600 text-2xl px-0 py-0 h-5 hover:text-red-500 transition bg-bl1 border-0 shadow-none">
                                <RxCrossCircled />
                            </AlertDialogCancel>
                        </div>
                        <AlertDialogTitle className="pt-0 mt-0">
                            <span>نمایش سفارش</span>
                        </AlertDialogTitle>
                        <AlertDialogDescription className="w-full pt-4">
                            <OrderInformationDetails infoOrder={infoOrder}/>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="gap-6">
                        {infoOrder.deliveryStatus?(
                            <p className="flex gap-3">
                                <span>تاریخ تحویل :</span>
                                <span>{shamsi.gregorianToJalali(infoOrder.updatedAt).join('/')}</span>
                            </p>
                        ):(
                            <AlertDialogAction className="bg-blue-100 text-gray-500 w-20 border border-blue-200 hover:bg-blue-300 transition" onClick={handle}>تحویل شد</AlertDialogAction>
                        )}
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
  