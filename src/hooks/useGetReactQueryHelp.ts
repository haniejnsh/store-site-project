// import { BASE_URL } from "@/services/api";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "../services/baseService"

export default function useGetReactQueryHelp(urlGet:string,key) {
  const query:UseQueryResult<any, Error>= useQuery({
    queryKey: [key],
    queryFn: async () => {
      const res = await axios.get(`${urlGet}`);
      return res.data;
    },
  });

  return query
}
