/* eslint-disable */
import * as ACTION_TYPES from "src/redux/action-types";


const projectsReducer = (state=[], action) => {
  switch(action.type) {
    case ACTION_TYPES.GET_PROJECTS:
      return state = [...action.payload.data]


    case ACTION_TYPES.ADD_PROJECT:
      return [...state, action.payload]


    case ACTION_TYPES.ADD_VARIANT:
      const dataVariant = action.payload
      return state.map(el => {
        if (dataVariant.id === el._id) {
          el.variantId = [...el.variantId, dataVariant.variant]
        }
        return el;
      })

    case ACTION_TYPES.ADD_LIKE:
      const data = action.payload;
      return state.map(el => {
        if (el._id === data.idProject) {
          el.variantId.map(item => {
            if (item._id === data.idVariant) {
              item.count = item.count + 1
            }
          })
        }
        return el;
      })
    default:
      return state.map(el => {
        return el;
      });
  }
};

export default projectsReducer;
