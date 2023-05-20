import { IUser } from "@/types/types.context";
import { getCookie, setCookie } from "cookies-next";
import React, { createContext, useState } from "react";

export const AuthContext = createContext<any>(null);

const getUserFromCookies = () => {
  const data = getCookie("user");
  if (data) {
    if (typeof data === "string") {
      return JSON.parse(data);
    }
    return data;
  }

  return null;
};

function Context({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser>(getUserFromCookies());

  const setUserData = (data: any) => {
    setUser(data);
    setCookie("user", data);
  };
  return (
    <AuthContext.Provider value={{ user, setUser: setUserData }}>
      {children}
    </AuthContext.Provider>
  );
}

export default Context;
