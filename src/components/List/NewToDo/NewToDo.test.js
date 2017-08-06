import React from 'react';
import { shallow } from 'enzyme';

import NewToDo from './NewToDo';

describe('NewToDo', () => {
  it('renders', () => {
    const newToDo = shallow(<NewToDo submit={() => {}} />);

    expect(newToDo).toBeTruthy();
  });
});
