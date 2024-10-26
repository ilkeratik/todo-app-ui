import { useEffect, useState } from 'react';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getAuthStatus = async () => {
            return new Promise<boolean>((resolve) => {
                setTimeout(() => {
                    resolve(false);
                }, 1000);
            });
        }
        const checkAuth = async () => {
            try {
                const authStatus = await getAuthStatus();
                setIsAuthenticated(authStatus);
            } catch (error) {
                console.error('Failed to check auth status', error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    return { isAuthenticated, loading };
};

export default useAuth;