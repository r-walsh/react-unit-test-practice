import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewToDo.styl';

export default class NewToDo extends Component {
  static propTypes = { submit: PropTypes.func.isRequired };

  state = { toDo: '' };

  handleChange = event => this.setState({ toDo: event.target.value });

  submitTodo = event => {
    event.preventDefault();

    this.props.submit(this.state.toDo);

    this.setState(() => ({ toDo: '' }));
  };

  render() {
    const { toDo } = this.state;

    return (
      <form className="new-to-do" onSubmit={this.submitTodo}>
        <input
          className="new-to-do__input"
          onChange={this.handleChange}
          placeholder="What needs to be done?"
          type="text"
          value={toDo}
        />
      </form>
    );
  }
}
