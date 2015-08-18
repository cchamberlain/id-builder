// Because idBuilder is itself written in ES6, use the babel register require
// call here to be able to run the ES6 code directly from here.
require('babel/register');

var idBuilder = require('./src');

idBuilder({
  logging: {
    level: 'debug'
  }
}, function afterIdBuilder(e) {
  if (e) {
    console.error(e.stack || e.message || e);
  }

  process.exit();
});
