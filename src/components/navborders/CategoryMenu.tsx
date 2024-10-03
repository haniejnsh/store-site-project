import { Menubar,MenubarContent,MenubarMenu,MenubarSeparator,MenubarSub,MenubarSubTrigger,MenubarTrigger} from "@/components/ui/menubar"
import { LuMenu } from "react-icons/lu";
import { FaAngleDown } from "react-icons/fa6";
import useGetReactQueryHelp from "@/hooks/useGetReactQueryHelp";
import { CATEGORY_URL } from "@/services/api";
import { ImSad2 } from "react-icons/im";
import SubcategoryMenu from "./SubcategoryMenu";
import { useNavigate, useSearchParams } from "react-router-dom";
  
  export function CategoryMenu() {
    // const [idcategory,setIdCategory]=useState("")
    // console.log("use state : ",idcategory);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate=useNavigate()
    const { isLoading, data, isError, error, refetch } = useGetReactQueryHelp(
        `${CATEGORY_URL}?page=1&limit=25`,"categorymenu"
      );

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
      const categoryData=data.data?.categories
      console.log("categori data",categoryData);
    //   const [idcategory,setIdCategory]=useState("")
    //   const handle=(e,cat)=>{
    //     console.log("ok",cat);

        
    //   }
      
    return (
      <Menubar className=" border-none shadow-bl2 ">
        <MenubarMenu>
          <MenubarTrigger>
            <div className="flex items-center gap-[5px] cursor-pointer hover:text-blue-300 transition">
                <LuMenu/>
                <span>دسته‌بندی کالاها</span>
                <FaAngleDown className="text-xs"/>
            </div>
          </MenubarTrigger>
          <MenubarContent>
            {/* <MenubarItem>
              New Tab <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem> */}
            {categoryData?.map(cat=>{
                // setIdCategory(cat._id)
                return (
                    <>
                    <MenubarSeparator/>
                        <MenubarSub >
                            <MenubarSubTrigger onClick={()=>{
                              // const newParams = new URLSearchParams(searchParams); 
                              searchParams.delete("subcategory")
                              searchParams.delete("sort")
                              searchParams.set("category", cat._id);
                              navigate({
                                pathname: "/products",
                                search: `?${searchParams.toString()}`,
                              });
                            }}>{cat.name}</MenubarSubTrigger>
                            <SubcategoryMenu category={cat}/>
                        </MenubarSub>
                    <MenubarSeparator />
                    </>
                )
            })}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )
  }
  