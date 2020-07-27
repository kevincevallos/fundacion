import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  datos;
  cargando:boolean = true;
  constructor(private servicio: DataService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.cargarUsuarios();
  }


  cargarUsuarios() {
    this.servicio.getUsuarios().then(res => {
      //console.log('Imprimiendo..!!')
      this.datos = res;
      //console.log(this.datos)
      setTimeout(() => {
        this.cargando = false;
      }, 3000);
    }
    );
  }

}
