import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxElectronModule } from 'ngx-electron';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { ModalComponent } from './modals/tablaUsuario/infoUsuarios/modal.component';
import { ModalInformeComponent } from './modals/tablaUsuario/subirInforme/modal-informe.component';
import { ModalEgresoComponent } from './modals/registrarEgreso/darDeBaja/modal-egreso.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, ModalComponent, ModalInformeComponent, ModalEgresoComponent],
  entryComponents: [ModalComponent, ModalInformeComponent, ModalEgresoComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule, NgxElectronModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DatePipe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
