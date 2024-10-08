import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { useNumberConverter } from "@/hooks/useNumberConverter";
import { useState } from "react";
import { MdLocalShipping } from "react-icons/md";
import { IoMdJet } from "react-icons/io";

export default function OrderInformation({errorOrder}) {
    const { cartItems,totalPrice,totalDiscount } = useSelector((store) => store.cart);
    const [selectedTransport, setSelectedTransport] = useState(null);
    const [transportPrice, setTransportPrice] = useState(0);
    const [offCode,setOffCode]=useState("")
    let offPrice=(offCode==="hanie")?(totalPrice*(2/100)):0
  const handleChange = (transport) => {
    setSelectedTransport(transport);
    if (transport === 'transport1') {
        setTransportPrice(100000)
    } else if (transport === 'transport2') {
        setTransportPrice(200000)
    }
    errorOrder(false)
  };
  return (
    <div className="flex flex-col items-center border rounded-lg border-bl2 px-6 py-6 shadow-lg shadow-bl2 w-full text-gray-500">
        <h1 className="text-xl font-bold">اطلاعات سفارش</h1>
        <h2 className="w-full text-right font-bold pr-2 mt-8 mb-2">سفارشات :</h2>
        <div className="flex flex-col w-full gap-2 bg-bl1 px-3 py-2 rounded-lg">
            {cartItems.map(cart=>{
                return(
                    <div className="flex justify-between">
                        <p>{cart.name}</p>
                        <p className="flex items-center gap-1">
                            <span><RxCross2 className="text-sm"/></span>
                            <span >{cart.qty}</span>
                        </p>
                    </div>
                )
            })}
        </div>
        {/* <p className="flex justify-between w-full mt-6 px-4">
            <span>قیمت کالاها</span>
            <span>{useNumberConverter(totalPrice)}</span>
        </p>
        <p className="flex justify-between w-full mt-3 px-4">
            <span>تخفیف</span>
            <span>{useNumberConverter(totalDiscount)}</span>
        </p> */}
        <h2 className="w-full text-right font-bold pr-2 mt-8 mb-2 border-t border-bl2 pt-4">ارسال :</h2>
        <div className="flex flex-col justify-between w-full mt-2 pr-4 pl-8">
            <div className="flex justify-between">
                <label htmlFor="transport1" className="flex gap-3 items-center">
                    <MdLocalShipping className="text-lg"/>
                    <span className="font-bold">ارسال عادی</span>
                    <span className="text-sm">({useNumberConverter(100000)} تومان)</span>
                </label>
                <input
                    type="radio"
                    id="transport1"
                    name="priceTransport"
                    checked={selectedTransport==='transport1'}
                    onChange={() => handleChange('transport1')}
                />
            </div>

            <div className="flex justify-between">
                <label htmlFor="transport2" className="flex gap-2 items-center">
                    <IoMdJet className="text-lg"/>
                    <span className="font-bold">ارسال پیشرفته</span>
                    <span className="text-sm">({useNumberConverter(200000)} تومان)</span>
                </label>
                <input
                    type="radio"
                    id="transport2"
                    name="priceTransport"
                    checked={selectedTransport==='transport2'}
                    onChange={() => handleChange('transport2')}
                />
            </div>
        </div>
        <h2 className="w-full text-right font-bold pr-2 mt-8 mb-2 border-t border-bl2 pt-4">کد تخفیف :</h2>
        
        {(offCode=="")?(
            <input type="text" placeholder="کد تخفیف را وارد نمایید" onBlur={(e)=>{setOffCode(e.target.value);e.target.value=""}}  className=" w-[70%] h-10 px-2 rounded-lg border-2 border-bl2 focus:outline-none focus:border-blue-200 text-blue-500 placeholder:text-blue-300 placeholder:text-sm text-sm"/>
        ):(offCode=="hanie")?(
            <div onClick={()=>setOffCode("")} className="flex justify-center items-center bg-green-100 w-[70%] h-10 px-2 rounded-lg border-2 border-green-200 focus:outline-none focus:border-green-300 text-green-500 font-bold cursor-pointer">کد تخفیف اعمال شد</div>
        ):(
            <input type="text" placeholder="کد تخفیف نادرست میباشد" onBlur={(e)=>{setOffCode(e.target.value);e.target.value=""}}  className=" w-[70%] h-10 px-2 rounded-lg border-2 border-red-200 focus:outline-none focus:border-red-300 text-blue-500 placeholder:text-red-300 placeholder:text-sm text-sm"/>
        )}
        <h2 className="w-full text-right font-bold pr-2 mt-8 mb-2 border-t border-bl2 pt-4">صورت حساب نهایی :</h2>
        <div className="flex flex-col w-[70%] mb-4">
            <p className="flex justify-between w-full mt-6 px-4">
                <span>قیمت کالاها</span>
                <span>{useNumberConverter(totalPrice)}</span>
            </p> 
            <p className="flex justify-between w-full mt-3 px-4">
                <span>تخفیف کالا</span>
                <span>{useNumberConverter(totalDiscount)}</span>
            </p>
            <p className="flex justify-between w-full mt-6 px-4">
                <span>کد تخفیف</span>
                <span>{useNumberConverter(offPrice)}</span>
            </p>
            <p className="flex items-center justify-between w-full mt-6 px-4 text-green-300">
                <span>مجموع سود شما</span>
                <span>{useNumberConverter(offPrice+totalDiscount)}</span>
            </p>
            <p className="flex items-center justify-between w-full mt-6 px-4 ">
                <span>مجموع اقلام پس از تخفیف</span>
                <span>{useNumberConverter(totalPrice-(offPrice+totalDiscount))}</span>
            </p>
            <p className="flex justify-between w-full mt-6 px-4">
                <span>هزینه ارسال</span>
                <span>{useNumberConverter(transportPrice)}</span>
            </p>
            <p className="flex justify-between w-full mt-6 px-4 text-blue-500 font-bold bg-bl1 py-2 rounded-lg">
                <span>مبلغ قابل پرداخت</span>
                <span>{useNumberConverter((totalPrice+transportPrice)-(offPrice+totalDiscount))}</span>
            </p> 
        </div>

    </div>
  )
}
