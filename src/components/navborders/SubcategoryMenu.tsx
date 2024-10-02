import { MenubarItem,MenubarSubContent } from "@/components/ui/menubar"
import useGetReactQueryHelp from "@/hooks/useGetReactQueryHelp";
import { SUBCATEGORY_URL } from "@/services/api";
import { useEffect } from "react";
import { ImSad2 } from "react-icons/im";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SubcategoryMenu({category}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate=useNavigate()
    const { isLoading, data, isError, error, refetch } = useGetReactQueryHelp(
        `${SUBCATEGORY_URL}?category=${category._id}&page=1&limit=25`,`${category._id}aa`
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
            <span></span>
          </div>
        );
    }
    const subData=data.data.subcategories
    console.log("subcatery data : ",data);
    
  return (
    <>
    <MenubarSubContent>
        {subData?.map(sub=>{
            return(
                <MenubarItem onClick={()=>{
                  searchParams.delete("category")
                  searchParams.set("subcategory",sub._id);
                  navigate({
                    pathname: "/products",
                    search: `?${searchParams.toString()}`,
                  });
                }}>{sub.name}</MenubarItem>
            )
        })}
    </MenubarSubContent>
    </>
  )
}
