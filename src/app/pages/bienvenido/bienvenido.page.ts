import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.page.html',
  styleUrls: ['./bienvenido.page.scss'],
})
export class BienvenidoPage implements OnInit {
  user = 'Luis Gutierrez';
  superadmin: boolean;
  constructor(private router: Router, private appComponent: AppComponent) { }

  ngAfterViewInit() {
    this.appComponent.checkRoute();
  }
  ngOnInit() {
    this.superadmin = false;
    if (this.user == 'Luis Gutierrez') {
      this.superadmin = true;
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
