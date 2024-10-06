import { Navigate, Outlet } from "react-router-dom";
import AdminPanelHeader from "../components/navborders/AdminPanelHeader";

export default function AdminPanelLayout() {
  const token=localStorage.getItem("access");
  const role=localStorage.getItem("role");

  return (
    <>
      <AdminPanelHeader/>
      {(token && role=="ADMIN")?(
        <Outlet/>
      ):(
        <Navigate to={"/adminlogin"}/>
      )}
        
    </>
  )
}
