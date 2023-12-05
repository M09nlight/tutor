import { useSelector } from "react-redux";
import { login, register, selectAuth } from "../service/auth.slice";
import { SignInOut } from "../dto/sign-in.out";
import { useAppActions } from "../../../hooks/appActions";
import { useAppDispatch } from "../../../store/store";
import { SingUpOut } from "../dto/sign-up.out";

export const useAuth = () => {
  const { resetFullAccess } = useAppActions();
  const dispatch = useAppDispatch();

  const auth = useSelector(selectAuth);
  const isLoggedIn = Boolean(auth.user);

  const signIn = async (data: Omit<SignInOut, "device">) => {
    await dispatch(login({ ...data, device: "postman" }));
  };
  const signUp = async (data: Omit<SingUpOut, "device">) => {
    await dispatch(register({ ...data, device: "postman" }));
  };

  const logOut = () => {
    resetFullAccess();
  };
  return { isLoggedIn, signIn, signUp, logOut, auth };
};
