import { Field, Form, Formik } from "formik"
import * as Yup from "yup";
import logo from "../../../assets/images/logo-hanie.jpeg"
import { NavLink } from "react-router-dom";

export default function LoginForm({rol}) {
    console.log(rol);
    
  return (
    <Formik
    initialValues={{userName:"",password:""}}
    onSubmit={
        (value)=>{
            const valueForm:{username:string;password:string;}={username:value.userName,password:value.password}
            console.log(valueForm);
            
        }
    }
    validationSchema={
        Yup.object({
            userName:Yup.string().required("نام کاربری خود را وارد نمایید"),
            password:Yup.string().required("رمز عبور خود را وارد نمایید")
        })
    }
    >
        {({errors})=>{
            return(
                <Form className="flex flex-col w-full md:w-[650px] my-4 rounded-lg shadow-lg shadow-bl2 border-[1px] border-bl2 justify-center items-center pb-10 pt-14 px-6 gap-5">
                    <NavLink to={"/"} className="w-[150px]"><img src={logo} alt="logo" className="w-full h-full" /></NavLink>
                    <h1 className="text-gray-500 text-3xl font-bold mt-3 mb-5">فرم ورود {rol}</h1>
                    <label htmlFor="userName" className="flex flex-col w-full px-12 gap-1">
                        {/* <span className="text-gray-500 pr-3">نام کاربری</span> */}
                        <Field id="userName" name="userName" placeholder="نام کاربری" className="bg-blue-50 text-gray-500 rounded-md py-2 px-4 focus:outline-none border-white border-[1px] focus:border-bl2"/>
                        <span className="text-red-700 text-sm pr-4 h-5">{errors.userName}</span>
                    </label>
                    <label htmlFor="password" className="flex flex-col w-full px-12 gap-1">
                        {/* <span>رمزعبور</span> */}
                        <Field id="password" name="password" placeholder="رمز عبور" className="bg-blue-50 text-gray-500 rounded-md py-2 px-4 focus:outline-none border-white border-[1px] focus:border-bl2"/>
                        <span className="text-red-700 text-sm pr-4 h-5">{errors.password}</span>
                    </label>
                    <button type="submit" className="w-28 py-2 rounded-lg text-gray-500 text-lg border-1 shadow-lg shadow-bl2 border-[1px] border-bl2 hover:bg-bl1 transition">ورود</button>
                </Form>
            )
        }}
    </Formik>
  )
}



