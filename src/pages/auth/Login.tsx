import { useEffect, useState } from 'react';
import { Button, Row } from 'react-bootstrap';
import { useAuth } from '../../hooks/UseAuth';
const Login = () => {
    const { user } = useAuth();
    const [loginInProgress, setLoginInProgress] = useState(false);
    const redirectToCognito = () => {
        setLoginInProgress(true);
        const clientId = 'qtsg0jikodup7m85ouv0uga1o';
        const cognitoDomain = 'es-auth-lab.auth.us-east-1.amazoncognito.com';
        const responseType = 'code';
        const redirectUri = 'https://ilkeratik.github.io/login-callback';
        const scope = "openid";
        const cognitoUrl = `https://${cognitoDomain}/login?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUri}&scope=${scope}`;
        window.location.href = cognitoUrl;
    };

    useEffect(() => {
    }, []);

    if (user) {
        console.log('login', user)
        // return <Navigate to="/" />;
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            {!loginInProgress ?
                <Row>
                    <p className='text-center'>Please login to continue.</p>
                    <Button color="primary" onClick={redirectToCognito}> Login via AWS IDP </Button>
                </Row>
                : <div>
                    <div className="spinner-border" role="status" style={{ display: 'block', margin: '0 auto' }}>
                    </div>
                    <p className='mt-2 text-center'>Redirecting to AWS IDP login...</p>
                </div>}
        </div>
    );
};

export default Login;