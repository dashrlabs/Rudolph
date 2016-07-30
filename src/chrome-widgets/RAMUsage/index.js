import React from 'react';

import { Line } from 'rc-progress';

export default class RAMUsageWidget extends React.Component {
  static propTypes = {
    chrome: React.PropTypes.object,
    settings: React.PropTypes.object,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
  }

  static id = 'RAM';
  static widgetName = 'RAM Usage';
  static sizes = [[2, 1]];

  constructor(...args) {
    super(...args);

    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    this._poll();

    this.poller = setInterval(() => this._poll(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.poller);
  }

  _poll() {
    this.props.chrome.system.memory.getInfo((info) => {
      this.setState({
        data: info,
      });
    });
  }

  render() {
    if (!this.state.data) return null;
    const a = Math.round(this.state.data.availableCapacity / (1024 * 1024));
    const c = Math.round(this.state.data.capacity / (1024 * 1024));
    const used = c - a;

    return (
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <h2 className="uk-text-primary">{used.toLocaleString()} MB / {c.toLocaleString()} MB</h2>
        <div className="uk-margin-left uk-margin-right">
          <Line percent={100 * used / c} strokeWidth={12} />
        </div>
        <h4 style={{ marginTop: 12 }} className="uk-margin-left uk-text-primary">Memory Usage</h4>
      </div>
    );
  }
}
