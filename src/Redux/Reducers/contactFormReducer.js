import types from '../actionTypes';
import { isRequired, maxLength, minLength, validetEmail } from '../../helpers/Validate';

const initialState = {
    formData: {
        name: {
            value: "",
            error: "",
            valid: false
        },
        email: {
            value: "",
            error: "",
            valid: false
        },
        message: {
            value: "",
            error: "",
            valid: false
        }
    }
}
const maxLength30 = maxLength(30);
const minLength6 = minLength(6);

const contactFormReducer = (state = initialState, action) => {
    // console.log('initialState', initialState);
    switch (action.type) {
        case types.HANDLE_CHANGE:
            {
                let formData = {...state.formData };
                const { name, value } = action.e.target;
                let error = isRequired(value) || maxLength30(value) ||
                    minLength6(value) ||
                    (name === "email" && validetEmail(value));
                if (!error) formData[name].valid = true;
                else formData[name].valid = false;
                formData[name].value = value;
                formData[name].error = error;
                return {
                    formData
                }
            }
        case types.RESET_CONTACTFORM_STATE:
            {
                // console.log('initialState', initialState);
                // console.log('state', state);
                return {
                    formData: {
                        name: {
                            value: "",
                            error: "",
                            valid: false
                        },
                        email: {
                            value: "",
                            error: "",
                            valid: false
                        },
                        message: {
                            value: "",
                            error: "",
                            valid: false
                        }
                    }
                }
            }
        default:
            return state;
    }
}

export default contactFormReducer;