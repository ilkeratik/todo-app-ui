import { ToDo, useToDo } from '../../modules/todo-context/ToDoContext';

import { Card, ListGroup } from 'react-bootstrap';

const ToDoList = () => {
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
                            <Card className={"d-flex flex-row px-3 " + getBgColor(todo.priority)}>
                                <Card.Img className='rounded' variant="left" src={todo.image} alt={todo.title} style={{ width: '150px', height: 'auto' }} />
                                <Card.Body>
                                    <Card.Title>{todo.title}</Card.Title>
                                    <Card.Text>{todo.description}</Card.Text>
                                    <Card.Text>Priority: {todo.priority}</Card.Text>
                                </Card.Body>

                                <div className="d-flex align-items-center">
                                    <div className="me-3">
                                        <Card.Text className="text-success bg-light px-3 rounded">
                                            {(() => {
                                                switch (todo.status) {
                                                    case 'to-do':
                                                        return (
                                                            <i className="bi bi-circle text-secondary" style={{ fontSize: '2.5rem' }}></i>
                                                        );
                                                    case 'in-progress':
                                                        return (
                                                            <i className="bi bi-arrow-repeat text-warning" style={{ fontSize: '2.5rem' }}></i>
                                                        );
                                                    case 'done':
                                                        return (
                                                            <i className="bi bi-check-circle-fill" style={{ fontSize: '2.5rem' }}></i>
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