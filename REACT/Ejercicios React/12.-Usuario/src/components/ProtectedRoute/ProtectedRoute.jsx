import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

export const ProtectedRoute = ({children}) => {
    const { user, deletedUser } = useAuth();
    if (deletedUser) {
        return <Navigate to="/register" />;
    }
    if (user==null || user?.check == false) {
        return <Navigate to="/login" />
    }

    return children;
}