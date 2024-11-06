import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/UseAuth';

const Sidebar = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <nav id="sidebarMenu" className="d-md-block sidebar pe-5 bg-light rounded">
            <div className="position-sticky">
                <ul className="nav flex-column text-decoration-underline">
                    <li className="nav-item">
                        <button className="nav-link" onClick={() => navigate('/dashboard')}>
                            Dashboard
                        </button>
                    </li>
                    <li className="nav-item">
                        <button className="nav-link" onClick={() => navigate('/profile')}>
                            Profile
                        </button>
                    </li>
                    {user !== null ?
                        (
                            <li className="nav-item">
                                <button className="nav-link" onClick={() => navigate('/logout')}>
                                    Logout
                                </button>
                            </li>) :
                        (
                            <li className="nav-item">
                                <button className="nav-link" onClick={() => navigate('/login')}>
                                    Login
                                </button>
                            </li>)}
                </ul>
            </div>
        </nav>
    );
};

export default Sidebar;