## react-unit-test-practice

In this repo lives a simple To Do list that is lacking in testing. The `ToDo` component has a full set of commented example tests to serve as a reference.

Your goal is to write tests for the other two components and reach 100% code coverage. Remember that 100% coverage doesn't mean perfect tests! Try to find edge cases and errors that may creep up. Not every bit of what you will need is covered in the example tests, you'll need to hit the docs:

* [Chai/Sinon Cheatsheet](https://gist.github.com/yoavniran/1e3b0162e1545055429e#sinon)
* [Enzyme Docs](http://airbnb.io/enzyme/docs/api/)
* [Ava Docs](https://github.com/avajs/ava)
* [Sinon Docs](http://sinonjs.org/docs/)

NPM Commands(can all be found in the `package.json`):
* `npm run test` - Runs the test suite a single time
* `npm run test:watch` - Continuously runs the test suite on file change
* `npm run test:coverage` - Prints out a coverage report to console
* `npm run report` - Gives an HTML/CSS page you can view with `live-server` to get a better idea of what you might be missing
* `npm run dev` - Runs the project on port 8080 via webpack dev server
* `npm run lint` - Why code if it can't be beautiful?

