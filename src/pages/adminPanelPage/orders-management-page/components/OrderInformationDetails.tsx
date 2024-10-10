import * as shamsi from 'shamsi-date-converter';
import {Table,TableBody,TableCaption,TableCell,TableFooter,TableHead,TableHeader,TableRow} from "@/components/ui/table"
import { useNumberConverter } from '@/hooks/useNumberConverter';

export default function OrderInformationDetails({infoOrder}) {
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col items-center w-[60%] mx-auto gap-2 '>
                <p className='flex w-full gap-1'>
                    <span className='w-28 flex font-bold'>نام کاربر :</span>
                    <p className='flex grow gap-1'>
                        <span>{infoOrder.user.firstname}</span>
                        <span>{infoOrder.user.lastname}</span>
                    </p>
                </p>
                <p className='flex w-full gap-1'>
                    <span className='w-28 flex font-bold'>آدرس :</span>
                    <span className='flex grow'>{infoOrder.user.address}</span>
                </p>
                <p className='flex w-full gap-1'>
                    <span className='w-28 flex font-bold'>تلفن :</span>
                    <span className='flex grow'>{infoOrder.user.phoneNumber}</span>
                </p>
                <p className='flex w-full gap-1'>
                    <span className='w-28 flex font-bold'>تاریخ سفارش :</span>
                    <span className='flex grow'>{shamsi.gregorianToJalali(infoOrder.createdAt).join('/')}</span>
                </p>
                <p className='flex w-full gap-1'>
                    <span className='w-28 flex font-bold'>تاریخ انتخابی تحویل :</span>
                    <span className='flex grow'>{shamsi.gregorianToJalali(infoOrder.deliveryDate).join('/')}</span>
                </p>
            </div>
            <div>
                <Table className="border border-bl2 rounded-lg">
                {/* <TableCaption></TableCaption> */}
                    <TableHeader>
                        <TableRow className="h-10 text-gray-500 font-bold bg-bl2 hover:bg-bl2 border-bl2">
                            <TableHead className="text-center text-md text-gray-500 font-bold px-2">نام کالا</TableHead>
                            <TableHead className="text-center text-md text-gray-500 font-bold px-2">قیمت</TableHead>
                            <TableHead className="text-center text-md text-gray-500 font-bold px-2">تعداد</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {infoOrder.products?.map(pro=>{
                        return(
                        <TableRow className="odd:bg-white even:bg-sky-50 border-bl2">
                            <TableCell className="text-center text-gray-500 px-2 w-[65%] ">
                                {pro.product.name}
                            </TableCell>
                            <TableCell className="text-center w-[25%] text-gray-500 ">
                                {useNumberConverter(pro.product.price)}
                            </TableCell>
                            <TableCell className="text-center w-[10%] text-gray-500">
                                {useNumberConverter(pro.count)}
                            </TableCell>
                        </TableRow>
                        )
                        })}
        
                    </TableBody>
                </Table>
            </div>

        </div>
  )
}
