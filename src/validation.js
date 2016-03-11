/**
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
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';
import isNumber from 'lodash/isNumber';

import { Map } from 'immutable';

const _isSupplied = function(val) {
  let value = val;
  if (val && val.size && val.toJS) {
    value = val.toJS();
  }
  if (isArray(value) && isEmpty(value)) {
    return false;
  }
  if (isObject(value) && isEmpty(value)) {
    return false;
  }
  if (isNull(value) || isUndefined(value)) {
    return false;
  }
  if (isNumber(value)) {
    return true;
  }

  //allow true and false value
  if(value === true || value === false){
    return true;
  }

  return !isEmpty(value);
};

class Validation {
  constructor() {
    this._VALIDATOR_CACHE_ = Map();
    this._isSupplied = _isSupplied;
  }
  registerValidator(validationObject) {
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

    this._VALIDATOR_CACHE_ = this._VALIDATOR_CACHE_.set(
      validationObject.name,
      validationObject
    );
  }
  collection() {
    return this._VALIDATOR_CACHE_;
  }
}


const validation = new Validation();

/**
 * Register some basic defaults.
 */

validation.registerValidator({
  name: 'required',
  invalid: function(value) {
    return !_isSupplied(value);
  },
  message: 'This field is required.'
});

validation.registerValidator({
  name: 'email',
  invalid: function(value) {
    const EMAIL_PATTERN = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return _isSupplied(value) && !EMAIL_PATTERN.test(value);
  },
  message: 'Email is invalid.'
});

validation.registerValidator({
  name: 'numeral',
  invalid: function(value) {
    return _isSupplied(value) && !/^[0-9.]+$/.test(value);
  },
  message: 'Must be a number.'
});

module.exports = validation;
