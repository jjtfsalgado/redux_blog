import { takeEvery, fork, call, put } from 'redux-saga/effects';
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
  yield takeEvery('FETCH_POSTS_START', fetchPosts);
}

export default function* rootSaga() {
  yield [
    fork(watchFetchPosts),
  ];
}
