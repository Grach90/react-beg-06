import types from '../actionTypes';
import { isRequired, maxLength, minLength, validetEmail } from '../../helpers/Validate';

const initialState = {
    formData: {
        name: {
            value: '',
            error: '',
            valid: true
        },
        surname: {
            value: '',
            error: '',
            valid: true
        },
        email: {
            value: '',
            error: '',
            valid: true
        },
        password: {
            value: '',
            error: '',
            valid: true
        },
        confirmPassword: {
            value: '',
            error: '',
            valid: true
        }
    }
}

const minLength4 = minLength(4);
const maxLength22 = maxLength(22);

const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.HANDLE_CHANGE_REGISTER:
            {
                const { formData } = state;
                const { name, value } = action.e.target;

                const error = isRequired(value) || minLength4(value) || maxLength22(value) ||
                    (name === 'email' && validetEmail(value) ||
                        (name === 'confirmPassword' && formData.password.value !== value && 'password does not match'))

                if (error) {
                    formData[name].valid = true;
                } else formData[name].valid = false;

                formData[name].value = value;
                formData[name].error = error;
                return {
                    formData
                }
            }
        default:
            return state
    }
}

export default registerReducer;