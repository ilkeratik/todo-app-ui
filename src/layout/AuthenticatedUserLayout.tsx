import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../hooks/UseAuth";

const AuthenticatedUserLayout = () => {
    const { user } = useAuth();
    if (user === null) {
        return <Navigate to="/login" />;
    }
    return <div className="d-flex px-4 mt-5" id="app_root">
        <div className="container-fluid">
            <div className="d-flex row content">
                <div className="col-md-2">
                    <Sidebar />
                </div>

                <div className="col-md-10 text-light bg-transparent mt-10">
                    <Outlet />
                </div>
            </div>
        </div>
    </div>
}
export { AuthenticatedUserLayout };
