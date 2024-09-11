import { FaAngleDown } from "react-icons/fa6";
import { LuMenu } from "react-icons/lu";

export default function BottomHeader() {
  return (
    <div className="w-full shadow-lg shadow-blue-50 border-b-[1px] border-blue-100">
    <div className="flex items-center w-[80%] mx-auto gap-10 py-3 text-gray-600">
      <div className="flex items-center gap-[5px] cursor-pointer hover:text-blue-300 transition">
        <LuMenu/>
        <span>دسته‌بندی کالاها</span>
        <FaAngleDown className="text-xs"/>
      </div>
      <div className="flex items-center cursor-pointer hover:text-blue-300 transition">تخفیف‌ها و پیشنهادها</div>
      <div className="flex items-center cursor-pointer hover:text-blue-300 transition">خدمات پس از فروش</div>
      <div className="flex items-center cursor-pointer hover:text-blue-300 transition">راهنمای خرید</div>
    </div>
    </div>
  )
}
