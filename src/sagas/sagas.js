import { takeEvery, fork, call, put, all } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import axios from 'axios';

function* fetchPosts() {
  try {
    const request = yield call( axios.get, 'http://reduxblog.herokuapp.com/api/posts?key=benfica' );
    yield put({ type: 'FETCH_POSTS_END', payload: request.data });

  } catch(error) {
    yield put({ type: 'FETCH_POSTS_ERROR', payload: error });
  }
}

function* watchFetchPosts() {
  yield takeEvery('FETCH_POSTS', fetchPosts);
}

//////////////////////////////////////////////////////////////////////////////

function* createPost(action) {
  try {
    const post = action.payload;
    yield call( axios.post, 'http://reduxblog.herokuapp.com/api/posts?key=benfica', post);
    yield put({ type: 'CREATE_POST_SUCCESS'});
    yield put(push('/'));

  } catch(error) {
    yield put({ type: 'CREATE_POST_ERROR', payload: error });
  }
}

function* watchCreatePost() {
  yield takeEvery('CREATE_POST', createPost);
}

//////////////////////////////////////////////////////////////////////////////////////////

function* fetchSinglePost(action) {
  try {
    const id = action.payload;
    const request = yield call( axios.get, `http://reduxblog.herokuapp.com/api/posts/${id}?key=benfica`);
    yield all([
      put(push(`/posts/${id}`)),
      put({ type: 'FETCH_SINGLE_POST_SUCCESS', payload: request.data})
    ]);

  } catch(error) {
    yield put({ type: 'FETCH_SINGLE_POST_ERROR', payload: error });
  }
}

function* watchFetchSinglePost() {
  yield takeEvery('FETCH_SINGLE_POST', fetchSinglePost);
}

////////////////////////////////////////////////////////////////////////////////////////

export default function* rootSaga() {
  yield [
    fork(watchFetchPosts),
    fork(watchCreatePost),
    fork(watchFetchSinglePost)
  ];
}
