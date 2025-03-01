import {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    console.info(`[request] [${JSON.stringify(config)}]`);
    return config;
}
