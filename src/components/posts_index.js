import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';
import { Link } from 'react-router-dom';

class PostsIndex extends Component {
  componentWillMount(){
    this.props.fetchPosts();
  }

  renderPosts() {
    return this.props.posts.map(function (post) {
      return(
        <li className="list-group-item" key={ post.id }>
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

  { fetchPosts }

)(PostsIndex);
