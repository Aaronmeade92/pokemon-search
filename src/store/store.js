import { createStore, combineReducers, applyMiddleware } from 'redux';
import dataReducer from '../reducer/data-reducer.js';
import thunk from 'redux-thunk';

const appReducer = combineReducers({
    dataReducer,
});

export default createStore(appReducer, applyMiddleware(thunk));