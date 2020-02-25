import React from 'react';
import RenderBreweries from './RenderBreweries';
import SearchBreweries from './SearchBreweries';

class Breweries extends React.Component {
  constructor() {
    super();
  };

  componentDidMount() {
    this.listBreweries();
  };

  listBreweries() { //TODO: How does this work without binding this in the constructor?
    fetch("https://api.openbrewerydb.org/breweries?by_state=pennsylvania")
      .then(res => res.json())
      .then((result) => {
          this.setState({
            breweries: result
          });
        }, (error) => {
          this.setState({
            isLoaded: true,
            error //TODO: What does this line do?
          });
        }
      );
  };

  handleOnChange = (e) => {
    if(e.key === 'Enter') {
      if(e.target.value != ''){
        fetch(`https://api.openbrewerydb.org/breweries/search?query=${e.target.value}`) //TODO: This will search on all breweries instead of local ones
        .then(res => res.json())
        .then((result) => {
          this.setState({ 
            breweries: result
          });
        }, (error) => {
          this.setState({ error });
        });
      } else{
        this.listBreweries();
      };
    };
  };

  searchAutoComplete = (breweryName) => {
    fetch(`https://api.openbrewerydb.org/breweries/search?query=${breweryName}`)
        .then(res => res.json())
        .then((result) => {
          this.setState({ 
            breweries: result
          });
        }, (error) => {
          this.setState({ error });
        });
  };

  render() {
    if (this.state == null || this.state.breweries == null) return null;

    return (
      <div>
        <h1 id='title'>Breweries</h1>
        <SearchBreweries onChange={this.handleOnChange} searchAutoComplete={this.searchAutoComplete} />
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