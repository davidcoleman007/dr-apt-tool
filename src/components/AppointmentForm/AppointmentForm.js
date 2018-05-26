import React, { Component } from 'react'
import ReactCalendar from 'react-calendar';

export default class AppointmentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start : new Date(),
      end: new Date(),
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    console.log(event);
  }

  render() {
    const {start, end} = this.state;
    return (
      <div>
        <article>
          <header>Pick Appointment Date</header>
          <ReactCalendar
            value={start}
            onChange={this.onStartChange}
            showNavigation
            showWeekNumbers
          />
        </article>
        <article>
          <header>Pick Appointment Time</header>
          <section>
            <label>Start</label>
            <input type="time" />
          </section>
          <section>
            <label>End</label>
            <input type="time" />
          </section>
        </article>
      </div>
    )
  }
}
