import { useCallback, useState } from 'react';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        // Initialize state from localStorage
        const storedAuth = localStorage.getItem('isAuthenticated');
        return storedAuth ? JSON.parse(storedAuth) : false;
    });
    const [loading, setLoading] = useState<boolean>(false);

    const setAuth = useCallback((status: boolean) => {
        setIsAuthenticated(status);
        localStorage.setItem('isAuthenticated', JSON.stringify(status));
    }, []);
    return {
        isAuthenticated, loading, setAuth
    };
};

export default useAuth;