import { Field, Form, Formik } from "formik"
import * as Yup from "yup";

export default function AddCategoryForm() {
    const handle=(e)=>{
        console.log(e.target);
        
    }
  return (
    <Formik
    initialValues={{category:""}}
    onSubmit={handle}
    validationSchema={
        Yup.object({
            category:Yup.string().required("گروه محصول را وارد نمایید"),
        })
    }
    >
        {({errors})=>{
            return(
                <Form className="flex flex-col w-full rounded-lg  border-[1px] border-bl2 justify-center items-center py-5  px-2">

                    <label htmlFor="category" className="flex flex-col w-full gap-1">
                        <Field id="category" name="category" placeholder="گروه محصول" className="text-gray-500 rounded-md py-1 px-4 focus:outline-none border-[1px] border-bl2 focus:border-blue-200"/>
                        <span className="text-red-700 text-xs pr-4">{errors.category}</span>
                    </label>
                    <button type="submit" className="w-full mt-1 py-1 rounded-lg text-gray-500 border-1 border-[1px] border-bl2 bg-bl1 hover:bg-bl2 transition">ایجاد</button>
                </Form>
            )
        }}
    </Formik>
  )
}
