import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NuevoUsuario } from 'src/app/models/nuevoUsuario.model';
import { Salud } from 'src/app/models/salud.model';
import { InformeIngreso } from 'src/app/models/informeIngreso.model';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-formulario-ingreso',
  templateUrl: './formulario-ingreso.page.html',
  styleUrls: ['./formulario-ingreso.page.scss'],
})
export class FormularioIngresoPage implements OnInit {
  count: number;
  editandoUsuario: NuevoUsuario;
  editando: boolean;
  removerF: boolean;
  registroForm: FormGroup;
  nuevoInforme;
  img_new;
  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    private appComponent: AppComponent) { }
  ionViewWillLeave() {
    if (this.editandoUsuario) {
      this.cancelarEdicion();
    }
  }
  ngAfterViewInit() {
    this.appComponent.checkRoute();
  }
  ngOnInit() {
    this.count = 0;
    this.nuevoInforme = new InformeIngreso();
    var x = localStorage.getItem('editarUsuario');
    this.editandoUsuario = JSON.parse(x);
    if (this.editandoUsuario) {
      this.editando = true;
      console.log('editandoUsuario_: ', this.editandoUsuario);
      this.nuevoInforme = this.editandoUsuario;
    } else {
      this.editando = false;
    }
  }
  registrarUsuario() {
    console.log('RegistrarUsuario!!', this.nuevoInforme);
    var x = JSON.stringify(this.nuevoInforme);
    localStorage.setItem('Registrando', x);
  }
  agregarFamiliar() {
    this.count = this.count + 1;
    this.removerF = true;
    this.nuevoInforme.nuevoUsuario.push(new NuevoUsuario());
  }
  removerFamiliar() {
    this.confirmarRemoverF();
  }
  agregarCondicionMedica(obj, index) {
    this.nuevoInforme.nuevoUsuario[index].salud.push({
      estadoDiscapacidad: 1
    });
  }
  removerCondicionMedica(obj, index) {
    this.confirmarRemoverCM(obj, index);
  }
  previsualizarFoto($event, index): void {
    var foto;
    var inputFile = (<HTMLInputElement>document.getElementById('filechooser'));
    inputFile = $event.target.files[0];
    let reader = new FileReader();
    reader.onload = ($event: any) => {
      for (let i = 0; i < this.nuevoInforme.nuevoUsuario.length; i++) {
        if (i == index) {
          this.img_new = $event.target.result;
          this.nuevoInforme.nuevoUsuario[i].foto = this.img_new;
        }
      }
    }
    reader.readAsDataURL($event.target.files[0]);
  }
  previsualizarCertificado($event, index, ind): void {
    var foto;
    var inputFile = (<HTMLInputElement>document.getElementById('filechooser'));
    inputFile = $event.target.files[0];
    let reader = new FileReader();
    reader.onload = ($event: any) => {
      for (let i = 0; i < this.nuevoInforme.nuevoUsuario.length; i++) {
        for (let s = 0; s < this.nuevoInforme.nuevoUsuario[i].salud.length; s++) {
          if (i == index && s == ind) {
            this.img_new = $event.target.result;
            this.nuevoInforme.nuevoUsuario[i].salud[s].foto = this.img_new;
          }
        }
      }
    }
    reader.readAsDataURL($event.target.files[0]);
  }
  async cancelarEdicion() {

    let alert = this.alertCtrl.create({
      header: 'Cancelar edición?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.router.navigate(['formulario-ingreso']);
          }
        },
        {
          text: 'Si',
          handler: () => {
            localStorage.removeItem('editarUsuario');
          }
        }
      ]
    });
    (await alert).present();
  }
  async confirmarRemoverCM(obj, index) {
    let alert = this.alertCtrl.create({
      header: '¿Remover condición médica: ' + obj.condicionMedica + '?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          /* handler: () => {
            this.router.navigate(['formulario-ingreso']);
          } */
        },
        {
          text: 'Si',
          handler: () => {
            this.nuevoInforme.nuevoUsuario[index].salud.pop();
          }
        }
      ]
    });
    (await alert).present();
  }
  async confirmarRemoverF() {
    let alert = this.alertCtrl.create({
      header: '¿Remover el último Familiar?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          /* handler: () => {
            this.router.navigate(['formulario-ingreso']);
          } */
        },
        {
          text: 'Si',
          handler: () => {
            this.nuevoInforme.nuevoUsuario.pop();
            this.count = this.count - 1;
            if (this.count == 0) {
              this.removerF = false;
            }
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
