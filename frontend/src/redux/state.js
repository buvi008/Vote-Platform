/* eslint-disable */
const initialState = () => {
  return {
    projects: [],
    user: {},
    city: localStorage.getItem('city') ?? 'Город'
  };
};


export default initialState;
