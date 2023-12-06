import ProfilePage from "../modules/profile/pages/ProfilePage";
import SignInPage from "../modules/auth/pages/SignInPage";
import SignUpPage from "../modules/auth/pages/SignUpPage";
import { RouteObject } from "react-router";
import MainPage from "../modules/main/pages/MainPage";
import PrivateRoute from "../modules/auth/components/PrivateRoute";
export const routesConfig: RouteObject[] = [
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <ProfilePage />
      </PrivateRoute>
    ),
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
  {
    path: "*",
    element: <MainPage />,
  },
];
