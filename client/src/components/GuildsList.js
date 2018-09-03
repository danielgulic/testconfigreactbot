import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE } from '../';

class GuildsList extends Component {

  async componentDidMount() {
    const res = await fetch(API_BASE + '/api/guilds/@me', {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem('token')}`
      }
    });
    const json = await res.json();
    this.props.populateGuilds(json);
  }

  render() {
    return (
      <div className="card" style={{ width: '18rem' }}>
        <div className="card-header">Your guilds</div>
        <ul className="list-group list-group-flush">
          { this.props.guilds == null 
          ? <li className="list-group-item">Loading...</li>
          : this.props.guilds.map(g => 
            <Link to={ `/guilds/${g.id}` } key={g.id}>
              <li className="list-group-item">{ g.name }</li>
            </Link>
          ) }
        </ul>
      </div>
    );
  }
}

export default GuildsList;
