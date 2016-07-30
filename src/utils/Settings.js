import React from 'react';

export default class Settings extends React.Component {
  static propTypes = {
    app: React.PropTypes.func.isRequired,
    namespace: React.PropTypes.string,
    props: React.PropTypes.object,
  };

  constructor(props, ...args) {
    super(props, ...args);

    this.state = {
      data: {},
    };

    const loadedData = localStorage.getItem(`${props.namespace}_store`);
    if (loadedData) {
      try {
        this.state.data = JSON.parse(loadedData);
      } catch (e) {
        // Who cares
      }
    }
  }

  getCoreSettings() {
    return this.getWidgetSettingsProto('__core__');
  }

  getSettingsProto() {
    return {
      get: (...args) => this.get(...args),
      set: (...args) => this.set(...args),
    };
  }

  get(key, defaultValue) {
    return this.state.data[key] || defaultValue;
  }

  set(key, value) {
    this.setState({
      data: Object.assign({}, this.state.data, { [key]: value }),
    }, () => {
      this._save();
    });
  }

  _save() {
    localStorage.setItem(`${this.props.namespace}_store`, JSON.stringify(this.state.data));
  }

  render() {
    return (<this.props.app
      settings={this.getSettingsProto()}
      {...this.props.props}
    />);
  }
}
