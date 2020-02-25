import React from 'react';

class SearchBreweries extends React.Component {
    constructor(props){
      super(props);

      this.state = {
          suggestions: []
      };
    };
  
    passEventObjectToBreweries(e) {
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
            <input placeholder='Search Breweries' onKeyUp={(e) => this.passEventObjectToBreweries(e)} />
            <AutoComplete brewerySuggestions={this.state.suggestions} />
        </div>
      );
    };
  };

  const AutoComplete = (props) => {
      const suggestions = props.brewerySuggestions.map(brewery => (
        <li key={brewery.id}>
            <a href='#'>{brewery.name}</a>
        </li>
      ));

      return <ul>{suggestions}</ul>
  };

  export default SearchBreweries;