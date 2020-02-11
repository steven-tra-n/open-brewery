import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component{
  componentDidMount() {
    this.getBreweries();
  }

  getBreweries(){
    this.setState({
      isLoaded: false
    });

    fetch("https://api.openbrewerydb.org/breweries")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          breweries: result
        });

        console.log(this.state.breweries);
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  renderTableData(){
    return this.state.breweries.map((brewery, index) =>{
      const{ id, name, brewery_type, city, state} = brewery;
      
      return(
        <tr key={id}>
          <td>{name}</td>
          <td>{brewery_type}</td>
          <td>{city}</td>
          <td>{state}</td>
        </tr>
      )
    })
  }

  render(){
    if(this.state == null || !this.state.isLoaded) return null;

    return (
    <div>
      <h1 id='title'>Breweries</h1>
        <table id='breweries'>
          <tbody>
            {this.renderTableData()}
          </tbody>
        </table>
    </div>
    );
  }
}

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
