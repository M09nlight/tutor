import { FC } from "react";
import ProfilePage from "../modules/profile/pages/ProfilePage";
import SignInPage from "../modules/auth/pages/SignInPage";
import MainPage from "../modules/main/pages/MainPage";
import SignUpPage from "../modules/auth/pages/SignUpPage";
interface RouteItem {
  path: string;
  Element: FC;
  private?: boolean;
}

export const routes: Record<string, RouteItem> = {
  globalFeed: {
    path: "/",
    Element: MainPage,
  },
  profile: {
    path: "/profile",
    Element: ProfilePage,
    private: true,
  },
  signUp: {
    path: "/sign-up",
    Element: SignUpPage,
  },
  signIn: {
    path: "/sign-in",
    Element: SignInPage,
  },
  default: {
    path: "*",
    Element: MainPage,
  },
};
