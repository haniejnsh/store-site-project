// import { NavLink, useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import Filters from "./components/Filters";
// import Sort from "./components/Sort";
// import useGetReactQueryHelp from "@/hooks/useGetReactQueryHelp";
// import { PRODUCT_URL } from "@/services/api";
// import { ImSad2 } from "react-icons/im";
// import { useEffect, useState } from "react";
// import ProductCard from "@/components/common/ProductCard";
// import ProductsListHeader from "./components/ProductsListHeader";
// import PaginationHook from "@/components/common/Pagination";

// export default function ProductsListPage() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const catOrSub=(searchParams.get("category"))?`category=${searchParams.get("category")}&`:(searchParams.get("subcategory"))?`subcategory=${searchParams.get("subcategory")}&`:"";
//   const [pageCounter, setPageCounter] = useState(1);
//   const { isLoading, data, isError, error, refetch } = useGetReactQueryHelp(
//     `${PRODUCT_URL}?${catOrSub}page=${pageCounter}&limit=4`,"productList"
//   );
//   useEffect(() => {
//     refetch()
//   }, [refetch,searchParams]);
//   console.log("search param",searchParams.get("category") || "");

  
//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center mt-20 text-blue-400 text-xl font-bold">
//         در حال بارگزاری . . .
//       </div>
//     );
//   }
//   if (isError) {
//     return (
//       <div className="flex justify-center mt-20 text-red-500 items-center gap-1">
//         <ImSad2 />
//         <span>شما با خطا روبه رو شدید</span>
//       </div>
//     );
//   }
//   console.log("dataaaa",data);
//   const productsData=data.data.products
//   console.log("dataaaa2",productsData);
  
//   return (
//     <div className="flex flex-col w-[80%] mx-auto text-gray-500">
//       <ProductsListHeader category={catOrSub} searchParams={searchParams} setSearchParams={setSearchParams}/>
//       <div className="flex gap-3">
//         <div className="flex w-[20%]"><Filters/></div>
//         <div className="flex w-[80%] flex-col gap-6">
//           <Sort/>
//           <div className="grid grid-cols-4 gap-6 px-1 ">
//             {productsData.map(pro=>{
//               return(
//                 <ProductCard product={pro}/>
//               )
//             })}
//           </div>
//           <PaginationHook 
//             counterSet={t => setPageCounter(t)}
//             pageNumber={pageCounter}
//             totalPage={data.total_pages}/>
//         </div>
//       </div>
//     </div>
//   )
// }





// import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
// import Filters from "./components/Filters";
// import Sort from "./components/Sort";
// import useGetReactQueryHelp from "@/hooks/useGetReactQueryHelp";
// import { PRODUCT_URL } from "@/services/api";
// import { ImSad2 } from "react-icons/im";
// import { useEffect, useState } from "react";
// import ProductCard from "@/components/common/ProductCard";
// import ProductsListHeader from "./components/ProductsListHeader";
// import PaginationHook from "@/components/common/Pagination";

// export default function ProductsListPage() {
//   const [searchParams, setSearchParams] = useSearchParams();
  
 
//   const initialPage = parseInt(searchParams.get("page")) || 1;
  

//   const [pageCounter, setPageCounter] = useState(initialPage);

//   const catOrSub = (searchParams.get("category")) 
//     ? `category=${searchParams.get("category")}&`
//     : (searchParams.get("subcategory"))
//     ? `subcategory=${searchParams.get("subcategory")}&`
//     : "";

//   const { isLoading, data, isError, refetch } = useGetReactQueryHelp(
//     `${PRODUCT_URL}?${catOrSub}page=${pageCounter}&limit=4`,
//     "productList"
//   );

//   useEffect(() => {
//     refetch();
//   }, [refetch, searchParams]);


//   useEffect(() => {
//     // console.log(searchParams.get("page"),"////**////",parseInt(searchParams.get("page")));
//     setSearchParams((prev) => {
//       // const newParams = new URLSearchParams(prev);
//       searchParams.set("page", pageCounter);
//       return searchParams;
//     });
//   }, [pageCounter, setSearchParams,searchParams]);



