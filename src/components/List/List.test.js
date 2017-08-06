import React from 'react';
import { shallow } from 'enzyme';

import List from './List';

describe('NewToDo', () => {
  it('renders', () => {
    const list = shallow(<List />);

    expect(list).toBeTruthy();
  });
});
