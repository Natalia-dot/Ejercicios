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
  SingleAlbumPage,
  CreateAlbum,
  ForgotPassword,
  FavsTab,
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
        path: "/forgotPassword",
        element: <ForgotPassword />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/:id",
        element: (
          <ProtectedRoute>
            <SingleAlbumPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/add",
        element: (
          <ProtectedRoute>
            <CreateAlbum />
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
          { path: "/profile/deleteUser", element: <DeleteUser /> },
          { path: "/profile/", element: <ProfileUpdate /> },
          { path: "/profile/favAlbums", element: <FavsTab /> },

          //{ path: "/profile/favAlbums", element: <FavAlbumsTab /> },

        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
