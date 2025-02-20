import { addAdminRole, addTaskOperation, createListOperation, editListOperation, deleteListOperation, getOneListbyIdOperation, getAllUserListsOperation, editTaskOperation, deleteTaskOperation, getAllTasksByListIdOperation } from "../operations/todo_operations";
import { Request, Response, NextFunction } from "express";
import { CustomApiError } from "../types/interface";
export async function createList(req: Request, res: Response, next: NextFunction){
    try{

        const {id, name} = req.body;    
        const list= await createListOperation({id, name})
        const relation=await addAdminRole({userId:id, listId:list.id});
        res.json({...list, role: relation.role});
    }
    catch (error){
        next(error);
    }
}
export async function getOneListById(req: Request, res: Response, next: NextFunction){
    try{
        const { id } = req.params;
        res.json(await getOneListbyIdOperation({ id }))
    }
    catch (error){
        next(error);
    }
}
export async function getAllUserLists(req: Request, res: Response, next: NextFunction){
    try{
        const { id } = req.params;
        const userLists= await getAllUserListsOperation({ id });
        if(userLists.length===0){
            res.json({message: "No lists found"});
        }
        else
        res.json(await getAllUserListsOperation({ id }))
    }
    catch (error){
        next(error);
    }
}
export async function getTasksFromList(req: Request, res: Response, next: NextFunction){
    try{
        const listId = req.params.id;
        res.json(await getAllTasksByListIdOperation({listId}))
    }
    catch (error){
        next(error);
    }
}
export async function editList(req: Request, res: Response, next: NextFunction){
    try{
        const listId = req.params.id;
        const {name} = req.body;
        res.json(await editListOperation({listId, name}))
    }
    catch (error){
        next(error);
    }
}
export async function deleteList(req: Request, res: Response, next: NextFunction){
    try{
        const listId = req.params.id;
        res.json(await deleteListOperation({listId}))
    }
    catch (error){
        next(error);
    }
}
export async function addTask(req: Request, res: Response, next: NextFunction){
    try{
        
        const {listId,title, description} = req.body;
        res.json(await addTaskOperation({listId, title, description,}))

    }
    catch (error){
        next(error);
    }
}

export async function editTask(req: Request, res: Response, next: NextFunction){
    try{
        const taskId = req.params.id;
        const {title, description, completed} = req.body;
        res.json(await editTaskOperation({taskId, title, description, completed}))
    }
    catch (error){
        next(error);
    }
}
export async function deleteTask(req: Request, res: Response, next: NextFunction){
    try{
        const taskId = req.params.id;
        res.json(await deleteTaskOperation({taskId}))
    }
    catch (error){
        next(error);
    }
}