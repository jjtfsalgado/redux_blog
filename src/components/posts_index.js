import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, fetchSinglePost } from '../actions/index';
import { Link } from 'react-router';

class PostsIndex extends Component {
  componentWillMount(){
    this.props.fetchPosts();
  }

  renderPosts() {
    const {fetchSinglePost} = this.props;
    return this.props.posts.map(function (post) {
      return(
        <li className="list-group-item" key={ post.id } onClick={ () => fetchSinglePost(post.id) }>
          { post.title }
        </li>
      )
    })
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            Add a Post
          </Link>
        </div>
        <h3>Posts</h3>
        { this.renderPosts() }
      </div>
    )
  }
}

export default connect(
  (state) => ({
    posts: state.posts.posts
  }),

  { fetchPosts, fetchSinglePost }

)(PostsIndex);
