import axiosClient from "@/utils/http";
import { TaskType } from "@/types/taskTypes";
import { QueryKey } from "@tanstack/react-query";
export const  ChangeTaskState=async ({queryKey, completed}:{queryKey:QueryKey, completed:boolean})=>{
    const id=queryKey[1]
    const data = await axiosClient.patch(`/task/${id}/toggle`,{completed})
    console.log("Change occured!")
    return data.data

}

export const editTaskById=async({queryKey, task}:{queryKey:QueryKey, task:TaskType})=>{
    const id=queryKey[1]
    const data= await axiosClient.patch(`/task/${id}`, task)
    console.log("Edit completed!")
    return data.data
}

export const deleteTaskById=async({queryKey}:{queryKey:QueryKey})=>{
     const id=queryKey[1]
    await axiosClient.delete(`/task/${id}`)
    console.log("Deleted Successfully!")

}