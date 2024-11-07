import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/UseAuth';

const Sidebar = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <nav id="sidebarMenu" className="d-md-block sidebar pt-2 mb-3">
            <div className="position-sticky">
                <ul className="nav flex-column">
                    <li className={`nav-item bg-secondary rounded ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                        <button className="nav-link text-white" onClick={() => navigate('/dashboard')}>
                            Dashboard
                        </button>
                    </li>
                    <li className={`nav-item bg-secondary my-3 rounded ${location.pathname === '/profile' ? 'active' : ''}`}>
                        <button className="nav-link text-white" onClick={() => navigate('/profile')}>
                            Profile
                        </button>
                    </li>
                    {user !== null ? (
                        <li className={`nav-item bg-secondary rounded ${location.pathname === '/logout' ? 'active' : ''}`}>
                            <button className="nav-link text-white" onClick={() => navigate('/logout')}>
                                Logout
                            </button>
                        </li>) : (
                        <li className={`nav-item bg-secondary rounded ${location.pathname === '/login' ? 'active' : ''}`}>
                            <button className="nav-link text-white" onClick={() => navigate('/login')}>
                                Login
                            </button>
                        </li>)}
                </ul>
            </div>
        </nav >
    );
};

export default Sidebar;