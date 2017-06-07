export const fetchPosts = () => ({
  type: 'FETCH_POSTS'
})

export const createPost = (post) => ({
  type: 'CREATE_POST',
  payload: post
})

export const fetchSinglePost = (id) => ({
  type: 'FETCH_SINGLE_POST',
  payload: id
})
