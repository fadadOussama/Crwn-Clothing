/* eslint-disable no-undef */
import { createContext, useEffect, useState } from "react";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { createUserDocFromAuth, handleAuthChange } from "../../utils/firebase/firebase.utils";

export const userContext = createContext({
  userValue: null,
  setUserValue: () => null,
});

export default function UserProvider() {
  const [userValue, setUserValue] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const onChangeAuth = handleAuthChange((user) => {
      if (user) {
        createUserDocFromAuth(user);
        nav("/");
      }
      setUserValue(user);
    });

    return onChangeAuth;
  }, []);

  return <userContext.Provider value={{ userValue, setUserValue }}>{userValue === false ? <p>Loading...</p> : <Outlet />}</userContext.Provider>;
}
