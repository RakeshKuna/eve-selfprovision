import { appConstants } from '../constants';

const initialState = {
  size: 5
};
export function configurations(state = initialState, action) {
  switch (action.type) {
    case appConstants.PAGE_SIZE:
      if (action.size) {
        return {
          ...state,
          size: action.size
        };
      }
      return state;
    default:
      return state;
  }
}
