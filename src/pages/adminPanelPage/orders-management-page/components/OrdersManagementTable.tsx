import {Table,TableBody,TableCaption,TableCell,TableFooter,TableHead,TableHeader,TableRow} from "@/components/ui/table"
import useGetReactQuery from "@/hooks/useGetReactQuery"
import { ORDER_URL } from "@/services/api"
// import { MdDeleteForever } from "react-icons/md";
// import { FaEdit } from "react-icons/fa";
import PaginationHook from "@/components/common/Pagination";
import { useEffect, useState } from "react";

export default function OrdersManagementTable() {
  const [pageCounter,setPageCounter]=useState(1)
//   const [editProductId, setEditProductId] = useState(null); // برای پیگیری ردیف در حال ویرایش
//   const [editField, setEditField] = useState(null); // پیگیری فیلد (price یا quantity) که در حال ویرایش است
//   const [editValue, setEditValue] = useState("");
  
  const {isLoading,data, refetch}=useGetReactQuery(`${ORDER_URL}?page=${pageCounter}&limit=5`)
  
  useEffect(() => {
    refetch();  // درخواست مجدد به API
  }, [pageCounter, refetch]);
// images

  if(isLoading){
    return(
      <div>loading ...</div>
    )
  }
  console.log("table data",data.data.orders);
  // console.log("img",data.data.products[4].images[0]);
  
  const ordersData=data.data.orders
//   const handleEdit = (productId, field, value) => {
//     setEditProductId(productId);
//     setEditField(field);
//     setEditValue(value);
//   };

  // مدیریت تغییر مقدار
//   const handleInputChange = (e) => {
//     setEditValue(e.target.value);
//   };

  // ذخیره‌سازی مقدار ویرایش‌شده
//   const handleSave = (productId) => {
//     console.log(`مقدار جدید برای محصول ${productId}: ${editField} = ${editValue}`);
//     // اینجا می‌توانید تابع ذخیره به API را اضافه کنید
//     setEditProductId(null); // پایان ویرایش
//     setEditField(null);
//     setEditValue("");
//   };



  return (
    <div className="flex flex-col gap-2 pt-4 pb-8">
    <div className="w-5/6 my-4 mx-auto shadow-customshadow border-bl2 border-[1px] rounded-lg min-h-[381px]">
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
                <TableCell className="text-center bg-red-50 w-[20%] text-gray-500">
                    {order.totalPrice}
                </TableCell>
                <TableCell className="text-center w-[30%] text-gray-500">
                
                </TableCell>
                <TableCell className="text-center w-[20%] text-gray-500">
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
