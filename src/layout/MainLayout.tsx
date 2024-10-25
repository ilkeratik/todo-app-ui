import { useRef } from "react";
import { useIntl } from "react-intl";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
    const isFirstRun = useRef(true);
    const location = useLocation();
    const intl = useIntl();
    // const { preferences } = useUserPreferences();

    return <div className="d-flex px-4 py-3" id="app_root">
        <div className="container-fluid ">
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
export { MainLayout };
