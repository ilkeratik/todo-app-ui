import { useCallback, useState } from 'react';
interface User {
    at_hash: string;
    aud: string;
    auth_time: number;
    'cognito:username': string;
    email: string;
    email_verified: boolean;
    exp: number;
    iat: number;
    iss: string;
    jti: string;
    name: string;
    origin_jti: string;
    sub: string;
    token_use: string;
}
const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        const storedAuth = localStorage.getItem('isAuthenticated');
        return storedAuth ? JSON.parse(storedAuth) : false;
    });

    const [user, _setUser] = useState<User | null>(() => {
        const storedAuth = localStorage.getItem('user');
        return storedAuth ? JSON.parse(storedAuth) : false;
    });
    const [loading, setLoading] = useState<boolean>(false);

    const setAuth = useCallback((status: boolean) => {
        setIsAuthenticated(status);
        localStorage.setItem('isAuthenticated', JSON.stringify(status));
    }, []);

    const setUser = useCallback((user: User | null) => {
        _setUser(user);
        if (user == null) {
            setAuth(false);
            localStorage.removeItem('user');
        } else {
            setAuth(true);
            localStorage.setItem('user', JSON.stringify(user));
        }
    }, [setAuth]);

    return {
        isAuthenticated, loading, setAuth, user, setUser
    };
};

export default useAuth;
export type { User };
