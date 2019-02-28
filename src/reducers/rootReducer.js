import * as actionTypes from '../actions/reducerActions';

const initState = {
        searchKey: '',
        returnedVideos: [],
        selectedVideo: [],
        user: null,
        searches: [],
};

const rootReducer = (state = initState, payload) => {
    
    switch (payload.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: payload.data.user
            }

        case actionTypes.LOAD_HISTORY: 
            return {
                ...state,
                searches: payload.data.historyData
            }

        case actionTypes.SAVE_RESULTS:
            let term, videoData, selectedVideo;

            if (typeof payload.data.term === 'undefined' || payload.data.term === null) {
               term = state.searchKey;
            } else {
                term = payload.data.term;
            }
            
            if (typeof payload.data.videoData === 'undefined' || payload.data.videoData === null) {
                videoData = state.returnedVideos.splice();
             } else {
                videoData = payload.data.videoData;
             }

             if (typeof payload.data.selectedVideo === 'undefined' || payload.data.selectedVideo === null) {
                selectedVideo = Object.assign({}, state.selectedVideo);
             } else {
                selectedVideo = payload.data.selectedVideo;
             }

            return {
                ...state,
                searchKey: term,
                returnedVideos: videoData,
                selectedVideo: selectedVideo
            }

        default:
            return state;
    }
}

export default rootReducer;