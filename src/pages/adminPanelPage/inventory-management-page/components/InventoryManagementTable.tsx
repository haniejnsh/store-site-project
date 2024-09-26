import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useGetReactQuery from "@/hooks/useGetReactQuery";
import { PRODUCT_URL } from "@/services/api";
import PaginationHook from "@/components/common/Pagination";
import { useEffect, useState } from "react";
import { ImSad2 } from "react-icons/im";

export default function InventoryManagementTable({change,setEditFields,editFields}) {
  const [pageCounter, setPageCounter] = useState(1);
  const [initialValues, setInitialValues] = useState({}); 
  
  const { isLoading, data, isError, error, refetch } = useGetReactQuery(
    `${PRODUCT_URL}?page=${pageCounter}&limit=5`
  );

  useEffect(() => {
    refetch();
  }, [pageCounter, refetch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-20 text-blue-400 text-xl font-bold">
        در حال بارگزاری . . .
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex justify-center mt-20 text-red-500 items-center gap-1">
        <ImSad2 />
        <span>{error.response.data.message}</span>
      </div>
    );
  }

  const productsData = data.data.products;

  const handleEdit = (productId, field, value) => {
    setEditFields(prevFields => ({
      ...prevFields,
      [productId]: {
        ...prevFields[productId],
        [field]: true, 
      },
    }));


    setInitialValues(prevValues => ({
      ...prevValues,
      [productId]: {
        ...prevValues[productId],
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    change(editFields)
  };

  const handleInputChange = (e, productId) => {
    setEditFields(prevFields => ({
      ...prevFields,
      [productId]: {
        ...prevFields[productId],
        ['price_value']: e.target.value, // ذخیره مقدار جدید
      },
    }));
  };
  const handleInputChange2 = (e, productId) => {
    setEditFields(prevFields => ({
      ...prevFields,
      [productId]: {
        ...prevFields[productId],
        ['quantity_value']: e.target.value, 
      },
    }));
  };

  const handleKeyDown = (e, productId, field) => {
    if (e.key === "Escape") {
      setEditFields(prevFields => ({
        ...prevFields,
        [productId]: {
          ...prevFields[productId],
          [field + '_value']: initialValues[productId][field],
        },
      }));
    }
  };

  return (
    <div className="flex flex-col gap-2 pt-4 pb-8">
      <div className="w-5/6 my-4 mx-auto shadow-customshadow border-bl2 border-[1px] rounded-lg min-h-[381px]">
        <Table className="border-b border-bl2">
          <TableHeader>
            <TableRow className="h-14 text-gray-500 font-bold bg-bl2 hover:bg-bl2 border-bl2">
              <TableHead className="text-center text-xl text-gray-500 font-bold px-8">تصویر</TableHead>
              <TableHead className="text-center text-xl text-gray-500 font-bold px-2">نام کالا</TableHead>
              <TableHead className="text-center text-xl text-gray-500 font-bold px-2">موجودی</TableHead>
              <TableHead className="text-center text-xl text-gray-500 font-bold px-2">قیمت</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productsData?.map(pro => {
              const quantityValue = editFields[pro._id]?.quantity_value || pro.quantity;
              const priceValue = editFields[pro._id]?.price_value || pro.price;

              return (
                <TableRow className="odd:bg-white even:bg-bl1 border-bl2" key={pro._id}>
                  <TableCell className="text-center w-14 px-8">
                    <img className="w-12 h-12" src={`http://${pro?.images[0]}`} alt="pic" />
                  </TableCell>
                  <TableCell className="text-center text-lg text-gray-500 px-2 w-[52%]">{pro.name}</TableCell>

                  {/* ستون موجودی */}
                  <TableCell className="text-center w-[15%] text-gray-500">
                    {editFields[pro._id]?.quantity ? (
                      <input
                        className="w-full focus:outline-none focus:border-[1px] rounded-sm border border-bl2 focus:border-blue-200 text-center"
                        type="number"
                        value={quantityValue}
                        onChange={(e) => handleInputChange2(e, pro._id)}
                        onKeyDown={(e) => handleKeyDown(e, pro._id, "quantity")}
                        onBlur={() => handleSave()}
                      />
                    ) : (
                      <input
                        type="button"
                        value={quantityValue}
                        onClick={() => handleEdit(pro._id, "quantity", pro.quantity)}
                        className="w-full cursor-pointer hover:text-blue-300"
                      />
                    )}
                  </TableCell>

                  {/* ستون قیمت */}
                  <TableCell className="text-center w-[22%] text-gray-500">
                    {editFields[pro._id]?.price ? (
                      <input
                        className="w-full focus:outline-none focus:border-[1px] rounded-sm border border-bl2 focus:border-blue-200 text-center"
                        type="number"
                        value={priceValue}
                        onChange={(e) => handleInputChange(e, pro._id)}
                        onKeyDown={(e) => handleKeyDown(e, pro._id, "price")}
                        onBlur={() => handleSave(pro._id, "price")}
                      />
                    ) : (
                      <input
                        type="button"
                        value={priceValue}
                        onClick={() => handleEdit(pro._id, "price", pro.price)}
                        className="w-full cursor-pointer hover:text-blue-300"
                      />
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <PaginationHook
        counterSet={t => setPageCounter(t)}
        pageNumber={pageCounter}
        totalPage={data.total_pages}
      />
    </div>
  );
}
