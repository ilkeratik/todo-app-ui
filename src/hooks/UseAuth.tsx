import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

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

interface AuthContextType {
    auth: string | null;
    setAuth: (authz: string | null) => void;
    loading: boolean;
    user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, _setAuth] = useState<string | null>(() => {
        const storedAuth = Cookies.get('auth');
        return storedAuth ?? null;
    });
    const [user, _setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        console.log('ththtere')
        if (auth !== null) {
            console.log('here')
            const decodedToken = jwtDecode(auth);
            _setUser(decodedToken as User);
        } else {
            _setUser(null);
        }
    }, [auth]);

    const setAuth = (authz: string | null) => {
        console.log('heloo')
        _setAuth(authz);
        if (authz !== null) {
            Cookies.set('auth', authz, { secure: true, sameSite: 'Strict' });
        } else {
            Cookies.remove('auth')
        }
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, loading, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export type { User };
