import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'

import { posts } from './reducers/index';
import rootSaga from './sagas/sagas';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  posts: posts,
  form: formReducer,
  routing: routerReducer
});

const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware, createLogger(), routerMiddleware(browserHistory))
)

const history = syncHistoryWithStore(browserHistory, store)

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ history }>
      <Route path="/" component={ PostsIndex }/>
      <Route path="/posts/new" component={ PostsNew }/>
      <Route path="/posts/:id" component={ PostsShow }/>
    </Router>
  </Provider>
  , document.querySelector('.container'));
