import {combineReducers} from 'redux';
import loginReducer from '../actions/login';
import historyReducer from '../actions/searchHistory';
import youtubeReducer from '../actions/youtubeData';

export default combineReducers({
    login: loginReducer,
    searchHistory: historyReducer,
    youtubeData: youtubeReducer
});