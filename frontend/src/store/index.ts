import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { coursesReducer } from './courses/coursesReducer';
import { userReducer } from './user/userReducer';

const store = createStore(combineReducers({courses: coursesReducer, userState: userReducer}), applyMiddleware(thunk));
export default store;
