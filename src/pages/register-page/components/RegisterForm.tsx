import { Field, Form, Formik } from "formik"
import * as Yup from "yup";
import logo from "../../../assets/images/logo-hanie.jpeg"
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { BsEyeSlashFill } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";
import useRegister from "@/hooks/useRegister";
// import { ifError } from "assert";

export default function RegisterForm({rol}) {
    const {mutate,isError, error }=useRegister()
    const [hidden,setHidden]=useState("password")
    const [hidden2,setHidden2]=useState("password")
    // if(isError){console.log("error login : ",error);
    // }
  return (
    <Formik
    initialValues={{firstName:"",lastName:"",phone:"",address:"",userName:"",password:""}}
    onSubmit={
        (value)=>{
            const valueForm:{
                firstname:string;
                lastname:string;
                username:string;
                password:string;
                phoneNumber:string;
                address:string;
            }={firstname:value.firstName,
                lastname:value.lastName,
                username:value.userName,
                password:value.password,
                phoneNumber:value.phone,
                address:value.address}
            mutate(valueForm)
        }
    }
    validationSchema={
        Yup.object({
            firstName:Yup.string().required("نام خود را وارد نمایید"),
            lastName:Yup.string().required("نام خانوادگی خود را وارد نمایید"),
            userName:Yup.string().required("نام کاربری خود را وارد نمایید"),
            password:Yup.string().min(8, 'رمز عبور باید حداقل 8 کاراکتر باشد').required("رمز عبور خود را وارد نمایید"),
            password2:Yup.string().oneOf([Yup.ref('password'), null], 'رمز عبور و تأیید آن باید یکسان باشند').required("تایید رمز عبور خود را وارد نمایید"),
            phone:Yup.string().matches(/^09[0-9]{9}$/, "شماره تلفن باید 11 رقم و با 09 شروع شود").required("شماره تلفن خود را وارد نمایید"),
            address:Yup.string().required("آدرس خود را وارد نمایید")
        })
    }
    validateOnChange={false} 
    validateOnBlur={false}
    >
        {({errors})=>{
            return(
                <Form className="flex flex-col w-full md:w-[650px] my-4 rounded-lg shadow-lg shadow-bl2 border-[1px] border-bl2 justify-center items-center pb-7 pt-14 px-6">
                    <NavLink to={"/"} className="w-[150px] mb-4"><img src={logo} alt="logo" className="w-full h-full" /></NavLink>
                    <h1 className="text-gray-500 text-3xl font-bold mt-3 mb-14">فرم ثبت نام {rol}</h1>
                    <label htmlFor="firstName" className="flex flex-col w-full px-12 gap-1 mb-4">
                        {/* <span className="text-gray-500 pr-3">نام کاربری</span> */}
                        <Field id="firstName" name="firstName" placeholder="نام" className="bg-blue-50 text-gray-500 rounded-md py-2 px-4 focus:outline-none border-white border-[1px] focus:border-bl2"/>
                        <span className="text-red-700 text-sm pr-4 h-5">{errors.firstName}</span>
                    </label>
                    <label htmlFor="lastName" className="flex flex-col w-full px-12 gap-1 mb-4">
                        {/* <span className="text-gray-500 pr-3">نام کاربری</span> */}
                        <Field id="lastName" name="lastName" placeholder="نام خانوادگی" className="bg-blue-50 text-gray-500 rounded-md py-2 px-4 focus:outline-none border-white border-[1px] focus:border-bl2"/>
                        <span className="text-red-700 text-sm pr-4 h-5">{errors.lastName}</span>
                    </label>
                    <label htmlFor="userName" className="flex flex-col w-full px-12 gap-1">
                        {/* <span className="text-gray-500 pr-3">نام کاربری</span> */}
                        <Field id="userName" name="userName" placeholder="نام کاربری" className="bg-blue-50 text-gray-500 rounded-md py-2 px-4 focus:outline-none border-white border-[1px] focus:border-bl2"/>
                        <span className="text-red-700 text-sm pr-4 h-5">{errors.userName}</span>
                    </label>
                    <label htmlFor="password" className="flex flex-col w-full px-12 gap-1">
                        {(hidden=="password")?<IoEyeSharp onClick={()=>setHidden("text")} className="relative -left-[470px] top-8 text-gray-500 cursor-pointer transition"/>:<BsEyeSlashFill onClick={()=>setHidden("password")} className="relative -left-[470px] top-8 l text-gray-500 cursor-pointer transition"/>}
                        <Field type={hidden} id="password" name="password" placeholder="رمز عبور" className="bg-blue-50 text-gray-500 rounded-md py-2 px-4 focus:outline-none border-white border-[1px] focus:border-bl2"/>
                        <span className="text-red-700 text-sm pr-4 h-5">{errors.password}</span>
                    </label>
                    <label htmlFor="password2" className="flex flex-col w-full px-12 gap-1 mb-4">
                        {(hidden2=="password")?<IoEyeSharp onClick={()=>setHidden2("text")} className="relative -left-[470px] top-8 l text-gray-500 cursor-pointer transition"/>:<BsEyeSlashFill onClick={()=>setHidden2("password")} className="relative -left-[470px] top-8 l text-gray-500 cursor-pointer transition"/>}
                        <Field type={hidden2} id="password2" name="password2" placeholder="تکرار رمز عبور" className="bg-blue-50 text-gray-500 rounded-md py-2 px-4 focus:outline-none border-white border-[1px] focus:border-bl2"/>
                        <span className="text-red-700 text-sm pr-4 h-5">{errors.password2}</span>
                    </label>
                    <label htmlFor="phone" className="flex flex-col w-full px-12 gap-1 mb-4">
                        {/* <span className="text-gray-500 pr-3">نام کاربری</span> */}
                        <Field id="phone" name="phone" placeholder="شماره تلفن" className="bg-blue-50 text-gray-500 rounded-md py-2 px-4 focus:outline-none border-white border-[1px] focus:border-bl2"/>
                        <span className="text-red-700 text-sm pr-4 h-5">{errors.phone}</span>
                    </label>
                    <label htmlFor="address" className="flex flex-col w-full px-12 gap-1">
                        {/* <span className="text-gray-500 pr-3">نام کاربری</span> */}
                        <Field as="textarea" id="address" name="address" placeholder="آدرس" className="bg-blue-50 text-gray-500 rounded-md py-2 px-4 focus:outline-none border-white border-[1px] focus:border-bl2 h-28"/>
                        <span className="text-red-700 text-sm pr-4 h-5">{errors.address}</span>
                    </label>
                    <button type="submit" className="w-28 mt-6 mb-6 py-2 rounded-lg text-gray-500 text-lg border-1 shadow-lg shadow-bl2 border-[1px] border-bl2 hover:bg-bl1 transition">ثبت نام</button>
                    {(isError)?(<span className="text-red-700 text-[13px] h-5">{error.response.data.message}</span>):(<span className=" h-5"></span>)}
                </Form>
            )
        }}
    </Formik>
  )
}




