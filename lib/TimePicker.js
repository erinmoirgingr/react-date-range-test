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

var _TimeCellJs = require('./TimeCell.js');

var _TimeCellJs2 = _interopRequireDefault(_TimeCellJs);

var _stylesJs = require('./styles.js');

var _stylesJs2 = _interopRequireDefault(_stylesJs);

var TimePicker = (function (_Component) {
  _inherits(TimePicker, _Component);

  function TimePicker(props, context) {
    _classCallCheck(this, TimePicker);

    _get(Object.getPrototypeOf(TimePicker.prototype), 'constructor', this).call(this, props, context);

    var theme = props.theme;

    this.styles = (0, _stylesJs2['default'])(theme);

    this.state = {
      selectedTime: props.selectedTime
    };
  }

  /**
   * Either parse a time using the format provided, or treat it as an object with hour and minute, or just pass in minutes directly`
   * return int The representation of the time as minutes from midnight
   */

  _createClass(TimePicker, [{
    key: 'parseTime',
    value: function parseTime(time) {
      if (time === parseInt(time, 10)) {
        return time;
      } else if (typeof time === 'string') {
        var timeObj = (0, _moment2['default'])(time, this.props.format);
        return Number(timeObj.format('H')) * 60 + Number(timeObj.format('m'));
      } else {
        return time.hour * 60 + time.minute;
      }
    }
  }, {
    key: 'isInDisabledRange',
    value: function isInDisabledRange(time) {
      return this.props.disabledTimes.some((function (disabledTime) {
        if (typeof disabledTime === 'object') {
          return time >= this.parseTime(disabledTime.start) && time <= this.parseTime(disabledTime.end);
        } else {
          return time === this.parseTime(disabledTime);
        }
      }).bind(this));
    }
  }, {
    key: 'handleSelect',
    value: function handleSelect(time) {
      var onChange = this.props.onChange;

      onChange && onChange(time);

      this.setState({
        selectedTime: time
      });
    }
  }, {
    key: 'renderTimes',
    value: function renderTimes() {
      var times = [];

      var startTime = this.parseTime(this.props.startTime);
      var endTime = this.parseTime(this.props.endTime);

      // Wrap time around midnight if the end time is before the start time
      if (endTime < startTime) {
        var i = undefined;

        for (i = startTime; i < TimePicker.MIDNIGHT; i += this.props.interval) {
          times.push(i);
        }

        for (i = i - TimePicker.MIDNIGHT; i <= endTime; i += this.props.interval) {
          times.push(i);
        }
      } else {
        for (var i = startTime; i <= endTime; i += this.props.interval) {
          times.push(i);
        }
      }

      // Generate time cells
      var seenSelectedTime = false;
      return times.map((function (time) {
        if (time === this.state.selectedTime) {
          seenSelectedTime = true;
        }

        var isInRange = seenSelectedTime && this.props.startRangeSelected || !seenSelectedTime && this.props.endRangeSelected;

        return _react2['default'].createElement(_TimeCellJs2['default'], {
          key: time,
          minute: time,
          format: this.props.format,
          isSelected: time === this.state.selectedTime,
          isInRange: isInRange,
          isPassive: this.props.isDisabled || this.isInDisabledRange(time),
          isHidden: this.isInDisabledRange(time) && this.props.hideDisabledTimes,
          onSelect: this.handleSelect.bind(this, time) });
      }).bind(this));
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.selectedTime !== this.props.selectedTime) {
        this.setState({
          selectedTime: nextProps.selectedTime
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = this.styles;

      return _react2['default'].createElement(
        'div',
        { style: _extends({}, styles['TimePicker'], this.props.style), className: 'rdr-TimePicker' },
        _react2['default'].createElement(
          'div',
          { style: _extends({}, styles['TimeHeader']), className: 'rdr-TimeHeader' },
          this.props.headerLabel
        ),
        _react2['default'].createElement(
          'div',
          { className: 'rdr-Times' },
          this.renderTimes()
        )
      );
    }
  }]);

  return TimePicker;
})(_react.Component);

TimePicker.defaultProps = {
  theme: {},
  startTime: {
    hour: 0,
    minute: 0
  },
  endTime: {
    hour: 23,
    minute: 59
  },
  interval: 15,
  format: 'h:mm A',
  selectedTime: null,
  disabledTimes: [],
  hideDisabledTimes: false,
  headerLabel: 'Time'
};

TimePicker.propTypes = {
  // sets           : PropTypes.string,
  // range          : PropTypes.shape({
  //   startDate    : PropTypes.object,
  //   endDate      : PropTypes.object
  // }),
  // date           : PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func]),
  // format         : PropTypes.string.isRequired,
  // firstDayOfWeek : PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  // onChange       : PropTypes.func,
  // onInit         : PropTypes.func,
  // link           : PropTypes.oneOfType([PropTypes.shape({
  //   startDate    : PropTypes.object,
  //   endDate      : PropTypes.object,
  // }), PropTypes.bool]),
  // linkCB         : PropTypes.func,
  // theme          : PropTypes.object,
};

TimePicker.MIDNIGHT = 24 * 60;

exports['default'] = TimePicker;
module.exports = exports['default'];