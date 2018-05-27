# Simple appointment tool

## What it is

This a form that allows patients to request appointments, and keeps track of all
appointments requested in state. The form should request the patient's desired
appointment date , appointment start time , and appointment end time . If an existing
appointment overlaps with that date and time, it shows an error.

## Features:
* the patient can request any number of appointments
* Patient can request an appointment for today, or a future day.
* Patient can request an appointment start and end time.
* Upon form submission, input will be validated such that:
  * Appointments can only happen in the future.
  * No appointments requested should overlap.

## What could be better:

It does not have any external hooks right now for this component to be
conveniently wrapped up in an HOC and receive `aptData` via redux, or
call a callback such as `props.onSubmit` when an appointment is submitted

These would be implemented as a 2nd phase of development. As it stands
it is a perfectly self-contained state driven component, ready to be
wired up to any necessary props required for proper re-use.

If I had more time I would have broken it up into more sub-components.

I don't like that I have some repeated code for the start time and end time.
These sections are clearly a case for a sub-component.

But I've taken most of the afternoon and a good part of the evening on this
so far, and being honest, I should let it stand here.
