import { useEffect, useState } from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";
import { AuthenticatedUserLayout } from "../layout/AuthenticatedUserLayout";
import { HandleIdpCallback } from "../pages/auth/HandleIdpCallBack";
import Login from "../pages/auth/Login";
import { Logout } from "../pages/auth/Logout";
import DashboardContextWrapper from "../pages/dashboard/DashboardContextWrapper";
import { Error404 } from "../pages/error-pages/Error-404";
import ErrorNotLoggedIn from "../pages/error-pages/Error-NotLoggedIn";
import { ErrorsLayout } from "../pages/error-pages/ErrorLayout";
import Home from "../pages/Home";
import Profile from "../pages/Profile";

const AppRoutes = () => {
    const { loading, user } = useAuth();
    const [router, setRouter] = useState<any>(null);

    useEffect(() => {
        const newRouter = createBrowserRouter(
            createRoutesFromElements(
                <>
                    <Route element={<AuthenticatedUserLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/dashboard" element={<DashboardContextWrapper />} />
                        <Route path="/profile" element={<Profile />} />

                        <Route path="/logout" element={<Logout />} />
                        {/* <Route path="/logged-out" element={<Profile />} /> */}
                    </Route>

                    <Route path="/login" element={<Login />} />
                    <Route path="/login-callback" element={<HandleIdpCallback />} />
                    <Route element={<ErrorsLayout />}>
                        <Route path="/*" element={user ? <Error404 /> : <ErrorNotLoggedIn />} />
                    </Route>
                </>
            )
        );
        setRouter(newRouter);
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return router ? <RouterProvider router={router} /> : null;
};

export { AppRoutes };
