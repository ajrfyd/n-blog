import { combineReducers } from "redux";
import notify from "./notify";

const rootReducer = combineReducers({
  notify,
});

export type RootReducerType = ReturnType<typeof rootReducer>;
export default rootReducer;