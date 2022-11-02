import { createContext, useReducer } from "react";

type AuthContextInterface = {
  state: any;
  dispatch: any;
};

type ACTIONTYPE =
  | { type: "LOGIN"; payload: {} }
  | { type: "LOGOUT"; payload: {} };

export const AuthContext = createContext<AuthContextInterface | null>(null);

export const authReducer = (state: any, action: ACTIONTYPE) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  console.log("AuthContext state:", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
