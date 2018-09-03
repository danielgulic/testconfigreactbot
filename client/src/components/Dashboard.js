import React, { Component } from 'react';
import GuildsList from './GuildsList';
import DashboardInnerController from './DashboardInnerController';

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      guilds: null
    }

    this.populateGuilds = this.populateGuilds.bind(this);

  }

  populateGuilds(guilds) {
    this.setState({ guilds });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-4">
            <GuildsList populateGuilds={this.populateGuilds} guilds={this.state.guilds} />
          </div>
          <div className="col-sm">
            <DashboardInnerController />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
