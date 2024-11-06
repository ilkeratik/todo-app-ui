import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/UseAuth";

const HandleIdpCallback = () => {

    const location = useLocation();
    const { setAuth, user } = useAuth();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const authorizationCode = queryParams.get('code');
        if (authorizationCode) {
            const currentDomain = window.location.origin;
            let redirectUri = `${currentDomain}/login-callback`;
            fetch(`https://ubmlbv19sb.execute-api.us-east-1.amazonaws.com/test/api/v1/auth/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    code: authorizationCode,
                    redirectUri: redirectUri
                })
            })
                .then(response => {
                    return response.json();
                })
                .then(async data => {
                    if (data.access_token) {
                        await setAuth(data.access_token);
                    };
                    console.log('Response from API:', data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        } else {
            console.log('Authorization Code not found');
        }
        return () => {
            console.log('HandleIdpAuthorizationCode unmounted');
        };
    }, []);

    return (user) ? <Navigate replace to="/dashboard" /> : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div>
                <div className="spinner-border" role="status" style={{ display: 'block', margin: '0 auto' }}>
                </div>
                <p className='mt-2 text-center'>IDP Login...</p>
            </div>
        </div>
    );
};

export { HandleIdpCallback };
