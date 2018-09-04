import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE } from '../';

class GuildOverview extends Component {
  constructor(props) {
    super(props);

    this.state = { guild: null };
  }

  componentDidMount() {
    console.log('component did mount');
    this.getGuildInfo();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.match.url !== this.props.match.url) {
      this.getGuildInfo();
    }
  }

  async getGuildInfo() {
    var gid = this.props.match.params.gid;
    const res = await fetch(API_BASE + '/api/guilds/' + gid, {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem('token')}`
      }
    });
    const json = await res.json();
    const guild = json.guild;
    console.log(guild);
    this.setState({ guild }); 
  }

  render() {
    return (
      <div>
      { this.state.guild == null
        ? <h1>Loading...</h1>
        : <div>
            <div className="card text-center">
              <div className="card-header">
                <ul className="nav nav-pills card-header-pills">
                  <li className="nav-item">
                    <Link to={`/guilds/${this.state.guild.id}`} className="nav-link active">Overview</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={`/guilds/${this.state.guild.id}/config`} className="nav-link">Config</Link>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                <h4 className="card-title">{this.state.guild.name}</h4>
                <table className="table">
                  <tbody>
                    <tr>
                      <th scope="row">ID</th>
                      <td>{this.state.guild.id}</td>
                    </tr>
                    <tr>
                      <th scope="row">Owner</th>
                      <td>{this.state.guild.ownerTag} ({this.state.guild.ownerId})</td>
                    </tr>
                    <tr>
                      <th scope="row">Created</th>
                      <td>{new Date(this.state.guild.createdAt).toDateString()}</td>
                    </tr>
                    <tr>
                      <th scope="row">Region</th>
                      <td>{this.state.guild.region.toUpperCase()}</td>
                    </tr>
                    <tr>
                      <th scope="row">Members</th>
                      <td>{this.state.guild.memberCount}</td>
                    </tr>
                    <tr>
                      <th scope="row">Icon</th>
                      <td><img src={this.state.guild.iconUrl} alt="Guild icon" className="rounded-circle" /></td>
                    </tr>
                    <tr>
                      <th scope="row">Splash</th>
                      <td>{ this.state.guild.splashUrl ? <img src={this.state.guild.splashUrl} alt="Splash" /> : <em>No Splash</em> }</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
      }
      </div>
    );
  }
}

export default GuildOverview;
