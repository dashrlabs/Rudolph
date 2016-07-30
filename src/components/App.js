import React from 'react';

import AppSettingsBar from './AppSettingsBar';
import Grid from './Grid';
import { DEFAULTS } from '../constants';

export default class CoreApp extends React.Component {
  static propTypes = {
    settings: React.PropTypes.object,
  };

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
        <div style={Object.assign({ position: 'fixed', top: 0, left: 0, width: '100vw', height: 'calc(100vh - 40px)', zIndex: 0 }, appBackground)} ></div>
        <div style={Object.assign({ position: 'fixed', top: 0, left: 0, width: '100vw', height: 'calc(100vh - 40px)' }, { backgroundColor: 'rgba(255, 255, 255, 0.4)', zIndex: 1 })} ></div>

        <div className="uk-flex-item-1" style={{ position: 'relative', zIndex: 2, overflow: 'auto' }}>
          <Grid ref="grid" settings={this.props.settings} />
        </div>
        <AppSettingsBar addWidget={this.triggerAdd} editWidgets={this.editWidgets} settings={this.props.settings} />
      </div>
    );
  }
}
