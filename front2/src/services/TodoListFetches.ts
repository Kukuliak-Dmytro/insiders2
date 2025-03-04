import axiosClient from "@/utils/http";
import { TodoListType } from "@/types/listTypes";
import { getCurrentUserId } from "@/utils/storage";
export const getCurrentUserLists=async ()=>{
    const data = await axiosClient.get(`/list/user/${getCurrentUserId()}`)
    // console.log(data)
    return data.data
}
export const getOneListById=async(id:string):Promise<TodoListType>=>{
    const { data } = await axiosClient.get(`/list/${id}`);
    const { data: tasks } = await axiosClient.get(`/list/${id}/tasks`);
    return { ...data, tasks };
}
