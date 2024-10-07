import { useNumberConverter } from "@/hooks/useNumberConverter";

export default function PaymentCard({totalPrice,totalDiscount}) {
  return (
    <div className="flex flex-col border border-bl2 items-center px-8 py-6 rounded-lg text-gray-500 shadow-md shadow-bl2">
        <h1 className="font-bold text-xl mb-1">اطلاعات پرداخت</h1>
        <p className="text-sm">(تمامی قیمت ها به تومان میباشد)</p>
        <p className="flex justify-between w-full mt-8 text-sm">
            <span>قیمت کالاها</span>
            <span>{useNumberConverter(totalPrice)}</span>
        </p>
        <p className="flex justify-between w-full mt-3 text-sm">
            <span>تخفیف</span>
            <span>{useNumberConverter(totalDiscount)}</span>
        </p>
        <p className="flex my-6 justify-between w-full w- text-lg font-bold text-blue-500 border-t pt-5 border-bl2">
            <span>قابل پرداخت</span>
            <span>{useNumberConverter(totalPrice-totalDiscount)}</span>
        </p>
        <p className="text-sm px-1 flex items-center justify-center text-center text-gray-400">هزینه ارسال و کد تخفیف در مراحل بعدی بعد از انتخاب زمان و نوع ارسال اعمال خواهد شد</p>
    </div>
  )
}
