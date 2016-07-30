import React from 'react';

import { Circle } from 'rc-progress';
import Email from './Email';

export default class GMailWidget extends React.Component {
  static propTypes = {
    chrome: React.PropTypes.object,
    settings: React.PropTypes.object,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
  }

  static id = 'GMail';
  static widgetName = 'GMail Widget';
  static sizes = [[2, 3], [2, 1], [2, 2], [2, 4]];

  constructor(props, ...args) {
    super(props, ...args);

    this.state = {
      loaded: 0,
      messages: props.settings.get('messages', null),
    };
  }

  componentDidMount() {
    this._auth();

    setInterval(() => this._load(), 60000);
  }

  _auth() {
    this.props.chrome.identity.getAuthToken({
      interactive: true,
    }, (token) => {
      this.setState({
        token,
      }, () => this._load());
    });
  }

  _load() {
    fetch(`https://www.googleapis.com/gmail/v1/users/me/messages?maxResults=10&q=category%3Aprimary&access_token=${this.state.token}`)
      .then((resp) => resp.json())
      .then((resp) => {
        this._loadQueue([], resp.messages)
          .then((messages) => {
            this.setState({
              messages,
            });
            this.props.settings.set('messages', messages);
          });
      });
  }

  _loadQueue(arr, q) {
    if (!q.length) return Promise.resolve(arr);
    const msg = q.pop();
    return new Promise((resolve, reject) => {
      fetch(`https://www.googleapis.com/gmail/v1/users/me/messages/${msg.id}?access_token=${this.state.token}`)
        .then((resp) => resp.json())
        .then((resp) => {
          arr.push(resp);
          this.setState({
            loaded: arr.length,
          });
          this._loadQueue(arr, q)
            .then(resolve)
            .catch(reject);
        })
        .catch(reject);
    });
  }

  render() {
    if (!this.state.messages) {
      return (
        <div style={{ padding: 36 }}>
          <Circle strokeWidth={6} radius={80} percent={this.state.loaded * 100 / 10} />
          <h1 className="uk-text-primary uk-text-center">Loading GMail</h1>
        </div>
      );
    }
    return (
      <div style={{ textAlign: 'center', overflow: 'auto', height: '100%' }}>
        <h3 style={{ paddingTop: 16 }} className="uk-margin-left">
          GMail
          <a className="uk-button uk-float-right uk-margin-right" href="https://mail.google.com/mail/u/0/#inbox?compose=new" target="_blank">
            <i className="uk-icon-envelope-o"></i>
          </a>
        </h3>
        <ul className="uk-list uk-list-striped">
        {
          Object.assign([], this.state.messages).reverse().map((message) => <Email key={message.id} msg={message} />)
        }
        </ul>
      </div>
    );
  }
}
