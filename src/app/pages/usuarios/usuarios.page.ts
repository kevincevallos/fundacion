import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Usuario } from 'src/app/models/usuario.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from "@angular/material/dialog";
import { ModalComponent } from 'src/app/modals/tablaUsuario/infoUsuarios/modal.component';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalInformeComponent } from 'src/app/modals/tablaUsuario/subirInforme/modal-informe.component';
import { NuevoUsuario } from 'src/app/models/nuevoUsuario.model';
import { InformeIngreso } from 'src/app/models/informeIngreso.model';
import { AppComponent } from 'src/app/app.component';

const ELEMENT_DATA: Usuario[] = [];

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  editandoUsuario;
  datosSalud;
  cargando: boolean = true;
  displayedColumns = ['id', 'nombres', 'apellidos', 'identificacion', 'ciudad', 'ver', 'editar', 'informe'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private servicio: DataService,
    public dialog: MatDialog,
    private alertCtrl: AlertController,
    private router: Router,
    private appComponent: AppComponent) { }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.appComponent.checkRoute();
  }
  ngOnInit() {
    this.llenarTabla();
    this.editandoUsuario = new InformeIngreso();
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  llenarTabla() {
    const ELEMENT_DATA: Usuario[] = [];
    //Llenar tabla de usuarios
    //console.log('LLENAR_TABLA()');
    this.servicio.getUsuarios().subscribe(response => {
      var n: number = 0, key;
      //console.log('esto es n_: ',n)
      for (key in response) {
        if (response.hasOwnProperty(key))
          n++;
      }
      for (let i = 0; i <= n - 1; i++) {
        var ciud = response[i].idciudad.ciudad;
        response[i].ciudad = ciud;
        ELEMENT_DATA.push(response[i]);
      }
      //this.loading = false;
      this.dataSource.data = ELEMENT_DATA;
    });
    setTimeout(() => {
      this.cargando = false;
    }, 3000);
  }
  verInfo(obj) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '350px',
      data: obj,
      panelClass: 'modals'
    });
  }
  subirInforme(obj) {
    const dialogRef = this.dialog.open(ModalInformeComponent, {
      width: '400px',
      data: obj,
      panelClass: 'modals'
    });
  }
  async confirmarEdicion(obj) {

    let alert = this.alertCtrl.create({
      header: '¿Editar datos de ' + obj.nombres + '?',
      message: 'Se te redigirá al formulario de datos',
      cssClass:'egreso-modal',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'cancelButton'
        },
        {
          text: 'Si, Editar',
          handler: () => {
            //this.editandoUsuario.nuevoUsuario.push(obj);
            this.editandoUsuario.nuevoUsuario[0].salud = [];
            for (let i = 0; i < this.editandoUsuario.nuevoUsuario.length; i++) {
              this.editandoUsuario.nuevoUsuario[i].idusuario = obj.idusuario;
              this.editandoUsuario.nuevoUsuario[i].nombres = obj.nombres;
              this.editandoUsuario.nuevoUsuario[i].apellidos = obj.apellidos;
              this.editandoUsuario.nuevoUsuario[i].identificacion = obj.identificacion;
              var genero = obj.idgenero.idgenero;
              this.editandoUsuario.nuevoUsuario[i].idGenero = genero.toString();
              var fIngreso = new Date(obj.fechaIngresoFundacion);
              this.editandoUsuario.nuevoUsuario[i].fechaIngresoFundacion = fIngreso;
              this.editandoUsuario.nuevoUsuario[i].idCiudad = obj.idciudad.idciudad;
            }
            for (let s = 0; s < obj.salud.length; s++) {
              this.editandoUsuario.nuevoUsuario[0].salud.push(obj.salud[s]);
            }
            var x = JSON.stringify(this.editandoUsuario);
            localStorage.setItem('editarUsuario', x);
            this.router.navigate(['formulario-ingreso']);
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
