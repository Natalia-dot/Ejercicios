import { createBrowserRouter } from "react-router-dom";
import {
  CodeConfirmation,
  Home,
  Login,
  Register,
  NotFound,
  Dashboard,
  Profile,
  ChangePassword,
  DeleteUser,
  ProfileUpdate,
} from "../pages";
import { App } from "../App";
import { ProtectedCodeConfirmation, ProtectedRoute } from "../components";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/codeConfirmation",
        element: (
          <ProtectedCodeConfirmation>
            <CodeConfirmation />
          </ProtectedCodeConfirmation>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            {" "}
            <Dashboard />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
        children: [
          { path: "/profile/changePassword", element: <ChangePassword /> },
          {path: "/profile/deleteUser", element: <DeleteUser /> },
          {path: "/profile/", element: <ProfileUpdate /> }
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
