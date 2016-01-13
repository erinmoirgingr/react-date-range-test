'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _TimePickerJs = require('./TimePicker.js');

var _TimePickerJs2 = _interopRequireDefault(_TimePickerJs);

var _stylesJs = require('./styles.js');

var _stylesJs2 = _interopRequireDefault(_stylesJs);

var TimeRange = (function (_Component) {
  _inherits(TimeRange, _Component);

  function TimeRange(props, context) {
    _classCallCheck(this, TimeRange);

    _get(Object.getPrototypeOf(TimeRange.prototype), 'constructor', this).call(this, props, context);

    var theme = props.theme;

    this.state = {
      range: {
        startTime: null,
        endTime: null
      }
    };

    this.styles = (0, _stylesJs2['default'])(theme);
  }

  _createClass(TimeRange, [{
    key: 'orderRange',
    value: function orderRange(range) {
      var startDate = range.startDate;
      var endDate = range.endDate;

      var swap = startDate.isAfter(endDate);

      if (!swap) return range;

      return {
        startDate: endDate,
        endDate: startDate
      };
    }
  }, {
    key: 'setRange',
    value: function setRange(range) {
      var onChange = this.props.onChange;

      range = this.orderRange(range);

      this.setState({ range: range });

      onChange && onChange(range);
    }
  }, {
    key: 'handleSelect',
    value: function handleSelect(time, prop) {}
  }, {
    key: 'handleStartSelect',
    value: function handleStartSelect(time) {
      this.setState({
        range: {
          startTime: time,
          endTime: null
        }
      });
    }
  }, {
    key: 'handleEndSelect',
    value: function handleEndSelect(time) {
      var _state$range = this.state.range;
      var startTime = _state$range.startTime;
      var endTime = _state$range.endTime;

      var range = {
        startTime: startTime,
        endTime: endTime
      };

      range['endTime'] = time;

      this.setState({
        range: range
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state$range2 = this.state.range;
      var startTime = _state$range2.startTime;
      var endTime = _state$range2.endTime;
      var styles = this.styles;

      var endTimeRange = {};

      if (startTime !== null) {
        endTimeRange.startTime = startTime + this.props.interval;

        if (this.props.wrapRange === true) {
          endTimeRange.endTime = startTime;
        }
      }

      return _react2['default'].createElement(
        'div',
        {
          style: _extends({}, styles['TimeRange'], this.props.style) },
        _react2['default'].createElement(_TimePickerJs2['default'], _extends({}, this.props, this.props.startTimeOptions, {
          headerLabel: 'Start Time',
          onChange: this.handleStartSelect.bind(this),
          selectedTime: startTime,
          startRangeSelected: startTime !== null && endTime !== null })),
        _react2['default'].createElement(_TimePickerJs2['default'], _extends({}, this.props, endTimeRange, this.props.endTimeOptions, {
          headerLabel: 'End Time',
          onChange: this.handleEndSelect.bind(this),
          selectedTime: endTime,
          isDisabled: startTime === null,
          endRangeSelected: startTime !== null && endTime !== null }))
      );
    }
  }]);

  return TimeRange;
})(_react.Component);

TimeRange.defaultProps = _extends({}, _TimePickerJs2['default'].defaultProps, {
  wrapRange: false
});

TimeRange.propTypes = {
  // format          : PropTypes.string,
  // firstDayOfWeek  : PropTypes.number,
  // calendars       : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // startDate       : PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  // endDate         : PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  // minDate         : PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  // maxDate         : PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  // dateLimit       : PropTypes.func,
  // ranges          : PropTypes.object,
  // linkedCalendars : PropTypes.bool,
  // theme           : PropTypes.object,
  // onInit          : PropTypes.func,
  // onChange        : PropTypes.func,
};

exports['default'] = TimeRange;
module.exports = exports['default'];