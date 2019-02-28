import React from 'react';

const searchHistory = (props) => {
    if (!props.searches) {
        return (
            <p>No search history saved...</p>
        )
    }

    const style = {
        cursor: 'pointer'
    }
    
    const searchesList = props.searches.map((search, index) => {
        return (
            <tr key={search.id} onClick={() => props.clickHandler(search)} style={style} className="history__result">
                <th scope="row">{index+1}</th>
                <td>{search.searchKey}</td>
                <td>{search.user}</td>
                <td>{new Date(search.timestamp).toLocaleDateString("en-US")} {new Date(search.timestamp).toLocaleTimeString("en-US")}</td>
            </tr>
        );
    });


    return (
        <div className="search__history">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Search</th>
                        <th scope="col">Saved by</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {searchesList}
                </tbody>
            </table>
        </div>
    )
}

export default searchHistory;