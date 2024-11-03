interface CreateToDoRequest {
    title: string;
    description: string;
    image?: string;
    priority: string;
    status: string;
    category?: string;
    deadline?: string; // ISO 8601 date string
}

interface UpdateToDoRequest {
    title?: string;
    description?: string;
    image?: string;
    priority?: string;
    status?: string;
    category?: string;
    deadline?: string;
}

interface CreateToDoResponse {
    id: number;
}

interface ToDoDTO {
    title: string;
    description: string;
    image: string | null;
    priority: string;
    status: string;
    category: string | null;
    deadline: string | null;
    createdAt: string;
    updatedAt: string;
}

interface ErrorResponse {
    timestamp: string;
    status: number;
    error: string;
    message: string;
    path: string;
}