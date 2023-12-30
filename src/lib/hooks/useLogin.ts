import { useState, useEffect } from "react";
import { ResponseUserType } from "../../types";

const useUserState = () => {
  const [user, setUser] = useState<Omit<ResponseUserType, "access_token"> | null>(() => {
    const storage = localStorage.getItem("userState");
    return !storage ? null : JSON.parse(storage);
  }); 

  useEffect(() => {
    localStorage.setItem("userState", JSON.stringify(user));
  }, [user]);

  return [user, setUser] as [Omit<ResponseUserType, "access_token">, typeof setUser];
};

export default useUserState;