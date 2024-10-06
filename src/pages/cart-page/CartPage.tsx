import CartProductCard from "./components/CartProductCard";
import PaymentCard from "./components/PaymentCard";

export default function CartPage() {
  return (
    <div className="w-[80%] flex flex-col mx-auto py-8">
      <div className="flex gap-4">
        <div className="flex flex-col gap-4 w-[75%]">
          <CartProductCard/>
          <CartProductCard/>
        </div>
        <div className="flex flex-col w-[25%]">
          <PaymentCard/>
          <div className="bg-blue-500 flex justify-center items-center rounded-lg text-white h-14 hover:bg-blue-400 mt-4 text-lg font-bold shadow-inner shadow-blue-200 cursor-pointer transition">ثبت سفارش</div>
        </div>
      </div>
    </div>
  )
}
