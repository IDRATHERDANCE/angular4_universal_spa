import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from '../reducers';
import appDataReducer from '../reducers';
const persistState = require('redux-sessionstorage');


export const enhancers = [
  persistState('applicationData', { key: '__anarajcevic.com__' })
];

// if (typeof window !== 'undefined' && window.devToolsExtension) {
//   enhancers.push(window.devToolsExtension());
// }

export default configureStore({
  reducer: { appDataReducer },
});


