import listService from "../services/list_services";
import taskService from "../services/tasks_services";
import { getUserById } from "../services/user_services";
import { CustomApiError } from "../types/interface";

const taskOperations = {
    async addTaskOperation({listId, title, description}:{listId:string, title:string, description:string}) {
        const listExists = await listService.getOneListById({id:listId});
        if (!listExists) {
            throw new CustomApiError("List not found", 404);
        }
        if (!listId || !title || !description) {
            throw new CustomApiError("listId, title, and description are required", 400);
        }

        return await taskService.addTaskToListById({listId, title, description});
    },
    async editTaskOperation({taskId, title, description, completed}:{taskId:string, title:string, description:string, completed:boolean}) {
        if (!taskId || !title || !description || !completed) {
            throw new CustomApiError("taskId, title, description, and completed are required", 400);
        }

        return await taskService.editTaskById({taskId, title, description, completed});
    },
    async editTaskCompletion({taskId, completed}:{taskId:string, completed:boolean}){
        if(!taskId || completed === undefined || completed === null){
            throw new CustomApiError("taskId and completed are required!")
        }
        return await taskService.editTaskCompletion({taskId,completed})
    }
    ,
    async deleteTaskOperation({taskId}:{taskId:string}) {
        if (!taskId) {
            throw new CustomApiError("taskId is required", 400);
        }

        const deletedTask = await taskService.deleteTaskById({taskId});
        if (!deletedTask) {
            throw new CustomApiError("Task not found", 404);
        }

        return deletedTask;
    },
    async addAdminRole({userId, listId}:{userId:string, listId:string}) {
        if (!userId || !listId) {
            throw new CustomApiError("userId and listId are required", 400);
        }

        return await listService.addAdminRoleByDefault({userId, listId});
    }
};

export default taskOperations;