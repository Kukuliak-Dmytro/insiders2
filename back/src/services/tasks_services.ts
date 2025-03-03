import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const taskServices = {

    addTaskToListById: async ({ listId, title, description }: { listId: string, title: string, description: string }) =>{
        return prisma.task.create({
            data: {
                listId,
                title,
                description,
            }
        });
    },

     editTaskById: async({taskId, title, description, completed}:{taskId:string, title:string, description:string, completed:boolean}) =>{
        return prisma.task.update({
            where:{
                id:taskId
            },
            data:{
                title,
                description,
                completed,
            }
        });
    },
    editTaskCompletion:async({taskId, completed}:{taskId:string, completed:boolean})=>{
        return prisma.task.update({
            where:{
                id:taskId
            },
            data:{
                completed
            }
        })
    },

    deleteAllTasksByListId: async ({ listId }: { listId: string }) =>{
        const tasksById = prisma.task.findMany({
            where: {
                listId
            }
        });
        if ((await tasksById).length === 0) {
            return null;
        }
        console.log("Tasks: ", tasksById);
        return prisma.task.deleteMany({
            where: {
                listId
            }
        });
    },
    deleteTaskById: async ({ taskId }: { taskId: string }) =>{
        const task = await prisma.task.findUnique({
            where: {
                id: taskId
            }
        });
        if (task === null) {
            return null;
        }
        const deletedTask = await prisma.task.delete({
            where: {
                id: taskId
            }
        });
        return deletedTask;
    }

}


export default taskServices;
