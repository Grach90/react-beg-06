import types from '../actionTypes';

const initialState = {
    status: '',
    search: '',
    sort: '',
    create_lte: null,
    create_gte: null,
    complete_lte: null,
    complete_gte: null
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SEARCH_ON_CHANGE:
            {
                const { value } = action.e.target;
                return {
                    ...state,
                    search: value
                }
            }
        case types.DROP_DOWN_ONCHANGE:
            {
                const { name, value } = action;
                return {
                    ...state,
                    [name]: value
                }
            }
        case types.SET_SEARCH_DATE:
            {
                const { name, date } = action;
                return {
                    ...state,
                    [name]: date
                }
            }
        case types.RESET_SEARCH_STATE:
            {
                return {
                    ...initialState
                }
            }
        default:
            return state
    }
}

export default searchReducer;