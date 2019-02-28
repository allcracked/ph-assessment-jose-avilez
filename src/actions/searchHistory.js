import * as actionTypes from './reducerActions';

const initState = {
    searches: [],
}

const searchHistory = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_HISTORY: 
            return {
                ...state,
                searches: action.data.historyData
            }
        
        default:
            return state;
    }
}

export default searchHistory;