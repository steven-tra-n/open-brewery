import React from 'react';
import {Link} from "react-router-dom";

function Home() {
    return (
      <div>
        Welcome home, DAUGHTER.
        <br />
        <Link to='/breweries'><button>Don't you DARE call me daugther!</button></Link>
      </div>
    );
  };

  export default Home;