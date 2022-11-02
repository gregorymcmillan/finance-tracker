import { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    setError(null); // resets error before each signup
    setIsPending(true);

    try {
      // signup user
      const res = await auth.createUserWithEmailAndPassword(email, password);

      if (!res) {
        throw new Error("Could not complete user signup");
      }
      // add user display name
      await res.user?.updateProfile({ displayName });

      // dispatch login action
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

  return { error, isPending, signup };
};
