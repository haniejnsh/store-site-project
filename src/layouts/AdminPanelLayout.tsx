import { Navigate, Outlet } from "react-router-dom";
import AdminPanelHeader from "../components/navborders/AdminPanelHeader";

export default function AdminPanelLayout() {
  const token=localStorage.getItem("access");

  return (
    <>
      <AdminPanelHeader/>
      {token?(
        <Outlet/>
      ):(
        <Navigate to={"/adminlogin"}/>
      )}
        
    </>
  )
}
