'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _stylesJs = require('./styles.js');

var _stylesJs2 = _interopRequireDefault(_stylesJs);

var TimeCell = (function (_Component) {
  _inherits(TimeCell, _Component);

  function TimeCell(props, context) {
    _classCallCheck(this, TimeCell);

    _get(Object.getPrototypeOf(TimeCell.prototype), 'constructor', this).call(this, props, context);

    var theme = props.theme;

    this.styles = (0, _stylesJs2['default'])(theme);

    this.state = {
      hover: false,
      active: false
    };
  }

  _createClass(TimeCell, [{
    key: 'handleMouseEvent',
    value: function handleMouseEvent(event) {
      event.preventDefault();

      if (this.props.isPassive) return null;

      var newState = {};

      switch (event.type) {
        case 'mouseenter':
          newState['hover'] = true;
          break;

        case 'mouseup':
        case 'mouseleave':
          newState['hover'] = false;
          newState['active'] = false;
          break;

        case 'mousedown':
          newState['active'] = true;
          break;
      }

      this.setState(newState);
    }
  }, {
    key: 'handleSelect',
    value: function handleSelect(event) {
      event.preventDefault();

      if (this.props.isPassive) return null;

      this.props.onSelect(this.props.time);
    }
  }, {
    key: 'getStateStyles',
    value: function getStateStyles() {
      var _state = this.state;
      var hover = _state.hover;
      var active = _state.active;
      var _props = this.props;
      var isSelected = _props.isSelected;
      var isInRange = _props.isInRange;
      var isPassive = _props.isPassive;
      var isHidden = _props.isHidden;
      var styles = this.styles;

      var hoverStyle = hover ? styles['TimeHover'] : {};
      var activeStyle = active ? styles['TimeActive'] : {};
      var passiveStyle = isPassive ? styles['TimePassive'] : {};
      var selectedStyle = isSelected ? styles['TimeSelected'] : {};
      var inRangeStyle = isInRange ? styles['TimeInRange'] : {};

      var isHiddenStyle = isHidden ? { 'display': 'none' } : {};

      return _extends({}, inRangeStyle, hoverStyle, passiveStyle, activeStyle, selectedStyle, isHiddenStyle);
    }
  }, {
    key: 'minuteToString',
    value: function minuteToString(minute) {
      return (0, _moment2['default'])(Math.floor(minute / 60) + ':' + minute % 60, 'H:m').format(this.props.format);
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = this.styles;

      var stateStyle = this.getStateStyles();

      return _react2['default'].createElement(
        'span',
        {
          style: _extends({}, styles['Time'], stateStyle),
          className: 'rdr-Time',
          onMouseEnter: this.handleMouseEvent.bind(this),
          onMouseLeave: this.handleMouseEvent.bind(this),
          onMouseDown: this.handleMouseEvent.bind(this),
          onMouseUp: this.handleMouseEvent.bind(this),
          onClick: this.handleSelect.bind(this) },
        this.minuteToString(this.props.minute)
      );
    }
  }]);

  return TimeCell;
})(_react.Component);

exports['default'] = TimeCell;
module.exports = exports['default'];