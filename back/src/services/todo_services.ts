import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient();
export async function createListWithUserId({id, name}:{id:string, name:string}){
    return prisma.list.create({
        data:{
            ownerId:id,
            name:name

        }
    });
}
export async function addTaskToListById({listId, title, description}:{listId:string, title:string, description:string}){
    return prisma.task.create({
        data:{
            listId,
            title,
            description,
        }
    });
}

export async function addAdminRoleByDefault({userId, listId}:{userId:string, listId:string}){
    return prisma.userListRoles.create({
        data:{
            userId,
            listId,
            role:"ADMIN"
        }
    });

}
