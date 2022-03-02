/* eslint-disable */
import * as ACTION_TYPES from "src/redux/action-types";


const userReducer = (state={}, action) => {
  switch(action.type) {
    // return state.map(el => {
    //   if (el.id === action.payload.id) return {...el,
    //     id: action.payload.newId, value: action.payload.newPlace
    //   }
    //   return el;
    // })
    case ACTION_TYPES.LOGOUT:
      return state = {isLogin: false, user: {}};
    case ACTION_TYPES.LOGIN:
      return state = {isLogin: true, user: action.payload};
    case ACTION_TYPES.IS_LOGIN:
      return state = {isLogin: true, user: action.payload};
    default:
      return state;
  }
};

export default userReducer;
