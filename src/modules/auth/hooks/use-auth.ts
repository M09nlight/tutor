import { useSelector } from "react-redux";
import { login, register, selectAuth } from "../service/auth.slice";
import { SignInOut } from "../dto/sign-in.out";
import { useAppActions } from "../../../hooks/appActions";
import { useAppDispatch } from "../../../store/store";
import { SingUpOut } from "../dto/sign-up.out";
import { appActions, selectApp } from "../app/service/app.slice";
import { useNavigate } from "react-router";

export const useAuth = () => {
  const { resetFullAccess } = useAppActions();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const auth = useSelector(selectAuth);
  const isLoggedIn = Boolean(auth.user);
  const { error, loading } = useSelector(selectApp);

  const signIn = async (data: Omit<SignInOut, "device">) => {
    const response = await dispatch(login({ ...data, device: "postman" }));
    if (!(response.meta.requestStatus === "fulfilled")) {
      dispatch(appActions.setError(response.payload));
      return;
    }
    navigate("/profile");
  };
  const signUp = async (data: Omit<SingUpOut, "device">) => {
    const response = await dispatch(register({ ...data, device: "postman" }));
    if (!(response.meta.requestStatus === "fulfilled")) {
      dispatch(appActions.setError(response.payload));
      return;
    }
    navigate("/profile");
  };

  const logOut = () => {
    resetFullAccess();
  };
  return { isLoggedIn, signIn, signUp, logOut, auth, error, loading };
};
