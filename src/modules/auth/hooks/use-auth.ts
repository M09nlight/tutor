import { useSelector } from "react-redux";
import { login, selectAuth } from "../service/auth.slice";
import { SignInOut } from "../dto/sign-in.out";
import { useAppActions } from "../../../hooks/appActions";
import { useAppDispatch } from "../../../store/store";

export const useAuth = () => {
  const { resetFullAccess } = useAppActions();
  const dispatch = useAppDispatch();

  const auth = useSelector(selectAuth);
  const isLoggedIn = Boolean(auth.user);

  const signIn = (data: Omit<SignInOut, "device">) => {
    dispatch(login({ ...data, device: "postman" }));
  };

  const logOut = () => {
    resetFullAccess();
  };
  return { isLoggedIn, signIn, logOut, auth };
};
