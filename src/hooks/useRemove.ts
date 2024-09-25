import { useMutation } from "@tanstack/react-query";
import axios from "../services/baseService"
// import { AUTH_URL} from "@/services/api";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { queryClient } from "@/lib/reactQuery";
import { useToast } from "@/hooks/use-toast"

export default function useRemove(url) {
    // const navigate=useNavigate()
    const { toast } = useToast()
  const mutation= useMutation({
    mutationFn: async (infoUser) => {
      const res = await axios.delete(`${url}/${infoUser}`);
      console.log("res-log",res.data);
      return res.data;
      
    },
    onSuccess: () => {
        alert("delete")
        queryClient.invalidateQueries("product")
        toast({
            description: "Your message has been sent.",
            duration: 2000,
          })
        // if(rol=="مدیریت"){
        //   navigate("/admin/productmanagement")
        // }
      },
      onError:(error)=>{
        console.log("error remove : ",error);
        if(error.status==500){
            queryClient.invalidateQueries("product")
            toast({
                description: "محصول با موفقیت حذف شد",
                duration: 2500,
                className:"w-[350px] bg-red-50 border border-red-100 text-gray-500"
              })
        }
        
      }
  });

  return mutation;
}