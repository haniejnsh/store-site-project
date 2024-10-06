import { useMutation } from "@tanstack/react-query";
import axios from "../services/baseService"
import { AUTH_URL} from "@/services/api";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { useToast } from "@/hooks/use-toast"


export default function useRegister() {
    const navigate=useNavigate()
    const { toast } = useToast()

  const mutation= useMutation({
    mutationFn: async (infoUser) => {
      const res = await axios.post(`${AUTH_URL.register}`, infoUser);
      console.log("res-log",res.data);
      return res.data;
      
    },
    onSuccess: (data) => {
        // localStorage.setItem("access", data.token.accessToken);
        // localStorage.setItem("refresh", data.token.refreshToken);
        // localStorage.setItem("role", data.data.user.role);
        if(data.data.user.role=="USER"){
          navigate("/userlogin")
          toast({
            description: "شما با موفقیت حساب کاربری خود را ساختید",
            duration: 2500,
            className:"w-[350px] bg-blue-50 border border-blue-100 text-gray-500"
          })
        }
      },
  });

  return mutation;
}