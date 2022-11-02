import { useState } from "react";
import { auth } from "../firebase/config";

export const useSignup = () => {
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const signup = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    setError(""); // resets error before each signup
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
      setError("");
    } catch (err) {
      // typeguard to check if err is an instance of 'Error'
      if (err instanceof Error) {
        console.log(err.message);
        setError("error");
        setIsPending(false);
      } else {
        console.log("Unexpected error:", err);
      }
    }
  };

  return { error, isPending, signup };
};
