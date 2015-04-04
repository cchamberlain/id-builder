'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (descriptor.value) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _import = require('lodash');

var _import2 = _interopRequireWildcard(_import);

var _EventEmitter2 = require('events');

var _EventEmitter3 = _interopRequireWildcard(_EventEmitter2);

var Task = (function (_EventEmitter) {
  function Task(_x, _x2, fn) {
    var name = arguments[0] === undefined ? '' : arguments[0];
    var dependencies = arguments[1] === undefined ? [] : arguments[1];

    _classCallCheck(this, Task);

    _get(Object.getPrototypeOf(Task.prototype), 'constructor', this).call(this);

    this.setName(name);
    this.setDependencies(dependencies);
    this.setFn(fn);
  }

  _inherits(Task, _EventEmitter);

  _createClass(Task, [{
    key: 'getName',
    value: function getName() {
      return this.name;
    }
  }, {
    key: 'setName',
    value: function setName(name) {
      this.name = name;

      this.emit('name', name);

      return this;
    }
  }, {
    key: 'getDependencies',
    value: function getDependencies() {
      return this.dependencies;
    }
  }, {
    key: 'setDependencies',
    value: function setDependencies(dependencies) {
      this.dependencies = dependencies;

      this.emit('dependencies', dependencies);

      return this;
    }
  }, {
    key: 'getFn',
    value: function getFn() {
      return this.fn;
    }
  }, {
    key: 'setFn',
    value: function setFn(fn) {
      this.fn = fn;

      this.emit('fn', fn);

      return this;
    }
  }, {
    key: 'run',
    value: function run(cb) {
      cb(this.fn);
    }
  }]);

  return Task;
})(_EventEmitter3['default']);

exports['default'] = Task;

var babelCompileTask = new Task('compile-babel', undefined, function (cb) {
  doStuff(cb);
});

babelCompileTask.setName('something-else').setDependencies(['clean']).setFn(function (cb) {
  console.log('custom!');
  cb();
}).run(function (error) {});
module.exports = exports['default'];