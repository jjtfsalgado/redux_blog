import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createPost } from '../actions/index';

class PostsNew extends Component {
  renderField(field) {
    const { touched, error } = field.meta;
    const className = `form-group ${ touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{ field.label }</label>
        <input type="text" className="form-control" { ...field.input } />
        <div className="text-help">{ touched ? error : '' }</div>
      </div>
    );
  }

  render() {
    const { handleSubmit, createPost } = this.props;

    return (
      <form onSubmit={handleSubmit( (values) => createPost(values))}>
        <Field
          label="Title"
          name="title"
          component={ this.renderField }
        />
        <Field
          label="Categories"
          name="categories"
          component={ this.renderField }
        />
        <Field
          label="Post Content"
          name="content"
          component={ this.renderField }
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    )
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a title';
  }
  if (!values.categories) {
    errors.categories = 'Enter come categories';
  }
  if (!values.content) {
    errors.content = 'Enter some content please';
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null,{ createPost })(PostsNew)
);
