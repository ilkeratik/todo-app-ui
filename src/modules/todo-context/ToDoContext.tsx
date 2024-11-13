import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { CreateToDoRequest } from '../../api/Models';
import { apiClient } from '../../api/ToDoApi';
import ToDoModal from '../../pages/todo/ToDoModal';

interface ToDo {
    id: number;
    title: string;
    description: string;
    image: string;
    priority: string;
    status: 'TO_DO' | 'IN_PROGRESS' | 'DONE';
    category: string;
    deadline: string;
    createdAt: string;
    updatedAt: string;
}

interface TodoContextType {
    todos: ToDo[];
    addToDo: (item: ToDo) => void;
    updateToDo: (item: ToDo) => void;
    deleteToDo: (item: ToDo) => void;
    currentToDo: ToDo | null;
    setCurrentToDo: (todo: ToDo) => void;
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    currentAction: 'create' | 'update' | 'delete' | null;
    setCurrentAction: (operation: 'create' | 'update' | 'delete' | null) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const ToDoProvider = ({ children }: { children: ReactNode }) => {
    const [todos, setToDos] = useState<ToDo[]>([]);
    const [currentToDo, setCurrentToDo] = useState<ToDo | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [currentAction, setCurrentAction] = useState<'create' | 'update' | 'delete' | null>(null);

    const addToDo = async (item: ToDo) => {
        await apiClient.createToDo(item as CreateToDoRequest);
        await fetchTodos();
    };

    const updateToDo = async (item: ToDo) => {
        console.log('update', item, currentAction)
        await apiClient.updateToDo(item.id, item as CreateToDoRequest);
        await fetchTodos();
    }

    const deleteToDo = async (item: ToDo) => {
        await apiClient.deleteToDo(item.id);
        await fetchTodos();
    }
    const fetchTodos = async () => {
        const data = await apiClient.getAllToDos();
        if (data === null) {
            window.location.href = '/logout';
            return;
        }
        const todos = data.map(dto => ({
            id: dto.id,
            title: dto.title,
            description: dto.description,
            image: dto.image,
            priority: dto.priority,
            status: dto.status,
            category: dto.category,
            deadline: dto.deadline,
            createdAt: dto.createdAt,
            updatedAt: dto.updatedAt,
        } as ToDo));
        setToDos(todos);
    };
    useEffect(() => {
        fetchTodos()
    }, []);

    return (
        <TodoContext.Provider value={{ todos, addToDo, updateToDo, deleteToDo, currentToDo, setCurrentToDo, showModal, setShowModal, currentAction, setCurrentAction }}>
            {children}
            <ToDoModal show={showModal} handleClose={() => setShowModal(false)} />
        </TodoContext.Provider>
    );
};

const useToDo = (): TodoContextType => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodo must be used within a TodoProvider');
    }
    return context;
};

export { ToDoProvider, useToDo };
export type { ToDo };

