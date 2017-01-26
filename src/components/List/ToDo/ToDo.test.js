import React from "react";
import test from "ava";
import { shallow } from "enzyme";
import chai, { expect } from "chai";
import chaiEnzyme from "chai-enzyme";
import sinon from "sinon";

chai.use( chaiEnzyme );

import ToDo from "./ToDo";

// Using ava to set up a single unit test.
// First argument is just an explanation of what the test is.
// This is what will display on failing tests, so make it descriptive.
test( "ToDo displays text based on props.text", () => {
	// Creating a shallow rendered(paired down) version of the component with Enzyme.
	const toDo = shallow(
		// Ensure props are passed as they would be in production, even if they aren't used in the test.
		<ToDo
			complete={ false }
			deleteToDo={ () => null }
			text="Test ToDo"
			toggleCompletion={ () => null }
		/>
	);

	// .find is like document.querySelector, it finds an element based on:
	// Element i.e "button"
	// id or class i.e "#app" ".foo"
	// Component name, if we wanted to find our ToDo component from a parent component: "ToDo"
	// Once we have found the element we use the .text() method to extract text
	// then assert that it equals what we expect based on the props above
	expect( toDo.find( ".to-do__info" ).text() ).to.equal( "Test ToDo" );
} );

test( "ToDo info box changes class based on props.completion", () => {
	const toDo = shallow(
		<ToDo
			complete
			deleteToDo={ () => null }
			text="Test ToDo"
			toggleCompletion={ () => null }
		/>
	);

	// Here we find all elements with a class of ".to-do__info--complete
	// Because there is only one within the component it should be an array of length 1
	expect( toDo.find( ".to-do__info--complete" ) ).to.have.length( 1 );
	// We also want to check the alternate class the element could have,
	// and make sure that wasn't rendered as well for some reason.
	expect( toDo.find( ".to-do__info" ) ).to.have.length( 0 );

	// It is common to need to test changes in props or state.
	// This is done via component.setProps( { /* values */ } ) or component.setState( { /* values */ } )
	toDo.setProps( {
		  complete: false
		, deleteToDo() {
			return null;
		}
		, text: "Test ToDo"
		, toggleCompletion() {
			return null;
		}
	} );

	expect( toDo.find( ".to-do__info--complete" ) ).to.have.length( 0 );
	expect( toDo.find( ".to-do__info" ) ).to.have.length( 1 );
} );

test( "ToDo calls props.toggleCompletion on checkbox change", () => {
	// Creating a sinon spy,
	// essentially a dummy function who's whole purpose is to tell us information about how it is called.
	const toggleCompletionSpy = sinon.spy();

	// We pass the spy as a prop to the component
	const toDo = shallow(
		<ToDo
			complete
			deleteToDo={ () => null }
			text="Test ToDo"
			toggleCompletion={ toggleCompletionSpy }
		/>
	);

	// Enzyme is designed as a UI testing tool,
	// which means that rather than manually setting props, it is preferable to use the UI to simulate events.
	// Here we find the completion checkbox and simulate a "change" event,
	// matching the event handler inside the component.
	toDo
		.find( ".to-do__completion" )
		.simulate( "change" );

	// We use a sinon assertion to confirm that our callback spy was called as many times as expected.
	// We could also check args with toggleCompletionSpy.firstCall.args
	sinon.assert.calledOnce( toggleCompletionSpy );
} );

test( "ToDo calls props.deleteTodo on delete button click", () => {
	const deleteToDoSpy = sinon.spy();

	const toDo = shallow(
		<ToDo
			complete
			deleteToDo={ deleteToDoSpy }
			text="Test ToDo"
			toggleCompletion={ () => null }
		/>
	);

	toDo
		.find( "button" )
		.simulate( "click" );

	sinon.assert.calledOnce( deleteToDoSpy );
} );
