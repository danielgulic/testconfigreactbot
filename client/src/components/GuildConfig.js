import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE } from '../';

class GuildConfig extends Component {
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
    console.log(json);
    this.setState({ guild: json }); 
  }

  render() {
    return (
      <div>
      { this.state.guild == null
        ? <h1>hi</h1>
        : <div>
            <div className="card text-center">
              <div className="card-header">
                <ul className="nav nav-pills card-header-pills">
                  <li className="nav-item">
                    <Link to={`/guilds/${this.state.guild.id}`} className="nav-link">Overview</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={`/guilds/${this.state.guild.id}/config`} className="nav-link active">Config</Link>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                <h4 className="card-title">{this.state.guild.name}</h4>
                <p className="card-text"></p>
              </div>
            </div>
        </div>
      }
      </div>
    );
  }
}

export default GuildConfig;
