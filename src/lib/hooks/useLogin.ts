import { useState, useEffect } from "react";
import { UserStateType } from "../../types/userType";

const useUserState = () => {
  const [user, setUser] = useState<UserStateType | null>(() => {
    const storage = localStorage.getItem("userState");
    return !storage ? null : JSON.parse(storage);
  }); 

  useEffect(() => {
    localStorage.setItem("userState", JSON.stringify(user));
  }, [user]);

  return [user, setUser] as [UserStateType, typeof setUser];
};

export default useUserState;