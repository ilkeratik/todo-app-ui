
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useAuth } from "../hooks/UseAuth";
export
    const Profile = () => {

        const { user, auth } = useAuth();
        const [dta, setData] = useState(null);
        useEffect(() => {
        }, []);

        return (
            <Container fluid className="text-dark">
                <h2 className="border-bottom pb-2">Profile</h2>
                {user ? (
                    <div className="user-details">
                        <h4 className="py-3">User Details</h4>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        {dta ? JSON.stringify(dta) : ''}
                    </div>
                ) : (
                    <p>Loading user details...</p>
                )}
                <p>To-do app Ilker</p>
            </Container>
        );
    };

export default Profile;