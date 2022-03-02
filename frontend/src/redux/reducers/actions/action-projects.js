/* eslint-disable */
import * as ACTION_TYPES from "src/redux/action-types";


const GET_PROJECTS = (data) => {
  return {
    type: ACTION_TYPES.GET_PROJECTS,
    payload: {
      data: data
    }
  }
};


const ADD_PROJECT = (data) => {
  return {
    type: ACTION_TYPES.ADD_PROJECT,
    payload: data
  }
}

const ADD_VARIANT = (data) => {
  return {
    type: ACTION_TYPES.ADD_VARIANT,
    payload: {
      id: data.id,
      variant: data.variant
    }
  }
}

const ADD_LIKE = (data) => {
  return {
    type: ACTION_TYPES.ADD_LIKE,
    payload: {
      idProject: data.idProject,
      idVariant: data.idVariant
    }
  }
}


export {
  GET_PROJECTS,
  ADD_LIKE,
  ADD_PROJECT,
  ADD_VARIANT,
}
