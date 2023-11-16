import { useSelector } from "react-redux";
import { RootReducerType } from "../../stroe";

type R = keyof RootReducerType;
const useStore = (key: R) => useSelector((state: RootReducerType) => state[key]);
export const useMessages = () => useSelector((reducers: RootReducerType) => reducers.notify);


export default useStore;