import thunk from 'redux-thunk';
import rootReducer from './reducers';

import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';

const initialState = {};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
