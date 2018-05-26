import React from 'react';
import { isDate } from 'util';

export class TimeInput extends React.Component {
  constructor() {
    super();
    this.state = {
      date: undefined
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
    onChange && onChange(date);
  }

  componentWillReceiveProps(nextProps) {
    console.log('will receive props', nextProps);
    const {value} = nextProps;
    value &&  isDate(value) && this.this.setState({
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
