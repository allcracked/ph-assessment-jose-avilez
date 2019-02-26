import React from 'react';

const searchHistory = (props) => {
    if (!props.searches) {
        return (
            <p>No search history...</p>
        )
    }
    
    const searchesList = props.searches.map(search => {
        return (
            <li key={search.id} >
                {search.searchKey}
            </li>
        );
    });


    return (
        <div className="search__history">
            <ul>
                {searchesList}
            </ul>
        </div>
    )
}

export default searchHistory;