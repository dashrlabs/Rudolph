import React from 'react';

import { Circle } from 'rc-progress';

export default class CPUUsageWidget extends React.Component {
  static propTypes = {
    chrome: React.PropTypes.object,
    settings: React.PropTypes.object,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
  }

  static id = 'CPU';
  static widgetName = 'CPU Usage';
  static sizes = [[2, 2]];

  constructor(...args) {
    super(...args);

    this.state = {
      data: [],
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
    this.props.chrome.system.cpu.getInfo((info) => {
      this.setState({
        data: this.state.data.concat([info]),
      });
    });
  }

  render() {
    let sum = 0;
    return (
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        {
          this.state.data.length > 1 ?
          this.state.data[this.state.data.length - 1].processors.map((p, index) => {
            const p1 = this.state.data[this.state.data.length - 2].processors[index].usage;
            const p2 = this.state.data[this.state.data.length - 1].processors[index].usage;

            // console.info(p2.total, p1.total);
            const usage = 1 - ((p2.idle - p1.idle) / (p2.total - p1.total));

            sum += usage;

            return (
              <div key={`cpu_${index}`} style={{ width: '20%', display: 'inline-block', margin: 4, position: 'relative' }} className="usage">
                <Circle strokeWidth={6} radius={40} percent={usage * 100} />
                <span style={{ position: 'absolute', top: '50%', left: 0, marginTop: -10, width: '100%', textAlign: 'center' }}>{Math.round(usage * 100)}%</span>
              </div>
            );
          }) :
          (
            <h1>Loading...</h1>
          )
        }
        {
          this.state.data.length > 1 ?
          (
            <span className="uk-text-primary" style={{ display: 'block', fontSize: '800%', marginTop: 60 }}>{Math.round(sum * 100 / 8)}%</span>
          )
          : null
        }
      </div>
    );
  }
}
