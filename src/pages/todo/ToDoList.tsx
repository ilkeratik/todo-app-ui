import { ToDo, useToDo } from '../../modules/todo-context/ToDoContext';

import { Card, Col, ListGroup, Row } from 'react-bootstrap';

const ToDoList = () => {
    const { addToDo } = useToDo();

    const handleStatusChange = (e: React.MouseEvent, todo: ToDo, direction: 0 | 1 = 1) => {
        e.stopPropagation();
        let newStatus: 'to-do' | 'in-progress' | 'done';
        switch (todo.status) {
            case 'to-do':
                direction === 1 ? newStatus = 'in-progress' : newStatus = 'to-do';
                break;
            case 'in-progress':
                direction === 1 ? newStatus = 'done' : newStatus = 'to-do';
                break;
            case 'done':
                direction === 1 ? newStatus = 'to-do' : newStatus = 'in-progress';
                break;
            default:
                newStatus = 'to-do';
        }
        addToDo({ ...todo, status: newStatus });
    }
    const setStatusOfToDo = (todo: ToDo, newStatus: 'to-do' | 'in-progress' | 'done') => {
        console.log(`Setting status of ${todo.title} to ${newStatus}`);
        addToDo({ ...todo, status: newStatus });
    }

    const { todos, setCurrentToDo, setShowModal, setCurrentAction } = useToDo();
    function handleItemClick(todo: ToDo): void {
        setCurrentToDo(todo);
        setCurrentAction("update");
        setShowModal(true);
    }

    const handleDrop = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        const droppedTodo = JSON.parse(e.dataTransfer.getData('text/plain'));
        const targetElement = e.currentTarget.closest('[data-column]');
        const targetColumn = targetElement ? targetElement.getAttribute('data-column') : null;
        if (!targetColumn || !droppedTodo || droppedTodo.status === targetColumn) return;
        else if (targetColumn === 'to-do') setStatusOfToDo(droppedTodo as ToDo, 'to-do');
        else if (targetColumn === 'in-progress') setStatusOfToDo(droppedTodo as ToDo, 'in-progress');
        else if (targetColumn === 'done') setStatusOfToDo(droppedTodo as ToDo, 'done');
    }
    return (
        <div className='py-4'>
            <h4>Todo List</h4>
            <Row>
                <Col data-column='to-do' md='4'
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        handleDrop(e);
                    }}
                >
                    <ListGroup>
                        <ListGroup.Item key='header' className='bg-primary text-white'>To Do</ListGroup.Item>
                        {todos.filter(todo => todo.status === 'to-do')
                            .sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime())
                            .map((todo: ToDo, index) =>
                                <ToDoItem todo={todo} index={index} handleStatusChange={handleStatusChange} setStatusOfToDo={setStatusOfToDo} handleItemClick={handleItemClick} />
                            )}
                    </ListGroup>
                </Col>
                <Col data-column='in-progress' md='4'
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        handleDrop(e);
                    }}
                >
                    <ListGroup >
                        <ListGroup.Item key='header' className='bg-primary text-white'>In Progress</ListGroup.Item>
                        {todos.filter(todo => todo.status === 'in-progress')
                            .sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime())
                            .map((todo: ToDo, index) =>
                                <ToDoItem todo={todo} index={index} handleStatusChange={handleStatusChange} setStatusOfToDo={setStatusOfToDo} handleItemClick={handleItemClick} />
                            )}
                    </ListGroup>
                </Col>
                <Col data-column='done' md='4'
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        handleDrop(e);
                    }}>
                    <ListGroup >
                        <ListGroup.Item key='header' className='bg-primary text-white'>Done</ListGroup.Item>
                        {todos.filter(todo => todo.status === 'done')
                            .sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime())
                            .map((todo: ToDo, index) =>
                                <ToDoItem todo={todo} index={index} handleStatusChange={handleStatusChange} setStatusOfToDo={setStatusOfToDo} handleItemClick={handleItemClick} />
                            )}
                    </ListGroup>
                </Col>
            </Row>


        </div>
    );
};
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
const ToDoItem = ({ todo, index, handleStatusChange, setStatusOfToDo, handleItemClick }: { todo: ToDo, index: number, handleStatusChange: (e: React.MouseEvent, todo: ToDo, direction: 0 | 1) => void, setStatusOfToDo: (todo: ToDo, status: 'to-do' | 'in-progress' | 'done') => void, handleItemClick: (todo: ToDo) => void }) => {
    return (
        <ListGroup.Item key={todo.id}
            draggable
            onDragStart={(e) => e.dataTransfer.setData('text/plain', JSON.stringify(todo))}
            style={{ fontSize: '0.7rem' }}
        >
            <Card className={"d-flex flex-row " + getBgColor(todo.priority)}>
                <Card.Header className='d-flex justify-content-between'>
                    <div className='d-flex align-items-center mb-2 flex-column'>
                        <Card.Img
                            className='rounded-circle mb-2'
                            variant="left"
                            src={todo.image || 'https://w7.pngwing.com/pngs/491/126/png-transparent-questionnaire-test-exam-to-do-list-notes-icon-thumbnail.png'}
                            alt={todo.title}
                            style={{ width: '75px', height: '75px' }}
                        />
                        <div className="px-2 py-1 bg-light rounded mb-2">
                            <Card.Text>Due: {todo.deadline ?? 'Not set'}</Card.Text>
                        </div>

                        <button className="text-success rounded border-0" onClick={(e) => handleItemClick(todo)}>
                            <i className="bi bi-pencil-square text-secondary" style={{ fontSize: '1.5rem' }}></i>
                        </button>
                    </div>

                </Card.Header>
                <Card.Body>
                    <div className="p-2 bg-secondary text-light rounded mb-2">
                        <Card.Title style={{ fontSize: '0.9rem', marginBottom: 0 }}>{todo.title}</Card.Title>
                    </div>
                    <div className="p-2 bg-light rounded mb-2" style={{ height: '120px' }}>
                        <Card.Text>{todo.description}</Card.Text>
                    </div>
                    <div className='navigation d-flex align-items-center justify-content-evenly flex-row mb-2'>
                        {todo.status !== 'to-do' && (
                            <button className="text-success rounded border-0 me-2" style={{ fontSize: '1.1rem' }} onClick={(e) => handleStatusChange(e, todo, 0)}>
                                <i className="bi bi-arrow-left text-secondary"></i>
                            </button>
                        )}
                        {todo.status !== 'done' && (
                            <button className="text-success rounded border-0" style={{ fontSize: '1.1rem' }} onClick={(e) => handleStatusChange(e, todo, 1)}>
                                <i className="bi bi-arrow-right text-secondary"></i>
                            </button>
                        )}
                    </div>
                </Card.Body>
            </Card>
        </ListGroup.Item>
    );
}
export default ToDoList;