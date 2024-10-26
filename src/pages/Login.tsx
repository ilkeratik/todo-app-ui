import { useEffect, useState } from 'react';
import { Button, Row } from 'react-bootstrap';

const Login = () => {
    const [loginInProgress, setLoginInProgress] = useState(false);
    const redirectToCognito = () => {
        setLoginInProgress(true);
        const clientId = '6a59l0uihoe8vg89br5li4it2r';
        const cognitoDomain = 'ilker.auth.us-east-1.amazoncognito.com';
        const responseType = 'code';
        const redirectUri = 'http://localhost:5001/login-via-idp';

        const scope = "email+openid"
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