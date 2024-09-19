import axios from "axios"
import { AUTH_URL, BASE_URL } from "./api"

axios.defaults.baseURL=BASE_URL
let first=true
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
    (response)=>{
        first=true
        return response
    },
    async(error)=>{
        const originalReq=error.config
        console.log("config-error",originalReq);
        console.log("config-error-url",originalReq.url);
        console.log("error.response.status",error.response.status);
        
        
        if(error.response.status!=401){
            return Promise.reject(error)
        }
        if(error.response.status==403 && originalReq.url==AUTH_URL.refresh){
            return Promise.reject(error)
        }
        if(error.response.status==401 && originalReq.url!=AUTH_URL.login){
            console.log("error not login");
            if(first){
                first=false
            // const refToken=localStorage.getItem("refresh")}
            try{
                const refreshRes = await axios.post(
                    "http://localhost:8000/api/auth/token",
                    {
                        refreshToken: localStorage.getItem("refresh")
                    }
                );
                localStorage.setItem("access",refreshRes.data.token.accessToken);
                        // await store.dispatch(refresh(refToken))
                const res=await axios.request(originalReq)
                    return Promise.resolve(res)
            }catch(e){
                console.log("retry ",e);
                localStorage.removeItem("access")
            }
        } 
        }
       
        return Promise.reject(error)
    }
)

export default axios






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