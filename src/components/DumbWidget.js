import React from 'react';

export default class DumbWidget extends React.Component {
  static id = 'dumb-widget';

  static widgetName = 'Dumb Demo Widget';

  static sizes = [[1, 1], [2, 2]];

  render() {
    return (
      <span>This is a widget</span>
    );
  }
}
