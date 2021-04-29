import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import toDoReducer from './Reducers/toDoReducer';
import singleTaskReducer from './Reducers/singleTaskReducer';
import globalReducer from './Reducers/globalReducer';
import contactFormReducer from './Reducers/contactFormReducer';
import ModalAddTaskReducer from './Reducers/modalAddTaskReducer';
import searchReducer from './Reducers/searchReducer';

const reducer = combineReducers({
    toDoState: toDoReducer,
    singleTaskState: singleTaskReducer,
    globalState: globalReducer,
    contactFormState: contactFormReducer,
    moadalAddTaskState: ModalAddTaskReducer,
    searchState: searchReducer
})

const store = createStore(reducer, applyMiddleware(thunk));
export default store;