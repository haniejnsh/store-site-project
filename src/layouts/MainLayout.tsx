import { Outlet } from "react-router-dom";
import BottomHeader from "../components/navborders/BottomHeader";
import TopHeader from "../components/navborders/TopHeader";
import Footer from "../components/navborders/Footer";

export default function MainLayout() {
  return (
    <>
      <div className="fixed z-10 flex bg-white flex-col w-full">
        <TopHeader/>
        <BottomHeader/>
      </div>
      <div className="pt-[130px]">
        <Outlet/>
        <Footer/>
      </div>
    </>
  )
}
