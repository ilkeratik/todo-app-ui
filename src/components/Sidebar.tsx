import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <nav id="sidebarMenu" className="d-md-block bg-light sidebar">
            <div className="position-sticky">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <button className="nav-link active" aria-current="page" onClick={() => navigate('/')}>
                            Home
                        </button>
                    </li>
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
                </ul>
            </div>
        </nav>
    );
};

export default Sidebar;