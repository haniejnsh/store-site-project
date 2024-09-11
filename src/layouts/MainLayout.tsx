import { Outlet } from "react-router-dom";
import BottomHeader from "../components/navborders/BottomHeader";
import TopHeader from "../components/navborders/TopHeader";
import Footer from "../components/navborders/Footer";

export default function MainLayout() {
  return (
    <>
        <TopHeader/>
        <BottomHeader/>
        <Outlet/>
        <Footer/>
    </>
  )
}
