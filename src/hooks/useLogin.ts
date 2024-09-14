import { useMutation } from "@tanstack/react-query";
import axios from "../services/baseService"
import { AUTH_URL} from "@/services/api";
import { useNavigate } from "react-router-dom";
// import axios from "axios";


export default function useLogin() {
    const navigate=useNavigate()

  const mutation= useMutation({
    mutationFn: async (infoUser) => {
      const res = await axios.post(`${AUTH_URL.login}`, infoUser);
      console.log("res-log",res.data);
      return res.data;
      
    },
    onSuccess: (data) => {
        localStorage.setItem("access", data.token.accessToken);
        localStorage.setItem("refresh", data.token.refreshToken);
        navigate("/");
      },
  });

  return mutation;
}