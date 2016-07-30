import React from 'react';

import AppSettingsBar from './AppSettingsBar';
import Grid from './Grid';
import { DEFAULTS, LOGO } from '../constants';

export default class CoreApp extends React.Component {
  static propTypes = {
    settings: React.PropTypes.object,
  };

  constructor(...args) {
    super(...args);

    this.state = {
      loaded: false,
      inDom: true,
    };
  }

  componentDidMount() {
    window.addEventListener('load', () => {
      this.setState({
        loaded: true,
      });
      setTimeout(() => {
        this.setState({
          inDom: false,
        });
      }, 720);
    });
  }

  editWidgets = () => {
    this.refs.grid.toggleEdit();
  }

  triggerAdd = (widgetID) =>
    () => {
      this.refs.grid.triggerAdd(widgetID);
    }

  render() {
    const appBackground = {
      backgroundColor: this.props.settings.get('bgColor', DEFAULTS.backgroundColor),
      backgroundImage: `url('${this.props.settings.get('bgImage', 'https://source.unsplash.com/category/nature')}')`,
      backgroundRepeat: 'none',
      backgroundSize: 'cover',
      overflow: 'auto',
    };
    return (
      <div className="uk-flex uk-flex-column app-container">
        <div style={{ display: this.state.inDom ? 'block' : 'none', position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', opacity: this.state.loaded ? 0 : 1, transition: 'opacity 0.7s ease-in-out', background: '#CCC', zIndex: 10, textAlign: 'center' }}>
          <img src={LOGO} alt="logo" style={{ transform: 'scale(0.5)' }} />
        </div>
        <div style={Object.assign({ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }, appBackground)} ></div>
        <div style={Object.assign({ position: 'fixed', top: 0, left: 0, width: '100vw', height: 'calc(100vh - 40px)' }, { backgroundColor: 'rgba(255, 255, 255, 0.4)', zIndex: 1 })} ></div>

        <div className="uk-flex-item-1" style={{ position: 'relative', zIndex: 2, overflow: 'auto' }}>
          <Grid ref="grid" settings={this.props.settings} />
        </div>
        <AppSettingsBar addWidget={this.triggerAdd} editWidgets={this.editWidgets} settings={this.props.settings} />
      </div>
    );
  }
}
