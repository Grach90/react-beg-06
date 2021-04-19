import types from '../actionTypes';

const initialState = {
    singleTask: null,
    isModalAddTask: true
}

const singleTaskReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.EDIT_SINGLETASK:
            {
                return {
                    ...state,
                    singleTask: action.singleTask
                }
            }
        case types.CLOSE_SINGLETASK_MODAL:
            {
                return {
                    ...state,
                    isModalAddTask: !state.isModalAddTask
                }
            }
        default:
            return state;
    }
}

export default singleTaskReducer;