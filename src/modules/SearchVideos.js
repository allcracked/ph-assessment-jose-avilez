// This is the core function where the connection with YT API is made.

const searchVideos = (searchTerm, callback) => {

    const params = {
        url: 'https://www.googleapis.com/youtube/v3/playlists?',
        part: 'snippet',
        key: 'AIzaSyAg_zDpsDjpaa-udBoW7aimnRKAI_e4hus',
        maxResult: '6',
    };

    fetch(params.url+'part='+params.part+'&key='+params.key+'&maxResults='+params.maxResult+'&q='+searchTerm+"&type=video&channelId=UC_x5XG1OV2P6uZZ5FSM9Ttw")
    .then(res => res.json())
    .then(res => {
        if (callback) {
            callback(res.items);
        }
    });
}

export default searchVideos;