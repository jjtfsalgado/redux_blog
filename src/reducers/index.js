const initialState = {
  posts: [],
  error: ''
}

export const posts = ( state = initialState, action ) => {
  switch ( action.type ) {
    case 'FETCH_POSTS_END': {
      return {
        ...state,
        posts: action.payload
      }
    }
    case 'FETCH_POSTS_ERROR': {
      return {
        ...state,
        error: action.payload
      }
    }
  }
  return state;
};
