import { LoginResponse,LoginData, RegisterData } from '@/types/authTypes';
import axiosClient from '@/utils/http';
export const login = async ({ email, password }: LoginData): Promise<LoginResponse> => {
    const response = await axiosClient.post<LoginResponse>('/auth/login', { email, password });
    return response.data;
};

export const regisister=async({name, email, password}:RegisterData)=>{
    const response=await axiosClient.post<LoginResponse>('/auth/register', {name, email, password})
    return response.data;
}
export const refresh=async():Promise<void>=>{
    const response=await axiosClient.post('/auth/refersh')
    return response.data
}