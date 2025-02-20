import { addAdminRole, addTaskOperation, createListOperation } from "../operations/todo_operations";
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
export async function addTask(req: Request, res: Response, next: NextFunction){
    try{
        const {listId,title, description} = req.body;
        res.json(await addTaskOperation({listId, title, description,}))

    }
    catch (error){
        next(error);
    }
}