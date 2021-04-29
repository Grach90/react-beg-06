import types from '../actionTypes';

const initialState = {
    loading: false,
    errorMessage: '',
    successMessage: ''
}

const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_LOADING:
            {
                return {
                    ...state,
                    loading: !state.loading,
                    errorMessage: state.loading ? '' : state.errorMessage,
                    successMessage: state.loading ? '' : state.successMessage
                }
            }
        case types.SET_ERRORMESSAGE:
            {

                return {
                    ...state,
                    errorMessage: action.errorMessage
                }
            }
        case types.SET_SUCCSSES_MESSAGE:
            {
                return {
                    ...state,
                    successMessage: action.successMessage
                }
            }
        default:
            return state;
    }
}

export default globalReducer;