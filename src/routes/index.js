import { createBrowserRouter}   from "react-router-dom";
import App from '../App'
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword"
import SignUp from "../pages/SignUp";
import { AdminPanel } from "../pages/AdminPanel";
import { AllUsers } from "../pages/AllUsers";
import { AllProducts } from "../pages/AllProducts";
import { CategoryProduct } from "../pages/CategoryProduct";
import { ProductDetails } from "../pages/ProductDetails";
import { Cart } from "../pages/Cart";
const router=createBrowserRouter(

     [
        {
            path:"/",
            element:<App></App>,
            children:[
                {
                    path:"",
                    element:<Home></Home>
                },
                {
                    path:"login",
                    element:<Login></Login>
                },
                {
                    path:"forgot_password",
                    element:<ForgotPassword></ForgotPassword>
                },
                {
                    path:"sign-up",
                    element:<SignUp></SignUp>
                },
                {
                    path:"category-product/:categoryName",
                    element:<CategoryProduct></CategoryProduct>

                },
                {
                    path:"admin-panel",
                    element:<AdminPanel></AdminPanel>,
                    children:[
                        {
                            path:"all-users",
                            element:<AllUsers></AllUsers>
                        },
                        {
                            path:"all-products",
                            element:<AllProducts></AllProducts>
                        }
                    ]
                },
                {
                    path:"product-details/:id",
                    element:<ProductDetails></ProductDetails>
                },
                {
                    path:"cart",
                    element:<Cart></Cart>
                }
                
            ]
        },
       
     ]
);
export default router;
