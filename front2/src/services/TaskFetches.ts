import axiosClient from "@/utils/http";
export const  ChangeTaskState=async (id:string, completed:boolean)=>{
    const data = await axiosClient.patch(`/task/${id}/toggle`,{completed})
    console.log("Change occured!")
    return data.data

}


