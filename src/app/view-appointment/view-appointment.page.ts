import { AppointmentType } from './../shared/appointment-type.enum';
import { Router } from '@angular/router';
import { Appointment } from './../shared/appointment.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.page.html',
  styleUrls: ['./view-appointment.page.scss'],
})

export class ViewAppointmentPage implements OnInit {
  appointment: Appointment;
  appType = AppointmentType;

  constructor(private router: Router) {
    this.appointment = history.state.booking;
   }

  ngOnInit() {
    this.appointment = history.state.booking;
  }

  getImage() {
    return `../../assets/images/${this.appointment.type}.png`;
  }

}
