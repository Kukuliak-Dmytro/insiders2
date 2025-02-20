import { PrismaClient } from "@prisma/client";
import { getAllUserLists } from "../controllers/todo_controller";
const prisma = new PrismaClient();

const listService = {
    createListWithUserId: async ({ id, name }: { id: string, name: string }) => {
        return prisma.list.create({
            data: {
                ownerId: id,
                name: name
            }
        });
    },
    getOneListById: async ({ id }: { id: string }) => {
        const list = await prisma.list.findUnique({
            where: {
                id: id
            }
        });
        // if (list === null) {
        //     return null;
        // }
        return list;
    },
    getAllUserLists: async ({ id }: { id: string }) => {
        return prisma.list.findMany({
            where: {
                ownerId: id
            }
        });
    },
    editListById: async ({ listId, name }: { listId: string, name: string }) => {
        return prisma.list.update({
            where: {
                id: listId
            },
            data: {
                name,
                updated_at: new Date()
            }
        });
    },
    deleteListById: async ({ listId }: { listId: string }) => {
        const list = await prisma.list.findUnique({
            where: {
                id: listId
            }
        });
        if (list === null) {
            return null;
        }
        console.log("List: ", list);
        return prisma.list.delete({
            where: {
                id: listId
            }
        });
    },
    addAdminRoleByDefault: async ({ userId, listId }: { userId: string, listId: string }) => {
        return prisma.userListRoles.create({
            data: {
                userId,
                listId,
                role: "ADMIN"
            }
        });
    }
};

export default listService;

