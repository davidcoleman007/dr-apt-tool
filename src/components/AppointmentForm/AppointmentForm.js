import React, { Component } from 'react'
import ReactCalendar from 'react-calendar';
import { TimeInput } from '../TimeInput';

import './AppointmentForm.scss';

export default class AppointmentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start                 : undefined,
      end                   : undefined,
      scheduledAppointments : [],
    }
    this.onChangeStart = this.onChangeStart.bind(this);
    this.onChangeEnd   = this.onChangeEnd.bind(this);
  }

  onChangeStart(date) {
    console.log(date);
    this.setState({
      start:date
    });
  }

  onChangeEnd(date) {
    console.log(date);
    this.setState({
      end:date
    });
  }

  render() {
    const {className = ''} = this.props;
    const {start, end} = this.state;
    return (
      <section className={`appointment-form ${className}`}>
        <article className="date-entry">
          <header>Pick Appointment Date</header>
          <ReactCalendar
            className="picker"
            value={start}
            onChange={this.onStartChange}
            showNavigation
            showWeekNumbers
          />
        </article>
        <article className="time-entry">
          <header>Pick Appointment Time</header>
          <section className="time-entry-start">
            <label>Start</label>
            <TimeInput
              onChange={this.onChangeStart}
              value={start}
            />
          </section>
          <section className="time-entry-end">
            <label>End</label>
            <TimeInput
              onChange={this.onChangeEnd}
              value={end}
            />
          </section>
        </article>
      </section>
    )
  }
}
