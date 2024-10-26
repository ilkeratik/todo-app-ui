import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const CreateToDoModal = ({ show, handleClose }: { show: boolean; handleClose: () => void }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [priority, setPriority] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log({ title, description, image, priority });
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create To-Do</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mt-2 mb-4' controlId="formTitle">
                        <Form.Label className='mb-0'>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className='my-4' controlId="formDescription">
                        <Form.Label className='mb-0'>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className='my-4' controlId="formImage">
                        <Form.Label className='mb-0'>Image URL</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter image URL"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className='my-4' controlId="formPriority">
                        <Form.Label className='mb-0'>Priority</Form.Label>
                        <div>
                            <Form.Check
                                type="radio"
                                label="Low"
                                name="priority"
                                value="Low"
                                checked={priority === 'Low'}
                                onChange={(e) => setPriority(e.target.value)}
                                inline
                            />
                            <Form.Check
                                type="radio"
                                label="Medium"
                                name="priority"
                                value="Medium"
                                checked={priority === 'Medium'}
                                onChange={(e) => setPriority(e.target.value)}
                                inline
                            />
                            <Form.Check
                                type="radio"
                                label="High"
                                name="priority"
                                value="High"
                                checked={priority === 'High'}
                                onChange={(e) => setPriority(e.target.value)}
                                inline
                            />
                        </div>
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                        <Button className='my-2 px-5' variant="primary" type="submit">
                            Create
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CreateToDoModal;