/** @format */

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);

  function hasAccess(route) {
    // console.log(user);
    if (user.premessions.includes(route)) return true;
    else return false;
  }
  //----------------------- SIGNOUT -----------------------
  const handleSignOut = async () => {
    const { auth } = await import("../firebase/firebase");
    console.log("from out");
    auth
      .signOut()
      .then(() => {
        setUser(null);
        sessionStorage.removeItem("session");
      })
      .catch((e) => console.log(e));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        handleSignOut,
        hasAccess,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
