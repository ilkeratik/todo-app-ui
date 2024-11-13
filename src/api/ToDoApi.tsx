import axios, { AxiosError, AxiosInstance } from 'axios';
import { CreateToDoRequest, CreateToDoResponse, ErrorResponse, ToDoDTO, UpdateToDoRequest } from './Models';

class ToDoApiClient {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL: `${baseURL}/api/v1/todo`,
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 8000
        });
        this.axiosInstance.interceptors.response.use(
            (response) => response,
            (error: AxiosError<ErrorResponse>) => {
                // if (error.response?.status === 401)
                //     // window.location.href = '/logout';
                // else if (error.response?.status !== 200)
                //     window.location.reload()
                // return Promise.reject(handleApiError(error));
                return Promise.resolve(error.response);
            }
        );
    }

    setAuthHeader(token: string): void {
        this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    async createToDo(createToDoRequest: CreateToDoRequest): Promise<CreateToDoResponse | null> {
        const response = await this.axiosInstance.post<CreateToDoResponse>('', createToDoRequest);
        if (response === undefined) return null
        return response.data;
    }

    async getToDo(id: number): Promise<ToDoDTO | null> {
        const response = await this.axiosInstance.get<ToDoDTO>(`/${id}`);
        if (response === undefined) return null
        return response.data;
    }

    async getAllToDos(): Promise<ToDoDTO[] | null> {
        const response = await this.axiosInstance.get<ToDoDTO[]>('');
        if (response === undefined) return null
        return response.data;
    }

    async updateToDo(id: number, updateToDoRequest: UpdateToDoRequest): Promise<ToDoDTO | null> {
        const response = await this.axiosInstance.patch<ToDoDTO>(`/${id}`, updateToDoRequest);
        if (response === undefined) return null
        return response.data;
    }

    async deleteToDo(id: number): Promise<void> {
        await this.axiosInstance.delete(`/${id}`);
    }
}

const handleApiError = (error: AxiosError<ErrorResponse>): never => {
    if (error.response) {
        const { status, data } = error.response;
        switch (status) {
            case 401:
                console.error('Unauthorized:', data.message);
                break;
            case 403:
                console.error('Forbidden:', data.message);
                break;
            case 404:
                console.error('Not Found:', data.message);
                break;
            default:
                console.error('Error:', data.message);
        }
    } else if (error.request) {
        console.error('No response received:', error.request);
    } else {
        console.error('Error:', error.message);
    }
    throw error;
};
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
console.log(API_URL)
const apiClient = new ToDoApiClient(API_URL);

export { API_URL, apiClient, ToDoApiClient };
