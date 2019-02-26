import React from 'react';

const video = (props) => {
    if (!props.video) {
        return (
            <p>Loading video...</p>
        );
    }
    
    const videoUrl = 'https://www.youtube.com/embed/'+props.video.id.videoId;

    return (
        <div className="video__container">
            <div className="video__player">
                <iframe 
                    src={videoUrl}
                    title={props.video.snippet.title}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture">
                </iframe>
            </div>
            <div className="video__details">
                <h2>{props.video.snippet.title}</h2>
                <p>{props.video.snippet.description}</p>
            </div>
        </div>
    );
}

export default video;