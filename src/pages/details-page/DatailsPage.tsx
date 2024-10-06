import useGetReactQuery from "@/hooks/useGetReactQuery";
import { PRODUCT_URL } from "@/services/api";
import { useEffect, useState } from "react";
import { ImSad2 } from "react-icons/im";
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import { HiOutlineEmojiSad,HiOutlineEmojiHappy  } from "react-icons/hi";
import { FaRegHeart,FaHeart, FaTruck } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { ProductPicturesSlider } from "./components/ProductPicturesSlider";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { useNumberConverter } from "@/hooks/useNumberConverter";
import { useDispatch,useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/redux/cart/cartSlice";

export default function DatailsPage() {
  // const loc=useLocation()
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate=useNavigate()
  const params=useParams()
  const product=params.productId.slice(1)
  console.log("param",product)
  const {isLoading,data,isError,error, refetch}=useGetReactQuery(`${PRODUCT_URL}/${product}`)
  const [orderCount,setOrderCount]=useState(0)
  const [interested,setInterested]=useState(false)
  const colors=["#021526","#686D76","#FFFFFF"]
  console.log(data);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((store) => store.cart);
  console.log("button cartitems: ",cartItems);

  useEffect(() => {
    refetch()
  }, [refetch]);

  if(isLoading){
    return (
        <div className="flex justify-center items-center my-20 text-blue-400 text-xl font-bold">در حال بارگزاری . . .</div>
    )
  }

  if(isError){
    
    return (
        <div className="flex justify-center my-20 text-red-500 items-center gap-1">
          <ImSad2 />
          <span>"متاسفانه با خطا رو به رو شدید"</span>
        </div>
    )
  }
  console.log("data",data);
  if(data.data.product){
  
  const information=data.data.product
  const newPrice=useNumberConverter(Number(information.price-(information.price*(information.discount/100))))
  return (
    <div className="flex w-[80%] mx-auto mt-8 gap-10">

      <div className="w-[40%]">
        <ProductPicturesSlider pictures={information.images}/>
      </div>

      <div className="w-[60%] flex flex-col text-gray-500">
        {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
        <p className="flex mb-2 text-sm text-gray-400 gap-1">
          <div onClick={()=>{
                              // const newParams = new URLSearchParams(searchParams); 
                              searchParams.delete("subcategory")
                              searchParams.set("category", information.category._id);
                              navigate({
                                pathname: "/products",
                                search: `?${searchParams.toString()}`,
                              });
                            }} className="hover:text-blue-300 transition cursor-pointer">{information.category.name}</div>
          <span>/</span>
          <div onClick={()=>{
                              // const newParams = new URLSearchParams(searchParams); 
                              searchParams.delete("category")
                              searchParams.set("subcategory", information.subcategory._id);
                              navigate({
                                pathname: "/products",
                                search: `?${searchParams.toString()}`,
                              });
                            }} className="hover:text-blue-300 transition cursor-pointer">{information.subcategory.name}</div>
        </p>
        {/*  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/}
        <div className="flex gap-3">
          <div className="flex flex-col w-[60%]">
            <p className="text-xl font-bold h-20  flex items-center">{information.name}</p>
            <div className="flex items-center mt-3">
              <div className="flex justify-center items-center gap-1 border border-bl2 rounded-md w-12">
                <FaStar className="text-yellow-400 text-sm"/>
                <span className="font-per">{(5).toLocaleString('fa-IR')}</span>
              </div>
              <p className="flex text-sm mr-2">35 نظر</p>
              <span className="text-xl text-gray-400 mx-6">|</span>
              <p className="text-sm hover:text-gray-400 transition cursor-pointer">به این محصول امتیاز دهید</p>
              
            </div>
            <div className="flex items-center gap-2 pr-1 mt-6">
              <span className="font-bold">برند :</span>
              <span>{information.brand}</span>
            </div>
            <div className="flex mt-6 pr-1 gap-2">
              <span className="font-bold">رنگ :</span>
              
              <div className="flex gap-2">
                {colors.map(clr=>{
                  return(
                    <span className="flex w-6 h-6 border-2 border-bl2 rounded-full" style={{ backgroundColor: clr }}></span>
                  )
                })}
              </div>
            </div>
            <div className="flex mt-3 gap-8 pl-4 justify-center grow items-end mb-6">
                {(interested)?(
                  <FaHeart onClick={()=>setInterested(false)} className="text-red-500 hover:text-red-400 transition text-2xl cursor-pointer"/>
                ):(
                  <FaRegHeart onClick={()=>setInterested(true)} className="hover:text-red-500 transition text-2xl cursor-pointer"/>
                )}
                <IoShareSocialOutline className="text-2xl cursor-pointer hover:text-gray-400 transition"/>
            </div>
          </div>
          {/* ****************************************************************************************8 */}
          <div className="flex flex-col w-[40%] border border-bl2 rounded-md px-2 py-2">
            <div className="flex flex-col justify-center rounded-md bg-bl1 px-3 h-16">
              {information.discount!=0?(
                <>
                <div className="flex justify-between gap-3 items-center">
                <p className="flex text-sm text-white bg-red-500 justify-center items-center w-9 h-5 rounded-md">
                  <span>{useNumberConverter(information.discount)}</span>
                  <span>%</span>
                </p>
                <p className="flex gap-1 items-center">
                  <span className="font-bold text-lg">{newPrice}</span>
                  <span className="w-8">تومان</span>
                </p>
              </div>
              <div className="flex justify-end">
                  <span className="line-through text-gray-400">{useNumberConverter(information.price)}</span>
                  <span className="w-9"></span>
              </div>
              </>
              ):(
                <>
                <div className="flex justify-end items-center">
                
                <p className="flex gap-1 items-center">
                  <span className="font-bold text-lg">{newPrice}</span>
                  <span className="w-8">تومان</span>
                </p>
              </div>
              </>
              )}
            </div>
            <div className="flex items-center mt-4 mb-3 px-1 gap-3">
              <MdOutlineVerifiedUser className="text-lg"/>
              <p className="font-bold">گارانتی سلامت کالا</p>
            </div>
            <div className="w-[80%] h-[1px] bg-bl2 mx-auto"></div>
            <div className="flex flex-col gap-2 mt-3 mb-4">
              <span className="font-bold pr-1">نوع ارسال :</span>
              <p className="flex justify-between px-4 items-center text-gray-400">
                <p className="flex items-center gap-[6px]">
                  < FaTruck/>
                  <span className="text-sm font-bold">عادی</span>
                </p>
                <span className="text-sm">بین  3 تا 4 روز کاری</span>
              </p>
            </div>
            <div className="w-[80%] h-[1px] bg-bl2 mx-auto"></div>
            {(information.quantity>=1)?(
                <p className="text-lg text-green-600 font-bold flex gap-1 items-center pr-5 mt-3">
                  <HiOutlineEmojiHappy className=""/>
                  <span>موجود</span>
                </p>
              ):(
                <p className="text-lg text-red-600 font-bold flex gap-1 items-center pr-3 mt-4">
                  <HiOutlineEmojiSad />
                  <span>ناموجود</span>
                </p>
              )}

            {(orderCount==0)?(
              <div onClick={()=>{setOrderCount(t=>t+1);dispatch(addToCart(information));}} className="bg-blue-500 flex justify-center items-center rounded-lg text-white h-14 hover:bg-blue-400 mt-4 text-lg font-bold shadow-inner shadow-blue-200 cursor-pointer transition">افزودن به سبد خرید</div>
            ):(
              <div className="flex justify-center items-center h-14 mt-4 gap-3">
                <div className="flex items-center w-[75%] border border-bl2 rounded-lg h-full justify-around text-xl font-bold">
                  <span onClick={()=>{if(orderCount<information.quantity){setOrderCount(t=>t+1)};dispatch(addToCart(information));}} className="cursor-pointer hover:text-blue-400 transition">+</span>
                  <span>{orderCount}</span>
                  <span onClick={()=>{if(orderCount>1){setOrderCount(t=>t-1)};dispatch(removeFromCart(information))}}  className="cursor-pointer hover:text-blue-400 transition">-</span>
                </div>
                <div onClick={()=>setOrderCount(0)} className="flex justify-center items-center w-[25%] bg-red-400 h-full rounded-lg text-2xl text-white cursor-pointer hover:bg-red-300 transition"><RiDeleteBin6Fill/></div>
              </div>
            )}

          </div>
        </div>
        {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
        <div>
          <p className="flex flex-col mt-10 gap-2">
            <span className="text-lg font-bold">توضیحات محصول :</span>
            <div dangerouslySetInnerHTML={{ __html: information.description}} />
            
          </p>
        </div>
      </div>
    </div>
  )
}
}
