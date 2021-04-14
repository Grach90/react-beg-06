import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import toDoReducer from './Reducers/toDoReducer';
import singleTaskReducer from './Reducers/singleTaskReducer';

const reducer = combineReducers({
    toDoState: toDoReducer,
    singleTaskState: singleTaskReducer
})

const store = createStore(reducer, applyMiddleware(thunk));
export default store;