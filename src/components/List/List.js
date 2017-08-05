import React, { Component } from 'react';

import './List.styl';

import NewToDo from './NewToDo/NewToDo';
import ToDo from './ToDo/ToDo';

export default class List extends Component {
  constructor(props) {
    super(props);

    this.state = { toDos: [] };

    this.submitToDo = this.submitToDo.bind(this);
  }

  submitToDo(text) {
    this.setState({ toDos: [{ complete: false, text }, ...this.state.toDos] });
  }

  toggleCompletion(toggledToDo) {
    this.setState({
      toDos: this.state.toDos.map(toDo => {
        if (toDo.text === toggledToDo.text) {
          return { complete: !toDo.complete, text: toDo.text };
        }
        return toDo;
      }),
    });
  }

  deleteToDo(toArchive) {
    this.setState({
      toDos: this.state.toDos.filter(({ text }) => text !== toArchive.text),
    });
  }

  render() {
    const toDos = this.state.toDos.map(toDo =>
      <ToDo
        {...toDo}
        deleteToDo={this.deleteToDo.bind(this, toDo)}
        key={toDo.text}
        toggleCompletion={this.toggleCompletion.bind(this, toDo)}
      />,
    );

    return (
      <div className="list">
        <h1 className="list__header">todos</h1>
        <NewToDo submit={this.submitToDo} />
        {toDos}
      </div>
    );
  }
}
