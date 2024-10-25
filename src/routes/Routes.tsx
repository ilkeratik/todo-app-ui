import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import { Error404 } from "../pages/error-pages/Error-404";
import { ErrorsLayout } from "../pages/error-pages/ErrorLayout";
import Home from "../pages/Home";
import Profile from "../pages/Profile";

const AppRoutes = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
                <Route element={<ErrorsLayout />}>
                    <Route path="/*" element={<Error404 />} />
                </Route>
            </>
        )
    );
    return <RouterProvider router={router} />;
};

export { AppRoutes };
