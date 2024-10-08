import { createBrowserRouter, RouteObject } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/home-page/HomePage";
import DetailsPage from "../pages/details-page/DatailsPage";
import CartPage from "../pages/cart-page/CartPage";
import ShippingPage from "../pages/shipping-page/ShippingPage";
import AdminPanelLayout from "../layouts/AdminPanelLayout";
import ProductsManagementPage from "../pages/adminPanelPage/productsManagementPage/ProductsManagementPage";
import OrdersManagementPage from "../pages/adminPanelPage/orders-management-page/OrdersManagementPage";
import InventoryManagementPage from "../pages/adminPanelPage/inventory-management-page/InventoryManagementPage";
import UserLoginPage from "../pages/login-page/UserLoginPage";
import AdminLoginPage from "../pages/login-page/AdminLoginPage";
import UserRegisterPage from "../pages/register-page/UserRegisterPage";
import ProductsListPage from "../pages/products-list-page/ProductsListPage";
import SuccessfulResult from "@/pages/payment-result-page/SuccessfulResult";
import UnsuccessfulResult from "@/pages/payment-result-page/UnsuccessfulResult";


const routes: RouteObject[] = ([
    {
        path:"/",
        element:<MainLayout/>,
        children:[
            {
                index:true,
                element:<HomePage/>
            },
            {
                path:"/products",
                element:<ProductsListPage/>
            },
            {
                path:"/details/:productId",
                element:<DetailsPage/>
            },
            {
                path:"/cart",
                element:<CartPage/>
            },
            {
                path:"/shipping",
                element:<ShippingPage/>
            },
            {
                path:"/successful",
                element:<SuccessfulResult/>
            },
            {
                path:"/unsuccessful",
                element:<UnsuccessfulResult/>
            }
        ]
    },
    {
        path:"/admin",
        element:<AdminPanelLayout/>,
        children:[
            {
                path:"/admin/productmanagement",
                element:<ProductsManagementPage/>
            },
            {
                path:"/admin/ordersmanagement",
                element:<OrdersManagementPage/>
            },
            {
                path:"/admin/inventorymanagement",
                element:<InventoryManagementPage/>
            }
        ]
    },
    {
        path:"/adminlogin",
        element:<AdminLoginPage/>
    },
    {
        path:"/userlogin",
        element:<UserLoginPage/>
    },
    {
        path:"/userregister",
        element:<UserRegisterPage/>
    }
])

const router=createBrowserRouter(routes)

export default router