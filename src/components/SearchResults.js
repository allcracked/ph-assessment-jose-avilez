import React from 'react';

const searchResults = (props) => {

    const videoList = props.videos.map((video) => {
        return (
            <li key={video.etag} onClick={() => {props.clickHandler(video)}}>
                <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
                <h4>{video.snippet.title}</h4>
                <p>By: {video.snippet.channelTitle}</p>
            </li>
        );
    });

    return (
        <div className="search__result">
            {videoList}
        </div>
    );
}

export default searchResults;