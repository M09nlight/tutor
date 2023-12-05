import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { authActions } from "../modules/auth/service/auth.slice";

const actions = {
  ...authActions,
};
export const useAppActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};
