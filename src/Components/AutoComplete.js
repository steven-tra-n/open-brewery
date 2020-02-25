import React from 'react';

const AutoComplete = (props) => {
const suggestions = props.brewerySuggestions.map(brewery => (
    <li key={brewery.id}>
        <a href='#' onClick={() => props.searchAutoComplete(brewery.name)} >{brewery.name}</a>
    </li>
));

return <ul>{suggestions}</ul>
};

export default AutoComplete;