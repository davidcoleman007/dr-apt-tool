import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AppointmentForm from './components/AppointmentForm/AppointmentForm';

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
