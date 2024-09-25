import { CATEGORY_URL, SUBCATEGORY_URL } from "@/services/api";
import { Field, Form, Formik } from "formik"
import * as Yup from "yup";
import usePostReactQuery from "@/hooks/usePostReactQuery";
import useGetReactQueryHelp from "@/hooks/useGetReactQueryHelp";
import { SheetClose } from "@/components/ui/sheet";


export default function AddSubCategoryForm() {
    const {mutate}=usePostReactQuery(SUBCATEGORY_URL)
    const {data,isLoading}=useGetReactQueryHelp(CATEGORY_URL)
    const categories:{catId:string;catName:string;}[]=[]
    

    if(!isLoading && data){
        data.data.categories?.map((cat)=>{
        const catInfo:{catId:string;catName:string;}={catId:cat._id,catName:cat.name}
        categories.push(catInfo)  
    })}

  const handleSubmit = (value:{name:string, category: string},{resetForm}) => {
    mutate(value)
    resetForm();
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
                <Form className="flex flex-col w-full rounded-lg  border-[1px] border-bl2 justify-center items-center py-5  px-2" >

                    <label htmlFor="subcategory" className="flex flex-col w-full gap-1">
                        <Field id="subcategory" name="name" placeholder="زیرگروه محصول" className="text-gray-500 rounded-md py-1 px-4 focus:outline-none border-[1px] border-bl2 focus:border-blue-200"/>
                        <span className="text-red-700 text-xs pr-4">{errors.name}</span>
                    </label>
                    <label htmlFor="category" className="flex flex-col w-full gap-1">
                        <Field as="select" id="category" name="category" placeholder="گروه محصول" className="text-gray-500 rounded-md py-1 px-4 focus:outline-none border-[1px] border-bl2 focus:border-blue-200">
                            <option disabled value="" className="bg-bl1 border-[1px] border-bl2 hover:bg-bl2">
                                "انتخاب زیرگروه محصول"
                            </option>
                            {categories?.map((cat) => (
                                <option key={cat.catName} value={cat.catId} className="bg-bl1 border-[1px] border-bl2 hover:bg-bl2">
                                    {cat.catName}
                                </option>
                            ))}
                        </Field>
                        <span className="text-red-700 text-xs pr-4">{errors.category}</span>
                    </label>
                    <SheetClose className="w-full">
                    <button type="submit" className="w-full mt-1 py-1 rounded-lg text-gray-500 border-1 border-[1px] border-bl2 bg-bl1 hover:bg-bl2 transition">ایجاد</button></SheetClose>
                </Form>
            )
        }}
    </Formik>
  )
}
