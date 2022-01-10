import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './assets/scss/main.scss';
import App from './App';
import { Provider } from 'mobx-react';
import { rootStore } from './store';

ReactDOM.render(
  <Router>
    <Provider {...rootStore}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);
