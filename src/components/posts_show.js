import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class PostsShow extends Component {
  render() {
    const { selectedPost } = this.props;

    if (!selectedPost) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <Link to="/">Back to Index</Link>
        <h3>{ selectedPost.title }</h3>
        <h6>Categories: { selectedPost.categories }</h6>
        <p>{ selectedPost.content }</p>
      </div>
    );
  };
}

export default connect(
  (state) => ({
    selectedPost: state.posts.selectedPost
  })
)(PostsShow);
