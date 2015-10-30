import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import TimePicker from './TimePicker.js';
import getTheme from './styles.js';

class TimeRange extends Component {

  constructor(props, context) {
    super(props, context);

    const { theme } = props;

    this.state = {
      range: {
        startTime: null,
        endTime:   null
      }
    }

    this.styles = getTheme(theme);
  }

  orderRange(range) {
    const { startDate, endDate } = range;
    const swap = startDate.isAfter(endDate);

    if (!swap) return range;

    return {
      startDate : endDate,
      endDate   : startDate
    }
  }

  setRange(range) {
    const { onChange } = this.props
    range = this.orderRange(range);

    this.setState({ range });

    onChange && onChange(range);
  }

  handleSelect(time, prop) {

  }

  handleStartSelect(time) {
    this.setState({
      range: {
        startTime: time,
        endTime:   null
      }
    });
  }

  handleEndSelect(time) {
    const { startTime, endTime } = this.state.range;

    const range = {
      startTime : startTime,
      endTime   : endTime
    };

    range['endTime'] = time;

    this.setState({
      range: range
    });
  }

  render() {
    const { startTime, endTime } = this.state.range;
    const { styles } = this;

    let endTimeRange = {};

    if (startTime !== null) {
      endTimeRange.startTime = startTime + this.props.interval;

      if (this.props.wrapRange === true) {
        endTimeRange.endTime = startTime;
      }
    }

    return (
      <div
        style={{ ...styles['TimeRange'], ...this.props.style }}>
        <TimePicker
          {...this.props}
          {...this.props.startTimeOptions}
          headerLabel         = "Start Time"
          onChange            = {this.handleStartSelect.bind(this)}
          selectedTime        = {startTime}
          startRangeSelected  = {startTime !== null && endTime !== null} />
        <TimePicker
          {...this.props}
          {...endTimeRange}
          {...this.props.endTimeOptions}
          headerLabel       = "End Time"
          onChange          = {this.handleEndSelect.bind(this)}
          selectedTime      = {endTime}
          isDisabled        = {startTime === null}
          endRangeSelected  = {startTime !== null && endTime !== null} />
      </div>
    )
  }
}

TimeRange.defaultProps = {
  ...TimePicker.defaultProps,
  wrapRange:  false
}

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
}

export default TimeRange;
