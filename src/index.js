import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { BrowserRouter, Route, Switch } from  'react-router-dom';
import { reducer as formReducer } from 'redux-form';

import { posts } from './reducers/index';
import rootSaga from './sagas/sagas';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  posts: posts,
  form: formReducer
});

const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware, createLogger())
)

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/posts/new" component={ PostsNew } />
          <Route path="/" component={ PostsIndex }/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
