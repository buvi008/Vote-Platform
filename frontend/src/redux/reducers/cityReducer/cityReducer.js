/* eslint-disable */
import * as ACTION_TYPES from "src/redux/action-types";


const cityReducer = (state='', action) => {
  switch(action.type) {
    case ACTION_TYPES.SELECT_CITY:
      return action.payload.city;
    default:
      return state;
  }
};

export default cityReducer;
