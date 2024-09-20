import {Table,TableBody,TableCaption,TableCell,TableFooter,TableHead,TableHeader,TableRow} from "@/components/ui/table"
import useGetReactQuery from "@/hooks/useGetReactQuery"
import { ORDER_URL } from "@/services/api"
import PaginationHook from "@/components/common/Pagination";
import { useEffect, useState } from "react";
import * as shamsi from 'shamsi-date-converter';
import { ImSad2 } from "react-icons/im";

export default function OrdersManagementTable({filterUrl}) {
  const [pageCounter,setPageCounter]=useState(1)

  let fil=""
  if(filterUrl=="true"){
    fil="deliveryStatus=true&"
  }
  else if(filterUrl=="false"){
    fil="deliveryStatus=false&"
  }
  else{
    fil=""
  }

  const {isLoading,data,isError,error, refetch}=useGetReactQuery(`${ORDER_URL}?${fil}page=${pageCounter}&limit=5`)
  useEffect(() => {
    setPageCounter(1);
  }, [filterUrl]);


  useEffect(() => {
    refetch();
  }, [pageCounter,fil, refetch]);

  if(isLoading){
    return(
      <div className="flex justify-center items-center mt-20 text-blue-400 text-xl font-bold">در حال بارگزاری . . .</div>
    )
  }

  if(isError){
    return(
      <div className="flex justify-center mt-20 text-red-500 items-center gap-1">
        <ImSad2 />
        <span>{error.response.data.message}</span>
      </div>
    )
  }
  
  const ordersData=data.data.orders


  return (
    <div className="flex flex-col gap-2 pt-4 pb-8">
    <div className="w-5/6 my-4 mx-auto shadow-customshadow border-bl2 border-[1px] rounded-lg min-h-[282px]">
    <Table className="border-b border-bl2">
      {/* <TableCaption></TableCaption> */}
      <TableHeader>
        <TableRow className="h-14 text-gray-500 font-bold bg-bl2 hover:bg-bl2 border-bl2">
          <TableHead className="text-center text-xl text-gray-500 font-bold px-2">نام کاربر</TableHead>
          <TableHead className="text-center text-xl text-gray-500 font-bold px-2">مجموع مبلغ</TableHead>
          <TableHead className="text-center text-xl text-gray-500 font-bold px-2">تاریخ ثبت سفارش</TableHead>
          <TableHead className="text-center text-xl text-gray-500 font-bold px-2">جزئیات سفارش</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ordersData?.map(order=>{
          return(
            <TableRow className="odd:bg-white even:bg-bl1 border-bl2">
                <TableCell className="text-center text-lg text-gray-500 px-2 w-[30%]">
                    {`${order.user.firstname} ${order.user.lastname}`}
                </TableCell>
                <TableCell className="text-center w-[25%] text-gray-500">
                    {order.totalPrice}
                </TableCell>
                <TableCell className="text-center w-[20%] text-gray-500">
                {shamsi.gregorianToJalali(order.createdAt).join('/')}
                </TableCell>
                <TableCell className="text-center w-[25%] text-gray-500">
                <span className="hover:text-blue-300 cursor-pointer transition text-blue-400 text-lg">مشاهده سفارش</span>
                </TableCell>
            </TableRow>
          )
        })}
        
      </TableBody>
    </Table>
    </div>
    <PaginationHook counterSet={(t)=>setPageCounter(t)} pageNumber={pageCounter} totalPage={data.total_pages}/>
    </div>
  )
}
