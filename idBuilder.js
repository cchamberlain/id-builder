// Because idBuilder is itself written in ES6, use the babel register require
// call here to be able to run the ES6 code directly from here.
require('babel-core/register');

var idBuilder = require('./src');

idBuilder();
