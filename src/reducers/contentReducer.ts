import { SHOW_CONTENT, SHOW_NEWS_CONTENT, SHOWMODAL_CONTENT  } from "../action/index";
import { initialState } from "./initialState";

const contentReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SHOW_CONTENT:
      console.log(action.payload);
      return Object.assign({}, state, {
        currentNgoId: action.payload,
      });

    case SHOW_NEWS_CONTENT:
      console.log(action.payload);
      return Object.assign({}, state, {
        currentNewsList: action.payload,
      });

    case SHOWMODAL_CONTENT:
      return Object.assign({}, state, {
        contentModalInfo: action.payload,
      })

    default:
      return state;
  }
};
export default contentReducer;