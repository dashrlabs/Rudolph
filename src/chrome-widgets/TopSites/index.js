import React from 'react';

import { imageSites } from '../../constants';

export default class TopSitesWidget extends React.Component {
  static propTypes = {
    chrome: React.PropTypes.object,
    settings: React.PropTypes.object,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
  }

  static id = 'top-sites';
  static widgetName = 'Top Sites';
  static sizes = [[4, 2]];

  constructor(...args) {
    super(...args);

    this.state = {
      sites: null,
    };
  }

  componentDidMount() {
    this._poll();
  }

  _poll() {
    this.props.chrome.topSites.get((sites) => {
      this.setState({
        sites,
      });
    });
  }

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

  render() {
    if (!this.state.sites) return null;
    return (
      <div style={{ textAlign: 'center', marginTop: 16, height: '100%' }}>
        {
          this.state.sites.slice(0, 8).map((site) =>
            (
            <div key={site.title} style={{ width: '25%', height: '50%', display: 'inline-block', textAlign: 'center', float: 'left' }}>
              <a href={site.url} >
                <div style={Object.assign({ height: '60%', width: '60%', margin: '0 auto', borderRadius: 5 }, this._image(site))}>
                  <span style={{ fontSize: '600%', marginTop: 30, display: this._image(site).backgroundImage ? 'none' : 'inline-block', color: 'rgb(63, 199, 250)' }}>{site.title.replace(/\([0-9]+\) /g, '').replace(/^https?:\/\//g, '')[0].toUpperCase()}</span>
                </div>
                <h4 style={{ margin: 0, textOverflow: 'ellipsis', overflow: 'hidden', padding: '0 6px', height: 44 }}>{site.title}</h4>
              </a>
            </div>
            )
          )
        }
      </div>
    );
  }
}
