import React from 'react';

import { widgetClasses } from '../constants';

const R_URL = 'https://source.unsplash.com/category/nature';

export default class AppSettingsBar extends React.Component {
  static propTypes = {
    addWidget: React.PropTypes.func,
    editWidgets: React.PropTypes.func,
    settings: React.PropTypes.object,
  };

  _save = () => {
    this.props.settings.set('bgImage', this.refs.input.value);
    if (!this.refs.input.value || !/(?:([^:/?#]+):)?(?:\/\/([^/?#]*))?([^?#]*\.(?:jpg|gif|png))(?:\?([^#]*))?(?:#(.*))?/g.test(this.refs.input.value)) this._random();
  }

  _random = () => {
    this.props.settings.set('bgImage', R_URL);
  }

  render() {
    return (
      <div className="uk-flex uk-flex-right uk-flex-item-none app-settings-bar" style={{ position: 'relative', zIndex: 4 }}>
        <div className="app-settings-icon">
          <div className="uk-button-dropdown" data-uk-dropdown="{mode:'click'}">
            <i className="uk-icon-plus uk-icon-large"></i>
            <div className="uk-dropdown up-ten">
              <ul className="uk-nav uk-nav-dropdown">
                {
                  Object.keys(widgetClasses).map((widgetID) => {
                    const Widget = widgetClasses[widgetID]();
                    return (
                      <li key={widgetID}>
                        <a href="#" onClick={this.props.addWidget(widgetID)}>{Widget.widgetName}</a>
                      </li>
                    );
                  })
                }
              </ul>
            </div>
          </div>
        </div>
        <div className="app-settings-icon" onClick={this.props.editWidgets}>
          <i className="uk-icon-pencil uk-icon-large"></i>
        </div>
        <div className="app-settings-icon">
          <a href="#my-id" data-uk-modal style={{ color: '#333' }}>
            <i className="uk-icon-cog uk-icon-large"></i>
          </a>
        </div>
        <div id="my-id" className="uk-modal">
          <div className="uk-modal-dialog">
            <a className="uk-modal-close uk-close"></a>
            <div className="uk-flex uk-form">
              <label className="uk-margin-right" style={{ marginTop: 4 }}>Background Image URL: </label><input defaultValue={this.props.settings.get('bgImage')} ref="input" placeholder="E.g. https://foo.bar/image.png" type="text" className="uk-flex-item-1" />
            </div>
            <div className="uk-flex uk-form uk-margin-top">
              <button className="uk-button uk-modal-close" onClick={this._save}>Save</button>
              <button className="uk-button uk-button-primary uk-modal-close uk-margin-left" onClick={this._random}>Use Random Photos</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
