import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import "./NavInProfile.css";
import { useState } from "react";

export const NavInProfile = () => {
  const { setUser, setDeleteUser } = useAuth();
  const [activeSection, setActiveSection] = useState("favAlbums");
  const navigate = useNavigate();

  const handleButtonClickProfileUpdate = () => {
    navigate("/profile/");
    setActiveSection("profileUpdate");
  };

  const handleButtonClickChangePassword = () => {
    navigate("/profile/changePassword");
    setActiveSection("changePassword");
  };

  const handleButtonClickDeleteUser = () => {
    navigate("/profile/deleteUser");
    setActiveSection("deleteUser");
  };

  const handleButtonClickFavAlbums = () => {
    navigate("/profile/favAlbums");
    setActiveSection("favAlbums");
  };

  return (
    <div className="profileButtons">
      <button
        onClick={() => handleButtonClickFavAlbums()}
        className={activeSection === "favAlbums" ? "active" : null}
      >
        Favourite Albums
      </button>

      <button
        onClick={() => handleButtonClickProfileUpdate()}
        className={activeSection === "profileUpdate" ? "active" : null}
      >
        Profile Update
      </button>

      <button
        onClick={() => handleButtonClickChangePassword()}
        className={activeSection === "changePassword" ? "active" : null}
      >
        Change Password
      </button>

      <button
        onClick={() => handleButtonClickDeleteUser()}
        className={activeSection === "deleteUser" ? "active" : null}
      >
        Delete User
      </button>
    </div>
  );
};
