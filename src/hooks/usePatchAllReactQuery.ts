import { useMutation } from "@tanstack/react-query";
import axios from "../services/baseService";
import { queryClient } from "@/lib/reactQuery";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function usePatchAllReactQuery(urlPatch) {
    const { toast } = useToast();
    const navigate=useNavigate()

    const mutation = useMutation({
        mutationFn: async (infoUsers) => {
            const requests = infoUsers.map(user =>
                axios.patch(`${urlPatch}/${user.id}`, user.info)
            );
            const responses = await axios.all(requests);
            return responses.map(res => res.data);
        },
        onSuccess: (data) => {
            console.log("data patch", data);
            queryClient.invalidateQueries("product");
            toast({
                description: "محصولات با موفقیت ویرایش شدند",
                duration: 2500,
                className: "w-[350px] bg-blue-50 border border-blue-100 text-gray-500"
            });
            navigate("/admin/inventorymanagement")
        },
        onError: (error) => {
            console.log("error patch", error);
        }
    });

    return mutation;
}
