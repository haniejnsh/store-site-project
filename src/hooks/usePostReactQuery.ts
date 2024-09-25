import { useMutation } from "@tanstack/react-query";
import axios from "../services/baseService"
import { queryClient } from "@/lib/reactQuery";
import { useToast } from "@/hooks/use-toast"
// import { CATEGORY_URL} from "@/services/api";
import { useNavigate } from "react-router-dom";
// import axios from "axios";


export default function usePostReactQuery(urlPost:string) {
    // const navigate=useNavigate()
    const { toast } = useToast()
    const navigate=useNavigate()

  const mutation= useMutation({
    mutationFn: async (infoUser:any) => {
      const res = await axios.post(`${urlPost}`, infoUser);
      console.log("res.data-category-post",res.data);
      return res.data;
      
    },
    onSuccess: (data) => {
        console.log("data post category",data);
        queryClient.invalidateQueries("product")
        navigate("/admin/productmanagement")
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
        
      },
      onError:(error)=>{
        console.log("error post",error);
        
      }
  });

  return mutation;
}