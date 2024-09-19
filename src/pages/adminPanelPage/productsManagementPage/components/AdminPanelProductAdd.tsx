import {Sheet,SheetContent,SheetDescription,SheetHeader,SheetTitle,SheetTrigger,} from "@/components/ui/sheet"
import {Accordion,AccordionContent,AccordionItem,AccordionTrigger,} from "@/components/ui/accordion"
import { RiMenuAddFill } from "react-icons/ri"
import AddCategoryForm from "./AddCategoryForm"
import AddSubCategoryForm from "./AddSubCategoryForm"
import AddProductForm from "./AddProductForm"

export default function AdminPanelProductAdd() {
  return (
    <Sheet>
        <SheetTrigger>
          <div className="flex items-center gap-1 font-bold text-slate-500 cursor-pointer hover:text-blue-300 transition">
            <span>افزودن کالا</span>
            <RiMenuAddFill/>
          </div>
        </SheetTrigger>
        <SheetContent side="left"  className="text-right font-custom overflow-scroll">
            <SheetHeader className="mt-8">
                <SheetTitle className="text-right">افزودن کالا</SheetTitle>
            </SheetHeader>
            <div>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>افزودن گروه</AccordionTrigger>
                  <AccordionContent>
                    <AddCategoryForm/>
                  </AccordionContent>
                
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>افزودن زیرگروه</AccordionTrigger>
                  <AccordionContent>
                    <AddSubCategoryForm/>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>افزودن کالا</AccordionTrigger>
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
