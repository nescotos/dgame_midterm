import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Game from './Game';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Route exact path="/" component={Game} />
        </div>
      </Router>
    );
  }
}

export default App;
