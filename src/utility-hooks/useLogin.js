import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    console.log("yes", email, password);

    const response = await fetch(
      "https://hiring-test-task.vercel.app/api/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      }
    );
    const json = await response.json();
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      // update the auth context
      dispatch({ type: "LOGIN", payload: json });
      //update loading state
      setIsLoading(false);
    }

    // const appointmentsResponse = await fetch(
    //   "https://hiring-test-task.vercel.app/api/appointments",
    //   {
    //     headers: { Authorization: `Bearer ${user.token}` },
    //   }
    // );
    // const appointmentsJson = await appointmentsResponse.json();
    // console.log(appointmentsJson);
  };

  return { login, isLoading, error };
};
