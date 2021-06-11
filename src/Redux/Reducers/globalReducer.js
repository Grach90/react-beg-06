import types from '../actionTypes';

const initialState = {
    loading: false,
    errorMessage: '',
    successMessage: '',
    isAuthenticated: localStorage.getItem('token'),
    userInfo: localStorage.getItem('userName')
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
        case types.LOG_IN:
            {
                return {
                    ...state,
                    isAuthenticated: action.dataLogin,
                    userInfo: action.dataUser.name
                }
            }
        case types.LOG_OUT:
            {
                localStorage.removeItem('token');
                localStorage.removeItem('userName');
                return {
                    ...state,
                    isAuthenticated: false,
                    userInfo: ''
                }
            }
        default:
            return state;
    }
}

export default globalReducer;