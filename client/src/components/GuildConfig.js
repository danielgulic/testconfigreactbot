import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE } from '../';
import AceEditor from 'react-ace';
import yaml from 'yamljs';

import 'brace/mode/yaml';
import 'brace/theme/monokai';


class GuildConfig extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      guild: null,
      content: null,
      yamlFault: false,
      configSaved: false
    };
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

  onEditorChange(newValue) {
    this.setState({ content: newValue });
  }

  async onEditorSave() {
    try {
      var newConfig = yaml.parse(this.state.content);
      var gid = this.props.match.params.gid;
      this.setState({ yamlFault: false, configSaved: true }); // incase they previously had a faulty yaml
      const res = await fetch(API_BASE + '/api/guilds/' + gid, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${window.localStorage.getItem('token')}`
        },
        body: JSON.stringify({ 
          config: JSON.stringify(newConfig)
        })
      });
      if (!res.ok) console.error('Request to edit config failed');

    } catch (e) {
      this.setState({ yamlFault: true, configSaved: false });
    };
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
    this.setState({ guild, content: yaml.stringify(JSON.parse(guild.config), null, 4), configSaved: false, yamlFault: false }); 
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
                    <Link to={`/guilds/${this.state.guild.id}`} className="nav-link">Overview</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={`/guilds/${this.state.guild.id}/config`} className="nav-link active">Config</Link>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                <h4 className="card-title">{this.state.guild.name}</h4>
                <button onClick={() => this.onEditorSave()}>Save</button>
                { this.state.yamlFault && <div style={{color: 'red'}}>Error parsing configuration; check your YAML syntax.</div> }
                { this.state.configSaved && <div style={{color: 'green'}}>Saved configuration!</div> }
                <AceEditor
                  mode="yaml"
                  theme="monokai"
                  width="100%"
                  value={this.state.content ? this.state.content : ''}
                  onChange={(newValue) => { this.onEditorChange(newValue) }}
                  editorProps={{ $blockScrolling: true }}
                />
              </div>
            </div>
        </div>
      }
      </div>
    );
  }
}

export default GuildConfig;
