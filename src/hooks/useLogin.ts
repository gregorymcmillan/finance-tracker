import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    setError(null);
    setIsPending(true);

    // sign the user in
    try {
      const res = await auth.signInWithEmailAndPassword(email, password);
      dispatch({ type: "LOGIN", payload: res.user });

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

  return { login, error, isPending };
};
