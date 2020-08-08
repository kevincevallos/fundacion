import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private alertCtrl: AlertController, private router: Router) { }

  ngOnInit() {
  }

  async cerrarSesion() {

    let alert = this.alertCtrl.create({
      header: '¿Estas Seguro de cerrar la sesión?',
      message: 'Se te redigirá a la pantalla de ingreso',
      cssClass: 'egreso-modal',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'cancelButton'
        },
        {
          text: 'Cerrar Sesión',
          handler: () => {
            this.router.navigate(['login']);
          }
        }
      ]
    });
    (await alert).present();
  }
  home() {
    this.router.navigate(['bienvenido']);
  }
}
