import { Request } from "express";
import { CustomApiError } from "../types/interface";
import { getUserByEmail, createUser, getUserById } from "../services/user_services";
import bcrypt from "bcrypt";
export async function authLogin({email, password}:{email:string, password:string}){
    if (!email || !password) {
        throw new CustomApiError("Email and password are required", 400);
    }
    
    const user = await getUserByEmail(email);
    if (!user) {
        throw new CustomApiError("User not found", 404);
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
            throw new CustomApiError("Invalid password", 400);
    }
    return user;
}
export async function authRegister({email, name, password}:{email:string, name:string, password:string}){

    if (!email || !name || !password) {
        throw new CustomApiError("Email, name and password are required", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user= await createUser({ email, name, password: hashedPassword });


    return user;
}
// export async function authRefresh({refreshToken}:{refreshToken:string}){
//     const user = await getUserById(refreshToken);
//     if (!user) {
//         throw new CustomApiError("User not found", 404);
//     }
//     return user;
// }
