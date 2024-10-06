import CartProductCard from "./components/CartProductCard";
import PaymentCard from "./components/PaymentCard";

export default function CartPage() {
  return (
    <div className="w-[80%] flex flex-col mx-auto py-6">
      <div className="flex ">
        <div className="flex flex-col gap-4 w-[75%]">
          <CartProductCard/>
          <CartProductCard/>
        </div>
        <div className="flex flex-col w-[25%]">
          <PaymentCard/>
          <div>ثبت سفارش</div>
        </div>
      </div>
    </div>
  )
}
