import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { authActions } from "../modules/auth/service/auth.slice";
import { appActions } from "../modules/auth/app/service/app.slice";

const actions = {
  ...authActions,
  ...appActions,
};
export const useAppActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};
