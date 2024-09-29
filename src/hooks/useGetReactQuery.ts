import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "../services/baseService"

export default function useGetReactQuery(urlGet:string) {
  const query:UseQueryResult<any, Error>= useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await axios.get(`${urlGet}`);
      return res.data;
    }
  });
  return query
}
