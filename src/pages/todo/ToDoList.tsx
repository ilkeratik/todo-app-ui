import { useEffect, useState } from 'react';
import { ToDo, useToDo } from '../../modules/todo-context/ToDoContext';

import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';

const ToDoList = () => {
    const { todos: unfilteredTodo, setCurrentToDo, updateToDo, deleteToDo, setShowModal, setCurrentAction } = useToDo();
    const handleStatusChange = async (e: React.MouseEvent, todo: ToDo, direction: 0 | 1 = 1) => {
        e.stopPropagation();
        let newStatus: 'TO_DO' | 'IN_PROGRESS' | 'DONE';
        switch (todo.status) {
            case 'TO_DO':
                direction === 1 ? newStatus = 'IN_PROGRESS' : newStatus = 'TO_DO';
                break;
            case 'IN_PROGRESS':
                direction === 1 ? newStatus = 'DONE' : newStatus = 'TO_DO';
                break;
            case 'DONE':
                direction === 1 ? newStatus = 'TO_DO' : newStatus = 'IN_PROGRESS';
                break;
            default:
                newStatus = 'TO_DO';
        }
        todo.status = newStatus;
        updateToDo(todo);
    }
    const setStatusOfToDo = async (todo: ToDo, newStatus: 'TO_DO' | 'IN_PROGRESS' | 'DONE') => {
        todo.status = newStatus;
        await updateToDo(todo);
    }

    function handleItemClick(todo: ToDo): void {
        setCurrentToDo(todo);
        setCurrentAction("update");
        setShowModal(true);
    }
    const handleDeleteClick = (todo: ToDo): void => {
        deleteToDo(todo);
    }
    const [todos, setSortAndFilterAppliedTodos] = useState<ToDo[]>(unfilteredTodo);
    const [priorityFilter, setPriorityFilter] = useState<string>('all');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [sortOption, setSortOption] = useState<string>('creationDate');
    const [collapsedList, setCollapsedList] = useState<boolean[]>([false, false, false]);
    useEffect(() => {
        let filteredTodos = unfilteredTodo;
        if (priorityFilter !== '' && priorityFilter !== 'all') {
            filteredTodos = filteredTodos.filter(todo => todo.priority.toLowerCase() === priorityFilter.toLowerCase());
        }

        if (categoryFilter !== '' && categoryFilter !== 'all') {
            filteredTodos = filteredTodos.filter(todo => todo.category && todo.category.toLowerCase() === categoryFilter.toLowerCase());
        }

        switch (sortOption) {
            case 'creationDateAsc':
                filteredTodos = [...filteredTodos].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                break;
            case 'creationDateDesc':
                filteredTodos = [...filteredTodos].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
            case 'deadline':
                filteredTodos = [...filteredTodos].sort((a, b) => {
                    if (!a.deadline) return 1;
                    if (!b.deadline) return -1;
                    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
                });
                break;
            case 'priority':
                filteredTodos = [...filteredTodos].sort((a, b) => {
                    const priorityOrder = ['high', 'medium', 'low', ''];
                    return priorityOrder.indexOf(a.priority.toLowerCase()) - priorityOrder.indexOf(b.priority.toLowerCase());
                });
                break;
            default:
                break;
        }

        setSortAndFilterAppliedTodos(filteredTodos);
    }, [unfilteredTodo, priorityFilter, categoryFilter, sortOption]);

    const handleDrop = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        const droppedTodo = JSON.parse(e.dataTransfer.getData('text/plain'));
        const targetElement = e.currentTarget.closest('[data-column]');
        const targetColumn = targetElement ? targetElement.getAttribute('data-column') : null;
        if (!targetColumn || !droppedTodo || droppedTodo.status === targetColumn) return;
        else if (targetColumn === 'TO_DO') setStatusOfToDo(droppedTodo as ToDo, 'TO_DO');
        else if (targetColumn === 'IN_PROGRESS') setStatusOfToDo(droppedTodo as ToDo, 'IN_PROGRESS');
        else if (targetColumn === 'DONE') setStatusOfToDo(droppedTodo as ToDo, 'DONE');
    }
    return (
        <div>
            <Row className='filter-sort mb-2'>
                <Col lg='3' className='my-3'>
                    <label htmlFor="sortOption" className="form-label">Sort by</label>
                    <select id="sortOption" className="form-select" onChange={(e) => setSortOption(e.target.value)}>
                        <option value="creationDateAsc">Creation Date, Oldest First</option>
                        <option value="creationDateDesc">Creation Date, Newest First</option>
                        <option value="deadline">Deadline</option>
                        <option value="priority">Priority</option>
                    </select>
                </Col>
                <Col lg='3'>
                    <div className='my-3'>
                        <label htmlFor="priorityFilter" className="form-label">Filter by Priority</label>
                        <select id="priorityFilter" className="form-select" onChange={(e) => setPriorityFilter(e.target.value)}>
                            <option value="all">All</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                </Col>
                <Col lg='3'>
                    <div className='my-3'>
                        <label htmlFor="categoryFilter" className="form-label">Filter by Category</label>
                        <select id="categoryFilter" className="form-select" onChange={(e) => { setCategoryFilter(e.target.value) }}>
                            <option value="all">All</option>
                            {Array.from(new Set(unfilteredTodo.map(todo => todo.category))).map((category, index) => (
                                category !== null && category.length > 0 && <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                </Col>
                <Col lg='3' className="d-flex align-items-end my-3">
                    <Button variant="warning" className="w-70" onClick={() => {
                        setPriorityFilter('all');
                        setCategoryFilter('all');
                        setSortOption('creationDate');
                        (document.getElementById('priorityFilter') as HTMLSelectElement).value = 'all';
                        (document.getElementById('categoryFilter') as HTMLSelectElement).value = 'all';
                        (document.getElementById('sortOption') as HTMLSelectElement).value = 'creationDateAsc';
                    }}>
                        Reset to Default
                    </Button>
                </Col>
            </Row>
            <Row style={{ minHeight: '90vh' }}>
                <Col data-column='TO_DO' lg='4'
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        handleDrop(e);
                    }}
                >
                    <ListGroup>
                        <ListGroup.Item key='header' className='bg-primary text-white'><Row>
                            <Col xs='10'>
                                <span> To Do </span>
                            </Col>
                            <Col xs='2'>
                                <Button variant="info" size='sm'
                                    onClick={() => {
                                        const listItems = document.querySelectorAll(`[data-column='TO_DO'] .real-list-item`);
                                        listItems.forEach(item => item.classList.toggle('collapsed'));
                                        setCollapsedList([!collapsedList[0], collapsedList[1], collapsedList[2]]);
                                    }}
                                >
                                    <i className={`bi ${collapsedList[0] ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                                </Button>
                            </Col>
                        </Row></ListGroup.Item>
                        {todos.filter(todo => todo.status === 'TO_DO')
                            .map((todo: ToDo, index) =>
                                <ToDoItem key={todo.id} todo={todo} index={index} handleDeleteClick={handleDeleteClick} handleStatusChange={handleStatusChange} setStatusOfToDo={setStatusOfToDo} handleItemClick={handleItemClick} />
                            )}
                    </ListGroup>
                </Col>
                <Col data-column='IN_PROGRESS' lg='4'
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        handleDrop(e);
                    }}
                >
                    <ListGroup >
                        <ListGroup.Item key='header' className='bg-primary text-white'>
                            <Row>
                                <Col xs='10'>
                                    <span> In Progress </span>
                                </Col>
                                <Col xs='2'>
                                    <Button variant="info" size='sm'
                                        onClick={() => {
                                            const listItems = document.querySelectorAll(`[data-column='IN_PROGRESS'] .real-list-item`);
                                            listItems.forEach(item => item.classList.toggle('collapsed'));
                                            setCollapsedList([collapsedList[0], !collapsedList[1], collapsedList[2]]);
                                        }}
                                    >
                                        <i className={`bi ${collapsedList[1] ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        {todos.filter(todo => todo.status === 'IN_PROGRESS')
                            .map((todo: ToDo, index) =>
                                <ToDoItem key={todo.id} todo={todo} index={index} handleDeleteClick={handleDeleteClick} handleStatusChange={handleStatusChange} setStatusOfToDo={setStatusOfToDo} handleItemClick={handleItemClick} />
                            )}
                    </ListGroup>
                </Col>
                <Col data-column='DONE' lg='4'
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        handleDrop(e);
                    }}>
                    <ListGroup >
                        <ListGroup.Item key='header' className='bg-primary text-white'>
                            <Row>
                                <Col xs='10'>
                                    <span> Done </span>
                                </Col>
                                <Col xs='2'>
                                    <Button variant="info" size='sm'
                                        onClick={() => {
                                            const listItems = document.querySelectorAll(`[data-column='DONE'] .real-list-item`);
                                            listItems.forEach(item => item.classList.toggle('collapsed'));
                                            setCollapsedList([collapsedList[0], collapsedList[1], !collapsedList[2]]);
                                        }}
                                    >
                                        <i className={`bi ${collapsedList[2] ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        {todos.filter(todo => todo.status === 'DONE')
                            .map((todo: ToDo, index) =>
                                <ToDoItem key={todo.id} todo={todo} index={index} handleDeleteClick={handleDeleteClick} handleStatusChange={handleStatusChange} setStatusOfToDo={setStatusOfToDo} handleItemClick={handleItemClick} />
                            )}
                    </ListGroup>

                </Col>
            </Row>
        </div >
    );
};
const isValidUrl = (url: string) => {
    return url.includes('http')
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
const ToDoItem = ({ todo, index, handleStatusChange, setStatusOfToDo, handleItemClick, handleDeleteClick }: { todo: ToDo, index: number, handleStatusChange: (e: React.MouseEvent, todo: ToDo, direction: 0 | 1) => void, setStatusOfToDo: (todo: ToDo, status: 'TO_DO' | 'IN_PROGRESS' | 'DONE') => void, handleItemClick: (todo: ToDo) => void, handleDeleteClick: (todo: ToDo) => void }) => {
    return (
        <ListGroup.Item key={'li' + todo.id}
            className='real-list-item'
            draggable
            onDragStart={(e) => e.dataTransfer.setData('text/plain', JSON.stringify(todo))}
            style={{ fontSize: '0.7rem' }}
        >
            <Card className={"d-flex flex-row " + getBgColor(todo.priority)}>
                <Card.Header className=''>
                    <div className='d-flex align-items-center mb-2 flex-column'>
                        <Card.Img
                            className='rounded-circle mb-2'
                            variant="left"
                            src={isValidUrl(todo.image) ? todo.image : 'todo-icon.png'}
                            alt={todo.title}
                            style={{ width: '50px', height: '50px' }}
                        />
                        <div className="px-2 py-1 bg-light rounded mb-2">
                            <Card.Text style={{ minWidth: '86px', textAlign: 'center' }}>⏰ {todo.deadline ?
                                new Date(todo.deadline).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                                : 'Not set'}
                            </Card.Text>
                        </div>
                        <div className="px-2 py-1 bg-light rounded mb-2">
                            <Card.Text style={{ minWidth: '86px', maxWidth: '86px', textAlign: 'center' }}>🏷️ {todo.category ? todo.category : 'No category'}
                            </Card.Text>
                        </div>
                        <div className='navigation d-flex align-items-center justify-content-evenly flex-row my-2   '>
                            <button className="text-success rounded border-0 me-2" onClick={(e) => handleItemClick(todo)}>
                                <i className="bi bi-pencil-square text-info" style={{ fontSize: '1.2rem' }}></i>
                            </button>
                            <button className="text-success rounded border-0" onClick={(e) => handleDeleteClick(todo)}>
                                <i className="bi bi-trash text-danger" style={{ fontSize: '1.2rem' }}></i>
                            </button>
                        </div>
                        <div className='navigation d-flex align-items-center justify-content-evenly flex-row my-2'>
                            {todo.status !== 'TO_DO' && (
                                <button className="text-success rounded border-0 me-2" style={{ fontSize: '1.1rem' }} onClick={(e) => handleStatusChange(e, todo, 0)}>
                                    <i className="bi bi-arrow-left text-secondary"></i>
                                </button>
                            )}
                            {todo.status !== 'DONE' && (
                                <button className="text-success rounded border-0" style={{ fontSize: '1.1rem' }} onClick={(e) => handleStatusChange(e, todo, 1)}>
                                    <i className="bi bi-arrow-right text-secondary"></i>
                                </button>
                            )}
                        </div>
                    </div>

                </Card.Header>
                <Card.Body>
                    <div className="p-2 bg-secondary text-light rounded mb-2">
                        <Card.Title style={{ fontSize: '0.9rem', marginBottom: 0 }}>{todo.title}</Card.Title>
                    </div>
                    <div className="p-2 bg-light rounded mb-2" style={{ height: '140px' }}>
                        <Card.Text>{todo.description}</Card.Text>
                    </div>

                </Card.Body>
            </Card>
        </ListGroup.Item>
    );
}
export default ToDoList;