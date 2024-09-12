import {Sheet,SheetContent,SheetDescription,SheetHeader,SheetTitle,SheetTrigger,} from "@/components/ui/sheet"
import {Accordion,AccordionContent,AccordionItem,AccordionTrigger,} from "@/components/ui/accordion"
import { RiMenuAddFill } from "react-icons/ri"

export default function AdminPanelProductAdd() {
  return (
    <Sheet>
        <SheetTrigger>
          <div className="flex items-center gap-1 font-bold text-slate-500 cursor-pointer hover:text-blue-300 transition">
            <span>افزودن کالا</span>
            <RiMenuAddFill/>
          </div>
        </SheetTrigger>
        {/* <SheetContent side="left" style={{ width: '90vw', maxWidth: '100vw' }} > */}
        <SheetContent side="left"  className="text-right font-custom">
            <SheetHeader className="mt-8">
                <SheetTitle className="text-right">افزودن کالا</SheetTitle>
                {/* <SheetDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </SheetDescription> */}
            </SheetHeader>
            <div>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>افزودن گروه</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres.
                  </AccordionContent>
                  <AccordionContent>
                    Yes. It adheres.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>افزودن زیرگروه</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>افزودن کالا</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
        </SheetContent>
    </Sheet>

    // <div className="grid grid-cols-2 gap-2">
    //   {SHEET_SIDES.map((side) => (
    //     <Sheet key={side}>
    //       <SheetTrigger asChild>
    //         <Button variant="outline">{side}</Button>
    //       </SheetTrigger>
    //       <SheetContent side={side}>
    //         <SheetHeader>
    //           <SheetTitle>Edit profile</SheetTitle>
    //           <SheetDescription>
    //             Make changes to your profile here. Click save when you're done.
    //           </SheetDescription>
    //         </SheetHeader>
    //         <div className="grid gap-4 py-4">
    //           <div className="grid grid-cols-4 items-center gap-4">
    //             <Label htmlFor="name" className="text-right">
    //               Name
    //             </Label>
    //             <Input id="name" value="Pedro Duarte" className="col-span-3" />
    //           </div>
    //           <div className="grid grid-cols-4 items-center gap-4">
    //             <Label htmlFor="username" className="text-right">
    //               Username
    //             </Label>
    //             <Input id="username" value="@peduarte" className="col-span-3" />
    //           </div>
    //         </div>
    //         <SheetFooter>
    //           <SheetClose asChild>
    //             <Button type="submit">Save changes</Button>
    //           </SheetClose>
    //         </SheetFooter>
    //       </SheetContent>
    //     </Sheet>
    //   ))}
    // </div>
  )
}
