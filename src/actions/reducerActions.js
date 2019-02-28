export const SET_USER = 'SET_USER';
export const LOAD_HISTORY = 'LOAD_HISTORY';
export const SAVE_RESULTS = 'SAVE_RESULTS';
export const SELECT_VIDEO = 'SELECT_VIDEO';
export const SET_SEARCH_KEY = 'SET_SEARCH_KEY';

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

export const setTheVideo = (selectedVideo) => {
    return {
        type: SELECT_VIDEO,
        data: {
            selectedVideo: selectedVideo
        }
    }
}

export const setSearchKey = (searchKey) => {
    return {
        type: SET_SEARCH_KEY,
        data: {
            term: searchKey
        }
    }
}