import { Appointment } from './../shared/appointment.model';
import { AppointmentType } from './../shared/appointment-type.enum';
import { AppointmentService } from './../shared/appointment.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.page.html',
  styleUrls: ['./create-appointment.page.scss'],
})
export class CreateAppointmentPage implements OnInit {
  bookingForm: FormGroup;
  appType = AppointmentType;
  isAddMode = true;
  bookingForEditing: Appointment;

  constructor(public fb: FormBuilder, private aptService: AppointmentService,
              private router: Router, public alertController: AlertController,
              public toastController: ToastController) { }

  ngOnInit() {
    this.bookingForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      date: new FormControl('' , Validators.required),
      type: new FormControl('', Validators.required),
      contact: new FormControl('', [Validators.required, Validators.minLength(4)]),
      patientId: new FormControl('', [Validators.required, Validators.minLength(4)])
    });

    if (history.state.booking){
      this.isAddMode = false;
      this.bookingForEditing = history.state.booking;
      this.bookingForm.patchValue(this.bookingForEditing);
    }

  }

  formSubmit() {
    if (this.bookingForm.invalid) {
      // Touching all fields triggers the display of error messages
      this.bookingForm.markAllAsTouched();
      this.presentAlert();
      return;
    }

    if (this.isAddMode) {
      this.aptService.createBooking(this.bookingForm.value).then(() => {
        this.bookingForm.reset();
        this.presentToast('Uspešno kreiran pregled.');
        this.router.navigate(['/home']);
      }).catch(error => console.log(error));
    } else {
      this.aptService.updateBooking(this.bookingForEditing.id, this.bookingForm.value).then(() => {
        this.bookingForm.reset();
        this.presentToast('Uspešno izmenjen pregled.');
        this.router.navigate(['/home']);
      }).catch(error => console.log(error));
    }

  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      color: 'primary',
    });
    toast.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Greška',
      message: 'Niste popunili ispravno polja.',
      buttons: ['OK']
    });

    await alert.present();
  }


  get name() { return this.bookingForm.get('name'); }
  get date() { return this.bookingForm.get('date'); }
  get type() { return this.bookingForm.get('type'); }
  get contact() { return this.bookingForm.get('contact'); }
  get patientId() { return this.bookingForm.get('patientId'); }


}
