import { PrismaClient } from "@prisma/client";
import { CustomApiError } from "../types/interface";

const prisma = new PrismaClient();

export async function getUserByEmail(email: string) {
    return prisma.user.findUnique({
        where: { email },
    });
}
export async function getUserById(id: string) {
    return prisma.user.findUnique({
        where: { id },
    });
}
export async function createUser({ email, name, password }: { email: string; name: string; password: string }) {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        throw new CustomApiError("Email already in use", 400);
    }

    const user = await prisma.user.create({
        data: { email, name, password },
    });

    return user;
}