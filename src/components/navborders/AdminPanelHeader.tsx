import { NavLink } from "react-router-dom"
import logo from "../../assets/images/logo-hanie.jpeg"
import { RiLogoutBoxLine } from "react-icons/ri"

export default function AdminPanelHeader() {
  return (
    <div className="flex w-full shadow-lg shadow-bl1 border-b-[1px] border-bl2">
      <div className="flex  items-center justify-start w-[80%] py-1 mx-auto gap-16">
      <NavLink to="/" className="w-[130px] cursor-pointer ml-10">
        <img src={logo} alt="logo" className="w-full h-full"/>
      </NavLink>
      <p className="text-3xl font-bold text-slate-500">صفحه مدیریت فروشگاه</p>
      <div className="flex justify-center items-center gap-12 rounded-xl text-xl text-gray-400 font-bold mr-20 grow ">
        <NavLink to="/admin/productmanagement" className="flex items-center cursor-pointer hover:text-blue-300 transition">کالاها</NavLink>
        <NavLink to="/admin/ordersmanagement" className="flex items-center cursor-pointer hover:text-blue-300 transition">موجودی و قیمت</NavLink>
        <NavLink to="/admin/inventorymanagement" className="flex items-center cursor-pointer hover:text-blue-300 transition">سفارش ها</NavLink>
      </div>
      <div className="border border-bl2  flex justify-center items-center p-2 rounded-lg text-gray-400 hover:text-blue-300 cursor-pointer transition">
        <RiLogoutBoxLine className="text-2xl"/>
      </div>
      

    </div>
    </div>
  )
}
