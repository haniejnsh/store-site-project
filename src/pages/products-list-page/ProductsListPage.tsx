import { NavLink } from "react-router-dom";
import Filters from "./components/Filters";
import Sort from "./components/Sort";

export default function ProductsListPage() {
  return (
    <div className="flex flex-col w-[80%] mx-auto text-gray-500">
      <div className="flex gap-2 px-2 py-4 text-sm ">
        <NavLink to={"#"} className="hover:text-blue-300 transition">{"یخچال فریزر"}</NavLink>
        <span>/</span>
        <NavLink to={"#"} className="hover:text-blue-300 transition">{"دوقلو"}</NavLink>
      </div>
      <div className="flex">
        <div className="flex w-[25%]"><Filters/></div>
        <div className="flex w-[75%] flex-col">
          <Sort/>
        </div>
      </div>
    </div>
  )
}
