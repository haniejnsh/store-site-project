// import {Pagination,PaginationContent,PaginationEllipsis,PaginationItem,PaginationLink,PaginationNext,PaginationPrevious,} from "@/components/ui/pagination"

import { useState } from "react"
import { BsCaretLeftSquareFill,BsCaretRightSquareFill } from "react-icons/bs";


export default function PaginationHook({counterSet,pageNumber}) {
    const pg=10
    // const [counter,setCounter]=useState(5)
    // console.log("pg",counter);
    const changeCounter=(e)=>{
        console.log("change",typeof(Number(e.target.innerHTML)));
        const x=Number(e.target.innerHTML)
        counterSet(x)
        
    }
    return (
        <div className="flex justify-center py-2 items-center gap-2 text-gray-500">
            <div className="cursor-pointer text-lg text-blue-400 hover:text-blue-300 transition" onClick={()=>{if(pageNumber<pg){counterSet(p=>p+1)}}} ><BsCaretRightSquareFill /></div>
            {(pageNumber<(pg-1) && pg>2 && pageNumber!=(pg-2))?<div className="w-5 cursor-pointer hover:text-blue-400 transition" onClick={changeCounter}>{pg}</div>:<div className="w-5 bg-red-100"></div>}
            {(pageNumber==(pg-2) && pg>3)?<div className="w-5 cursor-pointer hover:text-blue-400 transition" onClick={changeCounter}>{pg}</div>:(pageNumber<(pg-2) && pg>3)?<div className="w-5">...</div>:<div className="w-5"></div>}
            {(pageNumber<(pg))?<div className="w-5 cursor-pointer hover:text-blue-400 transition" onClick={changeCounter}>{pageNumber+1}</div>:<div className="w-5"></div>}
            <div className="border-[1px] rounded-full px-2 border-bl2 bg-bl1 w-6 flex justify-center">{pageNumber}</div>
            {(pageNumber>1)?<div className="w-5 cursor-pointer hover:text-blue-400 transition" onClick={changeCounter}>{pageNumber-1}</div>:<div className="w-5"></div>}
            {(pageNumber==3 && pg>3)?<div className="w-5 cursor-pointer hover:text-blue-400 transition" onClick={changeCounter}>1</div>:(pageNumber>3 && pg>3)?<div className="w-5">...</div>:<div className="w-5"></div>}
            {(pageNumber>2  && pg>2 && pageNumber!=3)?<div className="w-5 cursor-pointer hover:text-blue-400 transition" onClick={changeCounter}>1</div>:<div className="w-5"></div>}
            <div className="cursor-pointer text-lg text-blue-400 hover:text-blue-300 transition" onClick={()=>{if(pageNumber>1){counterSet(p=>p-1)}}}><BsCaretLeftSquareFill /></div>
        </div>
    )
}
