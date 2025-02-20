import listService from "../services/list_services";
import taskServices from "../services/tasks_services";
import { getUserById } from "../services/user_services";
import { CustomApiError } from "../types/interface";

const listOperations = {
    async createListOperation({ id, name }: { id: string, name: string }) {
        if (!id || !name) {
            throw new CustomApiError("Id and name are required", 400);
        }
        return await listService.createListWithUserId({ id, name });
    },
    async getOneListbyIdOperation({ id }: { id: string }) {
        if (!id) {
            throw new CustomApiError("Id is required", 400);
        }
        const list = await listService.getOneListById({ id });
        if (!list) {
            throw new CustomApiError("List not found", 404);
        }
        return list;
    },
    async getAllTasksByListIdOperation({ listId }: { listId: string }) {
        if (!listId) {
            throw new CustomApiError("listId is required", 400);
        }
        return await listService.getAllTasksByListId({ listId });
    },
    async getAllUserListsOperation({ id }: { id: string }) {
        if (!id) {
            throw new CustomApiError("ownerId is required", 400);
        }
        if (await getUserById(id) === null) {
            throw new CustomApiError("User not found", 404);
        }
        return await listService.getAllUserLists({ id });
    },
    async editListOperation({ listId, name }: { listId: string, name: string }) {
        if (!listId || !name) {
            throw new CustomApiError("listId and name are required", 400);
        }
        return await listService.editListById({ listId, name });
    },
    async deleteListOperation({ listId }: { listId: string }) {
        if (!listId) {
            throw new CustomApiError("listId is required", 400);
        }
        const deletedRelations = await listService.deleteAllListRelationsByUserAndListId({ listId });
        console.log(deletedRelations);
        const deletedTasks = await taskServices.deleteAllTasksByListId({ listId });
        console.log(deletedTasks);
        const deletedList = await listService.deleteListById({ listId });
        console.log(deletedList);
        if (!deletedList) {
            throw new CustomApiError("List not found", 404);
        }
        return deletedList;
    }
};

export default listOperations;
