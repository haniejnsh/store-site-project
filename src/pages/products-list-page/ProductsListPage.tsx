import { NavLink } from "react-router-dom";
import Filters from "./components/Filters";
import Sort from "./components/Sort";
import useGetReactQueryHelp from "@/hooks/useGetReactQueryHelp";
import { PRODUCT_URL } from "@/services/api";
import { ImSad2 } from "react-icons/im";
import { useEffect } from "react";
import ProductCard from "@/components/common/ProductCard";

export default function ProductsListPage() {
  const { isLoading, data, isError, error, refetch } = useGetReactQueryHelp(
    `${PRODUCT_URL}?page=1&limit=25`,"productList"
  );
  useEffect(() => {
    refetch()
  }, [refetch]);
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
  console.log("dataaaa",data);
  const productsData=data.data.products
  console.log("dataaaa2",productsData);
  
  return (
    <div className="flex flex-col w-[80%] mx-auto text-gray-500">
      <div className="flex gap-2 px-2 py-4 text-sm ">
        <NavLink to={"#"} className="hover:text-blue-300 transition">{"یخچال فریزر"}</NavLink>
        <span>/</span>
        <NavLink to={"#"} className="hover:text-blue-300 transition">{"دوقلو"}</NavLink>
      </div>
      <div className="flex gap-3">
        <div className="flex w-[20%]"><Filters/></div>
        <div className="flex w-[80%] flex-col gap-6">
          <Sort/>
          <div className="grid grid-cols-4 gap-6 px-1 ">
            {productsData.map(pro=>{
              return(
                <ProductCard product={pro}/>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
