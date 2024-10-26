import { useEffect } from 'react';
import useAuth from '../hooks/UseAuth';

const Logout = () => {
    const { isAuthenticated, setAuth } = useAuth();
    useEffect(() => {
        if (isAuthenticated) {
            setAuth(false)
            window.location.reload();
        }
    }, []);

    return null;
};

export default Logout;