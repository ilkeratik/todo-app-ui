import { useEffect, useState } from 'react';
import { Button, Row } from 'react-bootstrap';
const Login = () => {

    const [loginInProgress, setLoginInProgress] = useState(false);
    const redirectToCognito = () => {
        setLoginInProgress(true);
        const clientId = '3m7tije7m3v73otsp9ovu29fro';
        const cognitoDomain = 'ilker.auth.us-east-1.amazoncognito.com';
        const responseType = 'code';
        const redirectUri = 'https://orud7ty2mgppjrjiunfbxfd2ua0qqpxa.lambda-url.us-east-1.on.aws/';
        const scope = "openid";
        const cognitoUrl = `https://${cognitoDomain}/login?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUri}&scope=${scope}`;
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