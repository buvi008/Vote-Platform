/* eslint-disable */
import { createStore } from 'redux';
import rootReducer from 'src/redux/reducers/rootReducer';
import initialState from 'src/redux/state';



const store = createStore(rootReducer, initialState());


export default store;
