import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import useAuth from "../hooks/UseAuth";

const AuthenticatedUserLayout = () => {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/login" />;
    }
    return <div className="d-flex px-4 py-3" id="app_root">
        <div className="container-fluid">
            <div className="d-flex row content">
                <div className="col-md-3 col-lg-2">
                    <Sidebar />
                </div>

                <div className="col-md-9 col-lg-10 text-light bg-transparent mt-10">
                    <Outlet />
                </div>
            </div>
        </div>
    </div>
}
export { AuthenticatedUserLayout };
