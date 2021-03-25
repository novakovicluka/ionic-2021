import { Appointment } from './appointment.model';
import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private dbPath = '/bookings';
  private bookingListRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.bookingListRef = db.list(this.dbPath);
  }

  createBooking(apt: Appointment) {
    return this.bookingListRef.push(apt);
  }

  getAllBookings() {
    return this.bookingListRef;
  }

  updateBooking(key: string, value: any): Promise<void> {
    return this.bookingListRef.update(key, value);
  }

  deleteBooking(key: string): Promise<void> {
    return this.bookingListRef.remove(key);
  }

}
