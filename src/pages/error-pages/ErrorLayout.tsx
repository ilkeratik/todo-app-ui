import { Outlet } from "react-router-dom";
const ErrorsLayout = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Outlet />
        </div>
    );
};

export { ErrorsLayout };
