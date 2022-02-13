import types from "../../action/types";

const defaultState = {
  theme: {
    themeColor: '#2196F3'
  }
}

export default function onAction(state = defaultState, action) {
  switch(action.type) {
    case types.THEME_CHANGE:
      return {
        ...state,
        theme: action.theme
      };
    default:
      return state;
  }
}