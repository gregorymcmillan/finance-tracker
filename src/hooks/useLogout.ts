import { useState } from "react";
import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    // sign the user out
    try {
      await auth.signOut();
      // dispatch logout action
      dispatch({ type: "LOGOUT" }); // user will be null so unnecessary to include payload
      setError(null);
      setIsPending(false);
    } catch (err: any) {
      console.log(err.message);
      // use 'err.code' to render custom error messages
      setError(err.message);
      setIsPending(false);
    }
  };

  return { logout, error, isPending };
};
