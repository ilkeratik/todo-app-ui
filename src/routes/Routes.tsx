import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import { Error404 } from "../pages/error-pages/Error-404";
import { ErrorsLayout } from "../pages/error-pages/ErrorLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";

const AppRoutes = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />

                    <Route path="/login-via-idp" element={<Profile />} />
                    <Route path="/logged-out" element={<Profile />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route element={<ErrorsLayout />}>
                    <Route path="/*" element={<Error404 />} />
                </Route>
            </>
        )
    );
    return <RouterProvider router={router} />;
};

export { AppRoutes };
