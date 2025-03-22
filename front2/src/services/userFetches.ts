import { LoginResponse,LoginData, RegisterData } from '@/types/authTypes';
import axiosClient from '@/utils/http';
/**
 * Logs in a user with the provided email and password.
 *
 * @param {LoginData} param0 - An object containing the user's email and password.
 * @param {string} param0.email - The user's email address.
 * @param {string} param0.password - The user's password.
 * @returns {Promise<LoginResponse>} A promise that resolves to the login response.
 */

export const login = async ({ email, password }: LoginData): Promise<LoginResponse> => {
    const response = await axiosClient.post<LoginResponse>('/auth/login', { email, password });
    return response.data;
};

export const regisister=async({name, email, password}:RegisterData)=>{
    const response=await axiosClient.post<LoginResponse>('/auth/register', {name, email, password})
    return response.data;
}
export const refresh=async():Promise<LoginResponse>=>{
    const response=await axiosClient.post('/auth/refersh')
    return response.data
}