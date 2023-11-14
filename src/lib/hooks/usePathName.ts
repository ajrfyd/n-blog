import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPathName } from "../utils";

const usePathName = () => {
  const [path, setPath] = useState<string>("");
  const { pathname } = useLocation();
  useEffect(() => {
    setPath(getPathName(pathname));
  }, [pathname]);

  return [path];
};

export default usePathName;