import React, { Component } from 'react';
import LoginWithDiscord from './LoginWithDiscord';
import Dashboard from './Dashboard';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      isLoggedIn: window.localStorage.getItem('token') ? true : false
    }

    this.login = this.login.bind(this);
  }

  login() {
    this.setState({ isLoggedIn: true });
  }

  render() {
    
    if (!this.state.isLoggedIn) return (
      <div className="container">
        <LoginWithDiscord login={this.login} />
      </div>
    );

    return (
      <div>
        <Dashboard />
      </div>
    );
  }
}

export default Home;
