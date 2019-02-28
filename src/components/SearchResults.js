import React from 'react';

const searchResults = (props) => {
    const videoList = props.videos.map((video) => {
        return (
            <div key={video.etag} onClick={() => {props.clickHandler(video)}} className="col-sm-4 search__result">
                <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
                <h5>{video.snippet.title}</h5>
                <p>By: {video.snippet.channelTitle}</p>
            </div>
        );
    });

    return (
        <div className="search__result row">
            {videoList}
        </div>
    );
}

export default searchResults;