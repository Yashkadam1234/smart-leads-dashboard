import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  ReactNode,
} from "react";

import type {
  IUser,
  ILoginInput,
  IRegisterInput,
} from "@shared/index";

import { authApi }
from "../api/authApi";

interface AuthState {
  user: IUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

type AuthAction =
  | {
      type: "LOGIN";
      payload: {
        user: IUser;
        token: string;
      };
    }
  | {
      type: "LOGOUT";
    }
  | {
      type: "SET_LOADING";
      payload: boolean;
    }
  | {
      type: "UPDATE_USER";
      payload: IUser;
    };

interface AuthContextType
  extends AuthState {
  login: (
    data: ILoginInput
  ) => Promise<void>;

  register: (
    data: IRegisterInput
  ) => Promise<void>;

  logout: () => void;

  checkAuth:
    () => Promise<void>;
}

const initialState: AuthState =
  {
    user: null,
    token:
      localStorage.getItem(
        "token"
      ),
    isLoading: true,
    isAuthenticated: false,
  };

const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (
    action.type
  ) {
    case "LOGIN":
      return {
        ...state,
        user:
          action.payload
            .user,
        token:
          action.payload
            .token,
        isAuthenticated:
          true,
        isLoading:
          false,
      };

    case "LOGOUT":
      return {
        user: null,
        token: null,
        isLoading:
          false,
        isAuthenticated:
          false,
      };

    case "SET_LOADING":
      return {
        ...state,
        isLoading:
          action.payload,
      };

    case "UPDATE_USER":
      return {
        ...state,
        user:
          action.payload,
      };

    default:
      return state;
  }
};

const AuthContext =
  createContext<
    AuthContextType | undefined
  >(undefined);

interface Props {
  children: ReactNode;
}

export const AuthProvider =
  ({
    children,
  }: Props) => {
    const [state, dispatch] =
      useReducer(
        authReducer,
        initialState
      );

    const login =
      async (
        data: ILoginInput
      ): Promise<void> => {
        dispatch({
          type:
            "SET_LOADING",
          payload:
            true,
        });

        try {
          const response =
            await authApi.login(
              data
            );

          localStorage.setItem(
            "token",
            response.token
          );

          dispatch({
            type:
              "LOGIN",
            payload: {
              user:
                response.user,
              token:
                response.token,
            },
          });
        } finally {
          dispatch({
            type:
              "SET_LOADING",
            payload:
              false,
          });
        }
      };

    const register =
      async (
        data: IRegisterInput
      ): Promise<void> => {
        dispatch({
          type:
            "SET_LOADING",
          payload:
            true,
        });

        try {
          const response =
            await authApi.register(
              data
            );

          localStorage.setItem(
            "token",
            response.token
          );

          dispatch({
            type:
              "LOGIN",
            payload: {
              user:
                response.user,
              token:
                response.token,
            },
          });
        } finally {
          dispatch({
            type:
              "SET_LOADING",
            payload:
              false,
          });
        }
      };

    const logout =
      (): void => {
        localStorage.removeItem(
          "token"
        );

        dispatch({
          type:
            "LOGOUT",
        });
      };

    const checkAuth =
      async (): Promise<void> => {
        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) {
          dispatch({
            type:
              "LOGOUT",
          });

          return;
        }

        try {
          const user =
            await authApi.getMe();

          dispatch({
            type:
              "LOGIN",
            payload: {
              user,
              token,
            },
          });
        } catch {
          logout();
        }
      };

    useEffect(() => {
      checkAuth();
    }, []);

    return (
      <AuthContext.Provider
        value={{
          ...state,
          login,
          register,
          logout,
          checkAuth,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };

export const useAuth =
  (): AuthContextType => {
    const context =
      useContext(
        AuthContext
      );

    if (!context) {
      throw new Error(
        "useAuth must be used within AuthProvider"
      );
    }

    return context;
  };

export {
  AuthContext,
};