import { createListWithUserId, addTaskToListById,addAdminRoleByDefault } from "../services/todo_services";
import { CustomApiError } from "../types/interface";
export async function createListOperation({id, name}:{id:string, name:string}){
    
        if (!id || !name){
            throw new CustomApiError("Id and name are required", 400);
        }
    
        return await createListWithUserId({id, name});
    
}
export async function addTaskOperation({listId,title, description}:{listId:string, title:string, description:string}){
    if (!listId || !title || !description){
        throw new CustomApiError("listId,title, and description are required", 400);
    }

    return await addTaskToListById({listId, title, description, });
}
export async function addAdminRole({userId, listId}:{userId:string, listId:string}){
    if (!userId || !listId){
        throw new CustomApiError("userId and listId are required", 400);
    }

    return await addAdminRoleByDefault({userId, listId});
}