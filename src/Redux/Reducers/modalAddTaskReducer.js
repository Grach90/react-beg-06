import types from '../../Redux/actionTypes';

const initialState = {
    title: '',
    description: '',
    date: new Date()
}

const ModalAddTaskReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_EDIT_TASK:
            {
                const { editableTask } = action;
                if (editableTask) {
                    editableTask.date = new Date(editableTask.date);
                    return {
                        ...editableTask
                    }
                }
                return state;
            }
        case types.SET_DATE:
            {
                return {
                    ...state,
                    date: action.date

                }
            }
        case types.HANDLE_CHANGE_MODAL:
            {

                const { name, value } = action.e.target;
                return {
                    ...state,
                    [name]: value
                }
            }
        case types.RESET_MODAL_STATE:
            {
                return {
                    ...initialState
                }
            }
        default:
            return state;
    }

}

export default ModalAddTaskReducer;