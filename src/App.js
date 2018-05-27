import React, { Component } from 'react';

import AppointmentForm from './components/AppointmentForm/AppointmentForm';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <section>
          <AppointmentForm/>
        </section>
      </div>
    );
  }
}

export default App;
