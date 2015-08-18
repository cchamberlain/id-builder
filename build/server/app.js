'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _net = require('net');

var _net2 = _interopRequireWildcard(_net);

var server = _net2['default'].createServer();

server.listen(8000);