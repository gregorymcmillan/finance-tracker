import { createContext, useEffect, useReducer } from "react";
import { auth } from "../firebase/config";

type ACTIONTYPE =
  | { type: "LOGIN"; payload: {} }
  | { type: "LOGOUT" }
  | { type: "AUTH_IS_READY"; payload: {} | null };

export const AuthContext = createContext<any>(null);

export const authReducer = (state: any, action: ACTIONTYPE) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });
      unsub();
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
