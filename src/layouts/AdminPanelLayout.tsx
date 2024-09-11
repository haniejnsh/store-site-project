import { Outlet } from "react-router-dom";
import AdminPanelHeader from "../components/navborders/AdminPanelHeader";

export default function AdminPanelLayout() {
  return (
    <>
        <AdminPanelHeader/>
        <Outlet/>
    </>
  )
}
