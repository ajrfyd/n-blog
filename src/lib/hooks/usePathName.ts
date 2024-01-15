import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPathName } from "../utils";

const usePathName = () => {
  const [path, setPath] = useState<string>("");
  const { pathname, state } = useLocation();
  useEffect(() => {
    setPath(getPathName(pathname));
  }, [pathname]);

  return [path, state];
};

export default usePathName;