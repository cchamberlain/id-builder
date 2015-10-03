'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _fs = require('fs');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _async = require('async');

var _babel = require('babel');

var _circularJson = require('circular-json');

var _circularJson2 = _interopRequireDefault(_circularJson);

var _libCompileTask = require('../lib/CompileTask');

var _libCompileTask2 = _interopRequireDefault(_libCompileTask);

var _libLogging = require('../lib/logging');

var _libLogging2 = _interopRequireDefault(_libLogging);

var _libGetFiles = require('../lib/getFiles');

var _libGetFiles2 = _interopRequireDefault(_libGetFiles);

var DERP = true;

/**
 * Constructs a PlantUML version of all classes fed to the compiler and puts
 * them into one diagram. Only supports a very specific subset of ES6
 * functionality;
 *  - Every module included in the graph contains one class.
 *  - Class names are unique (for now).
 */

var PlantUMLCompile = (function (_CompileTask) {
  _inherits(PlantUMLCompile, _CompileTask);

  function PlantUMLCompile() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, PlantUMLCompile);

    _get(Object.getPrototypeOf(PlantUMLCompile.prototype), 'constructor', this).call(this, options);

    // Stores all classes to be used in the PlantUML output.
    this.classes = {};
  }

  /**
   * Adds a class to the classes.
   * @param name
   */

  _createClass(PlantUMLCompile, [{
    key: 'addClass',
    value: function addClass(name) {
      this.classes[name] = {};
    }

    /**
     * Removes a class from the classes.
     * @param name
     */
  }, {
    key: 'removeClass',
    value: function removeClass(name) {
      delete this.classes[name];
    }

    /**
     * Returns true if the AST contains a class token, otherwise it returns false.
     * @param {Object} ast
     * @returns {Boolean}
     */
  }, {
    key: 'hasClass',
    value: function hasClass(ast) {
      return _lodash2['default'].findWhere(ast.tokens, {
        value: 'class'
      });
    }

    /**
     * Returns true if the class extends another, otherwise it returns false.
     * @param ast
     * @returns {boolean}
     */
  }, {
    key: 'doesClassExtend',
    value: function doesClassExtend(ast) {
      return false;
    }

    /**
     * Returns the name of the parent class.
     * @param ast
     */
  }, {
    key: 'getClassParent',
    value: function getClassParent(ast) {}

    /**
     * Adds the parent class as parent to this one.
     * @param className
     * @param classParent
     */
  }, {
    key: 'addClassParent',
    value: function addClassParent(className, classParent) {}

    /**
     * Sets the parent of the class, if any.
     * @param className
     * @param ast
     */
  }, {
    key: 'setClassParent',
    value: function setClassParent(className, ast) {
      if (this.doesClassExtend(ast)) {
        var classExtendName = this.getClassParent(ast);

        this.addClassParent(className, classExtendName);
      }
    }

    /**
     * Sets the methods of the class, if any.
     * @param className
     * @param ast
     */
  }, {
    key: 'setClassMethods',
    value: function setClassMethods(className, ast) {}

    /**
     * Returns the name of the class in the AST of a module.
     * @param ast
     */
  }, {
    key: 'getClassName',
    value: function getClassName(ast) {
      _libLogging2['default'].taskInfo(this.constructor.name, 'getClassName ' + ast);

      _libLogging2['default'].taskInfo(this.constructor.name, 'getClassName keys ' + _lodash2['default'].keys(ast));
    }

    /**
     * Converts a chunk of ES6 code - containing a complete module - to a class.
     * in-memory model inside the instance.
     * @param chunk
     */
  }, {
    key: 'convert',
    value: function convert(sourceFilePath, chunk) {
      var ast = (0, _babel.transform)(chunk, this.options.options).ast;

      if (this.hasClass(ast)) {
        if (DERP) {
          _libLogging2['default'].taskInfo(this.constructor.name, 'convert found class ' + _className + ', ' + sourceFilePath);
          _libLogging2['default'].taskInfo(this.constructor.name, 'AST: ' + _circularJson2['default'].stringify(ast));

          var _className = this.getClassName(ast);

          this.addClass(_className);

          this.setClassParent(_className, ast);
          this.setClassMethods(_className, ast);
          DERP = false;
        }
      }

      throw new Error('Not yet implemented');
    }
  }, {
    key: 'compileChunk',
    value: function compileChunk(sourceFilePath, chunk, cb) {
      try {
        cb(null, this.convert(sourceFilePath, chunk));
      } catch (e) {
        return cb(e);
      }
    }
  }, {
    key: 'compileFile',
    value: function compileFile(sourceFilePath, cb) {
      var _this = this;

      _libLogging2['default'].taskInfo(this.constructor.name, 'compileFile ' + sourceFilePath);

      (0, _fs.readFile)(sourceFilePath, function (e, fileContent) {
        if (e) {
          return cb(e);
        }

        _this.compileChunk(sourceFilePath, fileContent.toString(), function (e, compiledChunk) {
          if (e) {
            _libLogging2['default'].taskWarn(_this.constructor.name, sourceFilePath + ': ' + e);

            return cb();
          }

          cb(null, compiledChunk);
        });
      });
    }
  }, {
    key: 'compileAllFiles',
    value: function compileAllFiles(cb) {
      var _this2 = this;

      (0, _libGetFiles2['default'])(this.sourceDirectoryPath, function (e, sourceFilePaths) {
        if (e) {
          return cb(e);
        }

        var paths = (0, _lodash2['default'])(sourceFilePaths).map(function (v) {
          return v.fullPath;
        }).filter(_this2.sourceFilePathMatches.bind(_this2)).value();

        (0, _async.each)(paths, function (currentSourceFilePath, cb) {
          _this2.compileFile(currentSourceFilePath, cb);
        }, function (e, results) {
          if (e) {
            return cb(e);

            console.log('results', results.length);
          }
        });
      });
    }
  }, {
    key: 'run',
    value: function run(cb) {
      this.compileAllFiles(cb);
    }
  }]);

  return PlantUMLCompile;
})(_libCompileTask2['default']);

exports['default'] = PlantUMLCompile;
module.exports = exports['default'];