import React from 'react';

import { imageSites } from '../../constants';

export default class SingleLink extends React.Component {
  static propTypes = {
    settings: React.PropTypes.object,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
  }

  static id = 'shortcut';
  static widgetName = 'Shortcut';
  static sizes = [[1, 1]];

  _image(site) {
    const found = imageSites.find((mSite) => mSite.reg().test(site.url));
    if (found) {
      return {
        backgroundImage: `url('${found.src}')`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
      };
    }
    return {
      backgroundColor: '#444',
    };
  }

  _save = () => {
    let url = this.refs.url.value;
    if (!/https?:\/\//g.test(url)) {
      url = `http://${url}`;
    }

    this.props.settings.set('site', {
      url,
      title: this.refs.name.value,
    });
  }

  render() {
    const site = this.props.settings.get('site');
    const id = Date.now();

    if (!site) {
      return (
        <div className="uk-flex" style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <a href={`#linkSettings_${id}`} className="uk-button uk-button-large uk-button-primary" data-uk-modal>Configure</a>
          <div id={`linkSettings_${id}`} className="uk-modal">
            <div className="uk-modal-dialog">
              <a className="uk-modal-close uk-close"></a>
              <div className="uk-flex uk-form">
                <label className="uk-margin-right" style={{ marginTop: 4 }}>Label: </label><input ref="name" placeholder="E.g. Facbeook" type="text" className="uk-flex-item-1" />
              </div>
              <div className="uk-flex uk-form uk-margin-small-top">
                <label className="uk-margin-right" style={{ marginTop: 4, paddingRight: 5 }}>URL: </label><input ref="url" placeholder="E.g. https://www.facebook.com" type="text" className="uk-flex-item-1" />
              </div>
              <div className="uk-flex uk-form uk-margin-top">
                <button className="uk-button uk-modal-close" onClick={this._save}>Save</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div key={site.title} style={{ width: '100%', height: '100%', display: 'inline-block', textAlign: 'center', float: 'left', marginTop: 24 }}>
        <a href={site.url} >
          <div style={Object.assign({ height: '60%', width: '60%', margin: '0 auto', borderRadius: 5 }, this._image(site))}>
            <span style={{ fontSize: '600%', marginTop: 30, display: this._image(site).backgroundImage ? 'none' : 'inline-block', color: 'rgb(63, 199, 250)' }}>{site.title.replace(/\([0-9]+\) /g, '').replace(/^https?:\/\//g, '')[0].toUpperCase()}</span>
          </div>
          <h4 style={{ margin: 0, textOverflow: 'ellipsis', overflow: 'hidden', padding: '0 6px', height: 44 }}>{site.title}</h4>
        </a>
      </div>
    );
  }
}
