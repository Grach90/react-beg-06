import types from '../actionTypes';

const initialState = {
    singleTask: null,
    isModalAddTask: true
}

const singleTaskReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.EDIT_SINGLETASK:
            {
                let { singleTask } = action;
                // singleTask.date = typeof(singleTask.date) === 'string' ? singleTask.date : dateFormator(singleTask.date);
                // // console.log(singleTask.date.slice(0, 10));
                return {
                    ...state,
                    singleTask
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