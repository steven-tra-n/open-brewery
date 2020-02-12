import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

class Breweries extends React.Component{
  componentDidMount() {
    this.listBreweries();
  };

  listBreweries(){
    fetch("https://api.openbrewerydb.org/breweries")
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

  renderBreweriesList(){
    return this.state.breweries.map((brewery) =>{
      const{ id, name, brewery_type, street, city, state, website_url} = brewery;

      return(
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

  render(){
    if(this.state == null || this.state.breweries == null) return null;

    return(
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

class Brewery extends React.Component{
  getBrewery(){
    this.setState({
      id: useParams()
    });

    fetch(`https://api.openbrewerydb.org/breweries/${this.state.id}`)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          brewery: result
        });

        console.log(this.state.brewery);
      },
      (error) => {
        this.setState({
          error
        });
      }
    );
  };

  render(){
    if(this.state == null || this.state.brewery == null) return null;

    return(
      <div>{this.state.id}</div>)
  };
};

function Home (){
  return(
    <div>Welcome home, DAUGHTER.</div>
  );
};

function App(){
    return (
    <Router>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/breweries" exact>
        <Breweries />
      </Route>
      <Route path="/breweries/:id">
        <Brewery />
      </Route>
    </Router>
    );
};

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
