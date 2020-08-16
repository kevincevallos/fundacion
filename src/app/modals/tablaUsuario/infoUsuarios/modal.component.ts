import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  datosSalud;
  f1 = new Date();
  fIngreso;
  dia = 24 * 60 * 60 * 1000;
  diasDeGracia = 60;
  constructor(public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario, public datepipe: DatePipe) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.datosSalud = this.data.salud;
    console.log('data_: ',this.data);
    this.fIngreso = new Date(this.data.fechaIngresoFundacion);
    this.f1.getDate();
    var fechaActual = new Date(this.datepipe.transform(this.f1, 'yyyy-MM-dd'));
    var diferencia = Math.round(Math.abs((this.fIngreso.getTime() - fechaActual.getTime()) / (this.dia)))
    this.diasDeGracia = this.diasDeGracia - diferencia;
  }
  close() {
    this.onNoClick();
  }
}
