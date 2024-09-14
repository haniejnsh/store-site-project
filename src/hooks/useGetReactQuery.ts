import { useQuery } from "@tanstack/react-query";
import axios from "../services/baseService"

export default function useGetReactQuery(urlGet:string) {
  const query= useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await axios.get(`${urlGet}`);
      return res.data;
    },
  });
  return query
}
