import React, { Component } from 'react';
import { HashRouter, Switch, Route } from "react-router-dom";
import Start from './components/Start';
import Game from './components/Game';
import './assets/style.scss';

class App extends Component<any, any> {
  render() {
    return (
      <div className="App">
        <HashRouter
          basename={'/'}
          hashType={'hashbang'}
        >
          <Switch>
            <Route exact path="/" component={Start} />
            <Route path="/:id" component={Game} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
