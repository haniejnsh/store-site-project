import { NavLink } from "react-router-dom";
import LoginForm from "./components/LoginForm";

export default function UserLoginPage() {
  return (
    <div className="flex flex-col justify-center items-center w-full pt-8 gap-2">
      <LoginForm rol={"کاربر"}/>
      <p className="flex gap-1 justify-center items-center text-gray-500 text-lg">
        <span >برای ایجاد حساب</span>
        <NavLink to={"/userregister"} className="text-blue-400 font-bold hover:text-blue-300 transition cursor-pointer">اینجا</NavLink>
        <span>را کلیک کنید</span>
      </p>
    </div>
  )
}
