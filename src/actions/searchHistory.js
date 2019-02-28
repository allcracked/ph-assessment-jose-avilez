import * as actionTypes from './actions/reducerActions';

const initState = {
    searches: [],
}

export default login = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_HISTORY: 
            return {
                ...state,
                searches: payload.data.historyData
            }
        
        default:
            return state;
    }
}