import { useState } from "react";
import { auth } from "../firebase/config";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

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
      console.log(res.user);

      if (!res) {
        throw new Error("Could not complete user signup");
      }
      // add user display name
      await res.user?.updateProfile({ displayName });

      setIsPending(false);
      setError(null);
    } catch (err: any) {
      console.log(err.message);
      // use 'err.code' to render custom error messages
      setError(err.message);
      setIsPending(false);
    }
  };

  return { error, isPending, signup };
};
