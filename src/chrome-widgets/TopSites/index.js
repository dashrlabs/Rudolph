import React from 'react';

import { Circle } from 'rc-progress';

export default class TopSitesWidget extends React.Component {
  static propTypes = {
    chrome: React.PropTypes.object,
    settings: React.PropTypes.object,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
  }

  static id = 'top-sites';
  static widgetName = 'Top SItes';
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

  _hex(num) {
    return parseInt(num, 10).toString(16);
  }

  _col() {
    return '#444';
    // const rgb = this._color([255, 255, 255]);
    // return `rgb(${Math.round(rgb[0])}, ${Math.round(rgb[1])}, ${Math.round(rgb[2])})`;
  }

  _color(mix) {
    let red = Math.round(Math.random() * 256);
    let green = Math.round(Math.random() * 256);
    let blue = Math.round(Math.random() * 256);

    if (mix) {
      red = (red + mix[0]) / 2;
      green = (green + mix[1]) / 2;
      blue = (blue + mix[2]) / 2;
    }

    return [red, green, blue];
  }

  render() {
    if (!this.state.sites) return null;
    return (
      <div style={{ textAlign: 'center', marginTop: 16, height: '100%' }}>
        {
          this.state.sites.slice(0, 8).map((site) =>
            (
            <div key={site.title} style={{ width: '25%', height: '50%', display: 'inline-block', textAlign: 'center', float: 'left' }}>
              <div style={{ backgroundColor: this._col(), height: '60%', width: '60%', margin: '0 auto', borderRadius: 5 }}>
                <span style={{ fontSize: '600%', marginTop: 30, display: 'inline-block', color: 'rgb(63, 199, 250)' }}>{site.title.replace(/\([0-9]+\) /g, '')[0].toUpperCase()}</span>
              </div>
              <h4 style={{ margin: 0, textOverflow: 'ellipsis', overflow: 'hidden', padding: '0 6px', height: 44 }}>{site.title}</h4>
            </div>
            )
          )
        }
      </div>
    );
  }
}
