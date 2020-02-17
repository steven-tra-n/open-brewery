import React from 'react';
import {Link} from "react-router-dom";

class Breweries extends React.Component {
    componentDidMount() {
      this.listBreweries();
    };
  
    listBreweries() {
      fetch("https://api.openbrewerydb.org/breweries?by_state=pennsylvania")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              breweries: result
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        );
    };
  
    renderBreweriesList() {
      return this.state.breweries.map((brewery) => {
        const {id, name, brewery_type, street, city, state, website_url} = brewery;
  
        return (
          <tr key={id}>
            <Link to={`/breweries/${id}`}><td>{name}</td></Link>
            <td>{brewery_type}</td>
            <td>{street}</td>
            <td>{city}</td>
            <td>{state}</td>
            <td><a href={website_url}>{website_url}</a></td>
          </tr>
        );
      });
    };
  
    render() {
      if (this.state == null || this.state.breweries == null) return null;
  
      return (
        <div>
          <h1 id='title'>Breweries</h1>
          <table id='breweries'>
            <tbody>
              {this.renderBreweriesList()}
            </tbody>
          </table>
        </div>
      );
    };
  };

  export default Breweries;