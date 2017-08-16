import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';

import ToDo from './ToDo';

describe('ToDo', () => {
  // Using jest to set up a single unit test.
  // The first argument is just an explanation of what the test is,
  // this is what will be output while tests run, so make it descriptive.
  it('displays text based on props.text', () => {
    // Creating a shallow rendered(pared down) version of the component with Enzyme.
    const toDo = shallow(
      // Ensure props are passed as they would be in production, even if they aren't used in the test.
      <ToDo
        complete={false}
        deleteToDo={() => null}
        text="Test ToDo"
        toggleCompletion={() => null}
      />,
    );

    // .find is like document.querySelector, it finds an element based on:
    // 	- Element i.e "button"
    // 	- id or class i.e "#app" ".foo"
    // 	- Component name, if we wanted to find our ToDo component from a parent component: "ToDo"
    // Once we have found the element we use the chai-enzyme assertion .to.have.text to check the element text
    expect(toDo.find('.to-do__info').text()).toBe('Test ToDo');
  });

  it('changes class based on props.completion', () => {
    const toDo = shallow(
      <ToDo
        complete
        deleteToDo={() => null}
        text="Test ToDo"
        toggleCompletion={() => null}
      />,
    );
    const inCompleteToDo = shallow(
      <ToDo
        complete={false}
        deleteToDo={() => null}
        text="Test ToDo"
        toggleCompletion={() => null}
      />,
    );

    // The first time this test is run, it will generate a snapshot of the component's output.
    // As further changes are made to the component, you simply review the diff to ensure
    // that the changes are intentional.
    expect(toJson(toDo)).toMatchSnapshot();
    // We still need to check both potential states of the component!
    expect(toJson(inCompleteToDo)).toMatchSnapshot();
  });

  it('ToDo calls props.toggleCompletion on checkbox change', () => {
    // Creating a sinon spy,
    // essentially a dummy function who's whole purpose is to tell us information about how it is called.
    const toggleCompletionSpy = jest.fn();

    // We pass the spy as a prop to the component
    const toDo = shallow(
      <ToDo
        complete
        deleteToDo={() => null}
        text="Test ToDo"
        toggleCompletion={toggleCompletionSpy}
      />,
    );

    // Enzyme is designed as a UI testing tool,
    // which means that rather than manually setting props, it is preferable to use the UI to simulate events.
    // Here we find the completion checkbox and simulate a "change" event,
    // matching the event handler inside the component.
    toDo.find('.to-do__completion').simulate('change');

    // Here we check whether our mocked function has been called the expected number of times
    // If we needed to access the arguments we could say
    // expect(toggleCompletionSpy).toHaveBeenCalledWith(expectedArguments);
    expect(toggleCompletionSpy).toHaveBeenCalled();
  });

  it('ToDo calls props.deleteTodo on delete button click', () => {
    const deleteToDoSpy = jest.fn();

    const toDo = shallow(
      <ToDo
        complete
        deleteToDo={deleteToDoSpy}
        text="Test ToDo"
        toggleCompletion={() => null}
      />,
    );

    toDo.find('button').simulate('click');

    expect(deleteToDoSpy).toHaveBeenCalled();
  });
});
