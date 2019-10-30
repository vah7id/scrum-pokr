import React, { Component } from 'react';
import { HashRouter, Switch, Route } from "react-router-dom";
import Start from './components/Start';
import Game from './components/Game';
import './assets/style.scss';

class App extends Component<any, any> {
  render() {
    return (
      <div className="App">
        <div className={'stars'} />
        <div className={'twinkling'} />
        <HashRouter
          basename={'/'}
          hashType={'hashbang'}
        >
          <Switch>
            <Route exact path="/">
              <Start />
            </Route>
            <Route path="/:id">
              <Game />
            </Route>
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
