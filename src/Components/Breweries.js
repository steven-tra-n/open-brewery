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

    SearchBreweries() {
      // this.setState({
      //   value: event.target.value
      // });

      // if(event.key === 'Enter') {
      //   fetch(`https://api.openbrewerydb.org/breweries/search?query=${this.state.value}`)
      //   .then(res => res.json())
      //   .then((result) => {
      //     // this.setState({ 
      //     //   breweries: result
      //     // });
      //     this.props.breweries = result;
      //   }, (error) => {
      //     this.setState({ error });
      //   });
      // };

      return (
        <input placeholder='Search Breweries' onKeyDown={(event) => this.handleChange(event)} />
      );
    };
  
    render() {
      if (this.state == null || this.state.breweries == null) return null;
  
      return (
        <div>
          <h1 id='title'>Breweries</h1>
          <this.SearchBreweries breweries={this.state.breweries} />
          <table id='breweries'>
            <tbody>
              <RenderBreweries breweries={this.state.breweries} />
            </tbody>
          </table>
        </div>
      );
    };
  };

  // class SearchBreweries extends React.Component {
  //   constructor(props){
  //     super(props);
  //     this.state = {
  //       value: ''
  //     };
  //   };
    
  //   render() {
      
  //   };
  // };

  export default Breweries;