import axios from "../services/baseService"
import { AUTH_URL} from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function useLogout() {
    const navigate=useNavigate()
    const mutation = useMutation({
        mutationFn: async () => {
          const res = await axios.get(`${AUTH_URL.logout}`);
          return res.data;
        },
        onSuccess: () => {
            alert("logout")
            localStorage.setItem("access", "");
            localStorage.setItem("refresh", "");
            navigate("/")
          }
    });

    return mutation;
}
