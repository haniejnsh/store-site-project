import useGetReactQueryHelp from "@/hooks/useGetReactQueryHelp";
import usePostReactQuery from "@/hooks/usePostReactQuery";
import {  CATEGORY_URL, PRODUCT_URL, SUBCATEGORY_URL } from "@/services/api";
import { Field, Form, Formik } from "formik"
import * as Yup from "yup";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { SheetClose } from "@/components/ui/sheet";
   
export default function AddProductForm() {
    
        const categories:{catId:string;catName:string;}[]=[]
        const {data:categoryData,isLoading:catLoading}=useGetReactQueryHelp(CATEGORY_URL,"pro1")
        const {mutate}=usePostReactQuery(PRODUCT_URL)
    
        if(!catLoading && categoryData){
            categoryData.data.categories?.map((cat)=>{
                const catInfo:{catId:string;catName:string;}={catId:cat._id,catName:cat.name}
            categories.push(catInfo)  
            })
        }
    

    const inputItems:{eng:string;per:string;}[]=[
        {eng:"name",per:"نام محصول"},
        {eng:"price",per:"قیمت محصول"},
        {eng:"quantity",per:"تعداد محصول"},
        {eng:"brand",per:"برند محصول"},
        {eng:"discount",per:"تخفیف محصول"}
    ]
    //////////////////////////////////////////////////////////////////////////////////
    let subcategoryItems
    let subCategories:any[]=[]
    const {data:subcategoryData,isLoading:subcatLoading}=useGetReactQueryHelp(`${SUBCATEGORY_URL}?page=1&limit=50`,"info3")
    if(!subcatLoading && subcategoryData){
        subcategoryItems=subcategoryData.data.subcategories
    }

    /////////////////////////////////////////////////////////////////////////////////

  const handleSubmit = (value,{ resetForm }) => {
    const formData = new FormData();

        // اضافه کردن داده‌های فرم به فرم دیتا
        formData.append('name', value.name);
        formData.append('price', value.price);
        formData.append('quantity', value.quantity);
        formData.append('brand', value.brand);
        formData.append('discount', value.discount);
        formData.append('description', value.description);
        formData.append('category', value.category);
        formData.append('subcategory', value.subcategory);

        // اضافه کردن فایل‌ها به فرم دیتا
        if (value.thumbnail) {
            for (let i = 0; i < value.images.length; i++) {
                formData.append('thumbnail', value.thumbnail[i]);
            }
        }
        if (value.images) {
            for (let i = 0; i < value.images.length; i++) {
                formData.append('images', value.images[i]);
            }
        }
        
        mutate(formData)
        resetForm();
  };
    return (
        <Formik
        initialValues={{name:"",category:"",subcategory:"",price:"",quantity:"",brand:"",discount:"",description:"",thambnail:"",images:null}}
        onSubmit={handleSubmit}
        validationSchema={
            Yup.object({
                subcategory:Yup.string().required("زیرگروه محصول را وارد نمایید"),
                category:Yup.string().required("گروه محصول را وارد نمایید"),
                name:Yup.string().required("نام محصول را وارد نمایید"),
                price:Yup.number().required("قیمت محصول را وارد نمایید").typeError("قیمت محصول باید عدد باشد"),
                quantity:Yup.number().required("تعداد محصول را وارد نمایید").typeError("تعداد محصول باید عدد باشد"),
                brand:Yup.string().required("برند محصول را وارد نمایید"),
                discount:Yup.number().required("تخفیف محصول را وارد نمایید").typeError("تخفیف محصول باید عدد باشد"),
                description:Yup.string().required("توضیحات محصول را وارد نمایید"),
                // thambnail:Yup.string().required("تصویر کوچک محصول را وارد نمایید"),
                // images:Yup.string().required("تصاویر محصول را وارد نمایید")
            })
        }
        >
            {({setFieldValue,errors})=>{
                return(
                    <Form  className="flex flex-col w-full rounded-lg  border-[1px] border-bl2 justify-center items-center py-5  px-2 gap-1" >
                        
                        {inputItems.map(item=>{
                            return(
                            <label htmlFor={item.eng} className="flex flex-col w-full gap1">
                                <Field id={item.eng} name={item.eng} placeholder={item.per} className="text-gray-500 rounded-md py-1 px-4 focus:outline-none border-[1px] border-bl2 focus:border-blue-200"/>
                                <span className="text-red-700 text-xs pr-4">{errors[item.eng]}</span>
                            </label>
                        )})}

                        {/* <label  htmlFor="description" className="flex flex-col w-full gap-1">
                            <Field as="textarea" id="description" name="description" placeholder="توضیحات محصول" className="text-gray-500 rounded-md py-1 px-4 focus:outline-none border-[1px] border-bl2 focus:border-blue-200"/>
                            <span className="text-red-700 text-xs pr-4">{errors.description}</span>
                        </label> */}

                        <label htmlFor="description" className="flex flex-col w-full gap-1">
                            <CKEditor
                                editor={ClassicEditor}
                                data="توضیحات محصول"
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setFieldValue("description", data); // ذخیره محتوای جدید در Formik
                                }}
                                config={{
                                    toolbar: [
                                        'heading',
                                        'bold', 'italic', 'link',
                                        'bulletedList', 'numberedList', 'blockQuote',
                                        'insertTable',
                                        'imageUpload', 'mediaEmbed',
                                        'undo', 'redo'
                                    ],
                                }}
                                // onReady={editor => {
                                //     editorRef.current = editor;
                                //   }}
                            />
                            <span className="text-red-700 text-xs pr-4">{errors.description}</span>
                        </label>

                    




                        <label htmlFor="category" className="flex flex-col w-full gap-1">
                            <Field as="select" id="category" name="category" placeholder="گروه محصول" className="text-gray-500 rounded-md py-1 px-4 focus:outline-none border-[1px] border-bl2 focus:border-blue-200" onChange={(e) => {
                                const value = e.currentTarget.value;
                                setFieldValue("category", value); 
                                subCategories=subcategoryItems.filter(item=>item.category==value)
                                }}>
                                <option disabled  value="" className="bg-bl1 border-[1px] border-bl2 hover:bg-bl2">
                                        "انتخاب گروه محصول"
                                </option>
                                {categories.map((cat) => (
                                    <option key={cat.catName} value={cat.catId} className="bg-bl1 border-[1px] border-bl2 hover:bg-bl2">
                                        {cat.catName}
                                    </option>
                                ))}
                            </Field>
                            <span className="text-red-700 text-xs pr-4">{errors.category}</span>
                        </label>

                        <label htmlFor="subcategory" className="flex flex-col w-full gap-1">
                            <Field as="select" id="subcategory" name="subcategory" placeholder="زیرگروه محصول" className="text-gray-500 rounded-md py-1 px-4 focus:outline-none border-[1px] border-bl2 focus:border-blue-200">
                                <option disabled value="" className="bg-bl1 border-[1px] border-bl2 hover:bg-bl2">
                                    "انتخاب زیرگروه محصول"
                                </option>
                                {subCategories.map((sub) => (
                                    <option key={sub.name} value={sub._id} className="bg-bl1 border-[1px] border-bl2 hover:bg-bl2">
                                        {sub.name}
                                    </option>
                                ))}
                            </Field>
                            <span className="text-red-700 text-xs pr-4">{errors.subcategory}</span>
                        </label>

                        <label  htmlFor="thumbnail" className="flex flex-col w-full gap-1">
                            <input type="file" multiple id="thumbnail" name="thumbnail" placeholder="تصویرکوچک محصول" className="text-gray-500 rounded-md py-1 px-4 focus:outline-none border-[1px] border-bl2 focus:border-blue-200" onChange={(event) => {
                                const files = event.currentTarget.files;
                                setFieldValue("thumbnail", files); 
                            }}/>
                        </label>
                        <label  htmlFor="imsges" className="flex flex-col w-full gap-1">
                            <input type="file" multiple id="images" name="images" placeholder="تصاویر محصول" className="text-gray-500 rounded-md py-1 px-4 focus:outline-none border-[1px] border-bl2 focus:border-blue-200" onChange={(event) => {
                                const files = event.currentTarget.files;
                                setFieldValue("images", files); 
                            }}/>
                        </label>
                        <SheetClose className="w-full">
                        <button type="submit" className="w-full mt-1 py-1 rounded-lg text-gray-500 border-1 border-[1px] border-bl2 bg-bl1 hover:bg-bl2 transition">ایجاد</button></SheetClose>
                    </Form>
                )
            }}
        </Formik>
      )
    }
   
    








