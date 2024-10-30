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
            fetch(`https://orud7ty2mgppjrjiunfbxfd2ua0qqpxa.lambda-url.us-east-1.on.aws/?code=${authorizationCode}&url=${redirectUri}`)
                .then(response => {
                    return response.json();
                })
                .then(async data => {
                    if (data.idToken) {
                        await setAuth(data.idToken);
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

    return (user) ? <Navigate replace to="/" /> : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div>
                <div className="spinner-border" role="status" style={{ display: 'block', margin: '0 auto' }}>
                </div>
                <p className='mt-2 text-center'>Handling AWS IDP Callback...</p>
            </div>
        </div>
    );
};

export { HandleIdpCallback };
