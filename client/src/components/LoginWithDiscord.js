import React, { Component } from 'react';
import { API_BASE } from '../';

class LoginWithDiscord extends Component {
  constructor(props) {
    super(props);

    this.popupLogin = this.popupLogin.bind(this);
  }

  popupLogin() {
    var once;
    window.open(API_BASE + '/api/auth/login', '_blank', 'width=500,height=1000');
    window.addEventListener('message', event => {
      if (once || event.origin !== API_BASE) return;
      once = true;

      const jwt = event.data;
  
      window.localStorage.setItem('token', jwt);
      this.props.login();
    });
  }

  render() {
    return (
      <div>
        <h3>Login with <span onClick={this.popupLogin}>Discord</span></h3>
      </div>
    );
  }
}

export default LoginWithDiscord;
