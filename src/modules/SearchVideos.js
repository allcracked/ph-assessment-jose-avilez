// This is the core function where the connection with YT API is made.

const searchVideos = (searchTerm, callback) => {

    const params = {
        url: 'https://www.googleapis.com/youtube/v3/search?',
        part: 'snippet',
        key: 'YoutubeAPIKEY',
        maxResult: '6',
    };

    fetch(params.url+'part='+params.part+'&key='+params.key+'&maxResults='+params.maxResult+'&q='+searchTerm+"&type=video")
    .then(res => res.json())
    .then(res => {
        if (callback) {
            callback(res.items);
        }
    });
}

export default searchVideos;