import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth, { User } from '../hooks/UseAuth';

import { jwtDecode } from 'jwt-decode';

const HandleIdpLogin = () => {
    const { isAuthenticated, setAuth, setUser, user } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const handleLogin = async () => {
        setLoading(true);
        const params = new URLSearchParams(window.location.search);
        const idToken = params.get('id_token');

        if (idToken) {
            const decodedToken = jwtDecode(idToken);
            await setUser(decodedToken as User);
            await setAuth(true);
            window.history.replaceState({}, document.title, "/login-via-idp");
            console.log('Query string:', decodedToken);
        }
    };

    useEffect(() => {
        handleLogin();
    }, []);

    return (user) ? <Navigate replace to="/" /> : (
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