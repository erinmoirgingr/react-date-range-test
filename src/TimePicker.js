import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import TimeCell from './TimeCell.js'
import getTheme from './styles.js';

class TimePicker extends Component {

  constructor(props, context) {
    super(props, context);

    const { theme } = props;

    this.styles = getTheme(theme);

    this.state = {
      selectedTime: props.selectedTime
    }
  }

  /**
   * Either parse a time using the format provided, or treat it as an object with hour and minute, or just pass in minutes directly`
   * return int The representation of the time as minutes from midnight
   */
  parseTime(time) {
    if (time === parseInt(time, 10)) {
      return time;
    } else if (typeof time === 'string') {
      let timeObj = moment(time, this.props.format);
      return Number(timeObj.format('H')) * 60 + Number(timeObj.format('m'));
    } else {
      return time.hour * 60 + time.minute;
    }
  }

  isInDisabledRange(time) {
    return this.props.disabledTimes.some(function(disabledTime) {
      if (typeof disabledTime === 'object') {
        return time >= this.parseTime(disabledTime.start) && time <= this.parseTime(disabledTime.end);
      } else {
        return time === this.parseTime(disabledTime);
      }
    }.bind(this));
  }

  handleSelect(time) {
    const { onChange } = this.props;

    onChange && onChange(time);

    this.setState({
      selectedTime: time
    });
  }

  renderTimes() {
    let times = [];

    const startTime = this.parseTime(this.props.startTime);
    const endTime   = this.parseTime(this.props.endTime);

    // Wrap time around midnight if the end time is before the start time
    if (endTime < startTime) {
      let i;

      for (i = startTime; i < TimePicker.MIDNIGHT; i += this.props.interval) {
        times.push(i);
      }

      for (i = i - TimePicker.MIDNIGHT; i <= endTime; i += this.props.interval) {
        times.push(i);
      }
    } else {
      for (let i = startTime; i <= endTime; i += this.props.interval) {
        times.push(i);
      }
    }

    // Generate time cells
    let seenSelectedTime = false;
    return times.map(function(time) {
      if (time === this.state.selectedTime) {
        seenSelectedTime = true;
      }

      let isInRange = (seenSelectedTime && this.props.startRangeSelected) || (!seenSelectedTime && this.props.endRangeSelected);

      return (
        <TimeCell
          key         = {time}
          minute      = {time}
          format      = {this.props.format}
          isSelected  = {time === this.state.selectedTime}
          isInRange   = {isInRange}
          isPassive   = {this.props.isDisabled || this.isInDisabledRange(time)}
          isHidden    = {this.isInDisabledRange(time) && this.props.hideDisabledTimes}
          onSelect    = {this.handleSelect.bind(this, time)} />
      );
    }.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedTime !== this.props.selectedTime) {
      this.setState({
        selectedTime: nextProps.selectedTime
      });
    }
  }

  render() {
    const { styles } = this;

    return (
      <div style={{ ...styles['TimePicker'], ...this.props.style }} className='rdr-TimePicker'>
        <div style={{ ...styles['TimeHeader'] }} className="rdr-TimeHeader">{this.props.headerLabel}</div>
        <div className='rdr-Times'>{ this.renderTimes() }</div>
      </div>
    );
  }
}

TimePicker.defaultProps = {
  theme             : {},
  startTime         : {
    hour:   0,
    minute: 0
  },
  endTime           : {
    hour:   23,
    minute: 59
  },
  interval          : 15,
  format            : 'h:mm A',
  selectedTime      : null,
  disabledTimes     : [],
  hideDisabledTimes : false,
  headerLabel       : 'Time',
}

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
}

TimePicker.MIDNIGHT = 24 * 60;

export default TimePicker;
