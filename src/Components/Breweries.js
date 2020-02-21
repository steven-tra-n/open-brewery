import React from 'react';
import RenderBreweries from './RenderBreweries';

class Breweries extends React.Component {
  constructor() {
    super();
    this.handleChangeFromBreweries = this.handleChangeFromBreweries.bind(this); //How can we remove this binding via arrow function?
  };

  componentDidMount() {
    this.listBreweries();
  };

  listBreweries() {
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

  handleChangeFromBreweries(e) {
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
        <SearchBreweries handleChangeFromBreweries={this.handleChangeFromBreweries} />
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

  handleChangeFromSearchBreweries(e) {
    this.props.handleChangeFromBreweries(e);
  };
  
  render() {
    return (
      <input placeholder='Search Breweries' onKeyDown={(e) => this.handleChangeFromSearchBreweries(e)} />
    );
  };
};

  export default Breweries;