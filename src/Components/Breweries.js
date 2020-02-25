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

  searchAndUpdateState(breweryName){
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

  handleOnChange = (e) => {
    if(e.key === 'Enter') {
      if(e.target.value != ''){
        this.searchAndUpdateState(e.target.value);
      } else{
        this.listBreweries();
      };
    };
  };

  handleOnSearch = (breweryName) => {
    this.searchAndUpdateState(breweryName);
  };

  render() {
    if (this.state == null || this.state.breweries == null) return null;

    return (
      <div>
        <h1 id='title'>Breweries</h1>
        <SearchBreweries onChange={this.handleOnChange} onSearch={this.handleOnSearch} />
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