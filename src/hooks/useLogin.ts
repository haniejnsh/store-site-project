import { useMutation } from "@tanstack/react-query";
import axios from "../services/baseService"
import { AUTH_URL} from "@/services/api";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast"


export default function useLogin(rol) {
    const navigate=useNavigate()
    const { toast } = useToast()

  const mutation= useMutation({
    mutationFn: async (infoUser) => {
      const res = await axios.post(`${AUTH_URL.login}`, infoUser);
      return res.data;
      
    },
    onSuccess: (data) => {
      console.log("data login :",data);
      const roleApi=(rol=="کاربر")?"USER":"ADMIN"
      if(roleApi==data.data.user.role){
        localStorage.setItem("access", data.token.accessToken);
        localStorage.setItem("refresh", data.token.refreshToken);
        localStorage.setItem("role", data.data.user.role);
        if(data.data.user.role=="ADMIN"){
          navigate("/admin/productmanagement")
          toast({
            description: "شما با موفقیت به حساب مدیریت خود وارد شدید",
            duration: 2500,
            className:"w-[350px] bg-blue-50 border border-blue-100 text-gray-500"
          })
        }
        else if(data.data.user.role=="USER"){
          navigate("/")
          localStorage.setItem('user', JSON.stringify(data.data.user))
          toast({
            description: "شما با موفقیت به حساب کاربری خود وارد شدید",
            duration: 2500,
            className:"w-[350px] bg-blue-50 border border-blue-100 text-gray-500"
          })
        }
      }
      else{
        toast({
          description: "مشخصات شما با درخواستتان تطابق ندارد",
          duration: 2500,
          className:"w-[350px] bg-red-50 border border-red-100 text-gray-500"
        })
      }
      },
  });

  return mutation;
}