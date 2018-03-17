import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.min.css';
import './index.css';
import createHistory from 'history/createBrowserHistory';
import App from './App';

const history = createHistory();

ReactDOM.render(<App history={history} />, document.getElementById('root'));
