import { combineReducers, createStore as createReduxStore } from 'redux';

import { content } from './reducers/contentReducer';
import { filters } from './reducers/filterReducer';
import { pagination } from './reducers/paginationReducer';

const reducers = combineReducers({
  filters,
  pagination,
  content
});

// const storeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
// const defaultState = { entries: [], filters: {}, page:1 };
// export const createStore = (state = defaultState) => createReduxStore(reducers, state, storeEnhancer);
export const store = createReduxStore(reducers);