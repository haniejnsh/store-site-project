import {Table,TableBody,TableCaption,TableCell,TableFooter,TableHead,TableHeader,TableRow} from "@/components/ui/table"
import useGetReactQuery from "@/hooks/useGetReactQuery"
import { PRODUCT_URL } from "@/services/api"
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import PaginationHook from "@/components/common/Pagination";
import { useState } from "react";

export default function ProductsManagementTable() {
  const [pageCounter,setPageCounter]=useState(1)
  console.log("asli counter",pageCounter);
  
  const {isLoading,data}=useGetReactQuery(PRODUCT_URL)
  if(isLoading){
    return(
      <div>loading ...</div>
    )
  }
  console.log("table data",data.data.products);
  console.log("img",data.data.products[4].images[0]);
  
  const productsData=data.data.products
  return (
    <div>
    <div className="w-5/6 my-4 mx-auto shadow-customshadow border-bl2 border-[1px] rounded-lg">
    <Table className="">
      {/* <TableCaption></TableCaption> */}
      <TableHeader>
        <TableRow className="h-14 text-gray-500 font-bold bg-bl2 hover:bg-bl2">
          <TableHead className="text-center text-xl text-gray-500 font-bold px-8">تصویر</TableHead>
          <TableHead className="text-center text-xl text-gray-500 font-bold px-2">نام کالا</TableHead>
          <TableHead className="text-center text-xl text-gray-500 font-bold px-2">دسته بندی</TableHead>
          <TableHead className="text-center text-xl text-gray-500 font-bold px-2">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {productsData.map(pro=>{
          return(
            <TableRow className="odd:bg-bl1 even:bg-white">
              <TableCell className="text-center w-14 px-8">
                <img className="w-12 h-12" src={`http://${pro?.images[0]}`} alt="pic" />
              </TableCell>
              <TableCell className="text-center text-lg text-gray-500 px-2">{pro.name}</TableCell>
              <TableCell className="text-center text-md text-gray-500 px-2">{pro.category.name}/{pro.subcategory.name}</TableCell>
              <TableCell className="text-center">
                <div className="flex justify-around">
                  <MdDeleteForever className="text-2xl text-blue-400 hover:text-red-500 cursor-pointer transition"/>
                  <FaEdit className="text-lg text-blue-400 hover:text-yellow-500 cursor-pointer transition "/>
                </div>
              </TableCell>
            </TableRow>
          )
        })}
        
      </TableBody>
    </Table>
    </div>
    <PaginationHook counterSet={(t)=>setPageCounter(t)} pageNumber={pageCounter}/>
    </div>
  )
}
