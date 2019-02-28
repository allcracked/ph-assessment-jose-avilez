import * as actionTypes from './reducerActions';

const initState = {
    user: null,
}

const login = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.data.user
            }
        
        default:
            return state;
    }
}

export default login;