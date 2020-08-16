import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Usuario } from 'src/app/models/usuario.model';
import { DataService } from 'src/app/services/data.service';
import { ModalEgresoComponent } from 'src/app/modals/registrarEgreso/darDeBaja/modal-egreso.component';
import { MatDialog } from '@angular/material/dialog';
const ELEMENT_DATA: Usuario[] = [];

@Component({
  selector: 'app-egreso',
  templateUrl: './egreso.page.html',
  styleUrls: ['./egreso.page.scss'],
})
export class EgresoPage implements OnInit {
  cargando: boolean = true;
  displayedColumns = ['id', 'nombres', 'apellidos', 'identificacion', 'ciudad', 'darDeBaja'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private appComponent: AppComponent,
    private router: Router,
    private servicio: DataService,
    private dialog: MatDialog,) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
/*   ionViewWillEnter() {
    this.appComponent.checkRoute();
  } */
  ngOnInit() {
    this.llenarTabla();
  }
  home() {
    this.router.navigate(['bienvenido']);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  llenarTabla() {
    const ELEMENT_DATA: Usuario[] = [];
    this.servicio.getUsuarios().subscribe(response => {
      var n: number = 0, key;
      for (key in response) {
        if (response.hasOwnProperty(key))
          n++;
      }
      for (let i = 0; i <= n - 1; i++) {
        var ciud = response[i].idciudad.ciudad;
        response[i].ciudad = ciud;
        ELEMENT_DATA.push(response[i]);
      }
      this.dataSource.data = ELEMENT_DATA;
    });
    setTimeout(() => {
      this.cargando = false;
    }, 3000);
  }
  darDeBaja(obj) {
    const dialogRef = this.dialog.open(ModalEgresoComponent, {
      width: '400px',
      data: obj,
      panelClass: 'modals'
    });
  }
}
