import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/UseAuth';

const HandleIdpLogin = () => {
    const { isAuthenticated, setAuth } = useAuth();
    const navigate = useNavigate();

    const handleLogin = useCallback(async () => {
        await setAuth(true);
        window.location.reload();
    }, [setAuth]);

    useEffect(() => {
        handleLogin();
    }, [handleLogin]);

    useEffect(() => {
        if (isAuthenticated) {
            console.log('Is authenticated:', isAuthenticated);
            navigate('/profile');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div>
                <div className="spinner-border" role="status" style={{ display: 'block', margin: '0 auto' }}>
                </div>
                <p className='mt-2 text-center'>Handling AWS IDP login...</p>
            </div>
        </div>
    );
};

export default HandleIdpLogin;