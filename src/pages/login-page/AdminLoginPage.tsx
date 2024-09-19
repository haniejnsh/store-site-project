import { Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";

export default function AdminLoginPage() {
  const token=localStorage.getItem("access");
  return (
    <>
    {!token?(
      <div className="flex flex-col justify-center items-center w-full pt-10 gap-2">
        <LoginForm rol={"مدیریت"}/>
      </div>
      ):(
        <Navigate to={"/admin/productmanagement"}/>
      )}
    
    </>
  )
}
