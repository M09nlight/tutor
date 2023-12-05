import {
  Action,
  PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../../../store/store";
import axios from "axios";
import { SignInOut } from "../dto/sign-in.out";
import { SingInIn } from "../dto/sing-in.in";
import storage from "redux-persist/lib/storage";
import { User } from "../dto/user.in";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { SingUpOut } from "../dto/sign-up.out";
import { SingUpIn } from "../dto/sing-up.in";
import { useAppActions } from "../../../hooks/appActions";
import { appActions } from "../app/service/app.slice";

const domain: string = "212.193.62.231:8080";

interface AuthState {
  user: User | null;
  tokens: SingInIn | null;
  access_token_expired_date: string | null;
  refresh_token_expired_date: string | null;
}

const initialState: AuthState = {
  user: null,
  tokens: null,
  access_token_expired_date: null,
  refresh_token_expired_date: null,
};
function decodeTokens(decodedAT: JwtPayload, decodedRT: JwtPayload) {
  const timestampAT: number = (decodedAT.exp || 0) * 1000;
  const timestampRT: number = (decodedRT.exp || 0) * 1000;

  const expirationDateAT = new Date(timestampAT);
  const expirationDateRT = new Date(timestampRT);
  const currentDate = new Date();

  const delayAT = expirationDateAT.getTime() - currentDate.getTime();
  const delayRT = expirationDateRT.getTime() - currentDate.getTime();
  return { expirationDateAT, expirationDateRT, delayAT, delayRT };
}

export const login = createAsyncThunk<SingInIn, SignInOut>(
  "auth/signIn",
  async (user, { rejectWithValue, dispatch }) => {
    try {
      dispatch(appActions.setLoading(true));
      const response = await axios.post(`http://${domain}/auth/signin`, user);
      const data = (await response.data) as SingInIn;
      await dispatch(getUser(data.access_token));

      const decodedAT = jwtDecode(data.access_token);
      const decodedRT = jwtDecode(data.refresh_token);

      const { expirationDateAT, expirationDateRT, delayAT, delayRT } =
        decodeTokens(decodedAT, decodedRT);

      dispatch(
        authActions.updateExpirationDate({
          access_token_expired_date: expirationDateAT.toISOString(),
          refresh_token_expired_date: expirationDateRT.toISOString(),
        })
      );
      setTimeout(() => {
        dispatch(authActions.resetAccess(expirationDateRT.toISOString()));
      }, delayAT);
      setTimeout(() => {
        dispatch(authActions.resetFullAccess());
      }, delayRT);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    } finally {
      dispatch(appActions.setLoading(false));
    }
  }
);
export const register = createAsyncThunk<SingUpIn, SingUpOut>(
  "auth/signUp",
  async (user, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        `http://${domain}/auth/signup/base`,
        user
      );
      console.log("user", user);
      dispatch(appActions.setLoading(true));
      const data = (await response.data) as SingUpIn;
      await dispatch(getUser(data.access_token));

      const decodedAT = jwtDecode(data.access_token);
      const decodedRT = jwtDecode(data.refresh_token);

      const { expirationDateAT, expirationDateRT, delayAT, delayRT } =
        decodeTokens(decodedAT, decodedRT);
      dispatch(
        authActions.updateExpirationDate({
          access_token_expired_date: expirationDateAT.toISOString(),
          refresh_token_expired_date: expirationDateRT.toISOString(),
        })
      );
      setTimeout(() => {
        dispatch(authActions.resetAccess(expirationDateRT.toISOString()));
      }, delayAT);
      setTimeout(() => {
        dispatch(authActions.resetFullAccess());
      }, delayRT);

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    } finally {
      dispatch(appActions.setLoading(false));
    }
  }
);

export const getUser = createAsyncThunk<User, string>(
  "auth/getUser",
  async (access_token, { rejectWithValue, dispatch }) => {
    try {
      dispatch(appActions.setLoading(true));
      const response = await axios.get(`http://${domain}/user/profile`, {
        headers: {
          Authorization: `Bearer  ${access_token}`,
        },
      });
      const data = (await response.data) as User;

      return data;
    } catch (error: any) {
      return rejectWithValue((error as Error).message);
    } finally {
      dispatch(appActions.setLoading(false));
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAccess: (state, action: PayloadAction<string>) => {
      storage.removeItem("persist:root");
      state = { ...initialState, refresh_token_expired_date: action.payload };
      storage.setItem("persist:root", `"auth": ${JSON.stringify(state)}`);
      return state;
    },
    resetFullAccess: (state) => {
      state = initialState;
      storage.removeItem("persist:root");
      return state;
    },
    updateExpirationDate: (
      state,
      action: PayloadAction<
        Pick<
          AuthState,
          "access_token_expired_date" | "refresh_token_expired_date"
        >
      >
    ) => {
      state.access_token_expired_date =
        action.payload.access_token_expired_date;
      state.refresh_token_expired_date =
        action.payload.refresh_token_expired_date;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<SingInIn | null>) => {
          state.tokens = action.payload;
        }
      )
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<SingUpIn | null>) => {
          state.tokens = action.payload;
        }
      )
      .addCase(
        getUser.fulfilled,
        (state, action: PayloadAction<User | null>) => {
          if (action.payload === null) {
            state.user = null;
            return;
          }
          state.user = {
            ...action.payload,
          };
        }
      );
  },
});
export const selectAuth = (state: RootState) => {
  return state.auth;
};
export const authActions = authSlice.actions;
