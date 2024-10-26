import { useEffect, useState } from "react";
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom";
import useAuth from "../hooks/UseAuth";
import { MainLayout } from "../layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import { Error404 } from "../pages/error-pages/Error-404";
import ErrorNotLoggedIn from "../pages/error-pages/Error-NotLoggedIn";
import { ErrorsLayout } from "../pages/error-pages/ErrorLayout";
import HandleIdpLogin from "../pages/HandleIdpLogin";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Profile from "../pages/Profile";

const AppRoutes = () => {
    const { isAuthenticated, loading, setAuth } = useAuth();
    const [router, setRouter] = useState<any>(null);

    useEffect(() => {
        console.log(`isAuthenticated changed: ${isAuthenticated}`);

        const newRouter = createBrowserRouter(
            createRoutesFromElements(
                <>
                    {isAuthenticated && (
                        <Route element={<MainLayout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/logout" element={<Logout />} />
                            <Route path="/logged-out" element={<Profile />} />
                        </Route>)}
                    {!isAuthenticated && (
                        <>
                            <Route path="/*" element={<Navigate to="/login" />} />
                        </>)}

                    <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
                    <Route path="/login-via-idp" element={<HandleIdpLogin />} />

                    <Route element={<ErrorsLayout />}>
                        <Route path="/*" element={isAuthenticated ? <Error404 /> : <ErrorNotLoggedIn />} />
                    </Route>
                </>
            )
        );
        setRouter(newRouter);
    }, [isAuthenticated, setAuth]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return router ? <RouterProvider router={router} /> : null;
};

export { AppRoutes };
