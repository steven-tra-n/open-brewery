import React from 'react';
import RenderBreweries from './RenderBreweries';

class Breweries extends React.Component {
  constructor() {
    super();
  };

  componentDidMount() {
    this.listBreweries();
  };

  listBreweries() { //TODO: How does this work without binding this in the constructor?
    fetch("https://api.openbrewerydb.org/breweries?per_page=50?by_state=pennsylvania")
      .then(res => res.json())
      .then((result) => {
          this.setState({
            breweries: result
          });
        }, (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  };

  handleChange = (e) => {
    if(e.key === 'Enter') {
      fetch(`https://api.openbrewerydb.org/breweries/search?query=${e.target.value}`)
      .then(res => res.json())
      .then((result) => {
        this.setState({ 
          breweries: result
        });
      }, (error) => {
        this.setState({ error });
      });
    };
  };

  render() {
    if (this.state == null || this.state.breweries == null) return null;

    return (
      <div>
        <h1 id='title'>Breweries</h1>
        <SearchBreweries handleChange={this.handleChange} />
        <table id='breweries'>
          <tbody>
            <RenderBreweries breweries={this.state.breweries} />
          </tbody>
        </table>
      </div>
    );
  };
};

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

  export default Breweries;