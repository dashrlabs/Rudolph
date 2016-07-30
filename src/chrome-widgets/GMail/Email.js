import React from 'react';

export default class Email extends React.Component {
  static propTypes = {
    msg: React.PropTypes.object,
  };

  render() {
    const msg = this.props.msg;
    const subject = msg.payload.headers.find((header) => header.name === 'Subject').value;
    // const to = msg.payload.headers.find((header) => header.name === 'To').value;
    const from = msg.payload.headers.find((header) => header.name === 'From').value;
    // const date = msg.payload.headers.find((header) => header.name === 'Date').value;
    const snippet = msg.snippet.trim().replace(/^_+/g, '').trim();

    return (
      <li>
        <a href={`https://mail.google.com/mail/#inbox/${msg.id}`} alt={`From: ${from}`}>
          <div className="uk-flex uk-flex-column uk-margin-small-left uk-margin-small-right">
            <div className="uk-margin-small-left uk-margin-small-right">
              <h4 style={{ margin: 0 }} className="uk-text-primary uk-text-left">{subject}</h4>
              <h5 style={{ fontSize: 10, margin: 0, paddingBottom: 6, height: 18, overflow: 'hidden', textOverflow: 'ellipsis' }} className="uk-text-left uk-margin-small-left" dangerouslySetInnerHTML={{ __html: snippet }}></h5>
            </div>
          </div>
        </a>
      </li>
    );
  }
}
