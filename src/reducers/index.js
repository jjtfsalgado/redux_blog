const initialState = {
  posts: [],
  error: '',
  selectedPost: null
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
    case 'FETCH_SINGLE_POST_SUCCESS': {
      return {
        ...state,
        selectedPost: action.payload
      }
    }
  }
  return state;
};
