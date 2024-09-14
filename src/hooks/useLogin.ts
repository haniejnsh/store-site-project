import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {} from "../services/baseService"

export default function useLogin() {
  const navigate = useNavigate();
//   let url = "http://mohammadrezagh80.pythonanywhere.com";

  const { mutate } = useMutation({
    mutationFn: async (value) => {
      const res = await axio.post(`${url}/api/accounts/login/`, value);
      return res.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      navigate("/courses");
    },
  });

  return { mutate };
}