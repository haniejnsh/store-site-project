import {Sheet,SheetClose,SheetContent,SheetDescription,SheetHeader,SheetTitle,SheetTrigger,} from "@/components/ui/sheet"
import {Accordion,AccordionContent,AccordionItem,AccordionTrigger,} from "@/components/ui/accordion"
import { RiMenuAddFill } from "react-icons/ri"
import AddCategoryForm from "./AddCategoryForm"
import AddSubCategoryForm from "./AddSubCategoryForm"
import AddProductForm from "./AddProductForm"
import { useState } from "react"

export default function AdminPanelProductAdd() {
  // const [isOpen, setIsOpen] = useState(false); // کنترل وضعیت باز یا بسته بودن Sheet

  return (
    <Sheet >
        <SheetTrigger >
          <div onClick={() => setIsOpen(true)} className="flex items-center gap-1 font-bold text-slate-500 cursor-pointer hover:text-blue-300 transition">
            <span>افزودن کالا</span>
            <RiMenuAddFill/>
          </div>
        </SheetTrigger>
        <SheetContent side="left"  className="text-right font-custom overflow-scroll text-gray-500">
            <SheetHeader className="mt-8">
                <SheetTitle className="text-right text-gray-500">افزودن کالا</SheetTitle>
            </SheetHeader>
            <div className="text-gray-500">
              <Accordion type="single" collapsible > 
                <AccordionItem value="item-1">
                  <AccordionTrigger className="hover:text-blue-400 hover:no-underline">افزودن گروه</AccordionTrigger>
                  <AccordionContent>
                    <AddCategoryForm />
                  </AccordionContent>
                
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="hover:text-blue-400 hover:no-underline">افزودن زیرگروه</AccordionTrigger>
                  <AccordionContent>
                    <AddSubCategoryForm/>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="hover:text-blue-400 hover:no-underline">افزودن کالا</AccordionTrigger>
                  <AccordionContent>
                    <AddProductForm/>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
        </SheetContent>
    </Sheet>


  )
}
