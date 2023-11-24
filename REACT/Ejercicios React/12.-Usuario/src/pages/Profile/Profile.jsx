import { Navigate, Outlet } from "react-router-dom";
import "./Profile.css";

import React, { useState } from "react";
import { NavInProfile } from "../../components";

export const Profile = () => {
  return (
    <div className="profile">
    <NavInProfile/>
    <Outlet/>
   </div>
  );
};
