
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/UseAuth";
export
    const Profile = () => {

        const { user, auth } = useAuth();
        const [dta, setData] = useState(null);
        useEffect(() => {
            console.log('Profile page loaded');
            fetch('https://43t47r1o70.execute-api.us-east-1.amazonaws.com/test/resource', {
                method: 'GET',
                headers: {
                    'Authorization': auth ?? '',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => setData(data))
                .catch(error => console.error('Error fetching profile:', error));
        }, []);

        return (
            <div className="row text-dark">
                <main className="ms-sm-auto col-lg-10 px-md-4">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">Profile</h1>
                    </div>
                    {user ? (
                        <div className="user-details">
                            <h2>User Details</h2>
                            <p><strong>Name:</strong> {user.name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            {dta ? JSON.stringify(dta) : ''}
                        </div>
                    ) : (
                        <p>Loading user details...</p>
                    )}
                    <p>To-do app Ilker</p>
                </main>
            </div>
        );
    };

export default Profile;