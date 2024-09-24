import { useMutation } from "@tanstack/react-query";
import axios from "../services/baseService"
// import { AUTH_URL} from "@/services/api";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { queryClient } from "@/lib/reactQuery";


export default function useRemove(url) {
    // const navigate=useNavigate()

  const mutation= useMutation({
    mutationFn: async (infoUser) => {
      const res = await axios.delete(`${url}/${infoUser}`);
      console.log("res-log",res.data);
      return res.data;
      
    },
    onSuccess: () => {
        alert("delete")
        queryClient.invalidateQueries("product")
        // if(rol=="مدیریت"){
        //   navigate("/admin/productmanagement")
        // }
      },
      onError:(error)=>{
        console.log("error remove : ",error);
        if(error.status==500){
            queryClient.invalidateQueries("product")
            alert("ok")
        }
        
      }
  });

  return mutation;
}