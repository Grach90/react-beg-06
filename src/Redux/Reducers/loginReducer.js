import types from '../actionTypes';

const initialState = {
    formData: {
        email: '',
        password: ''
    }
}

const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ONCHANGE_LOGIN:
            {
                const { name, value } = action.e.target;
                const { formData } = state;

                formData[name] = value;
                return {
                    formData
                }
            }
        default:
            return state
    }
}

export default LoginReducer;