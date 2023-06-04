import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/Context";

export default function Guest() {
    const { token } = useStateContext();

    if (token) {
        return <Navigate to="/dashboard" />;
    }

    return <Outlet />;
}
