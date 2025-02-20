import taskOperations from "../operations/task_operation";
import listOperations from "../operations/list_operations";
import { Request, Response, NextFunction } from "express";
const todoController = {
    async createList(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, name } = req.body;
            const list = await listOperations.createListOperation({ id, name });
            const relation = await taskOperations.addAdminRole({ userId: id, listId: list.id });
            res.json({ ...list, role: relation.role });
        } catch (error) {
            next(error);
        }
    },
    async getOneListById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            res.json(await listOperations.getOneListbyIdOperation({ id }));
        } catch (error) {
            next(error);
        }
    },
    async getAllUserLists(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const userLists = await listOperations.getAllUserListsOperation({ id });
            if (userLists.length === 0) {
                res.json({ message: "No lists found" });
            } else {
                const lists = await Promise.all(userLists.map(async (list) => {
                    const tasks = await listOperations.getAllTasksByListIdOperation({ listId: list.id });
                    return { ...list, tasks };
                }));
                res.json(lists);
            }
        } catch (error) {
            next(error);
        }
    },
    async getTasksFromList(req: Request, res: Response, next: NextFunction) {
        try {
            const listId = req.params.id;
            res.json(await listOperations.getAllTasksByListIdOperation({ listId }));
        } catch (error) {
            next(error);
        }
    },
    async editList(req: Request, res: Response, next: NextFunction) {
        try {
            const listId = req.params.id;
            const { name } = req.body;
            res.json(await listOperations.editListOperation({ listId, name }));
        } catch (error) {
            next(error);
        }
    },
    async deleteList(req: Request, res: Response, next: NextFunction) {
        try {
            const listId = req.params.id;
            res.json(await listOperations.deleteListOperation({ listId }));
        } catch (error) {
            next(error);
        }
    },
    async addTask(req: Request, res: Response, next: NextFunction) {
        try {
            const { listId, title, description } = req.body;
            res.json(await taskOperations.addTaskOperation({ listId, title, description }));
        } catch (error) {
            next(error);
        }
    },
    async editTask(req: Request, res: Response, next: NextFunction) {
        try {
            const taskId = req.params.id;
            const { title, description, completed } = req.body;
            res.json(await taskOperations.editTaskOperation({ taskId, title, description, completed }));
        } catch (error) {
            next(error);
        }
    },
    async deleteTask(req: Request, res: Response, next: NextFunction) {
        try {
            const taskId = req.params.id;
            res.json(await taskOperations.deleteTaskOperation({ taskId }));
        } catch (error) {
            next(error);
        }
    }
};

export default todoController;
