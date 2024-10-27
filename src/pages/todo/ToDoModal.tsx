import React, { useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { ToDo, useToDo } from '../../modules/todo-context/ToDoContext';

const ToDoModal = ({ show, handleClose }: { show: boolean; handleClose: () => void }) => {
    const { addToDo, currentToDo, setCurrentToDo, currentAction } = useToDo();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentToDo) return;
        if (currentToDo.id === '') {
            currentToDo.id = uuidv4();
        }
        addToDo(currentToDo);
        handleClose();
    };

    useEffect(() => {
        if (!currentToDo || currentAction === 'create') {
            setCurrentToDo({ id: '', title: '', description: '', image: '', priority: '', status: 'to-do' } as ToDo);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                            value={currentToDo?.deadline || ''}
                            onChange={(e) => {
                                if (currentToDo) {
                                    setCurrentToDo({ ...currentToDo, deadline: e.target.value });
                                }
                            }}
                        />
                    </Form.Group>
                    {currentAction === 'update' &&
                        <Form.Group className='my-4' controlId="formStatus">
                            <Form.Label className='mb-0 d-block pb-2'>Status</Form.Label>
                            {['to-do', 'in-progress', 'done'].map((status) => (
                                <Form.Check
                                    key={status}
                                    type="radio"
                                    label={status.charAt(0).toUpperCase() + status.slice(1)}
                                    name="status"
                                    value={status}
                                    checked={(currentToDo ?? {}).status === status}
                                    onChange={(e) => {
                                        if (currentToDo) {
                                            setCurrentToDo({ ...currentToDo, status: e.target.value as 'to-do' | 'in-progress' | 'done' });
                                        }
                                    }}
                                    inline
                                />
                            ))}
                        </Form.Group>
                    }
                    <div className="d-flex justify-content-center">
                        <Button className='my-2 px-5 me-2' variant="primary" type="submit">
                            {currentAction ? currentAction.charAt(0).toUpperCase() + currentAction.slice(1) : 'Submit'}
                        </Button>
                        <Button className='my-2 px-5' variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ToDoModal;