import { useMutation } from "@tanstack/react-query";
import axios from "../services/baseService"
import { queryClient } from "@/lib/reactQuery";
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom";


export default function usePatchReactQuery(urlPatch:string) {
    // const navigate=useNavigate()
    const { toast } = useToast()
    // const navigate=useNavigate()

  const mutation= useMutation({
    mutationFn: async (infoUser:any) => {
      const res = await axios.patch(`${urlPatch}`, infoUser);
      console.log("res.data-pro-patch",res.data);
      return res.data;
      
    },
    onSuccess: (data) => {
        console.log("data patch",data);
        // queryClient.invalidateQueries("product")
        queryClient.invalidateQueries({
          queryKey:["product"]
        })
        // navigate("/admin/productmanagement")
        // if(urlPost=="/categories"){
        //   toast({
        //     description: "گروه محصول با موفقیت افزوده شد",
        //     duration: 2500,
        //     className:"w-[350px] bg-blue-50 border border-blue-100 text-gray-500"
        //   })
        // }
        // else if(urlPost=="/subcategories"){
        //   toast({
        //     description: "زیرگروه محصول با موفقیت افزوده شد",
        //     duration: 2500,
        //     className:"w-[350px] bg-blue-50 border border-blue-100 text-gray-500"
        //   })
        // }
        // if(urlPatch=="/products"){
          toast({
            description: "محصول با موفقیت ویرایش شد",
            duration: 2500,
            className:"w-[350px] bg-blue-50 border border-blue-100 text-gray-500"
          })
        // }
        
      },
      onError:(error)=>{
        console.log("error patch",error);
        
      }
  });

  return mutation;
}