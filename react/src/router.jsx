import { Navigate, createBrowserRouter } from "react-router-dom";
import Default from "./layouts/Default";
import Guest from "./layouts/Guest";
import Items from "./components/Items";
import PageNotFound from "./components/PageNotFound";
import LoginForm from "./components/Login";
import SignupForm from "./components/Signup";
import AddItem from "./components/AddItem";
import Dashboard from "./components/Dashboard";
import MyItems from "./components/MyItems";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Default />,
        children: [
            {
                path: "/",
                element: <Navigate to="/dashboard" />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
                children: [
                    {
                        path: "/dashboard/items",
                        element: <Items />,
                    },
                    {
                        path: "/dashboard/my-items",
                        element: <MyItems />,
                    },
                    {
                        path: "/dashboard/add-item",
                        element: <AddItem />,
                    },
                ],
            },
        ],
    },
    {
        path: "/",
        element: <Guest />,
        children: [
            {
                path: "/login",
                element: <LoginForm />,
            },
            {
                path: "/signup",
                element: <SignupForm />,
            },
        ],
    },
    {
        path: "*",
        element: <PageNotFound />,
    },
]);

export default router;
