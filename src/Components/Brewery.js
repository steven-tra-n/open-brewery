import React from 'react';
import {Link} from "react-router-dom";

class Brewery extends React.Component {
    componentDidMount() {
      this.getBrewery();
    };
  
    getBrewery() {
      this.setState({
        id: this.props.match.params.id
      }, () => {
        fetch(`https://api.openbrewerydb.org/breweries/${this.props.match.params.id}`)
          .then(res => res.json())
          .then((result) => {
            this.setState({ brewery: result });
          }, (error) => {
            this.setState({ error });
          }
          );
      });
    };
  
    render() {
      if (this.state == null || this.state.brewery == null) return null;
      const {id, brewery} = this.state;
  
      return (
        <div>
          <p>{id}</p>
          <p>{brewery.name}</p>
          <p>{brewery.street}</p>
          <p>{brewery.city}</p>
          <p>{brewery.state}</p>
          <p>{brewery.phone}</p>
        </div>)
    };
  };

  export default Brewery;