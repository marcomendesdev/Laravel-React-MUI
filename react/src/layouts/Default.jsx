import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/Context";

export default function Default() {
    const { token } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}
