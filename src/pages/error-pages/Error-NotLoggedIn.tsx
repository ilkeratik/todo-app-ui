import React from 'react';
import { Button, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ErrorNotLoggedIn: React.FC = () => {
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <div>
            <Row>
                <p className='text-center'>You are not logged in!</p>
                <Button onClick={handleLoginRedirect}>Go to Login</Button>
            </Row>

        </div>
    );
};

export default ErrorNotLoggedIn;