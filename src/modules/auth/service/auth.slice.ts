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

const domain: string = "212.193.62.231:8080";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: any;
  tokens: SingInIn | null;
  access_token_expired_date: string | null;
  refresh_token_expired_date: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  tokens: null,
  access_token_expired_date: null,
  refresh_token_expired_date: null,
};

export const login = createAsyncThunk<SingInIn, SignInOut>(
  "auth/signIn",
  async (user, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(`http://${domain}/auth/signin`, user);
      const data = (await response.data) as SingInIn;
      dispatch(getUser(data.access_token));

      const currentDate = new Date();

      const expirationDateAT = new Date(currentDate.getTime() + 30 * 60000);
      const delayAT = expirationDateAT.getTime() - currentDate.getTime();

      const expirationDateRT = new Date(currentDate.getTime() + 35 * 60000);
      const delayRT = expirationDateRT.getTime() - currentDate.getTime();

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
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const getUser = createAsyncThunk<User, string>(
  "auth/getUser",
  async (access_token, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`http://${domain}/user/profile`, {
        headers: {
          Authorization: `Bearer  ${access_token}`,
        },
      });
      const data = (await response.data) as User;

      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
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
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<SingInIn | null>) => {
          state.tokens = action.payload;
          state.loading = false;
        }
      )
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
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
          state.loading = false;
        }
      )
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});
export const selectAuth = (state: RootState) => {
  return state.auth;
};
export const authActions = authSlice.actions;

function isError(action: Action) {
  return action.type.endsWith("rejected");
}
