import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import { Error404 } from "../pages/error-pages/Error-404";
import { ErrorsLayout } from "../pages/error-pages/ErrorLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";

import useAuth from "../hooks/UseAuth";
import ErrorNotLoggedIn from "../pages/error-pages/Error-NotLoggedIn";

const AppRoutes = () => {
    const { isAuthenticated } = useAuth();


    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                {isAuthenticated ? (
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                ) : (
                    <Route path="/login" element={<Login />} />
                )}
                <Route path="/login-via-idp" element={<Profile />} />
                <Route path="/logged-out" element={<Profile />} />

                <Route element={<ErrorsLayout />}>
                    {isAuthenticated ? (
                        <Route path="/*" element={<Error404 />} />
                    ) : (
                        <Route path="/*" element={<ErrorNotLoggedIn />} />
                    )}
                </Route>
            </>
        )
    );
    return <RouterProvider router={router} />;
};

export { AppRoutes };
