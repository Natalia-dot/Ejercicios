import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext"
import "./ProtectedCodeConfirmation.css"

export const ProtectedCodeConfirmation = ({children}) => {
    const { completeUserInfo, user } = useAuth();

    if (completeUserInfo?.data?.user?.isVerified == true 
        || user?.isVerified == true) {
            return <Navigate to="/dashboard" />;
        }
    if (user == null && completeUserInfo.data.confirmationEmailCode === "") {
        return <Navigate to="/login" />;
    }

    return children;
}
