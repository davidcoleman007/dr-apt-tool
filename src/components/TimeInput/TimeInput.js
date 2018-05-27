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
    console.log(date);
    this.setState({
      date
    });
    console.log('TimeInput::onChange', date);
    onChange && onChange(date);
  }

  componentWillReceiveProps(nextProps) {
    console.log('will receive props', nextProps);
    const {value} = nextProps;
    value &&  isDate(value) &&
    (value.toString() !== this.state.date.toString()) &&
    this.setState({
      date: value
    }) && console.log('set new state');
  }

  render() {
    const {date} = this.state;
    console.log('rendered date', date);
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
