import useGetReactQueryHelp from "@/hooks/useGetReactQueryHelp";
import { CATEGORY_URL, PRODUCT_URL, SUBCATEGORY_URL } from "@/services/api";
import { Field, Form, Formik } from "formik"
import * as Yup from "yup";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import usePatchReactQuery from "@/hooks/usePatchReactQuery";

export default function EditProductForm({infoPro}) {

    let checkChange={name:false,category:false,subcategory:false,price:false,quantity:false,brand:false,discount:false,description:false,thumbnail:false,images:false}
    let x=[]
    let subCategories:any[]=[]
    const {data:subcategoryData,isLoading:subcatLoading}=useGetReactQueryHelp(`${SUBCATEGORY_URL}`,"info3")
    if(!subcatLoading && subcategoryData){
        x=subcategoryData.data.subcategories
        subCategories=x.filter(item=>item.category==infoPro.category._id)
    }

    

    const categories:{catId:string;catName:string;}[]=[]
    const {data:categoryData,isLoading:catLoading}=useGetReactQueryHelp(CATEGORY_URL,"pro2")
    const {mutate}=usePatchReactQuery(`${PRODUCT_URL}/${infoPro._id}`)
    

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


    const handleSubmit = (value,{ resetForm }) => {
        console.log("check ",checkChange);
        
        const formData = new FormData();
        const allInputs=["name","price","quantity","brand","discount","description","category","subcategory"]
        allInputs.map(item=>{
            if(checkChange[item]){
                formData.append(item, value[item]);
            }
        })
           
            if (value.thumbnail && checkChange.thumbnail) {
                for (let i = 0; i < value.images.length; i++) {
                    formData.append('thumbnail', value.thumbnail[i]);
                }
            }
            if (value.images && checkChange.images) {
                for (let i = 0; i < value.images.length; i++) {
                    formData.append('images', value.images[i]);
                }
            }
            let active=false
            for (let key in checkChange) {
                  if(checkChange[key]){active=true}}   
            if(active){mutate(formData)}
        
      };

      const handleChange=(act)=>{
        checkChange[act]=true;
      }




  return (
    <Formik
    initialValues={{name:infoPro.name,category:infoPro.category._id,subcategory:infoPro.subcategory._id,price:infoPro.price,quantity:infoPro.quantity,brand:infoPro.brand,discount:infoPro.discount,description:infoPro.description,thambnail:"",images:infoPro.images}}
    // enableReinitialize
    enableReinitialize={true}
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
                <Form className="flex flex-col w-full rounded-lg  border-[1px] border-bl2 justify-center items-center py-5  px-2 gap-[2px]" >
                    <div className="max-w-full max-h-[440px] overflow-y-scroll pb-2">
                    {inputItems.map(item=>{
                        return(<>
                        <label htmlFor={item.eng} className="flex w-full gap-2 items-center">
                            <span className="w-20 text-start">{item.per}</span>
                            <Field id={item.eng} name={item.eng} placeholder={item.per} className="text-gray-500 rounded-md py-1 px-4 focus:outline-none border-[1px] border-bl2 focus:border-blue-200 grow" onChange={(e) => {
                                const value = e.target.value;
                                setFieldValue(item.eng, value);  // مقدار جدید را در فرمیک ثبت کن
                                handleChange(item.eng);  // اینجا تغییرات را ثبت کن
                            }}/>
                            
                        </label>
                        <span className="text-red-700 text-xs text-start w-full pr-24 mb-[6px]">{errors[item.eng]}</span></>
                    )})}

                    <label htmlFor="description" className="flex flex-col w-full gap-1">
                        <span className="w-36 text-start">توضیحات محصول</span>
                        <CKEditor
                            editor={ClassicEditor}
                            data={infoPro.description}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setFieldValue("description", data); // ذخیره محتوای جدید در Formik
                                handleChange("description")
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
                        <span className="text-red-700 text-xs pr-4 text-start">{errors.description}</span>
                    </label>

                




                    <label htmlFor="category" className="flex w-full gap-[2px] items-center">
                        <span className="w-20 text-start">گروه محصول</span>
                        <Field as="select" id="category" name="category" placeholder="گروه محصول" className="text-gray-500 rounded-md py-1 px-4 focus:outline-none border-[1px] border-bl2 focus:border-blue-200 grow" onChange={(e) => {
                            const value = e.currentTarget.value;
                            setFieldValue("category", value);
                            subCategories=x.filter(item=>item.category==value)
                            handleChange("category")
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
                        
                    </label>
                    <span className="text-red-700 text-xs text-start w-full pr-24 mb-[6px]">{errors.category}</span>

                    <label htmlFor="subcategory" className="flex w-full gap-[2px] items-center">
                        <span className="w-[81px] text-start">زیرگروه محصول</span>
                        <Field as="select" id="subcategory" name="subcategory" placeholder="زیرگروه محصول" className="text-gray-500 rounded-md py-1 px-4 focus:outline-none border-[1px] border-bl2 focus:border-blue-200 grow" onChange={(e) => {
                            const value = e.currentTarget.value;
                            setFieldValue("subcategory", value); 
                            handleChange("subcategory")
                            }}>
                            <option disabled value="" className="bg-bl1 border-[1px] border-bl2 hover:bg-bl2">
                                "انتخاب زیرگروه محصول"
                            </option>
                            {subCategories?.map((sub) => (
                                <option key={sub.name} value={sub._id} className="bg-bl1 border-[1px] border-bl2 hover:bg-bl2">
                                    {sub.name}
                                </option>
                            ))}
                        </Field>
                        
                    </label>
                    <span className="text-red-700 text-xs text-start w-full pr-24 mb-[6px]">{errors.subcategory}</span>

                    <label  htmlFor="thumbnail" className="flex items-center w-full gap-[2px] bp-2">
                        <span className="w-[115px] text-start">تصاویر کوچک محصول</span>
                        <input type="file" multiple id="thumbnail" name="thumbnail" placeholder="تصویرکوچک محصول" className="text-gray-500 rounded-md py-1 px-4 focus:outline-none border-[1px] border-bl2 focus:border-blue-200" onChange={(event) => {
                            const files = event.currentTarget.files;
                            setFieldValue("thumbnail", files); 
                            handleChange("thumbnail")
                        }}/>
                    </label>
                    <label  htmlFor="imsges" className="flex w-full gap-1 items-center">
                        <span className="w-[115px] text-start">تصاویر  محصول</span>
                        <input type="file" multiple id="images" name="images" placeholder="تصاویر محصول" className="text-gray-500 rounded-md py-1 px-4 focus:outline-none border-[1px] border-bl2 focus:border-blue-200" onChange={(event) => {
                            const files = event.currentTarget.files;
                            setFieldValue("images", files); 
                            handleChange("images")
                        }}/>
                    </label>
                    </div>
                    <div className="flex gap-6 mt-6">
                    
                        <AlertDialogAction type="submit" className="bg-blue-100 text-gray-500 w-20 border-blue-200 hover:bg-blue-300 border transition" >ویرایش</AlertDialogAction>
                        <AlertDialogCancel className="bg-blue-100 text-gray-500 w-20 border-blue-200 hover:bg-blue-300 border transition">انصراف</AlertDialogCancel>
                    </div>
                </Form>
            )
        }}
    </Formik>
  )
}
