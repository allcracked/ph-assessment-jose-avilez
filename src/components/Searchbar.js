import React from 'react';

const searchbar = (props) => {
    const style = {
        display: 'inline',
    };

    return (
        <div className="search__bar form-group" style={style}>
            <div className="input-group">
                <input 
                    value={props.search} 
                    onChange={props.changeHandler}
                    type="text"
                    placeholder="Search..." 
                    className="form-control" />
                <button className="btn btn-primary" onClick={(e) => {e.preventDefault(); props.saveSearchHan(props.search)}}>Save Search</button>
            </div>
        </div>
    );
}

export default searchbar;