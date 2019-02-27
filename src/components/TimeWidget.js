import React from 'react';

const timeWidget = (props) => {
    return (
        <div className="date__widget">
            <h3>{props.dateAndTime}</h3>
        </div>
    );
}

export default timeWidget;