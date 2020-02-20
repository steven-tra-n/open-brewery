import React from 'react';
import RenderBreweries from './RenderBreweries';

class Breweries extends React.Component {
    componentDidMount() {
      this.listBreweries();
    };
  
    listBreweries() {
      fetch("https://api.openbrewerydb.org/breweries?per_page=50?by_state=pennsylvania")
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
  
    render() {
      if (this.state == null || this.state.breweries == null) return null;
  
      return (
        <div>
          <h1 id='title'>Breweries</h1>
          <input placeholder='Search Breweries' />
          <table id='breweries'>
            <tbody>
              <RenderBreweries breweries={this.state.breweries} />
            </tbody>
          </table>
        </div>
      );
    };
  };

  export default Breweries;