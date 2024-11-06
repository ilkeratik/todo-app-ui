import React, { useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { ToDo, useToDo } from '../../modules/todo-context/ToDoContext';

const ToDoModal = ({ show, handleClose }: { show: boolean; handleClose: () => void }) => {
    const { addToDo, updateToDo, deleteToDo, currentToDo, setCurrentToDo, currentAction } = useToDo();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentToDo !== null && currentAction === 'create') {
            addToDo(currentToDo);
        } else if (currentToDo !== null && currentAction === 'update') {
            updateToDo(currentToDo)
        }
        handleClose();
    };

    const handleDelete = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentToDo !== null)
            deleteToDo(currentToDo);
        handleClose();
    }
    useEffect(() => {
        if (!currentToDo || currentAction === 'create') {
            setCurrentToDo({ title: '', description: '', image: '', priority: '', status: 'TO_DO' } as ToDo);
        }
    }, [currentAction]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mt-2 mb-4' controlId="formTitle">
                        <Form.Label className='mb-0'>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter title"
                            value={currentToDo?.title || ''}
                            onChange={(e) => {
                                if (currentToDo) {
                                    setCurrentToDo({ ...currentToDo, title: e.target.value });
                                }
                            }}
                        />
                    </Form.Group>

                    <Form.Group className='my-4' controlId="formDescription">
                        <Form.Label className='mb-0'>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter description"
                            value={currentToDo?.description || ''}
                            onChange={(e) => {
                                if (currentToDo) {
                                    setCurrentToDo({ ...currentToDo, description: e.target.value });
                                }
                            }}
                        />
                    </Form.Group>

                    <Form.Group className='mt-2 mb-4' controlId="formTitle">
                        <Form.Label className='mb-0'>Category</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter title"
                            value={currentToDo?.category || ''}
                            onChange={(e) => {
                                if (currentToDo) {
                                    setCurrentToDo({ ...currentToDo, category: e.target.value });
                                }
                            }}
                        />
                    </Form.Group>

                    <Form.Group className='my-4' controlId="formImage">
                        <Form.Label className='mb-0'>Image URL</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter image URL"
                            value={currentToDo?.image || ''}
                            onChange={(e) => {
                                if (currentToDo) {
                                    setCurrentToDo({ ...currentToDo, image: e.target.value });
                                }
                            }}
                        />
                    </Form.Group>

                    <Form.Group className='my-4' controlId="formPriority">
                        <Form.Label className='mb-0 d-block pb-2'>Priority</Form.Label>
                        {['Low', 'Medium', 'High'].map((level) => (
                            <Form.Check
                                key={level}
                                type="radio"
                                label={level}
                                name="priority"
                                value={level}
                                checked={(currentToDo ?? {}).priority === level}
                                onChange={(e) => {
                                    if (currentToDo) {
                                        setCurrentToDo({ ...currentToDo, priority: e.target.value });
                                    }
                                }}
                                inline
                            />
                        ))}
                    </Form.Group>
                    <Form.Group className='my-4' controlId="formDeadline">
                        <Form.Label className='mb-0'>Deadline</Form.Label>
                        <Form.Control
                            type="date"
                            value={currentToDo?.deadline ? new Date(currentToDo.deadline).toISOString().split('T')[0] : ''}
                            onChange={(e) => {
                                if (currentToDo) {
                                    setCurrentToDo({ ...currentToDo, deadline: new Date(e.target.value).toISOString() });
                                }
                            }}
                        />
                    </Form.Group>
                    {currentAction === 'update' &&
                        <Form.Group className='my-4' controlId="formStatus">
                            <Form.Label className='mb-0 d-block pb-2'>Status</Form.Label>
                            {['TO_DO', 'IN_PROGRESS', 'DONE'].map((status) => (
                                <Form.Check
                                    key={status}
                                    type="radio"
                                    label={status.charAt(0).toUpperCase() + status.slice(1)}
                                    name="status"
                                    value={status}
                                    checked={(currentToDo ?? {}).status === status}
                                    onChange={(e) => {
                                        if (currentToDo) {
                                            setCurrentToDo({ ...currentToDo, status: e.target.value as 'TO_DO' | 'IN_PROGRESS' | 'DONE' });
                                        }
                                    }}
                                    inline
                                />
                            ))}
                        </Form.Group>
                    }
                    <div className="d-flex justify-content-center">
                        <Button className='my-2 me-2' variant="primary" type="submit">
                            {currentAction ? currentAction.charAt(0).toUpperCase() + currentAction.slice(1) : 'Submit'}
                        </Button>
                        {currentAction !== 'create' &&
                            < Button className='my-2 ms-5 me-2' variant="danger" size='sm' onClick={handleDelete}>
                                Delete
                            </Button>
                        }
                        <Button className='my-2' variant="secondary" size='sm' onClick={handleClose}>
                            Close
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal >
    );
};

export default ToDoModal;