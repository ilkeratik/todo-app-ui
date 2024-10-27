import { useEffect } from 'react';
import useAuth from '../../hooks/UseAuth';

const Logout = () => {
    const { isAuthenticated, setAuth, setUser } = useAuth();
    const logout = async () => {
        if (isAuthenticated) {
            await setAuth(false)
            await setUser(null)
        }
    }
    useEffect(() => {
        logout()
        window.location.reload()
    }, []);

    return null;
};

export default Logout;