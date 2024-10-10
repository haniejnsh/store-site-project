import { useMutation } from "@tanstack/react-query";
import axios from "../services/baseService"
import { queryClient } from "@/lib/reactQuery";
import { useToast } from "@/hooks/use-toast"
import { useDispatch } from "react-redux";
import { emptyCart } from "@/redux/cart/cartSlice";


export default function usePostReactQuery(urlPost:string) {
    const { toast } = useToast()
    const dispatch = useDispatch();

  const mutation= useMutation({
    mutationFn: async (infoUser:any) => {
      const res = await axios.post(`${urlPost}`, infoUser);
      return res.data;
      
    },
    onSuccess: (data) => {
        console.log("data post",data);
        queryClient.invalidateQueries("product")
        if(urlPost=="/categories"){
          toast({
            description: "گروه محصول با موفقیت افزوده شد",
            duration: 2500,
            className:"w-[350px] bg-blue-50 border border-blue-100 text-gray-500"
          })
        }
        else if(urlPost=="/subcategories"){
          toast({
            description: "زیرگروه محصول با موفقیت افزوده شد",
            duration: 2500,
            className:"w-[350px] bg-blue-50 border border-blue-100 text-gray-500"
          })
        }
        else if(urlPost=="/products"){
          toast({
            description: "محصول با موفقیت افزوده شد",
            duration: 2500,
            className:"w-[350px] bg-blue-50 border border-blue-100 text-gray-500"
          })
        }
        else if(urlPost=="/orders"){
          dispatch(emptyCart())
          
        }
        
      },
      onError:(error)=>{
        console.log("error post",error);
        
      }
  });

  return mutation;
}