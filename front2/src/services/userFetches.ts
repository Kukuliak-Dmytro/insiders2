import axios from 'axios';
import { LoginResponse,LoginData } from '@/types/authTypes';
import axiosClient from '@/utils/http';
// const axiosClient = axios.create({
//     baseURL: 'http://localhost:3000',
//     timeout: 1000,
//     headers: { 'Content-Type': 'application/json' }
// });

export const login = async ({ email, password }: LoginData): Promise<LoginResponse> => {
    const response = await axiosClient.post<LoginResponse>('/auth/login', { email, password });
    return response.data;
};

export const refresh=async():Promise<void>=>{
    const response=await axiosClient.post('/auth/refersh')
    return response.data
}