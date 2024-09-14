// import usePostCategory from "@/hooks/usePostReactQuery";
import useGetReactQuery from "@/hooks/useGetReactQuery";
import { CATEGORY_URL } from "@/services/api";
import { Field, Form, Formik } from "formik"
import { useRef } from "react";
import * as Yup from "yup";


export default function AddSubCategoryForm() {
    const {data,isLoading}=useGetReactQuery(CATEGORY_URL)
    const categories:{catId:string;catName:string;}[]=[]
    if(!isLoading){
        // console.log("get data",data.data.categories);
        
        data.data.categories.map((cat)=>{
        // console.log(cat.name,cat._id);
        const catInfo:{catId:string;catName:string;}={catId:cat._id,catName:cat.name}
        categories.push(catInfo)
        
        
   })
//    console.log("obj",categories);
    }
   
   
    // useEffect(()=>{

    // })
const formRef = useRef<HTMLFormElement>(null);
// const {mutate}=usePostCategory()
  const handleSubmit = () => {
    if (formRef.current) {
      const formElement:HTMLFormElement|null = formRef.current;
      console.log("Form Element:", formElement);
      console.log("Form Element2:", formRef);

      const formData:FormData = new FormData(formElement);
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      
    //   mutate(formData)
    }
  };

  return (
    <Formik
    initialValues={{name:"",category:""}}
    onSubmit={handleSubmit}
    validationSchema={
        Yup.object({
            name:Yup.string().required("زیرگروه محصول را وارد نمایید"),
            category:Yup.string().required("گروه محصول را وارد نمایید"),
        })
    }
    >
        {({errors})=>{
            return(
                <Form ref={formRef} className="flex flex-col w-full rounded-lg  border-[1px] border-bl2 justify-center items-center py-5  px-2" >

                    <label htmlFor="subcategory" className="flex flex-col w-full gap-1">
                        <Field id="subcategory" name="name" placeholder="زیرگروه محصول" className="text-gray-500 rounded-md py-1 px-4 focus:outline-none border-[1px] border-bl2 focus:border-blue-200"/>
                        <span className="text-red-700 text-xs pr-4">{errors.name}</span>
                    </label>
                    <label htmlFor="category" className="flex flex-col w-full gap-1">
                        <Field as="select" id="category" name="category" placeholder="گروه محصول" className="text-gray-500 rounded-md py-1 px-4 focus:outline-none border-[1px] border-bl2 focus:border-blue-200">
                            {categories.map((cat) => (
                                <option key={cat.catName} value={cat.catId}>
                                    {cat.catName}
                                </option>
                            ))}
                        </Field>
                        <span className="text-red-700 text-xs pr-4">{errors.category}</span>
                    </label>
                    <button type="submit" className="w-full mt-1 py-1 rounded-lg text-gray-500 border-1 border-[1px] border-bl2 bg-bl1 hover:bg-bl2 transition">ایجاد</button>
                </Form>
            )
        }}
    </Formik>
  )
}
