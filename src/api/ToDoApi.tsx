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
                return Promise.reject(handleApiError(error));
            }
        );
    }

    setAuthHeader(token: string): void {
        this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    async createToDo(createToDoRequest: CreateToDoRequest): Promise<CreateToDoResponse> {
        const response = await this.axiosInstance.post<CreateToDoResponse>('', createToDoRequest);
        return response.data;
    }

    async getToDo(id: number): Promise<ToDoDTO> {
        const response = await this.axiosInstance.get<ToDoDTO>(`/${id}`);
        return response.data;
    }

    async getAllToDos(): Promise<ToDoDTO[]> {
        const response = await this.axiosInstance.get<ToDoDTO[]>('');
        return response.data;
    }

    async updateToDo(id: number, updateToDoRequest: UpdateToDoRequest): Promise<ToDoDTO> {
        const response = await this.axiosInstance.patch<ToDoDTO>(`/${id}`, updateToDoRequest);
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
const apiClient = new ToDoApiClient('http://your-api-base-url');

export { apiClient, ToDoApiClient };

async function createNewToDo() {
    try {
        const newToDo: CreateToDoRequest = {
            title: "New Task",
            description: "This is a new task",
            priority: "HIGH",
            status: "TO_DO",
            category: "WORK",
            deadline: new Date().toISOString()
        };
        const response = await apiClient.createToDo(newToDo);
        console.log("Created ToDo with ID:", response.id);
    } catch (error) {
        console.error('Error creating todo:', error);
    }
}

// Example of updating a ToDo
async function updateToDo(id: number) {
    try {
        const updateData: UpdateToDoRequest = {
            title: "Updated Task",
            status: "IN_PROGRESS",
        };
        const updatedToDo = await apiClient.updateToDo(id, updateData);
        console.log("Updated ToDo:", updatedToDo);
    } catch (error) {
        console.error('Error updating todo:', error);
    }
}