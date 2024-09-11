import { createBrowserRouter, RouteObject } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/homePage/HomePage";
import CategoryPage from "../pages/categoryPage/CategoryPage";
import DetailsPage from "../pages/detailsPage/DatailsPage";
import CartPage from "../pages/cartPage/CartPage";
import ShippingPage from "../pages/shippingPage/ShippingPage";
import ResultPage from "../pages/resultPage/ResultPage";
import AdminPanelLayout from "../layouts/AdminPanelLayout";
import ProductsManagmentPage from "../pages/adminPanelPage/productsManagementPage/ProductsManagmentPage";
import OrdersManagementPage from "../pages/adminPanelPage/ordersManagementPage/OrdersManagementPage";
import InventoryManagementPage from "../pages/adminPanelPage/inventoryManagementPage/InventoryManagementPage";
import UserLoginPage from "../pages/loginPage/UserLoginPage";
import AdminLoginPage from "../pages/loginPage/AdminLoginPage";
import RegisterPage from "../pages/registerPage/RegisterPage";


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
                path:"/category/:categoryId",
                element:<CategoryPage/>
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
                path:"/result",
                element:<ResultPage/>
            }
        ]
    },
    {
        path:"/admin",
        element:<AdminPanelLayout/>,
        children:[
            {
                path:"/admin/productmanagement",
                element:<ProductsManagmentPage/>
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
        element:<RegisterPage/>
    }
])

const router=createBrowserRouter(routes)

export default router