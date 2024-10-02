import useGetReactQueryHelp from "@/hooks/useGetReactQueryHelp";
import { CATEGORY_URL, SUBCATEGORY_URL } from "@/services/api";
import { useEffect } from "react";
import { ImSad2 } from "react-icons/im";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function ProductsListHeader({category,searchParams,setSearchParams}) {
  const detail=category.split("=")
  console.log("split",category);
  const id=detail[1]?.slice(0, -1)
  const url=(detail[0]=="category")?CATEGORY_URL:(detail[0]=="subcategory")?SUBCATEGORY_URL:""
  const { isLoading, data, isError, error, refetch } = useGetReactQueryHelp(
    `${url}/${id}`,"catOrSub"
  );
  // const [searchParams, setSearchParams] = useSearchParams();
  // const navigate=useNavigate()
  useEffect(() => {
    refetch()
  }, [refetch,category]);

  if(url==""){return(
    <div></div>
  )}
  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-20 text-blue-400 text-xl font-bold">
        در حال بارگزاری . . .
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex justify-center mt-20 text-red-500 items-center gap-1">
        <ImSad2 />
        <span>شما با خطا روبه رو شدید</span>
      </div>
    );
  }
  if(detail[0]=="category"){
    return (
      <div className="flex gap-2 px-2 py-4 text-sm ">
          <div className="hover:text-blue-300 transition cursor-pointer">{data.data?.category?.name}</div>
        </div>
    )
  }
  return (
    <div className="flex gap-2 px-2 py-4 text-sm ">
        <div onClick={()=>{
          setSearchParams((prev) => {
          searchParams.delete("subcategory")
          searchParams.set("category", data.data.subcategory.category._id);
          return searchParams
        });}} className="hover:text-blue-300 transition cursor-pointer">{data.data.subcategory?.category?.name}</div>
        <span>/</span>
        <div className="hover:text-blue-300 transition cursor-pointer">{data.data.subcategory?.name}</div>
      </div>
  )
}





