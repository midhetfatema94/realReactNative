import { combineReducers, compose, applyMiddleware, createStore } from 'redux';
import HomeReducer from './HomeReducer';
import thunk from 'redux-thunk';

const appReducers = combineReducers({
    HomeReducer
})

const rootReducer = (state, action) => {
    return appReducers(state, action)
}

export default createStore(rootReducer, compose(applyMiddleware(thunk)));