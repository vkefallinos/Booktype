import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, applyRouterMiddleware, Router } from 'react-router';
import Route from './routes/Route';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const rootNode = document.getElementById('app');

ReactDOM.render(
  <Router history={browserHistory} routes={Route}  />,
  rootNode
);
