import { Field, Form, Formik } from "formik"
import * as Yup from "yup";
import DatePicker from 'react-multi-date-picker';
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useState } from "react";

export default function UserInformationForm({errorInformation}) {
    const user=JSON.parse(localStorage.getItem('user'))
    const [isChecked, setIsChecked] = useState(false);
    const today = new Date();
    const handle=(values)=>{
        console.log("yeeeeessssssseeee");
        console.log('=', values.date);
        errorInformation({ isOk:true, valueSelected: values.date });
    }
    return (
        <Formik
            initialValues={{firstName:user.firstname,
                            lastName:user.lastname,
                            phone:user.phoneNumber,
                            address:user.address,
                            date:""
                        }}
            enableReinitialize={true}
            onSubmit={handle}
            validationSchema={
                Yup.object({
                    firstName:Yup.string().required("نام خود را وارد نمایید"),
                    lastName:Yup.string().required("نام خانوادگی خود را وارد نمایید"),
                    phone:Yup.string().matches(/^09[0-9]{9}$/, "شماره تلفن باید 11 رقم و با 09 شروع شود").required("شماره تلفن خود را وارد نمایید"),
                    address:Yup.string().required("آدرس خود را وارد نمایید"),
                    date: Yup.string().required("تاریخ را وارد نمایید"),
                })
            }
            >
                {({setFieldValue,errors, values,submitForm})=>{
                    const hasErrors = Object.keys(errors).length > 0;
                    return(
                        <Form className="flex flex-col w-full rounded-lg border-bl2 items-center py-5  px-4 gap-[2px] text-gray-500" >
                            
                            <h1 className="text-start w-full pr-4 font-bold text-xl mb-6">اطلاعات دریافت کننده :</h1>
                            <label htmlFor="firstName" className="flex w-full gap-2 items-center">
                                <span className="w-20 text-start">{"نام"}</span>
                                <Field id="firstName" name="firstName" placeholder={"نام"} className="text-gray-500 rounded-md py-2 px-4 focus:outline-none border-[1px] border-bl2 focus:border-blue-200 grow" onChange={(e) => {
                                    const value = e.target.value;
                                    setFieldValue("firstName", value);  
                                    setIsChecked(false);
                                    errorInformation((prev) => ({ ...prev, isOk:false }));
                                }}/>   
                            </label>
                            <span className="text-red-700 text-xs text-start w-full pr-24 mb-5">{errors.firstName}</span>
                                
                            <label htmlFor="lastName" className="flex w-full gap-2 items-center">
                                <span className="w-20 text-start">{"نام خانوادگی"}</span>
                                <Field id="lastName" name="lastName" placeholder={"نام خانوادگی"} className="text-gray-500 rounded-md py-2 px-4 focus:outline-none border-[1px] border-bl2 focus:border-blue-200 grow" onChange={(e) => {
                                    const value = e.target.value;
                                    setFieldValue("lastName", value); 
                                    setIsChecked(false);
                                    errorInformation((prev) => ({ ...prev, isOk:false }));
                                }}/>
                            </label>
                            <span className="text-red-700 text-xs text-start w-full pr-24 mb-5">{errors.lastName}</span>
                                
                            <label htmlFor="phone" className="flex w-full gap-2 items-center">
                                <span className="w-20 text-start">{"شماره تلفن"}</span>
                                <Field id="phone" name="phone" placeholder={"شماره تلفن"} className="text-gray-500 rounded-md py-2 px-4 focus:outline-none border-[1px] border-bl2 focus:border-blue-200 grow" onChange={(e) => {
                                    const value = e.target.value;
                                    setFieldValue("phone", value);  
                                    setIsChecked(false);
                                    errorInformation((prev) => ({ ...prev, isOk:false }));
                                }}/>
                            </label>
                            <span className="text-red-700 text-xs text-start w-full pr-24 mb-5">{errors.phone}</span>
                                
                            <label htmlFor="address" className="flex w-full gap-2 items-center">
                                <span className="w-20 text-start">{"آدرس"}</span>
                                <Field as="textarea" id="address" name="address" placeholder={"آدرس"} className="text-gray-500 rounded-md py-2  px-4 focus:outline-none border-[1px] border-bl2 focus:border-blue-200 grow" onChange={(e) => {
                                    const value = e.target.value;
                                    setFieldValue("address", value); 
                                    setIsChecked(false);
                                    errorInformation((prev) => ({ ...prev, isOk:false })); 
                                }}/>
                            </label>
                            <span className="text-red-700 text-xs text-start w-full pr-24 mb-5">{errors.address}</span>

                            <label htmlFor="date" className="flex w-full gap-2 items-center">
                                <span className="w-20 text-start">{"تاریخ تحویل"}</span>
                                <DatePicker
                                    value={values.date}
                                    //onChange={(date) => setFieldValue('date', date?.format?.())}
                                    onChange={(date) => {
                                        const isoDate = date?.toDate?.().toISOString();
                                        setFieldValue('date', isoDate);
                                        setIsChecked(false);
                                        errorInformation((prev) => ({ ...prev, isOk:false }));
                                    }}
                                    calendar={persian}
                                    minDate={today}
                                    locale={persian_fa}
                                    inputClass="custom-input"
                                    placeholder="تاریخ را انتخاب کنید"
                                    
                                />
                            </label>
                            <span className="text-red-700 text-xs text-start w-full pr-24 mb-[6px]">{errors.date}</span>

                            <div className="flex w-full mt-6 text-blue-400">
                                <label className="flex gap-2">
                                    <input
                                    type="checkbox"
                                    checked={isChecked}
                                    disabled={hasErrors}
                                    onChange={(e) => {
                                        setIsChecked(e.target.checked);
                                        if (!hasErrors && e.target.checked ) {
                                            submitForm()
                                            
                                        }
                                        else{
                                            errorInformation((prev) => ({ ...prev, isOk:false }));
                                        }
                                    }}
                                    />
                                    <span>اطلاعات این فرم را تایید میکنم</span>
                                  
                                </label>
                            </div>
        
                           
                        </Form>
                    )
                }}
            </Formik>
          )
}



