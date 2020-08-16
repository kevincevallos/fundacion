import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-admin',
  templateUrl: './gestion-admin.page.html',
  styleUrls: ['./gestion-admin.page.scss'],
})
export class GestionAdminPage implements OnInit {

  constructor(private appComponent: AppComponent,private router: Router) { }

  /* ionViewWillEnter() {
    this.appComponent.checkRoute();
  } */
  ngOnInit() {
  }
  home() {
    this.router.navigate(['bienvenido']);
  }
}
