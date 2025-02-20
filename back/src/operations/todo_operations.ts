import listService from "../services/list_services";
import taskService from "../services/tasks_services";
import { getUserById } from "../services/user_services";
import { CustomApiError } from "../types/interface";
export async function createListOperation({id, name}:{id:string, name:string}){
    
        if (!id || !name){
            throw new CustomApiError("Id and name are required", 400);
        }
    
        return await listService.createListWithUserId({id, name});
    
}
export async function getOneListbyIdOperation({id}:{id:string}){
    if (!id){
        throw new CustomApiError("Id is required", 400);
    }
    const list= await listService.getOneListById({id});
    if (!list){
        throw new CustomApiError("List not found", 404);
    }
    return list;
}

export async function getAllUserListsOperation({id}:{id:string}){
    if (!id){
        throw new CustomApiError("ownerId is required", 400);
    
    }
    if (await getUserById(id)===null){
        throw new CustomApiError("User not found", 404);
    }

    
    return await listService.getAllUserLists({id});
}
export async function editListOperation({listId, name}:{listId:string, name:string}){
    if (!listId || !name){
        throw new CustomApiError("listId and name are required", 400);
    }

    return await listService.editListById({listId, name});
}
export async function deleteListOperation({listId}:{listId:string}){
    if (!listId){
        throw new CustomApiError("listId is required", 400);
    }

    const deletedRelations= await listService.deleteAllListRelationsByUserAndListId({listId});
    console.log(deletedRelations);
    const deletedTasks= await taskService.deleteAllTasksByListId({listId});
    console.log(deletedTasks);
    const deletedList= await listService.deleteListById({listId});
    console.log(deletedList);

    if (!deletedList){
        throw new CustomApiError("List not found", 404);
    }
    return deletedList;
}
export async function addTaskOperation({listId,title, description}:{listId:string, title:string, description:string}){
    const listExists= await listService.getOneListById({id:listId});
    if (!listExists){
        throw new CustomApiError("List not found", 404);
    }
    if (!listId || !title || !description){
        throw new CustomApiError("listId,title, and description are required", 400);
    }

    return await taskService.addTaskToListById({listId, title, description, });
}
export async function addAdminRole({userId, listId}:{userId:string, listId:string}){
    if (!userId || !listId){
        throw new CustomApiError("userId and listId are required", 400);
    }

    return await listService.addAdminRoleByDefault({userId, listId});
}