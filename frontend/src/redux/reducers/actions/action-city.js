/* eslint-disable */
import * as ACTION_TYPES from "src/redux/action-types";

const SELECT_CITY = (city) => {
  return {
    type: ACTION_TYPES.SELECT_CITY,
    payload: {
      city: city
    }
  }
};

export {
  SELECT_CITY
} 
