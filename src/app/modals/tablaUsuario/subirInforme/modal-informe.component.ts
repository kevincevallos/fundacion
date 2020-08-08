import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal-informe.component.html',
  styleUrls: ['./modal-informe.component.css']
})
export class ModalInformeComponent implements OnInit {

  datosSalud;
  informe;
  f1 = new Date();
  fIngreso;
  dia = 24 * 60 * 60 * 1000;
  diasDeGracia = 60;
  constructor(public dialogRef: MatDialogRef<ModalInformeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario, public datepipe: DatePipe) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.datosSalud = this.data.salud;
    this.fIngreso = new Date(this.data.fechaIngresoFundacion);
    this.f1.getDate();
    var fechaActual = new Date(this.datepipe.transform(this.f1, 'yyyy-MM-dd'));
    var diferencia = Math.round(Math.abs((this.fIngreso.getTime() - fechaActual.getTime()) / (this.dia)))
    this.diasDeGracia = this.diasDeGracia - diferencia;
  }
  cargarInforme($event) {
    console.log('Cargando Informe...', $event);
    var inputFile = (<HTMLInputElement>document.getElementById('filechooser'));
    inputFile = $event.target.files[0];
    let reader = new FileReader();
    reader.onload = ($event: any) => {
      this.informe = $event.target.result;
      //Convertir PDF a Base64;
      console.log('INFORME_: ', this.informe);
    }
    reader.readAsDataURL($event.target.files[0]);
  }
  subirInforme($event): void {
    console.log('Informe Subido!!', $event);
  }
  close() {
    this.onNoClick();
  }
}
