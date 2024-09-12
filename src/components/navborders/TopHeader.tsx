import { FaCartShopping } from "react-icons/fa6";
import MainSearch from "../common/MainSearch";
import logo from "../../assets/images/logo-hanie.jpeg"
import { NavLink } from "react-router-dom";

export default function TopHeader() {
  return (
    <div className="flex border-b-[2px] border-bl2 items-center justify-center w-[95%] px-12 py-1 mx-auto gap-10">
      <NavLink to="/" className="w-[130px] cursor-pointer ml-10">
        <img src={logo} alt="logo" className="w-full h-full"/>
      </NavLink>
      <MainSearch/>
      <div className="flex justify-center items-center border-[1px] border-bl2  rounded-xl text-md text-gray-400 font-bold mr-20">
        <NavLink to="/userlogin" className="border-l-2 border-bl2  w-[80px] flex justify-center items-center py-3 cursor-pointer hover:text-white hover:bg-blue-300 rounded-r-xl transition">ورود کاربر</NavLink>
        <NavLink to="/adminlogin" className="w-[80px] flex justify-center items-center py-3 cursor-pointer hover:text-white hover:bg-blue-300 rounded-l-xl transition">ورود مدیریت</NavLink>
      </div>
      <NavLink to="/cart" className="border border-bl2  flex justify-center items-center p-2 rounded-lg text-gray-400 hover:text-blue-300 cursor-pointer transition"><FaCartShopping className="text-2xl  "/></NavLink>

    </div>
  )
}
