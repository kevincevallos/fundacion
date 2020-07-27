import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  private datos;
  constructor(private servicio: DataService) { }

  ngOnInit() {
    this.servicio.getUsuarios().then( res => {
      for (let i = 0; i < 1; i++) {
        const e = res[i];
        
      console.log('Resultado= '+e)
      }
      console.log('Imprimiendo..!!')
      this.datos = res[0];
      console.log(this.datos)
      }
    );
  }

}
