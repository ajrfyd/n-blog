import { useSelector } from "react-redux";
import { RootReducerType } from "./stroe";
const Test = () => {
  const a = useSelector((state: RootReducerType) => state.posts);
  console.log(a)
  return (
    <div>
      Hello Test??
    </div>
  )
}

export default Test;