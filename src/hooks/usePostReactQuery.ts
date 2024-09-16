import { useMutation } from "@tanstack/react-query";
import axios from "../services/baseService"
import { queryClient } from "@/lib/reactQuery";
// import { CATEGORY_URL} from "@/services/api";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";


export default function usePostReactQuery(urlPost:string) {
    // const navigate=useNavigate()

  const mutation= useMutation({
    mutationFn: async (infoUser:any) => {
      const res = await axios.post(`${urlPost}`, infoUser);
      console.log("res.data-category-post",res.data);
      return res.data;
      
    },
    onSuccess: (data) => {
        console.log("data post category",data);
        if(urlPost=="/categories"){alert("add category")}
        else if(urlPost=="/subcategories"){alert("add subcategories")}
        else if(urlPost=="/products"){alert("add products")}
        queryClient.invalidateQueries("product")
      },
      onError:(error)=>{
        console.log("error post",error);
        
      }
  });

  return mutation;
}