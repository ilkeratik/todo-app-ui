import { ToDoProvider } from "../../modules/todo-context/ToDoContext";
import Dashboard from "../Dashboard";

const DashboardContextWrapper = () => {

    return (
        <ToDoProvider>
            <Dashboard />
        </ToDoProvider>
    );
};

export default DashboardContextWrapper;
