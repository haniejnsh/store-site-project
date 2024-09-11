import { FaCartShopping } from "react-icons/fa6";
import MainSearch from "../common/MainSearch";
import logo from "../../assets/images/logo-hanie.jpeg"

export default function TopHeader() {
  return (
    <div className="flex border-b-[2px] border-blue-100  items-center justify-center w-[95%] px-12 py-1 mx-auto gap-10">
      <div className="w-[130px] cursor-pointer ml-10">
        <img src={logo} alt="logo" className="w-full h-full"/>
      </div>
      <MainSearch/>
      <div className="flex justify-center items-center border-[1px] border-blue-100  rounded-xl text-md text-gray-400 font-bold mr-20">
        <div className="border-l-2 border-blue-100  w-[80px] flex justify-center items-center py-3 cursor-pointer hover:text-white hover:bg-blue-300 rounded-r-xl transition">ورود کاربر</div>
        <div className="w-[80px] flex justify-center items-center py-3 cursor-pointer hover:text-white hover:bg-blue-300 rounded-l-xl transition">ورود مدیریت</div>
      </div>
      <div className="border border-blue-100  flex justify-center items-center p-2 rounded-lg text-gray-400 hover:text-blue-300 cursor-pointer transition"><FaCartShopping className="text-2xl  "/></div>

    </div>
  )
}
