import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Components/Home';
import Breweries from './Components/Breweries';
import Brewery from './Components/Brewery';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/breweries/:id" component={Brewery} />
        <Route path="/breweries" component={Breweries} />
        <Route path="/" component={Home} />
      </Switch>
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
