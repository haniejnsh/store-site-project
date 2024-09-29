
import { NavLink } from "react-router-dom";
import { RiArrowLeftSFill } from "react-icons/ri";
import { ProductsSlider } from "./ProductsSlider";

export default function ProductsOfCategory({category}) {
    console.log("cat" , category);
    
  return (
    <div className="flex flex-col text-gray-500 border rounded-md border-bl2 my-6 py-3 gap-3 shadow-bl2 shadow-inner ">
        <div className="flex justify-center items-center hover:text-blue-400 transition">
            <RiArrowLeftSFill className="text-3xl"/>
            <NavLink to={"/adminlogin"} className="w-full text-lg">{category.name}</NavLink>
        </div>
        <div className=" bg-white ">
            <ProductsSlider category={category}/>
        </div>
    </div>
  )
}
