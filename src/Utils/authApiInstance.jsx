import axios from "axios";
import { getRefreshToken, isAccessTokenExpired, setAuthUser } from "./useAuth";


const authApiInstance = () =>{
    const access_token = localStorage.getItem("access_token");
    // const refresh_token = localStorage.getItem("refresh_token");
    
    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        headers: {Authorization: `Bearer ${access_token}`}
    })

    // axiosInstance.interceptors.request.use(async (req)=>{
    //     if(!isAccessTokenExpired){
    //         return req;
    //     }
    //     const res = await getRefreshToken(refresh_token);
    //     setAuthUser(res.access,res.refresh);
    //     req.headers.Authorization = `Bearer ${res.data?.access}`;
    //     return req;
    // })

    return axiosInstance;
}

export default authApiInstance;