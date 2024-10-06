import axios from "../services/baseService"
import { AUTH_URL} from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast"

export default function useLogout() {
    const navigate=useNavigate()
    const { toast } = useToast()
    const mutation = useMutation({
        mutationFn: async () => {
          const res = await axios.get(`${AUTH_URL.logout}`);
          return res.data;
        },
        onSuccess: () => {
            
            localStorage.setItem("access", "");
            localStorage.setItem("refresh", "");
            localStorage.setItem("role", "");
            navigate("/")
            toast({
              description: "شما از حساب مدیریت خود خارج شدید",
              duration: 2500,
              className:"w-[350px] bg-blue-50 border border-blue-100 text-gray-500"
            })
          }
    });

    return mutation;
}
