import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public selectedIndex = 0;
  navigate =
  [
    {
      title: "Bienvenido",
      url: "/bienvenido",
      icon: "home"
    },
    {
      title: "Formulario de Ingreso",
      url: "/formulario-ingreso",
      icon: "person-add"
    },
    {
      title: "Tabla de Datos",
      url: "/usuarios",
      icon: "people"
    },
    {
      title: "Registrar Egreso",
      url: "/egreso",
      icon: "exit"
    },
    {
      title: "Estadísticas",
      url: "/estadisticas",
      icon: "analytics"
    },
    {
      title: "Cerrar Sesión",
      url: "/logout",
      icon: "close"
    }
  ];
selectedPath = '';
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.checkRoute();
      //this.statusBar.styleDefault();
      //this.splashScreen.hide();
    });
  }
  
  checkRoute() {
    const path = window.location.pathname.split('/')[1];
    //console.log(path);
    if (path !== undefined) {
      //this.selectedIndex = this.navigate.findIndex(page => {
      if (path.includes('bienvenido')) {
        return this.selectedIndex = 0;
      }
      if (path.includes('formulario-ingreso')) {
        return this.selectedIndex = 1;
      }
      if (path.includes('usuarios')) {
        return this.selectedIndex = 2;
      }
      if (path.includes('egreso')) {
        return this.selectedIndex = 3;
      }
      if (path.includes('estadisticas')) {
        return this.selectedIndex = 4;
      }
      if (path.includes('logout')) {
        return this.selectedIndex = 5;
      }
      //page.title.toLowerCase() === path.toLowerCase();

      //});
      this.selectedIndex = 0;
      //console.log(this.selectedIndex)
    }
  }
}
