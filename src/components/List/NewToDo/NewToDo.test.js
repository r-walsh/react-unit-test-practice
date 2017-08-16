import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';

import NewToDo from './NewToDo';

describe('NewToDo', () => {
  it('renders', () => {
    const newToDo = shallow(<NewToDo submit={() => {}} />);

    expect(toJson(newToDo)).toMatchSnapshot();
  });

  it('updates state on input change', () => {
    const newToDo = shallow(<NewToDo submit={() => {}} />);

    newToDo.find('.new-to-do__input').simulate('change', {
      target: { value: 'Give a talk on unit testing!' },
    });

    expect(newToDo.state().toDo).toBe('Give a talk on unit testing!');
  });

  it('calls props.submit on submit', () => {
    const submit = jest.fn();
    const newToDo = shallow(<NewToDo submit={submit} />);

    newToDo
      .find('.new-to-do__input')
      .simulate('change', { target: { value: 'Hit 100% coverage' } });
    newToDo.find('.new-to-do').simulate('submit', { preventDefault() {} });

    expect(submit).toHaveBeenCalledWith('Hit 100% coverage');
  });

  it('clears state on submit', () => {
    const newToDo = shallow(<NewToDo submit={() => {}} />);

    newToDo
      .find('.new-to-do__input')
      .simulate('change', { target: { value: 'Hit 100% coverage' } });
    newToDo.find('.new-to-do').simulate('submit', { preventDefault() {} });

    expect(newToDo.state().toDo).toBe('');
  });

  it('calls preventDefault on submit', () => {
    const preventDefault = jest.fn();
    const newToDo = shallow(<NewToDo submit={() => {}} />);

    newToDo
      .find('.new-to-do__input')
      .simulate('change', { target: { value: 'Hit 100% coverage' } });
    newToDo.find('.new-to-do').simulate('submit', { preventDefault });

    expect(preventDefault).toHaveBeenCalled();
  });
});
