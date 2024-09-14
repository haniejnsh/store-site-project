import { useMutation } from "@tanstack/react-query";
import axios from "../services/baseService"
import { CATEGORY_URL} from "@/services/api";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";


export default function usePostCategory() {
    // const navigate=useNavigate()

  const mutation= useMutation({
    mutationFn: async (infoUser:any) => {
      const res = await axios.post(`${CATEGORY_URL}`, infoUser);
      console.log("res.data-category-post",res.data);
      return res.data;
      
    },
    onSuccess: (data) => {
        // localStorage.setItem("access", data.token.accessToken);
        // localStorage.setItem("refresh", data.token.refreshToken);
        console.log("data post category",data);
        
        alert("add category")
      },
  });

  return mutation;
}