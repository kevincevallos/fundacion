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
  displayedColumns = ['nombres', 'apellidos', 'identificacion', 'ciudad', 'telefono', 'ver', 'editar', 'informe'];
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
  }
  /*   ionViewWillEnter() {
      this.appComponent.checkRoute();
    } */
  ionViewWillEnter() {
    this.llenarTabla();
    this.editandoUsuario = new InformeIngreso();
  }
  ngOnInit() {
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
    console.log('objeto_: ', obj);
    let alert = this.alertCtrl.create({
      header: '¿Editar datos de ' + obj.nombres + '?',
      message: 'Se te redigirá al formulario de datos',
      cssClass: 'egreso-modal',
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
            var image64;
            for (let i = 0; i < this.editandoUsuario.nuevoUsuario.length; i++) {
              this.editandoUsuario.nuevoUsuario[i].idusuario = obj.idusuario;
              this.editandoUsuario.nuevoUsuario[i].nombres = obj.nombres;
              this.editandoUsuario.nuevoUsuario[i].apellidos = obj.apellidos;
              this.editandoUsuario.nuevoUsuario[i].telefono = obj.telefono;
              this.editandoUsuario.nuevoUsuario[i].telefonoContacto = obj.telefonoContacto;
              this.editandoUsuario.nuevoUsuario[i].tipoIdentificacion = obj.tipoIdentificacion.toString();
              this.editandoUsuario.nuevoUsuario[i].identificacion = obj.identificacion;
              this.editandoUsuario.nuevoUsuario[i].idnacionalidad = obj.idnacionalidad;
              this.editandoUsuario.nuevoUsuario[i].idpais = obj.idpais;
              this.editandoUsuario.nuevoUsuario[i].idciudad = obj.idciudad;
              this.editandoUsuario.nuevoUsuario[i].idlugarIngreso = obj.idlugarIngreso;
              this.editandoUsuario.nuevoUsuario[i].situacionMigratoria = obj.situacionMigratoria;
              this.editandoUsuario.nuevoUsuario[i].nivelInstruccion = obj.nivelInstruccion;
              this.editandoUsuario.nuevoUsuario[i].oficio = obj.oficio;
              this.editandoUsuario.nuevoUsuario[i].habilidades = obj.habilidades;
              this.editandoUsuario.nuevoUsuario[i].profesion = obj.profesion;
              this.editandoUsuario.nuevoUsuario[i].provincia = obj.provincia;
              this.editandoUsuario.nuevoUsuario[i].observacionIngreso = obj.observacionIngreso;
              this.editandoUsuario.nuevoUsuario[i].situacionMigratoria = obj.situacionMigratoria;
              //image64 = new String(obj.foto);
              //console.log('image_: ', image64);
              //var base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(image64)));
              this.editandoUsuario.nuevoUsuario[i].foto = 'data:image/png;base64,'+obj.foto;
              //console.log('base64String', this.editandoUsuario.nuevoUsuario[i].foto);
              var genero = obj.idgenero.idgenero;
              this.editandoUsuario.nuevoUsuario[i].idgenero = genero.toString();
              var fIngresoFun = new Date(obj.fechaIngresoFundacion);
              this.editandoUsuario.nuevoUsuario[i].fechaIngresoFundacion = fIngresoFun;
              var fIngresoEcu = new Date(obj.fechaIngresoEcuador);
              this.editandoUsuario.nuevoUsuario[i].fechaIngresoEcuador = fIngresoEcu;
              var fNac = new Date(obj.fechaNacimiento);
              this.editandoUsuario.nuevoUsuario[i].fechaNacimiento = fNac;
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
