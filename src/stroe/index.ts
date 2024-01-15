import { combineReducers } from "redux";
import notify from "./notify";
import posts from "./posts"

const rootReducer = combineReducers({
  notify,
  posts
});

export type RootReducerType = ReturnType<typeof rootReducer>;
export default rootReducer;