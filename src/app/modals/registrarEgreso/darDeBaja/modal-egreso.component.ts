import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal-egreso.component.html',
  styleUrls: ['./modal-egreso.component.css']
})
export class ModalEgresoComponent implements OnInit {

  datosSalud;
  informe;
  datosUsuario = new Usuario();
  constructor(
    public dialogRef: MatDialogRef<ModalEgresoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
    public datepipe: DatePipe) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.datosUsuario.idusuario = this.data.idusuario;
  }
  cargarInforme($event) {
    var inputFile = (<HTMLInputElement>document.getElementById('filechooser'));
    inputFile = $event.target.files[0];
    let reader = new FileReader();
    reader.onload = ($event: any) => {
      this.informe = $event.target.result;
      //Convertir PDF a Base64;
    }
    reader.readAsDataURL($event.target.files[0]);
  }
  darDeBaja() {
    this.datosUsuario.observaciones = this.data.observaciones;
    this.datosUsuario.informe = this.informe;
    console.log('Usuario Dado De Baja!!', this.datosUsuario);
  }
  close() {
    this.onNoClick();
  }

}
