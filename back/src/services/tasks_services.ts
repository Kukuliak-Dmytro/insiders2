import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function addTaskToListById({ listId, title, description }: { listId: string, title: string, description: string }) {
    return prisma.task.create({
        data: {
            listId,
            title,
            description,
        }
    });
}

// async function editTaskById({taskId, title, description}:{taskId:string, title:string, description:string}){
//     return prisma.task.update({
//         where:{
//             id:taskId
//         },
//         data:{
//             title,
//             description
//         }
//     });
// }

async function deleteAllTasksByListId({ listId }: { listId: string }) {
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
}

const taskServices = {
    addTaskToListById,
    // editTaskById,
    deleteAllTasksByListId
};

export default taskServices;
