import axiosClient from "@/utils/http";
import { TodoListType } from "@/types/listTypes";
import { getCurrentUserId } from "@/utils/storage";
import { QueryKey } from "@tanstack/react-query";

export const getCurrentUserLists = async (): Promise<TodoListType[]> => {
    const data = await axiosClient.get(`/list/user/${getCurrentUserId()}`)
    return data.data
}

export const getOneListById = async ({ queryKey }: { queryKey: QueryKey }): Promise<TodoListType> => {
    const id = queryKey[1];
    const { data } = await axiosClient.get(`/list/${id}`);
    const { data: tasks } = await axiosClient.get(`/list/${id}/tasks`);
    return { ...data, tasks };
}

export const editListById = async ({ queryKey, name }: { queryKey: QueryKey, name: string }) => {
    const id = queryKey[1];
    const { data } = await axiosClient.patch(`/list/${id}`,  {name} );
    return data;
}

export const deleteListById = async ({ queryKey }: { queryKey: QueryKey }) => {
    const id = queryKey[1];
    await axiosClient.delete(`/list/${id}`);
    console.log("Delete successful!");
}