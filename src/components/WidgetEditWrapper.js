import React from 'react';

export default class WidgetEditWrapper extends React.Component {
  static propTypes = {
    delete: React.PropTypes.func,
    edit: React.PropTypes.bool,
    children: React.PropTypes.object,
    item: React.PropTypes.object,
    update: React.PropTypes.func,
  }

  constructor(...args) {
    super(...args);

    this.state = {
      resize: false,
    };
  }

  componentDidMount() {
    window.addEventListener('mousemove', this.move);
    window.addEventListener('mouseup', this.stop);
  }

  onDrag = (event) => {
    event.dataTransfer.setData('text', JSON.stringify(this.props.item));
  }

  del = () => {
    this.props.delete();
  }

  move = (event) => {
    if (!this.state.resize) return;
    this._attemptResize(event);
  }

  resizeDrag = (event) => {
    this.start(event);
  }

  start = (event) => {
    this.setState({
      resize: true,
      startX: event.pageX,
      startY: event.pageY,
      startHeight: this.props.item.height,
      startWidth: this.props.item.width,
    });
    event.preventDefault && event.preventDefault(); // eslint-disable-line
  }

  stop = () => {
    this.setState({
      resize: false,
    });
  }

  _attemptResize(event) {
    // const newItem = Object.assign({}, this.props.item);
    // newItem.width = Math.floor(Math.max(1, newItem.width + ((this.state.X - this.state.startX) / 160)));
    // newItem.height = Math.floor(Math.max(1, newItem.height + ((this.state.Y - this.state.startY) / 160)));
    // newItem.height = this.props.item.height + Math.floor((event.pageY - this.state.startY) / 160);
    // if (newItem.height < 1) newItem.height = 1;
    const nH = Math.max(1, Math.round((event.pageY - this.state.startY) / 160) + this.state.startHeight);
    const nW = Math.max(1, Math.round((event.pageX - this.state.startX) / 160) + this.state.startWidth);
    if (nW === this.lastTestWidth && nH === this.lastTestHeight) return;
    this.lastTestHeight = nH;
    this.lastTestWidth = nW;
    const newItem = Object.assign({}, this.props.item, { height: nH, width: nW });
    this.props.update(this.props.item, newItem);
  }

  render() {
    return (
      <div className="uk-flex" style={{ height: '100%', position: 'relative', background: 'white' }} draggable={this.props.edit} onDragStart={this.onDrag}>
        <div className="uk-flex-item-none grid-edit-menu" style={{ display: this.props.edit ? 'block' : 'none' }}>
          <i className="uk-icon-arrows uk-margin-small-left"></i>
          <div className="uk-float-right" onClick={this.del}>
            <i className="uk-icon-close uk-margin-small-right uk-float-right" style={{ marginTop: 2, color: 'red', cursor: 'pointer', fontSize: 15 }}></i>
          </div>
        </div>
        <div className="resize-right" onMouseDown={this.resizeDrag} style={{ display: this.props.edit ? 'block' : 'none' }}></div>
        <div className="resize-bottom" onMouseDown={this.resizeDrag} style={{ display: this.props.edit ? 'block' : 'none' }}></div>
        <div className="uk-flex-item-1 uk-flex uk-flex-column" style={{ width: '100%' }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
