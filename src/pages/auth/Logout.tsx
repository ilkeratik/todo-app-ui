import { useEffect } from 'react';
import { useAuth } from '../../hooks/UseAuth';

const Logout = () => {
    const { auth, setAuth } = useAuth();
    useEffect(() => {
        if (auth !== null) {
            setAuth(null)
        }
    }, []);

    return <>Logging out</>;
};

export { Logout };
