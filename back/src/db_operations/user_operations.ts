import { Request } from "express";
import { CustomApiError } from "../types/interface";
export async function authLogin({email, password}:{email:string, password:string}){
    if (!email || !password) {
        throw new CustomApiError("Email and password are required", 400);
    }
    

}