import axios from "axios"
import { AUTH_URL, BASE_URL } from "./api"

axios.defaults.baseURL=BASE_URL

axios.interceptors.request.use((req)=>{
    const token=localStorage.getItem("access")
    if(token){
        // req.headers.token=token
        req.headers.Authorization=`Bearer ${token}`
    }
    console.log("req",req);
    return req
})

axios.interceptors.response.use(
    (response)=>response,
    async(error)=>{
        const originalReq=error.config
        if(error.response.status!=401){
            return Promise.reject(error)
        }
        if(error.response.status==403 && originalReq.url==AUTH_URL.refresh){
            return Promise.reject(error)
        }
        // if(!originalReq._retry){
        //     originalReq._retry=true
        //     const refToken: { refresh: string | null }={refresh:localStorage.getItem("refresh")}
        //     try{
        //         const refreshRes = await axios.post(
        //             "http://localhost:8000/api/auth/token",
        //             {
        //                 refreshToken: refToken,
        //             }
        //           );
        //           localStorage.setItem("access",refreshRes.data.access);
        //         // await store.dispatch(refresh(refToken))
        //         const res=await axios.request(originalReq)
        //         return Promise.resolve(res)
        //     }catch(e){
        //         console.log("retry ",e);
        //         localStorage.removeItem("access")
        //     }
        // }
        return Promise.reject(error)
    }
)

export default axios