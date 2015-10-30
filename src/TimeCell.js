import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import getTheme from './styles.js';

class TimeCell extends Component {
  constructor(props, context) {
    super(props, context);

    const { theme } = props;

    this.styles = getTheme(theme);

    this.state = {
      hover     : false,
      active    : false
    }
  }

  handleMouseEvent(event) {
    event.preventDefault();

    if (this.props.isPassive) return null;

    const newState = {};

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

  handleSelect(event) {
    event.preventDefault();

    if (this.props.isPassive) return null;

    this.props.onSelect(this.props.time);
  }

  getStateStyles() {
    const { hover, active } = this.state;
    const { isSelected, isInRange, isPassive, isHidden } = this.props;
    const { styles } = this;

    const hoverStyle    = hover       ? styles['TimeHover'] : {};
    const activeStyle   = active      ? styles['TimeActive'] : {};
    const passiveStyle  = isPassive   ? styles['TimePassive'] : {};
    const selectedStyle = isSelected  ? styles['TimeSelected'] : {};
    const inRangeStyle  = isInRange   ? styles['TimeInRange'] : {};

    const isHiddenStyle = isHidden    ? {'display': 'none'} : {};

    return {
      ...inRangeStyle,
      ...hoverStyle,
      ...passiveStyle,
      ...activeStyle,
      ...selectedStyle,
      ...isHiddenStyle,
    };
  }

  minuteToString(minute) {
    return moment(Math.floor(minute / 60) + ':' + minute % 60, 'H:m').format(this.props.format);
  }

  render() {
    const { styles } = this;
    const stateStyle    = this.getStateStyles();

    return (
      <span
        style         = {{ ...styles['Time'], ...stateStyle }}
        className     = "rdr-Time"
        onMouseEnter  = { this.handleMouseEvent.bind(this) }
        onMouseLeave  = { this.handleMouseEvent.bind(this) }
        onMouseDown   = { this.handleMouseEvent.bind(this) }
        onMouseUp     = { this.handleMouseEvent.bind(this) }
        onClick       = { this.handleSelect.bind(this) }>
        {this.minuteToString(this.props.minute)}
      </span>
    );
  }
}

export default TimeCell;
