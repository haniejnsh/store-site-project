// import useGetReactQuery from "@/hooks/useGetReactQuery";
import useGetReactQueryHelp from "@/hooks/useGetReactQueryHelp";
// import useGetReactQueryHelp from "@/hooks/useGetReactQueryHelp";
import usePostReactQuery from "@/hooks/usePostReactQuery";
import { BASE_URL, CATEGORY_URL, PRODUCT_URL, SUBCATEGORY_URL } from "@/services/api";
import axios from "axios";
import { Field, Form, Formik } from "formik"
import { useEffect,useRef,useState  } from "react";
import * as Yup from "yup";
// // import usePostReactQuery from "@/hooks/usePostReactQuery";
// map    
export default function AddProductForm() {
    
        const categories:{catId:string;catName:string;}[]=[]
        const {data:categoryData,isLoading:catLoading}=useGetReactQueryHelp(CATEGORY_URL)
        // const {data:subCategoryData,isLoading:subLoading}=useGetReactQueryHelp(SUBCATEGORY_URL)
        const {mutate}=usePostReactQuery(PRODUCT_URL)
        const formRef = useRef<HTMLFormElement>(null);
    
        if(!catLoading && categoryData){
            console.log("category",categoryData);
            
            categoryData.data.categories?.map((cat)=>{
                const catInfo:{catId:string;catName:string;}={catId:cat._id,catName:cat.name}
            categories.push(catInfo)  
            })
        }

        // if(!subLoading){
        //     console.log("subcategory",subCategoryData); 
        // }
    

    const inputItems:{eng:string;per:string;}[]=[
        {eng:"name",per:"نام محصول"},
        {eng:"price",per:"قیمت محصول"},
        {eng:"quantity",per:"تعداد محصول"},
        {eng:"brand",per:"برند محصول"},
        {eng:"discount",per:"تخفیف محصول"}
    ]
    //////////////////////////////////////////////////////////////////////////////////
    const [x,setX]=useState()
    let subCategories:any[]=[]
    console.log("x",x);
    useEffect(() => {
        const getData = async () => {
          try {
            const res = await axios.get(`${BASE_URL}${SUBCATEGORY_URL}?page=1&limit=30`);
            console.log("okk",res.data);
            setX(res.data.data.subcategories)
          } catch (e) {
            console.log(e);
          } 
        };
        getData();
      }, []); 

    /////////////////////////////////////////////////////////////////////////////////

  const handleSubmit = (value) => {
    console.log("vared shode",value);
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
                    <Form ref={formRef} className="flex flex-col w-full rounded-lg  border-[1px] border-bl2 justify-center items-center py-5  px-2 gap-1" >
                        
                        {inputItems.map(item=>{
                            return(
                            <label htmlFor={item.eng} className="flex flex-col w-full gap1">
                                <Field id={item.eng} name={item.eng} placeholder={item.per} className="text-gray-500 rounded-md py-1 px-4 focus:outline-none border-[1px] border-bl2 focus:border-blue-200"/>
                                <span className="text-red-700 text-xs pr-4">{errors[item.eng]}</span>
                            </label>
                        )})}

                        <label  htmlFor="description" className="flex flex-col w-full gap-1">
                            <Field as="textarea" id="description" name="description" placeholder="توضیحات محصول" className="text-gray-500 rounded-md py-1 px-4 focus:outline-none border-[1px] border-bl2 focus:border-blue-200"/>
                            <span className="text-red-700 text-xs pr-4">{errors.description}</span>
                        </label>

                        <label htmlFor="category" className="flex flex-col w-full gap-1">
                            <Field as="select" id="category" name="category" placeholder="گروه محصول" className="text-gray-500 rounded-md py-1 px-4 focus:outline-none border-[1px] border-bl2 focus:border-blue-200" onChange={(e) => {
                                const value = e.currentTarget.value;
                                setFieldValue("category", value); 
                                console.log("دسته انتخاب شده:", value);
                                subCategories=x.filter(item=>item.category==value)
                                console.log("y",subcategories);
                                // setX(y)
                                console.log("x2",x);
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
                                setFieldValue("thumbnail", files); // اضافه کردن فایل‌ها به فرم
                            }}/>
                            {/* <span className="text-red-700 text-xs pr-4">{errors.thambnail}</span> */}
                        </label>
                        <label  htmlFor="imsges" className="flex flex-col w-full gap-1">
                            <input type="file" multiple id="images" name="images" placeholder="تصاویر محصول" className="text-gray-500 rounded-md py-1 px-4 focus:outline-none border-[1px] border-bl2 focus:border-blue-200" onChange={(event) => {
                                const files = event.currentTarget.files;
                                setFieldValue("images", files); // اضافه کردن فایل‌ها به فرم
                            }}/>
                            {/* <span className="text-red-700 text-xs pr-4">{errors.images}</span> */}
                        </label>
                        

                        <button type="submit" className="w-full mt-1 py-1 rounded-lg text-gray-500 border-1 border-[1px] border-bl2 bg-bl1 hover:bg-bl2 transition">ایجاد</button>
                    </Form>
                )
            }}
        </Formik>
      )
    }
   
    








