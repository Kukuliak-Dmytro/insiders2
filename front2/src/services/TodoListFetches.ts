import axiosClient from "@/utils/http";
import { getCurrentUserId } from "@/utils/storage";
export const getCurrentUserLists=async ()=>{
    const data = await axiosClient.get(`/list/user/${getCurrentUserId()}`)
    // console.log(data)
    return data.data
}