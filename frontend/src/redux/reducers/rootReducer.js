/* eslint-disable */
import { combineReducers } from 'redux';
import projectsReducer from "src/redux/reducers/projectsReducer/projectsReducer";
import userReducer from "./userReducer/userReduser";
import cityReducer from './cityReducer/cityReducer';

const rootReducer = combineReducers({
  projects: projectsReducer,
  user: userReducer,
  city: cityReducer
})


export default rootReducer;
