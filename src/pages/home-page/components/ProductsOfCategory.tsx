
import {  useNavigate, useSearchParams } from "react-router-dom";
import { RiArrowLeftSFill } from "react-icons/ri";
import { ProductsSlider } from "./ProductsSlider";

export default function ProductsOfCategory({category}) {
    console.log("cat" , category);
    const [searchParams, setSearchParams] = useSearchParams();
    console.log("search param",searchParams.get("category") || "");
    const navigate=useNavigate()
  return (
    <div className="flex flex-col text-gray-500 border rounded-md border-bl2 my-6 py-3 gap-3 shadow-bl2 shadow-inner ">
        <div className="flex justify-center items-center hover:text-blue-400 transition cursor-pointer">
            <RiArrowLeftSFill className="text-3xl"/>
            <div className="w-full text-lg" onClick={()=>{
              searchParams.set("category", category._id);
              navigate({
                pathname: "/products",
                search: `?${searchParams.toString()}`,
              });
            }}>{category.name}</div>
        </div>
        <div className=" bg-white ">
            <ProductsSlider category={category}/>
        </div>
    </div>
  )
}
