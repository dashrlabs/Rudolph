import React from 'react';

import { widgetClasses } from '../constants';

export default class AppSettingsBar extends React.Component {
  static propTypes = {
    addWidget: React.PropTypes.func,
    editWidgets: React.PropTypes.func,
  };

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
          <i className="uk-icon-cog uk-icon-large"></i>
        </div>
      </div>
    );
  }
}
