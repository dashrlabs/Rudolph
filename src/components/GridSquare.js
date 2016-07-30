import React from 'react';

export default class GridSquare extends React.Component {
  static propTypes = {
    children: React.PropTypes.object,
    className: React.PropTypes.string,
    dark: React.PropTypes.bool,
    edit: React.PropTypes.bool,
    noadd: React.PropTypes.bool,
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func,
    visible: React.PropTypes.bool,
    inDom: React.PropTypes.bool,
    claim: React.PropTypes.func,
  };

  onDrag = (event) => {
    let item = event.dataTransfer.getData('text');
    if (!item) event.preventDefault();

    try {
      item = JSON.parse(item);
    } catch (e) {
      return;
    }
    if (item && this.props.claim(item, this.props.x, this.props.y, true)) {
      event.preventDefault();
    }
  }

  onDrop = (event) => {
    let item = event.dataTransfer.getData('text');

    try {
      item = JSON.parse(item);
    } catch (e) {
      return;
    }
    if (item && this.props.dark && this.props.claim) {
      event.preventDefault();
      this.props.claim(item, this.props.x, this.props.y);
    }
  }

  render() {
    const { x, y, width, height } = this.props;
    const coords = {
      position: 'absolute',
      top: 100 + y * 160,
      left: 100 + x * 160,
    };

    let xDimension = 'one';
    let yDimension = 'one';
    const dimensions = ['one', 'two', 'three', 'four'];
    if (dimensions[width - 1]) xDimension = dimensions[width - 1];
    if (dimensions[height - 1]) yDimension = dimensions[height - 1];

    const classString = `app-grid-square X${xDimension} Y${yDimension} ${this.props.dark ? 'dark' : ''} ${this.props.className || ''} ${this.props.visible ? 'visible' : ''}`;

    if (!this.props.inDom) return null;
    return (
      <div className={classString} style={coords} onDrop={this.onDrop} onDragOver={this.onDrag}>
        {
          this.props.dark && !this.props.edit && !this.props.noadd ?
          (
            <div className="content" onClick={() => { if (this.props.onClick) this.props.onClick(); }}>
              <i className="uk-icon-large uk-icon-plus-circle"></i>
              <h4>Add Widget Here</h4>
            </div>
          )
          : this.props.children
        }
      </div>
    );
  }
}
