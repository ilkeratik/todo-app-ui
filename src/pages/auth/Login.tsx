import { useEffect, useState } from 'react';
import { Button, Row } from 'react-bootstrap';
const Login = () => {
    const [loginInProgress, setLoginInProgress] = useState(false);
    const redirectToCognito = () => {
        setLoginInProgress(true);
        const clientId = process.env.REACT_APP_COGNITO_CLIENT_ID || '67vftfcmao21lunn2vjn9322nj';
        const cognitoDomain = process.env.REACT_APP_COGNITO_DOMAIN || 'es-iap.auth.us-east-1.amazoncognito.com';
        const responseType = 'code';
        const currentDomain = window.location.origin;
        const redirectUri = `${currentDomain}/login-callback`;
        const cognitoUrl = `https://${cognitoDomain}/login?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUri}`;
        window.location.href = cognitoUrl;
    };

    useEffect(() => {
    }, []);
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