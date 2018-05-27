import React from 'react';

const Warnings = props => {
  const {
    futureErr,
    overlapErr,
    rangeErr
  } = props;
  return (
    <React.Fragment>
      {overlapErr &&
        <header className="warning">
        This appointment overlaps with another on your schedule
        </header>
      }
      {futureErr &&
        <header className="warning">
        Appointments must be in the future
        </header>
      }
      {rangeErr &&
        <header className="warning">
        Start time must be before End time
        </header>
      }
    </React.Fragment>
  );
}

export default Warnings;