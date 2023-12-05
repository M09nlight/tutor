import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../../store/store";

interface AppState {
  loading: boolean;
  error: any;
}

const initialState: AppState = {
  loading: false,
  error: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      return state;
    },
    setError: (state, action: PayloadAction<any>) => {
      if (action.payload === null) {
        state.error = null;
        return;
      }
      state.error = action.payload;
    },
  },
});
export const selectApp = (state: RootState) => {
  return state.app;
};
export const appActions = appSlice.actions;
