import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Usuario } from 'src/app/models/usuario.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from "@angular/material/dialog";
import { ModalComponent } from 'src/app/modals/modal.component';

const ELEMENT_DATA: Usuario[] = [];

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  datos;
  cargando: boolean = true;
  displayedColumns = ['id', 'nombre', 'codigo', 'rol', 'email', 'admin'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private servicio: DataService,public dialog: MatDialog) { }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    /*  const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();
    */
    //console.log(event);
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    //this.cargarUsuarios();
    this.llenarTabla();
  }
  cargarUsuarios() {
    this.servicio.getUsuarios().subscribe(res => {
      //console.log('Imprimiendo..!!')
      this.datos = res;
      //console.log(this.datos)
      setTimeout(() => {
        this.cargando = false;
      }, 3000);
    }
    );
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
          ELEMENT_DATA.push(response[i]);
          var x = response[i].codigo_user;
          var y = response[i].id;
          if (x) {
            console.log('x,y_:', x, y)
            //this.disablebutton[y] = true;
          }
        }
        //this.loading = false;
        this.dataSource.data = ELEMENT_DATA;
      });

    setTimeout(() => {
      this.cargando = false;
    }, 3000);
  }
  openDialog(admin, obj) {
    var codigoUsuario: string;
    console.log('openDialog_: ',obj);
    var reader = new FileReader();
    reader.readAsDataURL(obj.foto); 
    reader.onloadend = function() {
        var base64data = reader.result;                
        console.log('Base64_: ',base64data);
    }
    obj.admin = admin;

    const dialogRef = this.dialog.open(ModalComponent, {
      width: '350px',
      data: obj,
    });
  }
  
}
