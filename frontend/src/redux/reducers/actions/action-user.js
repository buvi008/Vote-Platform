/* eslint-disable */
import * as ACTION_TYPES from "src/redux/action-types";

const LOGIN = (userData) => {
  return {
    type: ACTION_TYPES.LOGIN,
    payload: {
      ...userData,
    }
  }
}

const LOGOUT = () => {
  return {
    type: ACTION_TYPES.LOGOUT,
    payload: {}
  }
}

const IS_LOGIN = (user) => {
  return {
    type: ACTION_TYPES.IS_LOGIN,
    payload: user
  }
};

export {
  LOGIN,
  IS_LOGIN,
  LOGOUT,
} 
