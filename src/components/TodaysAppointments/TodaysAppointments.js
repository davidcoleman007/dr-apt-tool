import React from 'react';

import './TodaysAppointments.scss';

export const TodaysAppointments = (props) => {
  const {apts, day, highlight} = props;
  return (
    <article className="todays-appointments">
      <header>
        <h2>Today's Appointments:</h2>
        <h3>
          {day && day.toDateString()}
          {!day && <span>Select A Day Below</span>}
        </h3>
      </header>
      {((!apts || !apts.length) && (
        <summary>none</summary>
      )) || null}
      {((apts && apts.length) && (
        <ul className="appointments-list">
          {apts.map(
            (apt, idx) => {
              const {start, end} = apt;
              // not so efficient but length will never be that big
              const highlightClass = (highlight.indexOf(idx) !== -1)?'highlight':'';
              const itemClassName = `appointment-item ${highlightClass}`;
              return (
                <li className={itemClassName}>
                  {start.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                  })}
                  &nbsp;to&nbsp;
                  {end.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                  })}
                </li>
              );
            }
          )}
        </ul>
      )) || null}
    </article>
  );
};
