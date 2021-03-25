import { NavigationExtras, Router } from '@angular/router';
import { AppointmentService } from './../shared/appointment.service';
import { Appointment } from './../shared/appointment.model';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  bookings: Appointment[];
  selectedBooking: Appointment;

  constructor(public actionSheetCtrl: ActionSheetController,
              private aptService: AppointmentService,
              private router: Router,
              public toastController: ToastController) {

  }

  private onDeleteSelected(){
    this.aptService.deleteBooking(this.selectedBooking.id).then(
      () => this.presentToast('Uspešno obrisan pregled'));
  }

  private onEditSelected(){
    const navigationExtras: NavigationExtras = {
      state: {
        booking: this.selectedBooking
      }
    };

    this.router.navigate(['/create-appointment'], navigationExtras);
  }

  private onViewSelected(){
    const navigationExtras: NavigationExtras = {
      state: {
        booking: this.selectedBooking
      }
    };

    this.router.navigate(['/view-appointment'], navigationExtras);
  }

  ngOnInit(){
    this.aptService.getAllBookings().snapshotChanges().subscribe(response => {
      this.bookings = [];
      response.forEach(item => {
        const newAppointment = item.payload.toJSON() as Appointment;
        newAppointment.id = item.key;
        this.bookings.push(newAppointment);
      });
    });
  }

  async presentActionSheet(){
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Odaberite akciju',
      buttons: [
        {
          text: 'Obrisi',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            console.log('the delete button occured');
            this.onDeleteSelected();
          }
        },
        {
          text: 'Izmeni',
          icon: 'create',
          handler: () => {
            console.log('the edit button occured');
            this.onEditSelected();
          }
        },
        {
          text: 'Pregledaj',
          icon: 'book',
          handler: () => {
            console.log('the view button occured');
            this.onViewSelected();
          }
        },
        {
          text: 'Otkazi',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('the close button occured');
          }
        }
      ],
      cssClass: 'custom-css',
      animated: true,
      backdropDismiss: true,
      keyboardClose: false,
      mode: 'ios'
    });

    actionSheet.present();
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      color: 'primary',
    });
    toast.present();
  }


}
