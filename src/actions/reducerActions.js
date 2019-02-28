export const SET_USER = 'SET_USER';
export const LOAD_HISTORY = 'LOAD_HISTORY';
export const SAVE_RESULTS = 'SAVE_RESULTS';

export const setUser = (user) => {
    return {
        type: SET_USER,
        data: {
            user: user
        }
    }
}

export const loadHistory = (historyData) => {
    return {
        type: LOAD_HISTORY,
        data: {
            historyData: historyData
        }
    }
}

export const saveResults = (term, videoData, selectedVideo) => {
    return {
        type: SAVE_RESULTS,
        data: {
            term: term,
            videoData: videoData,
            selectedVideo: selectedVideo
        }
    }
}