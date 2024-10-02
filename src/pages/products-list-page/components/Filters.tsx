import {Accordion,AccordionContent,AccordionItem,AccordionTrigger } from "@/components/ui/accordion"
import { Switch } from "@/components/ui/switch"

export default function Filters() {
  return (
    <form className="flex flex-col border-l border-r border-t rounded-lg min-h-[500px] border-bl2 w-full px-3 pb-2 pt-3 text-gray-500">
        <div className="flex justify-between items-center">
            <h1 className="font-bold text-lg">فیلترها</h1>
            <input type="button" value={"حذف فیلترها"} className="text-red-400 text-sm hover:text-red-300 cursor-pointer transition"/>
        </div>
        <Accordion type="single" collapsible className="w-full mt-2">
            <AccordionItem value="item-1" className="">
                <AccordionTrigger className="font-bold hover:text-blue-300">برند</AccordionTrigger>
                <AccordionContent>
                    <div className="flex flex-col px-3 gap-2">

                    <label for="vehicle1" className="flex justify-between items-center">
                        <span>sam</span>
                        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                    </label>
                    
                    <label for="vehicle2" className="flex justify-between items-center">
                        <span>emersun</span>
                    <input type="checkbox" id="vehicle2" name="vehicle2" value="Car"/>
                    </label>

                    <label for="vehicle3" className="flex justify-between items-center">
                        <span>snowa</span>
                        <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat"/>
                    </label>

                    </div>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger className="font-bold hover:text-blue-300">محدوده قیمت</AccordionTrigger>
                <AccordionContent>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="expensive" className="flex flex-col justify-between gap-1 ">
                            <span className="px-1">گرانترین</span>
                            <div className="flex justify-between border border-bl2 h-10 px-3 items-center rounded-lg text-gray-400 gap-3">
                                <input type="number" id="expensive" placeholder="000,000,000" className="grow focus:outline-none"/>
                                <span>تومان</span>
                            </div>
                        </label>
                        <label htmlFor="expensive" className="flex flex-col justify-between gap-1 ">
                            <span className="px-1">ارزانترین</span>
                            <div className="flex justify-between border border-bl2 h-10 px-3 items-center rounded-lg text-gray-400 gap-3">
                                <input type="number" id="expensive" placeholder="000,000,000" className="grow focus:outline-none"/>
                                <span>تومان</span>
                            </div>
                        </label>

                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
        <div className="flex justify-between border-b border-bl2 pt-4 pb-4 hover:text-blue-300 transition cursor-pointer">
            <label htmlFor="exist" className="font-bold">موجود</label>
            <Switch id="exist"/>
        </div>
        <div className="flex justify-between pt-4 pb-3 hover:text-blue-300 transition cursor-pointer">
            <label htmlFor="off" className="font-bold"> دارای تخفیف</label>
            <Switch id="off"/>
        </div>
        
    </form>
  )
}
