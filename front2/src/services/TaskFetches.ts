import axiosClient from "@/utils/http";
import { TaskType } from "@/types/taskTypes";
import { QueryKey } from "@tanstack/react-query";
export const  ChangeTaskState=async ({queryKey, completed}:{queryKey:QueryKey, completed:boolean})=>{
    const id=queryKey[1]
    const data = await axiosClient.patch(`/task/${id}/toggle`,{completed})
    console.log("Change occured!")
    return data.data

}

export const editTaskById=async(task:TaskType)=>{
    const data= await axiosClient.patch(`/task/${task.id}`, task)
    console.log("Edit completed!")
    return data.data
}

export const deleteTaskById=async(id:string)=>{
    await axiosClient.delete(`/task/${id}`)
    console.log("Deleted Successfully!")

}