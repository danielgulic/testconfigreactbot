import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, {  Component } from 'react';
import Home from './components/Home';
import TopBar from './components/TopBar';

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <TopBar />

          <div className="container">
            <Switch>
              <Route path="/" component={Home}/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Router;