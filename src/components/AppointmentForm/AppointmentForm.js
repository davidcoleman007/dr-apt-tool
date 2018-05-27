import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactCalendar from 'react-calendar';
import { TimeInput } from '../TimeInput';

import './AppointmentForm.scss';

class InitialState extends Object {
  constructor() {
    super();
    this.aptData  = [];
    this.day      = null;
    this.start    = new Date(Date.parse(new Date().toDateString()));
    this.end      = new Date(Date.parse(new Date().toDateString()));
    this.overlap  = false;
    this.rangeErr = false;
  }
}

export default class AppointmentForm extends Component {
  static propTypes = {
    aptData : PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state                 = new InitialState();
    this.checkOverlap          = this.checkOverlap.bind(this);
    this.checkEnd              = this.checkEnd.bind(this);
    this.getTimeForSelectedDay = this.getTimeForSelectedDay.bind(this);
    this.onChangeDay           = this.onChangeDay.bind(this);
    this.onChangeStart         = this.onChangeStart.bind(this);
    this.onChangeEnd           = this.onChangeEnd.bind(this);
    this.submitAptClick        = this.submitAptClick.bind(this);
  }

  onChangeDay(day) {
    const {start, end} = this.state;
    console.log('day', day);
    const newStart = this.getTimeForSelectedDay(start, day);
    const newEnd = this.getTimeForSelectedDay(end, day);
    this.setState({
      end   : newEnd,
      start : newStart,
      day,
    });
    this.checkEnd({
      start : newStart,
      end   : newEnd,
      day,
    });
    this.checkOverlap({
      start : newStart,
      end   : newEnd,
      day,
    });
  }

  getTimeForSelectedDay(time, day) {
    return new Date(Date.parse(day.toDateString() + ' ' + time.toTimeString()));
  }

  onChangeStart(start) {
    const {day, end} = this.state;
    console.log('AppointmentForm::onChangeStart', start);
    const newStart = this.getTimeForSelectedDay(start, day);
    this.setState({
      start : newStart
    });
    this.checkEnd({
      start : newStart,
      end,
      day,
    });
    this.checkOverlap({
      start : newStart,
      end,
      day,
    });
  }

  onChangeEnd(end) {
    const {day, start} = this.state;
    console.log('end', end);
    const newEnd = this.getTimeForSelectedDay(end, day);
    this.setState({
      end : newEnd
    });
    this.checkEnd({
      end : newEnd,
      start,
      day,
    });
    this.checkOverlap({
      end : newEnd,
      start,
      day,
    });
  }

  checkEnd(newApt) {
    if(newApt && newApt.day &&
      newApt.start && newApt.end &&
      newApt.start.getTime() < newApt.end.getTime()) {
      this.setState({
        rangeErr: false
      });
      return;
    }
    this.setState({
      rangeErr: true
    });
  }

  checkOverlap(newApt) {
    const {aptData} = this.state;
    let overlap = false;
    aptData.forEach(apt => {
      // don't bother if we dont have at a minimum the day and a start or end
      if(!newApt.day && (!newApt.start || !newApt.end)) {
        return;
      }
      // if this apt is on the same day as new apt, then check for overlap
      if(newApt.day && newApt.day.toDateString() === apt.day.toDateString()) {
        // if it ends after this apt starts
        if(newApt.start && newApt.start.getTime() >= apt.end.getTime()) {
          // then it is ok
          return;
        }
        // or starts before this apt ends
        if(newApt.end && newApt.end.getTime() <= apt.start.getTime()) {
          // then it is ok
          return;
        }
        overlap = true;
      }
    });
    this.setState({
      overlap
    });
  }

  submitAptClick() {
    const {day, end, start} = this.state;
    this.setState({
      ...(new InitialState()),
      aptData : [
        ...this.state.aptData, {
          day,
          end,
          start
        }
      ]
    });
  }

  render() {
    const {className = ''} = this.props;
    const {
      day,
      end,
      overlap,
      rangeErr,
      start,
    } = this.state;
    return (
      <section className={`appointment-form ${className}`}>
        {overlap &&
          <header className="warning">
            This appointment overlaps with another on your schedule
          </header>
        }
        {rangeErr &&
          <header className="warning">
            Start time must be before End time
          </header>
        }
        <article className="date-entry">
          <header>Pick Appointment Date</header>
          <ReactCalendar
            className="picker"
            value={day}
            onChange={this.onChangeDay}
            showNavigation
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
        <button
          className="save-button"
          onClick={this.submitAptClick}
          disabled={!(day && start && end && !overlap && !rangeErr)}
        >Save Appointment</button>
      </section>
    )
  }
}
