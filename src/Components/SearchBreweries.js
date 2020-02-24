import React from 'react';

class SearchBreweries extends React.Component {
    constructor(props){
      super(props);
    };
  
    passEventObjectToBreweries(e) {
      this.props.handleChange(e);
    };
    
    render() {
      return (
        <input placeholder='Search Breweries' onKeyDown={(e) => this.passEventObjectToBreweries(e)} />
      );
    };
  };

  export default SearchBreweries