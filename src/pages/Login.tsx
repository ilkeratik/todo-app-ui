import { useEffect } from 'react';

const Login = () => {
    useEffect(() => {
        const redirectToCognito = () => {
            const clientId = '6a59l0uihoe8vg89br5li4it2r';
            const cognitoDomain = 'ilker.auth.us-east-1.amazoncognito.com';
            const responseType = 'code';
            const redirectUri = 'http://localhost:5001/login-via-idp';

            const scope = "email+openid"
            const cognitoUrl = `https://${cognitoDomain}/login?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUri}&scope=${scope}`;
            window.location.href = cognitoUrl;
        };

        redirectToCognito();
    }, []);

    return <div>Redirecting to login...</div>;
};

export default Login;