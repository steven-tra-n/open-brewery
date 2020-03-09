import React from 'react';
import BreweryList from './BreweryList';
import SearchBar from './SearchBar';

class Breweries extends React.Component {
  constructor() {
    super();
  };

  componentDidMount() {
    this.listBreweries();
  };

  listBreweries() { //TODO: How does this work without binding this in the constructor?
    fetch("https://api.openbrewerydb.org/breweries?by_state=pennsylvania")
    // fetch("https://localhost:44328/v1/ListBreweries")
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

  searchBreweries(breweryName){
    fetch(`https://api.openbrewerydb.org/breweries/search?query=${breweryName}`)
    // fetch(`https://localhost:44328/v1/SearchBreweriesByName?breweryName=${breweryName}`)
        .then(res => res.json())
        .then((result) => {
          this.setState({ 
            breweries: result
          });
        }, (error) => {
          this.setState({ error });
        });
  };

  handleOnChange = (e) => {
    if(e.key === 'Enter') {
      if(e.target.value != ''){
        this.searchBreweries(e.target.value);
      } else{
        this.listBreweries();
      };
    };
  };

  handleOnSearch = (breweryName) => {
    this.searchBreweries(breweryName);
  };

  render() {
    if (this.state == null || this.state.breweries == null) return null;

    return (
      <div>
        <h1 id='title'>Breweries</h1>
        <SearchBar onChange={this.handleOnChange} onSearch={this.handleOnSearch} />
        <table id='breweries'>
          <tbody>
            <BreweryList breweries={this.state.breweries} />
          </tbody>
        </table>
      </div>
    );
  };
};

  export default Breweries;