import types from '../actionTypes';

const initialState = {
    singleTask: null,
    isModalAddTask: true,
    loading: false
}

const singleTaskReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.TOGGLE_SET_LOADING:
            {
                return {
                    ...state,
                    loading: !state.loading
                }
            }
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