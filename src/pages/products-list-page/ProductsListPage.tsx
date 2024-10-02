import { NavLink } from "react-router-dom";
import Filters from "./components/Filters";

export default function ProductsListPage() {
  return (
    <div className="flex flex-col w-[80%] mx-auto">
      <div>
        <NavLink to={"#"}>{"یخچال فریزر"}</NavLink>
        <span>/</span>
        <NavLink to={"#"}>{"دوقلو"}</NavLink>
      </div>
      <div className="flex">
        <div className="flex w-[25%]"><Filters/></div>
        <div className="flex w-[75%]"></div>
      </div>
    </div>
  )
}
