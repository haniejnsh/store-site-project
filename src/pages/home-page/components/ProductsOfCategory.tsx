import useGetReactQueryHelp from "@/hooks/useGetReactQueryHelp";
import { PRODUCT_URL } from "@/services/api";
import { NavLink } from "react-router-dom";
import { RiArrowLeftSFill } from "react-icons/ri";

export default function ProductsOfCategory({category}) {
    console.log("cat" , category);
    const {isLoading,data,isError,error, refetch}=useGetReactQueryHelp(`${PRODUCT_URL}?category=${category._id}&page=1&limit=50`,category._id)
    // if(isLoading){
    //     return (
    //       <div className="flex flex-col py-8">
            
    //         <div className="flex justify-center items-center mt-20 text-blue-400 text-xl font-bold">در حال بارگزاری . . .</div>
    //       </div>
    //     )
    //   }
    
    //   if(isError){
    //     return (
    //       <div className="flex flex-col py-8">
            
    //         <div className="flex justify-center mt-20 text-red-500 items-center gap-1">
    //         <ImSad2 />
    //         <span>{error.response.data.message}</span>
    //       </div>
    //       </div>
    //     )
    //   }
    // if(!isLoading){console.log(category.name,data);}
    
  return (
    <div className="flex flex-col text-gray-500 border rounded-md border-bl2 my-3 py-2 gap-3 bg-bl1 shadow-lg shadow-bl1">
        <div className="flex justify-center items-center hover:text-blue-400 transition">
            <RiArrowLeftSFill className="text-3xl"/>
            <NavLink to={"/adminlogin"} className="w-full text-lg">{category.name}</NavLink>
        </div>
        <div className="border h-36 bg-white"></div>
    </div>
  )
}
