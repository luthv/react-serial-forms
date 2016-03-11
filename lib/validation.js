'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright 2015, Lev Interactive, LLC.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This source code is licensed under the BSD-style license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * LICENSE file in the root directory of this source tree. An additional grant
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * of patent rights can be found in the PATENTS file in the same directory.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @module validation
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
//only import what we need from lodash


var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isEmpty = require('lodash/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _isNull = require('lodash/isNull');

var _isNull2 = _interopRequireDefault(_isNull);

var _isUndefined = require('lodash/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _isNumber = require('lodash/isNumber');

var _isNumber2 = _interopRequireDefault(_isNumber);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _isSupplied = function _isSupplied(val) {
  var value = val;
  if (val && val.size && val.toJS) {
    value = val.toJS();
  }
  if ((0, _isArray2.default)(value) && (0, _isEmpty2.default)(value)) {
    return false;
  }
  if ((0, _isObject2.default)(value) && (0, _isEmpty2.default)(value)) {
    return false;
  }
  if ((0, _isNull2.default)(value) || (0, _isUndefined2.default)(value)) {
    return false;
  }
  if ((0, _isNumber2.default)(value)) {
    return true;
  }

  //allow true and false value
  if (value === true || value === false) {
    return true;
  }

  return !(0, _isEmpty2.default)(value);
};

var Validation = function () {
  function Validation() {
    _classCallCheck(this, Validation);

    this._VALIDATOR_CACHE_ = (0, _immutable.Map)();
    this._isSupplied = _isSupplied;
  }

  _createClass(Validation, [{
    key: 'registerValidator',
    value: function registerValidator(validationObject) {
      if (!validationObject) {
        throw new Error('A validation object is required.');
      }
      if (!validationObject.name) {
        throw new Error('A \'name\' string is required.');
      }
      if (!validationObject.invalid) {
        throw new Error('A \'name\' method is required.');
      }
      if (!validationObject.message) {
        throw new Error('A \'message\' string is required.');
      }

      this._VALIDATOR_CACHE_ = this._VALIDATOR_CACHE_.set(validationObject.name, validationObject);
    }
  }, {
    key: 'collection',
    value: function collection() {
      return this._VALIDATOR_CACHE_;
    }
  }]);

  return Validation;
}();

var validation = new Validation();

/**
 * Register some basic defaults.
 */

validation.registerValidator({
  name: 'required',
  invalid: function invalid(value) {
    return !_isSupplied(value);
  },
  message: 'This field is required.'
});

validation.registerValidator({
  name: 'email',
  invalid: function invalid(value) {
    var EMAIL_PATTERN = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return _isSupplied(value) && !EMAIL_PATTERN.test(value);
  },
  message: 'Email is invalid.'
});

validation.registerValidator({
  name: 'numeral',
  invalid: function invalid(value) {
    return _isSupplied(value) && !/^[0-9.]+$/.test(value);
  },
  message: 'Must be a number.'
});

module.exports = validation;