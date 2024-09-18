import {Table,TableBody,TableCaption,TableCell,TableFooter,TableHead,TableHeader,TableRow} from "@/components/ui/table"
import useGetReactQuery from "@/hooks/useGetReactQuery"
import { PRODUCT_URL } from "@/services/api"
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import PaginationHook from "@/components/common/Pagination";
import { useEffect, useState } from "react";

export default function InventoryManagementTable() {
  const [pageCounter,setPageCounter]=useState(1)
  const [editProductId, setEditProductId] = useState(null); // برای پیگیری ردیف در حال ویرایش
  const [editField, setEditField] = useState(null); // پیگیری فیلد (price یا quantity) که در حال ویرایش است
  const [editValue, setEditValue] = useState("");
  
  const {isLoading,data, refetch}=useGetReactQuery(`${PRODUCT_URL}?page=${pageCounter}&limit=5`)
  
  useEffect(() => {
    refetch();  // درخواست مجدد به API
  }, [pageCounter, refetch]);
// images

  if(isLoading){
    return(
      <div>loading ...</div>
    )
  }
  console.log("table data",data.data.products);
  // console.log("img",data.data.products[4].images[0]);
  
  const productsData=data.data.products
  const handleEdit = (productId, field, value) => {
    setEditProductId(productId);
    setEditField(field);
    setEditValue(value);
  };

  // مدیریت تغییر مقدار
  const handleInputChange = (e) => {
    setEditValue(e.target.value);
  };

  // ذخیره‌سازی مقدار ویرایش‌شده
  const handleSave = (productId) => {
    console.log(`مقدار جدید برای محصول ${productId}: ${editField} = ${editValue}`);
    // اینجا می‌توانید تابع ذخیره به API را اضافه کنید
    setEditProductId(null); // پایان ویرایش
    setEditField(null);
    setEditValue("");
  };



  return (
    <div className="flex flex-col gap-2 pt-4 pb-8">
    <div className="w-5/6 my-4 mx-auto shadow-customshadow border-bl2 border-[1px] rounded-lg min-h-[381px]">
    <Table className="border-b border-bl2">
      {/* <TableCaption></TableCaption> */}
      <TableHeader>
        <TableRow className="h-14 text-gray-500 font-bold bg-bl2 hover:bg-bl2 border-bl2">
          <TableHead className="text-center text-xl text-gray-500 font-bold px-8">تصویر</TableHead>
          <TableHead className="text-center text-xl text-gray-500 font-bold px-2">نام کالا</TableHead>
          {/* <TableHead className="text-center text-xl text-gray-500 font-bold px-2">دسته بندی</TableHead> */}
          <TableHead className="text-center text-xl text-gray-500 font-bold px-2">موجودی</TableHead>
          <TableHead className="text-center text-xl text-gray-500 font-bold px-2">قیمت</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {productsData?.map(pro=>{
          return(
            <TableRow className="odd:bg-white even:bg-bl1 border-bl2">
              <TableCell className="text-center w-14 px-8">
                <img className="w-12 h-12" src={`http://${pro?.images[0]}`} alt="pic" />
              </TableCell>
              <TableCell className="text-center text-lg text-gray-500 px-2 w-[52%]">{pro.name}</TableCell>
              {/* <TableCell className="text-center text-md text-gray-500 px-2 w-[25%]">{pro.category.name}/{pro.subcategory.name}</TableCell> */}
              <TableCell className="text-center w-[15%] text-gray-500">
                {/* <input type="button" value={pro.quantity} className="w-full"/> */}
                {editProductId === pro._id && editField === "quantity" ? (
                    <input
                        className="w-full focus:outline-none focus:border-[1px] border-bl2 text-center"
                        type="number"
                        value={editValue}
                        onChange={handleInputChange}
                        onBlur={() => handleSave(pro._id)} // ذخیره مقدار جدید وقتی از input خارج می‌شویم
                    />
                  ) : (
                    <input
                        type="button"
                        value={pro.quantity}
                        onClick={() => handleEdit(pro._id, "quantity", pro.quantity)}
                        className="w-full cursor-pointer hover:text-blue-300"
                    />
                  )}
              </TableCell>
              <TableCell className="text-center w-[22%] text-gray-500">
                {/* <input type="button" value={pro.price} className="w-full" /> */}
                {editProductId === pro._id && editField === "price" ? (
                    <input
                        className="w-full focus:outline-none focus:border-[1px] border-bl2 text-center"
                        type="number"
                        value={editValue}
                        onChange={handleInputChange}
                        onBlur={() => handleSave(pro._id)}
                    />
                  ) : (
                    <input
                        type="button"
                        value={pro.price}
                        onClick={() => handleEdit(pro._id, "price", pro.price)}
                        className="w-full cursor-pointer hover:text-blue-300"
                    />
                  )}
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
