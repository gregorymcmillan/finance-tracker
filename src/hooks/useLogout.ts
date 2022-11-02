import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
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

      // only allows state to be set if isCancelled is false. this is the cleanup functionality
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err: any) {
      if (!isCancelled) {
        console.log(err.message);
        /** @ToDo use 'err.code' to render custom error messages */
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  // runs the cleanup function condition
  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { logout, error, isPending };
};
