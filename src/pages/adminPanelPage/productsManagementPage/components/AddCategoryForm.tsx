import usePostReactQuery from "@/hooks/usePostReactQuery";
import { CATEGORY_URL } from "@/services/api";
import { Field, Form, Formik } from "formik"
import { useRef } from "react";
import * as Yup from "yup";

export default function AddCategoryForm() {

const formRef = useRef<HTMLFormElement>(null);
const {mutate}=usePostReactQuery(CATEGORY_URL)
  const handleSubmit = () => {
    if (formRef.current) {
      const formElement:HTMLFormElement|null = formRef.current;

      const formData:FormData = new FormData(formElement);
      // for (const [key, value] of formData.entries()) {
      //   console.log(`${key}: ${value}`);
      // }
      
      mutate(formData)
    }
  };

  return (
    <Formik
    initialValues={{name:""}}
    onSubmit={handleSubmit}
    validationSchema={
        Yup.object({
            name:Yup.string().required("گروه محصول را وارد نمایید"),
        })
    }
    >
        {({errors})=>{
            return(
                <Form ref={formRef} className="flex flex-col w-full rounded-lg  border-[1px] border-bl2 justify-center items-center py-5  px-2" >

                    <label htmlFor="category" className="flex flex-col w-full gap-1">
                        <Field id="category" name="name" placeholder="گروه محصول" className="text-gray-500 rounded-md py-1 px-4 focus:outline-none border-[1px] border-bl2 focus:border-blue-200"/>
                        <span className="text-red-700 text-xs pr-4">{errors.name}</span>
                    </label>
                    <button type="submit" className="w-full mt-1 py-1 rounded-lg text-gray-500 border-1 border-[1px] border-bl2 bg-bl1 hover:bg-bl2 transition">ایجاد</button>
                </Form>
            )
        }}
    </Formik>
  )
}
