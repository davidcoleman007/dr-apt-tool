import React from 'react';
import { isDate } from 'util';

export class TimeInput extends React.Component {
  constructor() {
    super();
    this.state = {
      date: new Date(Date.parse(new Date().toDateString()))
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const {onChange} = this.props;
    const dStr = (new Date()).toLocaleDateString() + ' ' + event.target.value;
    const date = new Date(Date.parse(dStr));
    this.setState({
      date
    });
    onChange && onChange(date);
  }

  componentWillReceiveProps(nextProps) {
    const {value} = nextProps;
    value &&  isDate(value) &&
    (value.toString() !== this.state.date.toString()) &&
    this.setState({
      date: value
    });
  }

  render() {
    const {date} = this.state;
    const value = date && date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    });
    return (
      <input
        type="time"
        value={value}
        onInput={this.onChange}
        onChange={this.onChange}
      />
    );
  }
}
