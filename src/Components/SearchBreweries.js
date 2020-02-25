import React from 'react';
import AutoComplete from './AutoComplete';

class SearchBreweries extends React.Component {
    constructor(props){
      super(props);

      this.state = {
          suggestions: []
      };
    };
  
    handleOnKeyUp(e) {
      this.props.onChange(e);

      fetch(`https://api.openbrewerydb.org/breweries/autocomplete?query=${e.target.value}`)
      .then(res => res.json())
      .then((result) => {
          this.setState({
            suggestions: result
          });
        }, (error) => {
          this.setState({ error });
        }
      );
    };
    
    render() {
      return (
        <div>
            <input placeholder='Search Breweries' onKeyUp={(e) => this.handleOnKeyUp(e)} />
            <AutoComplete brewerySuggestions={this.state.suggestions} searchAutoComplete={this.props.searchAutoComplete}  />
        </div>
      );
    };
  };

  export default SearchBreweries;