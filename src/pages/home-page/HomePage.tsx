import { CATEGORY_URL } from "@/services/api";
import ProductsOfCategory from "./components/ProductsOfCategory";
import { Slider } from "./components/Slider";
import useGetReactQuery from "@/hooks/useGetReactQuery";
import { ImSad2 } from "react-icons/im";

export default function HomePage() {
  const {isLoading,data,isError,error, refetch}=useGetReactQuery(`${CATEGORY_URL}`)
  if(isLoading){
    return (
      <div className="flex flex-col py-8">
        <Slider/>
        <div className="flex justify-center items-center mt-20 text-blue-400 text-xl font-bold">در حال بارگزاری . . .</div>
      </div>
    )
  }

  if(isError){
    return (
      <div className="flex flex-col py-8">
        <Slider/>
        <div className="flex justify-center mt-20 text-red-500 items-center gap-1">
        <ImSad2 />
        <span>{error.response.data.message}</span>
      </div>
      </div>
    )
  }
  return (
    <div className="flex flex-col py-8">
      <Slider/>
      <div>
        {data.data.categories.map(cat=>{
          return(
            <ProductsOfCategory category={cat} />
          )
        })}  
      </div>
    </div>
  )
}
