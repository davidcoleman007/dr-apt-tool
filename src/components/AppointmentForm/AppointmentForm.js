import React, { Component } from 'react';
import ReactCalendar from 'react-calendar';
import { TimeInput } from '../TimeInput';

import './AppointmentForm.scss';
import { TodaysAppointments } from '../TodaysAppointments/TodaysAppointments';
import Warnings from './Warnings';

class InitialState extends Object {
  constructor() {
    super();
    this.aptData    = [];
    this.day        = null;
    this.end        = new Date(Date.parse(new Date().toDateString()));
    this.futureErr  = false;
    this.highlight  = [];
    this.overlapErr    = false;
    this.rangeErr   = false;
    this.start      = new Date(Date.parse(new Date().toDateString()));
    this.todaysApts = [];
  }
}

export default class AppointmentForm extends Component {
  constructor(props) {
    super(props);
    this.state                 = new InitialState();
    this.checkOverlap          = this.checkOverlap.bind(this);
    this.checkEnd              = this.checkEnd.bind(this);
    this.checkFuture           = this.checkFuture.bind(this);
    this.getTimeForSelectedDay = this.getTimeForSelectedDay.bind(this);
    this.getTodaysAppointments = this.getTodaysAppointments.bind(this);
    this.onChangeDay           = this.onChangeDay.bind(this);
    this.onChangeStart         = this.onChangeStart.bind(this);
    this.onChangeEnd           = this.onChangeEnd.bind(this);
    this.submitAptClick        = this.submitAptClick.bind(this);
  }

  onChangeDay(day) {
    const {start, end} = this.state;
    const newStart = this.getTimeForSelectedDay(start, day);
    const newEnd = this.getTimeForSelectedDay(end, day);
    const todaysApts = this.getTodaysAppointments(day);
    this.setState({
      end   : newEnd,
      start : newStart,
      todaysApts,
      day,
    });
    const newApt = {
      start : newStart,
      end   : newEnd,
      day,
    };
    this.checkEnd(newApt);
    this.checkFuture(newApt);
    this.checkOverlap(newApt, todaysApts);
  }

  getTodaysAppointments(day) {
    const {aptData} = this.state;
    let tmpDate = new Date();
    const today = new Date(Date.parse(day));
    tmpDate.setHours(0);
    tmpDate.setMinutes(0);
    tmpDate.setSeconds(0);
    tmpDate.setMilliseconds(0);
    const start = new Date(Date.parse(today.toDateString() + ' ' + tmpDate.toTimeString()))
    tmpDate.setHours(23);
    tmpDate.setMinutes(59);
    tmpDate.setSeconds(59);
    tmpDate.setMilliseconds(999);
    const end   = new Date(Date.parse(today.toDateString() + ' ' + tmpDate.toTimeString()));
    const todaysApts = aptData.reduce(
      (prev, cur, i) => {
        if(cur.start.getTime() >= start.getTime() && cur.end.getTime() <= end.getTime()) {
          prev.push(cur);
        }
        return prev;
      }, []
    );
    return todaysApts;
  }

  getTimeForSelectedDay(time, day) {
    return new Date(Date.parse(day.toDateString() + ' ' + time.toTimeString()));
  }

  onChangeStart(start) {
    const {day, end, todaysApts} = this.state;
    const newStart = this.getTimeForSelectedDay(start, day);
    this.setState({
      start : newStart
    });
    const newApt = {
      start : newStart,
      end,
      day,
    };
    this.checkEnd(newApt);
    this.checkFuture(newApt);
    this.checkOverlap(newApt, todaysApts);
  }

  onChangeEnd(end) {
    const {day, start, todaysApts} = this.state;
    const newEnd = this.getTimeForSelectedDay(end, day);
    this.setState({
      end : newEnd
    });
    const newApt = {
      end : newEnd,
      start,
      day,
    };
    this.checkEnd(newApt);
    this.checkFuture(newApt);
    this.checkOverlap(newApt, todaysApts);
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

  checkFuture(newApt) {
    const now = (new Date()).getTime();
    if(newApt && newApt.day && newApt.start &&
      newApt.start.getTime() < now) {
      this.setState({
        futureErr: true
      });
      return;
    }
    this.setState({
      futureErr: false
    });
  }

  checkOverlap(newApt, todaysApts) {
    // const {aptData} = this.state;
    let overlapErr = false;
    let highlight = [];
    todaysApts.forEach((apt, idx) => {
      // don't bother if we dont have at a minimum the day and a start or end
      if(!newApt.day && (!newApt.start || !newApt.end)) {
        return;
      }
      // if this apt is on the same day as new apt, then check for overlap
      if(newApt.day && newApt.day.toDateString() === apt.day.toDateString()) {
        // here goes
        if((
          // if it starts before this apt ends
          (newApt.start && newApt.start.getTime() <= apt.end.getTime()) &&
          // and it ends after this apt ends
          (newApt.start && newApt.end.getTime() >= apt.end.getTime())
        ) || (
          // if it ends after this apt starts
          (newApt.end && newApt.end.getTime() >= apt.start.getTime()) &&
          // and it starts before this apt starts
          (newApt.end && newApt.start.getTime() <= apt.start.getTime())
        )) {
          // then it overlaps
          overlapErr = true;
        }
        // if it starts after this apt ends
        if(newApt.start && newApt.start.getTime() > apt.end.getTime()) {
          // then it is ok
          return;
        }
        // or ends before this apt starts
        if(newApt.end && newApt.end.getTime() < apt.start.getTime()) {
          // then it is ok
          return;
        }
        highlight.push(idx);
        overlapErr = true;
      }
    });
    this.setState({
      highlight,
      overlapErr
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
      futureErr,
      highlight,
      overlapErr,
      rangeErr,
      start,
      todaysApts,
    } = this.state;
    return (
      <section className={`appointment-form ${className}`}>
        <TodaysAppointments
          apts={todaysApts}
          day={day}
          highlight={highlight}
        />
        <Warnings overlapErr={overlapErr} futureErr={futureErr} rangeErr={rangeErr} />
        <article className="date-entry">
          <header><h2>Pick Appointment Date / Time</h2></header>
          <ReactCalendar
            className="picker"
            value={day}
            onChange={this.onChangeDay}
            showNavigation
          />
        </article>
        <article className="time-entry">
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
          disabled={!(day && start && end && !futureErr && !overlapErr && !rangeErr)}
        >Save Appointment</button>
      </section>
    )
  }
}
