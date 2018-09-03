import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import GuildOverview from './GuildOverview';
import GuildConfig from './GuildConfig';

class DashboardInnerController extends Component {
  render() {
    return (
      <div>
        <Route exact path="/guilds/:gid" component={GuildOverview} />
        <Route path="/guilds/:gid/config" component={GuildConfig} />
      </div>
    )
  }
}

export default DashboardInnerController;
