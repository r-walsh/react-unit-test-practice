const rc = require('../package.json').babel;
const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer(rc);
