import types from '../actionTypes';

const initialState = {
    loading: false
}

const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_LOADING:
            {
                return {
                    loading: !state.loading
                }
            }
        default:
            return state;
    }
}

export default globalReducer;