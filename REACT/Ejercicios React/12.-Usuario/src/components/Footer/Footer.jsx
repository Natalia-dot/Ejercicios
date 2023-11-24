import { Link, Navigate } from "react-router-dom";
import "./Footer.css";
import { useAuth } from "../../contexts/authContext";

export const Footer = () => {
  const {user} = useAuth();
  return (
    <footer>
      {user == null ? (
        <p>
          Registered already? <Link to={"/login"}>Login!</Link>
        </p>
      ) : (
        <p>Welcome back!!!!!!! I luv u</p>
      )}
    </footer>
  );
};
