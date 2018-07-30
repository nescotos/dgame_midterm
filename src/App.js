import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Game from './Game';
import Registration from './Registration';
import Top from './Top';
import About from './About';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Route exact path="/" component={Game} />
          <Route path="/registration" component={Registration} />
          <Route path="/top" component={Top} />
          <Route path="/about" component={About} />
        </div>
      </Router>
    );
  }
}

export default App;
