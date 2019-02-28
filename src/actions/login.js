import * as actionTypes from './actions/reducerActions';

const initState = {
    user: null,
}

export default login = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: payload.data.user
            }
        
        default:
            return state;
    }
}