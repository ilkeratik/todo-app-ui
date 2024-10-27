import useAuth from "../hooks/UseAuth";

const Profile = () => {

    const { user } = useAuth();
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