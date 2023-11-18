import { StateType, ActionType } from './type';

const initialState: StateType = {
  posts: [],
  tags: []
};

const postsReducer = ((state = initialState, action: ActionType) => {
  switch(action.type) {
    case "posts_GET_DATA":
      return { ...state };
    case "posts_SET_DATA":
      return { 
        ...state, 
        posts: action.payload.posts, 
        tags: action.payload.tags 
      };
    default:
      return state;
  }
});

export default postsReducer;