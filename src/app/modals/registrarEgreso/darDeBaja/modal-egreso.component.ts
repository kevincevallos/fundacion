import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-modal',
  templateUrl: './modal-egreso.component.html',
  styleUrls: ['./modal-egreso.component.css']
})
export class ModalEgresoComponent implements OnInit {
  objeto = {
    idUsuario:0,
    observacion:'',
    documento:'',
    estado:true
  }
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
    console.log('Usuario Dado De Baja!!', this.objeto);
    this.successAlert();
    this.close();
  }
  close() {
    this.onNoClick();
  }
  successAlert() {
    Swal.fire({
      icon: 'success',
      title: '¡Listo!',
      text: 'Egreso de Albergado Exitoso',
      showConfirmButton: false,
      timer: 3500
    })
  }
}
