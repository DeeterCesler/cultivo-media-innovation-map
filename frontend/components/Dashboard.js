import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Dashboard extends Component {
  static propTypes = {
    user: PropTypes.object,
    authenticate: PropTypes.func.isRequired,
  }

  static defaultProps = {
    user: null,
  }

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  handleInputChange = (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (e) => {
    // Prevent the page from refreshing
    e.preventDefault();
    console.log(this.state);
    // Authenticate the user
    this.props.authenticate({
      username: this.state.username,
      password: this.state.password,
    });
  }

  render = () => {
    const { user } = this.props;
    return (
      <div>
        {user
        && (
          <p>
            A user is currently authenticated.
          </p>
        )}
        {!user
        && (
          <div>
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChange}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
              <button type="submit">
                Sign In
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}
