import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';

import List from './List';

describe('NewToDo', () => {
  it('renders', () => {
    const list = shallow(<List />);

    expect(toJson(list)).toMatchSnapshot();
  });

  it('renders a list of to dos based on state.toDos', () => {
    const list = shallow(<List />);
    list.setState({
      toDos: [
        { complete: false, text: 'One' },
        { complete: true, text: 'Two' },
      ],
    });

    expect(toJson(list)).toMatchSnapshot();
  });

  it('updates state.toDos on submitToDo', () => {
    const list = shallow(<List />);

    list.instance().submitToDo('A new to do');

    expect(list.state().toDos).toEqual([
      { complete: false, text: 'A new to do' },
    ]);
  });

  it('deletes from state.toDos on deleteToDo', () => {
    const list = shallow(<List />);
    list.setState({
      toDos: [
        { complete: false, text: 'One' },
        { complete: true, text: 'Two' },
      ],
    });

    list.instance().deleteToDo({ text: 'Two' });

    expect(list.state().toDos).toEqual([{ complete: false, text: 'One' }]);
  });

  it('toggles a toDo to complete on toggleCompletion', () => {
    const list = shallow(<List />);
    list.setState({
      toDos: [
        { complete: false, text: 'One' },
        { complete: true, text: 'Two' },
      ],
    });

    list.instance().toggleCompletion({ text: 'One' });

    expect(list.state().toDos).toEqual([
      { complete: true, text: 'One' },
      { complete: true, text: 'Two' },
    ]);
  });
});
