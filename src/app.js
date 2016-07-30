import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import Settings from './utils/Settings';

ReactDOM.render(
  <Settings
    app={App}
    namespace="__core__"
    props={{}}
  />
  , document.querySelector('#app')
);
