import { State, ActionType } from "./type";

const initialState: State = [];

const notifyReducer = (state = initialState, action: ActionType) => {
  switch(action.type) {
    case "notify_NOTIFY":
      return state;
    case "notify_ENQ_NOTIFY":
      return [...state, action.payload];
    case "notify_DEQ_NOTIFY":
      return [...state.slice(1)];
    default:
      return state;
  }
};

export default notifyReducer;