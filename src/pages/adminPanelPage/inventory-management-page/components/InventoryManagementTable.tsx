import {Table,TableBody,TableCaption,TableCell,TableFooter,TableHead,TableHeader,TableRow} from "@/components/ui/table"
import useGetReactQuery from "@/hooks/useGetReactQuery"
import { PRODUCT_URL } from "@/services/api"
import PaginationHook from "@/components/common/Pagination";
import { useEffect, useState } from "react";
import { ImSad2 } from "react-icons/im";

export default function InventoryManagementTable() {
  const [pageCounter,setPageCounter]=useState(1)
  const [editProductId, setEditProductId] = useState(null); 
  const [editField, setEditField] = useState(null); 
  const [editValue, setEditValue] = useState("");
  
  const {isLoading,data,isError,error, refetch}=useGetReactQuery(`${PRODUCT_URL}?page=${pageCounter}&limit=5`)
  
  useEffect(() => {
    refetch(); 
  }, [pageCounter, refetch]);


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
  
  const productsData=data.data.products
  const handleEdit = (productId, field, value) => {
    setEditProductId(productId);
    setEditField(field);
    setEditValue(value);
  };


  const handleInputChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleSave = (productId) => {
    // console.log(`مقدار جدید برای محصول ${productId}: ${editField} = ${editValue}`);
    setEditProductId(null);
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
              <TableCell className="text-centerbg-red-50 w-[15%] text-gray-500">
                {editProductId === pro._id && editField === "quantity" ? (
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
                        value={pro.quantity}
                        onClick={() => handleEdit(pro._id, "quantity", pro.quantity)}
                        className="w-full cursor-pointer hover:text-blue-300"
                    />
                  )}
              </TableCell>
              <TableCell className="text-center w-[22%] text-gray-500">
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
