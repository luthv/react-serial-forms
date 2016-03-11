'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _InputBase2 = require('../InputBase');

var _InputBase3 = _interopRequireDefault(_InputBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectField = function (_InputBase) {
  _inherits(SelectField, _InputBase);

  /**
   * @constructs SelectField
   */

  function SelectField(props) {
    _classCallCheck(this, SelectField);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(SelectField).call(this, props));
  }

  /**
   * The only special attribute select boxes will need is `options`.
   *
   * @return {void}
   */


  _createClass(SelectField, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      _get(Object.getPrototypeOf(SelectField.prototype), 'componentWillMount', this).call(this);
      this.updateAttrs({
        options: []
      }, this.props);
    }

    /**
     * Multiselect needs an array for the value.
     *
     * @param {object} event
     * @return {void}
     */

  }, {
    key: 'onChange',
    value: function onChange(event) {
      if (!event.target.multiple) {
        return _get(Object.getPrototypeOf(SelectField.prototype), 'onChange', this).call(this, event);
      }
      var options = event.target.options;
      var val = [];
      var len = options.length;
      for (var i = 0; i < len; i++) {
        if (options[i].selected) {
          val.push(options[i].value);
        }
      }
      this.updateAttrs({
        value: val
      }, this.ogOnChange.bind(this, event));
    }

    /**
     * Build the component.
     *
     * @return {object} ReactElement
     */

  }, {
    key: 'render',
    value: function render() {
      var attrs = this.attrs();
      var errMessage = _react2.default.createElement('span', null);

      if (this.state.error === null) {
        attrs.className += ' idle';
      } else if (this.state.error === false) {
        attrs.className += ' success';
      } else if (this.hasError()) {
        attrs.className += ' error';
        errMessage = _react2.default.createElement(
          'span',
          { className: 'err-msg' },
          this.state.error.message
        );
      }

      return _react2.default.createElement(
        'span',
        { className: 'serial-input-wrapper' },
        _react2.default.createElement(
          'select',
          attrs,
          attrs.options.map(function (option, index) {
            return _react2.default.createElement(
              'option',
              { value: option.value, key: index },
              option.text
            );
          })
        ),
        errMessage
      );
    }
  }]);

  return SelectField;
}(_InputBase3.default);

exports.default = SelectField;