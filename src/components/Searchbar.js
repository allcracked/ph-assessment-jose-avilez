import React from 'react';

const searchbar = (props) => {
    return (
        <div className="search__bar">
            <input 
                defaultValue={props.search} 
                onChange={props.changeHandler}
                type="text"
                placeholder="Search..." />
            <button onClick={() => {props.saveSearchHan(props.search)}}>
                Save search
            </button>
        </div>
    );
}

export default searchbar;