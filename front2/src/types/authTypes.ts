export interface LoginData {
    email: string,
    password: string
}
export interface RegisterData extends LoginData {
    name: string;
}
export interface LoginResponse {
    userId: string;
    accessToken: string
}