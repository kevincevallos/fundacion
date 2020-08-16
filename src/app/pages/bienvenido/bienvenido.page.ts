import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.page.html',
  styleUrls: ['./bienvenido.page.scss'],
})
export class BienvenidoPage implements OnInit {
  user;
  superadmin: boolean;
  constructor(private router: Router, private appComponent: AppComponent) { }

/*   ionViewWillEnter() {
    this.appComponent.checkRoute();
  } */
  ngOnInit() {

    let x = localStorage.getItem('usuarioLogueado');
    this.user = JSON.parse(x);
    for (const key in this.user) {
      if (Object.prototype.hasOwnProperty.call(this.user, key)) {
        const idusuario = this.user[key].idusuario;
        const idperfil = this.user[key].idperfil;
        if (idperfil == 1) {
          this.superadmin = true;
        }
        if (idperfil == 2) {
          this.superadmin = false;
        }
        if (idusuario) {
          let y = JSON.stringify(idusuario);
          localStorage.setItem('idusuario', y);
        }
      }
    }
  }
  formulario() {
    this.router.navigate(['formulario-ingreso']);
  }
  informacion() {
    this.router.navigate(['usuarios']);
  }
  egresos() {
    this.router.navigate(['egreso']);
  }
  estadisticas() {
    this.router.navigate(['estadisticas']);
  }
  administradores() {
    this.router.navigate(['gestion-admin']);
  }
}
