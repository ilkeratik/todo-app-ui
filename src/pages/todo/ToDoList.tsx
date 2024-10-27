import { ToDo, useToDo } from '../../modules/todo-context/ToDoContext';

import { Card, ListGroup } from 'react-bootstrap';

const ToDoList = () => {
    const { addToDo } = useToDo();
    const getBgColor = (priority: string) => {
        switch (priority.toLowerCase()) {
            case 'high':
                return 'bg-danger-light';
            case 'medium':
                return 'bg-warning-light';
            case 'low':
                return 'bg-success-light';
            default:
                return '';
        }
    }
    const handleStatusChange = (e: React.MouseEvent, todo: ToDo) => {
        e.stopPropagation();
        let newStatus: 'to-do' | 'in-progress' | 'done';
        switch (todo.status) {
            case 'to-do':
                newStatus = 'in-progress';
                break;
            case 'in-progress':
                newStatus = 'done';
                break;
            case 'done':
                newStatus = 'to-do';
                break;
            default:
                newStatus = 'to-do';
        }
        addToDo({ ...todo, status: newStatus });
    }

    const { todos, setCurrentToDo, setShowModal, setCurrentAction } = useToDo();
    function handleItemClick(todo: ToDo): void {
        setCurrentToDo(todo);
        setCurrentAction("update");
        setShowModal(true);
    }
    return (
        <div className='py-4'>
            <h4>Todo List</h4>
            <ListGroup >
                {todos.map((todo: ToDo, index) => {
                    return (
                        <ListGroup.Item key={index} action onClick={() => handleItemClick(todo)} >
                            <Card className={"d-flex flex-row px-3 py-2 " + getBgColor(todo.priority)}>
                                <Card.Img
                                    className='rounded-circle'
                                    variant="left"
                                    src={todo.image || 'https://w7.pngwing.com/pngs/491/126/png-transparent-questionnaire-test-exam-to-do-list-notes-icon-thumbnail.png'}
                                    alt={todo.title}
                                    style={{ width: '150px', height: '150px' }}
                                />
                                <Card.Body>
                                    <Card.Title>{todo.title}</Card.Title>
                                    <Card.Text>{todo.description}</Card.Text>
                                    <Card.Text>Priority: {todo.priority}</Card.Text>
                                    <Card.Text>Deadline: {todo.deadline ?? 'Not set'}</Card.Text>
                                </Card.Body>

                                <div className="d-flex align-items-center" onClick={(e) => handleStatusChange(e, todo)}>
                                    <div className="me-3">
                                        <Card.Text className="text-success bg-light px-3 rounded">
                                            {(() => {
                                                switch (todo.status) {
                                                    case 'to-do':
                                                        return (
                                                            <i className="bi bi-hourglass text-secondary" style={{ fontSize: '2.1rem' }}></i>
                                                        );
                                                    case 'in-progress':
                                                        return (
                                                            <i className="bi bi-arrow-repeat text-warning" style={{ fontSize: '2.1rem' }}></i>
                                                        );
                                                    case 'done':
                                                        return (
                                                            <i className="bi bi-check2-square" style={{ fontSize: '2.1rem' }}></i>
                                                        );
                                                    default:
                                                        return null;
                                                }
                                            })()}
                                        </Card.Text>
                                    </div>
                                </div>
                            </Card>
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
        </div>
    );
};

export default ToDoList;