//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center mt-20 text-blue-400 text-xl font-bold">
//         در حال بارگزاری . . .
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="flex justify-center mt-20 text-red-500 items-center gap-1">
//         <ImSad2 />
//         <span>شما با خطا روبه‌رو شدید</span>
//       </div>
//     );
//   }

//   const productsData = data.data.products;

//   return (
//     <div className="flex flex-col w-[80%] mx-auto text-gray-500">
//       <ProductsListHeader category={catOrSub} searchParams={searchParams} setSearchParams={setSearchParams} />
//       <div className="flex gap-3">
//         <div className="flex w-[20%]"><Filters /></div>
//         <div className="flex w-[80%] flex-col gap-6">
//           <Sort />
//           <div className="grid grid-cols-4 gap-6 px-1 ">
//             {productsData.map(pro => (
//               <ProductCard key={pro._id} product={pro} />
//             ))}
//           </div>
//           <PaginationHook 
//             counterSet={t => setPageCounter(t)} 
//             pageNumber={pageCounter}
//             totalPage={data.total_pages}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }






import { useSearchParams } from "react-router-dom";
import Filters from "./components/Filters";
import Sort from "./components/Sort";
import useGetReactQueryHelp from "@/hooks/useGetReactQueryHelp";
import { PRODUCT_URL } from "@/services/api";
import { ImSad2 } from "react-icons/im";
import { useEffect, useState } from "react";
import ProductCard from "@/components/common/ProductCard";
import ProductsListHeader from "./components/ProductsListHeader";
import PaginationHook from "@/components/common/Pagination";

export default function ProductsListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const [pageCounter, setPageCounter] = useState(initialPage);
  const [dataShow,setDataShow]=useState([])

  const catOrSub = (searchParams.get("category")) 
    ? `category=${searchParams.get("category")}&`
    : (searchParams.get("subcategory"))
    ? `subcategory=${searchParams.get("subcategory")}&`
    : "";


  const { isLoading, data, isError, refetch } = useGetReactQueryHelp(
    `${PRODUCT_URL}?${catOrSub}sort=${(searchParams.get("sort")) || ""}&page=${pageCounter}&limit=8`,
    "productList"
  );

  useEffect(() => {
    refetch();
  }, [refetch, searchParams]);

  useEffect(() => {
    if (searchParams.get("category") || searchParams.get("subcategory") || searchParams.get("sort")) {
      setPageCounter(1);  
    }
  }, [searchParams.get("category"), searchParams.get("subcategory"),searchParams.get("sort")]);


  useEffect(() => {
    if(data){
      setDataShow(data.data.products)
    }
  }, [data]);
  
  useEffect(() => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("page", pageCounter);
      return newParams;
    });
  }, [pageCounter, setSearchParams]);

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
        <span>شما با خطا روبه‌رو شدید</span>
      </div>
    );
  }

  // const dataShow = data.data.products;
  // setDataShow(data.data.products)
  // useEffect(() => {
  //   setDataShow(data.data.products)
  // }, []);

  return (
    <div className="flex flex-col w-[80%] mx-auto text-gray-500">
      <ProductsListHeader category={catOrSub} searchParams={searchParams} setSearchParams={setSearchParams} />
      <div className="flex gap-3">
        <div className="flex w-[20%]"><Filters product={dataShow}/></div>
        <div className="flex w-[80%] flex-col gap-6">
          <Sort searchParams={searchParams} setSearchParams={setSearchParams}/>
          <div className="grid grid-cols-4 gap-6 px-1 ">
            {dataShow.map(pro => (
              <ProductCard key={pro._id} product={pro} />
            ))}
          </div>
          <div className="flex mt-6 justify-center w-full">
            <PaginationHook 
              counterSet={t => setPageCounter(t)} 
              pageNumber={pageCounter}
              totalPage={data.total_pages}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
