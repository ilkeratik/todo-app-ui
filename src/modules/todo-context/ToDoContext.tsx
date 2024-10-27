import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import ToDoModal from '../../pages/todo/ToDoModal';

interface ToDo {
    id: string;
    title: string;
    description: string;
    image: string;
    priority: string;
    status: 'to-do' | 'in-progress' | 'done';
    category: string;
    deadline: string;
}

interface TodoContextType {
    todos: ToDo[];
    addToDo: (todo: ToDo) => void;
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
    useEffect(() => {
        const existingTodos = JSON.parse(localStorage.getItem('todos') || '[]');
        setToDos(existingTodos);
    }, []);

    const addToDo = (newTodo: ToDo) => {
        const updatedTodos = todos.some(todo => todo.id === newTodo.id)
            ? todos.map(todo => todo.id === newTodo.id ? newTodo : todo)
            : [...todos, newTodo];
        setToDos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };

    return (
        <TodoContext.Provider value={{ todos, addToDo, currentToDo, setCurrentToDo, showModal, setShowModal, currentAction, setCurrentAction }}>
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

