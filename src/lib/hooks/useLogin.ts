import { useState, useEffect } from "react";
import { UserStateType } from "../../ types/userType";

const useUserState = (userInfo?: Pick<UserStateType, "name">) => {
  const [user, setUser] = useState<UserStateType | null>(() => {
    const storage = localStorage.getItem("userState");
    return !storage ? null : JSON.parse(storage);
  }); 

  useEffect(() => {
    localStorage.setItem("userState", JSON.stringify(user));
  }, [user, userInfo]);

  return [user, setUser];
};

export default useUserState;