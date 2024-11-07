
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useAuth } from "../hooks/UseAuth";
export
    const Profile = () => {

        const { auth } = useAuth();
        const [profile, setProfile] = useState<any>();
        useEffect(() => {
            fetch(`https://es-iap.auth.us-east-1.amazoncognito.com/oauth2/userInfo`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-amz-json-1.1',
                    'Authorization': `Bearer ${auth}`,
                    'User-Agent': navigator.userAgent,
                    'Accept': '*/*',
                    'Host': 'auth.example.com',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Connection': 'keep-alive'
                }
            })
                .then(response => response.json())
                .then(userInfo => {
                    console.log('User Info:', userInfo);
                    setProfile({ email: userInfo.email, name: userInfo.name });
                })
                .catch(error => {
                    console.error('Error fetching user info:', error);
                });
        }, []);

        return (
            <Container fluid className="text-dark">
                <h2 className="border-bottom pb-2 text-center">Profile</h2>
                {profile ? (
                    <div className="user-details text-center">
                        <h4 className="py-3">User Details</h4>
                        <p><strong>Name:</strong> {profile.name}</p>
                        <p><strong>Email:</strong> {profile.email}</p>
                    </div>
                ) : (
                    <p className="text-center py-5">Loading user details...</p>
                )}
            </Container>
        );
    };

export default Profile;