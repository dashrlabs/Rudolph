import React from 'react';

export default class WidgetEditWrapper extends React.Component {
  static propTypes = {
    edit: React.PropTypes.bool,
    children: React.PropTypes.object,
    item: React.PropTypes.object,
  }

  onDrag = (event) => {
    event.dataTransfer.setData('text', JSON.stringify(this.props.item));
  }

  render() {
    if (!this.props.edit) return this.props.children;
    return (
      <div className="uk-flex" style={{ height: '100%', position: 'relative', background: 'white' }} draggable onDragStart={this.onDrag}>
        <div className="uk-flex-item-none grid-edit-menu">
          <i className="uk-icon-arrows uk-margin-left"></i>
        </div>
        <div className="uk-flex-item-1 uk-flex uk-flex-column">
          {this.props.children}
        </div>
      </div>
    );
  }
}
