// Because idBuilder is itself written in ES6, use the babel register require
// call here to be able to run the ES6 code directly from here.
require('babel-core/register')({
  presets: [ 'es2015', 'react', 'stage-0', 'stage-1', 'stage-2', 'stage-3' ]
});

var idBuilder = require('./src');

idBuilder();
