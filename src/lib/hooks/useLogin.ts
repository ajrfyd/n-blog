import { useState, useEffect } from "react";
import { ResponseUserType } from "../../types";

const useUserState = () => {
  const [user, setUser] = useState<ResponseUserType | null>(() => {
    const storage = localStorage.getItem("userState");
    return !storage ? null : JSON.parse(storage);
  }); 

  useEffect(() => {
    // TOdo ==> 
    //^ 여기서 localStorage에 토큰 빼고 저장?
    localStorage.setItem("userState", JSON.stringify(user));
  }, [user]);

  return [user, setUser] as [ResponseUserType, typeof setUser];
};

export default useUserState;