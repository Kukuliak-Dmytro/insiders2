import axios from 'axios'


const AxiosAuthCLient = axios.create({ baseURL: 'http://localhost:4000', withCredentials:true })
