import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NuevoUsuario } from 'src/app/models/nuevoUsuario.model';
import { InformeIngreso } from 'src/app/models/informeIngreso.model';
import { AlertController, ToastController, IonContent } from '@ionic/angular';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { HttpClient } from '@angular/common/http';
pdfMake.vfs = pdfFonts.pdfMake.vfs

@Component({
  selector: 'app-formulario-ingreso',
  templateUrl: './formulario-ingreso.page.html',
  styleUrls: ['./formulario-ingreso.page.scss'],
})
export class FormularioIngresoPage implements OnInit {
  count: number;
  editandoUsuario: NuevoUsuario;
  editando: boolean;
  removerF: boolean;
  registroForm: FormGroup;
  nuevoInforme;
  img_new;
  listaNacionalidades;
  listaCiudades;
  listaPaises;
  listaParentescos;
  listaLugarIngreso;
  listaSituacionMigratoria = [
    { tipo: 'Refugiado' },
    { tipo: 'Solicitante' },
    { tipo: 'Irregular' },
    { tipo: 'Otra Visa' }
  ];
  listaCondicionMedica = [
    { condicion: 'Gripe' },
    { condicion: 'Fiebre' },
    { condicion: 'Tos' },
    { condicion: 'Discapacidad Visual 10%' }
  ];
  keywordNacionalidad: string = 'gentilicio';
  keywordCiudad = "ciudad";
  keywordPais = "pais";
  keywordLugarIngreso = "nombre";
  keywordSituacionMigratoria = "tipo";
  keywordCondicionMedica = "condicion";
  keywordParentesco = "parentesco";
  pasivos;
  activos;
  existeActivo: boolean;
  existePasivo: boolean;
  cargando: boolean;
  esRefugiado: boolean;
  logoFnj;
  logoSap;
  idRegistrador: number;
  estadoDiscapacidad = [
    { id: 1, estado: 'Discapacidad' },
    { id: 2, estado: 'Enfermedad' },
    { id: 3, estado: 'Embarazada' },
    { id: 4, estado: 'Lactancia' }
  ]
  @ViewChild(IonContent) ionContent: IonContent;
  @ViewChild('nacionalidad') nac;
  @ViewChild('ciudad') ciu;
  @ViewChild('pais') pais;
  @ViewChild('lugarIngreso') lugIng;
  @ViewChild('situacionMigratoria') sitMig;
  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    private appComponent: AppComponent,
    private servicio: DataService,
    private toastCtrl: ToastController,
    private http: HttpClient) {
  }
  ionViewWillLeave() {
    if (this.editando) {
      this.cancelarEdicion();
    }
  }
  ionViewWillEnter() {
    this.ionContent.scrollToTop();
    this.logos();
    var reg = localStorage.getItem('idusuario');
    this.idRegistrador = JSON.parse(reg);
    this.ciudades();
    this.paises();
    this.parentescos();
    this.lugaresIngreso();
    this.nacionalidades();
    this.usuariosActivos();
    var x = localStorage.getItem('editarUsuario');
    this.editandoUsuario = JSON.parse(x);
    if (this.editandoUsuario) {
      this.editando = true;
      this.nuevoInforme = this.editandoUsuario;
      console.log('editandoUsuario_: ', this.editandoUsuario);
    } else {
      this.count = 0;
      this.removerF = false;
      this.nuevoInforme = new InformeIngreso();
      this.editando = false;
    }
  }
  ionViewDidEnter() {
    if (this.editando) {
      this.nac.searchInput.nativeElement.value = this.editandoUsuario.nuevoUsuario[0].idnacionalidad.gentilicio;
      this.ciu.searchInput.nativeElement.value = this.editandoUsuario.nuevoUsuario[0].idciudad.ciudad;
      this.pais.searchInput.nativeElement.value = this.editandoUsuario.nuevoUsuario[0].idpais.pais;
      this.lugIng.searchInput.nativeElement.value = this.editandoUsuario.nuevoUsuario[0].idlugarIngreso.nombre;
      this.sitMig.searchInput.nativeElement.value = this.editandoUsuario.nuevoUsuario[0].situacionMigratoria;
    }
  }
  ngOnInit() {
    this.existeActivo = false;
    this.existePasivo = false;
    this.count = 0;
    this.nuevoInforme = new InformeIngreso();

  }
  logos() {
    this.http.get('./assets/imagenesFundacion/fnjLogo1.jpg', { responseType: 'blob' })
      .subscribe(res => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.logoFnj = reader.result;
          //console.log('fnjLogo_: ',this.logoFnj);
        }
        reader.readAsDataURL(res);
      })
    this.http.get('./assets/imagenesFundacion/sapLogo.jpeg', { responseType: 'blob' })
      .subscribe(res => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.logoSap = reader.result;
          //console.log('sapLogo_: ',this.logoSap);
        }
        reader.readAsDataURL(res);
      })
  }
  comprobarCedulaExistente($event) {
    let c = $event.target.value;
    this.existeActivo = false;
    for (let i = 0; i < this.activos.length; i++) {
      const identificacion = this.activos[i].identificacion;
      if (c == identificacion) {
        this.existeActivo = true;
        console.log('ExisteActivo');
      }
    }
    /* for (let i = 0; i < this.pasivos.length; i++) {
      const identificacion = this.pasivos[i].identificacion;
      if (c == identificacion) {
        this.existePasivo = true;
      }
      else {
        this.existePasivo = false;
      }
    } */
  }
  activarPasivo(identificacion) {
    this.confirmarActivacion(identificacion);
  }
  selectNacionalidad(item, index) {
    //console.log(item);
    let idnacionalidad = item.idnacionalidad;
    for (const key in this.nuevoInforme) {
      if (Object.prototype.hasOwnProperty.call(this.nuevoInforme, key)) {
        const element = this.nuevoInforme[key];
        for (let i = 0; i < element.length; i++) {
          const e = element[i];
          if (i == index) {
            element[i].idnacionalidad = idnacionalidad;
          }
        }
      }
    }
  }
  selectCiudad(item, index) {
    let ciudad = item.ciudad;
    console.log(item);
    for (const key in this.nuevoInforme) {
      if (Object.prototype.hasOwnProperty.call(this.nuevoInforme, key)) {
        const element = this.nuevoInforme[key];
        for (let i = 0; i < element.length; i++) {
          const e = element[i];
          if (i == index) {
            element[i].idciudad = ciudad;
            console.log('e_: ', e);
          }
        }
      }
    }
  }
  selectFechaIngresoFundacion(item, index) {
    let fechaIngresoFundacion = item;
    //console.log(item, index);
    for (const key in this.nuevoInforme) {
      if (Object.prototype.hasOwnProperty.call(this.nuevoInforme, key)) {
        const element = this.nuevoInforme[key];
        for (let i = 0; i < element.length; i++) {
          const e = element[i];
          if (i == index) {
            element[i].fechaIngresoFundacion = fechaIngresoFundacion;
            //console.log('e_: ', e);
          }
        }
      }
    }
  }
  selectFechaIngresoEcuador(item, index) {
    let fechaIngresoEcuador = item;
    //console.log(item, index);
    for (const key in this.nuevoInforme) {
      if (Object.prototype.hasOwnProperty.call(this.nuevoInforme, key)) {
        const element = this.nuevoInforme[key];
        for (let i = 0; i < element.length; i++) {
          const e = element[i];
          if (i == index) {
            element[i].fechaIngresoEcuador = fechaIngresoEcuador;
            //console.log('e_: ', e);
          }
        }
      }
    }

  }
  selectFechaNacimiento(item, index) {
    let fechaNacimiento = item;
    var fNacimiento = new Date(fechaNacimiento).getTime();
    var fHoy = new Date().getTime();
    var diferencia = fHoy - fNacimiento;
    var edad = diferencia / (1000 * 60 * 60 * 24);
    edad = Math.floor(edad / 365);
    console.log(edad);
    for (const key in this.nuevoInforme) {
      if (Object.prototype.hasOwnProperty.call(this.nuevoInforme, key)) {
        const element = this.nuevoInforme[key];
        for (let i = 0; i < element.length; i++) {
          const e = element[i];
          if (i == index) {
            element[i].fechaNacimiento = fechaNacimiento;
            element[i].edad = edad;
            //console.log('e_: ', e);
          }
        }
      }
    }
  }
  selectPais(item, index) {
    let idpais = item.idpais;
    for (const key in this.nuevoInforme) {
      if (Object.prototype.hasOwnProperty.call(this.nuevoInforme, key)) {
        const element = this.nuevoInforme[key];
        for (let i = 0; i < element.length; i++) {
          const e = element[i];
          if (i == index) {
            element[i].idpais = idpais;
          }
        }
      }
    }
  }
  selectLugarIngreso(item, index) {
    console.log(item);
    let idlugarIngreso = item.nombre;
    console.log(item)
    for (const key in this.nuevoInforme) {
      if (Object.prototype.hasOwnProperty.call(this.nuevoInforme, key)) {
        const element = this.nuevoInforme[key];
        for (let i = 0; i < element.length; i++) {
          const e = element[i];
          if (i == index) {
            element[i].idlugarIngreso = idlugarIngreso;
            console.log('e_: ', e);
          }
        }
      }
    }
  }
  agregarNuevoLugarIngreso($event, index) {
    //console.log('event_: ',$event.target.value);
    let lugarIngreso = $event.target.value;
    console.log(lugarIngreso)
    for (const key in this.nuevoInforme) {
      if (Object.prototype.hasOwnProperty.call(this.nuevoInforme, key)) {
        const element = this.nuevoInforme[key];
        for (let i = 0; i < element.length; i++) {
          const e = element[i];
          if (i == index) {
            element[i].idlugarIngreso = lugarIngreso;
          }
        }
      }
    }
  }
  agregarNuevaCiudad($event, index) {
    let ciudad = $event.target.value;
    for (const key in this.nuevoInforme) {
      if (Object.prototype.hasOwnProperty.call(this.nuevoInforme, key)) {
        const element = this.nuevoInforme[key];
        for (let i = 0; i < element.length; i++) {
          const e = element[i];
          if (i == index) {
            element[i].idciudad = ciudad;
            //console.log('e_: ', e);
          }
        }
      }
    }
  }
  selectParentesco(item, index) {
    let idParentesco = item.idparentescoFamiliar;
    console.log(item)
    for (const key in this.nuevoInforme) {
      if (Object.prototype.hasOwnProperty.call(this.nuevoInforme, key)) {
        const element = this.nuevoInforme[key];
        for (let i = 0; i < element.length; i++) {
          const e = element[i];
          if (i == index) {
            element[i].idParentesco = idParentesco;
          }
        }
      }
    }
  }
  selectSituacionMigratoria(item, index) {
    this.esRefugiado = false;
    let idsituacionMigratoria = item.tipo;
    var refugiado = idsituacionMigratoria.includes('Refugiado');
    if (refugiado) {
      this.esRefugiado = true;
      this.notificarRefugiado();
      this.nuevoInforme.nuevoUsuario[index].foto = null;
      //console.log(this.nuevoInforme);
    }
    for (const key in this.nuevoInforme) {
      if (Object.prototype.hasOwnProperty.call(this.nuevoInforme, key)) {
        const element = this.nuevoInforme[key];
        for (let i = 0; i < element.length; i++) {
          const e = element[i];
          if (i == index) {
            element[i].situacionMigratoria = idsituacionMigratoria;
          }
        }
      }
    }
  }
  selectCondicionMedica(item, index, ind) {
    var condicionMedica = item.condicion;
    for (let i = 0; i < this.nuevoInforme.nuevoUsuario.length; i++) {
      for (let s = 0; s < this.nuevoInforme.nuevoUsuario[i].salud.length; s++) {
        if (i == index && s == ind) {
          this.nuevoInforme.nuevoUsuario[i].salud[s].condicionMedica = condicionMedica;
        }
      }
    }
    console.log(this.nuevoInforme);
  }
  usuariosActivos() {
    this.activos = [];
    this.servicio.getUsuarios().subscribe((usuarios) => {
      this.activos = usuarios;
    })
  }
  nacionalidades() {
    this.servicio.getNacionalidades()
      .subscribe((nacionalidades) => {
        this.listaNacionalidades = nacionalidades;
      });
  }
  ciudades() {
    this.servicio.getCiudades()
      .subscribe((ciudades) => {
        this.listaCiudades = ciudades;
      });
  }
  paises() {
    this.servicio.getPaises()
      .subscribe((paises) => {
        this.listaPaises = paises;
      });
  }
  parentescos() {
    this.servicio.getParentescos()
      .subscribe((parentescos) => {
        this.listaParentescos = parentescos;
      });
  }
  lugaresIngreso() {
    this.servicio.getLugaresIngreso()
      .subscribe((lugares) => {
        this.listaLugarIngreso = lugares;
        console.log(this.listaLugarIngreso);
      });
  }
  editarUsuario() {
    var user: NuevoUsuario = this.nuevoInforme.nuevoUsuario[0];
    let idCiud = this.nuevoInforme.nuevoUsuario[0].idciudad;
    let idLugIng = this.nuevoInforme.nuevoUsuario[0].idlugarIngreso;
    let idNac = this.nuevoInforme.nuevoUsuario[0].idnacionalidad;
    let idPais = this.nuevoInforme.nuevoUsuario[0].idpais;
    if (!idCiud.length) {
      this.nuevoInforme.nuevoUsuario[0].idciudad = this.nuevoInforme.nuevoUsuario[0].idciudad.ciudad;
    }
    if (!idLugIng.length) {
      this.nuevoInforme.nuevoUsuario[0].lugarIngreso = this.nuevoInforme.nuevoUsuario[0].idlugarIngreso.nombre;
    }
    if (isNaN(idNac)) {
      this.nuevoInforme.nuevoUsuario[0].idnacionalidad = this.nuevoInforme.nuevoUsuario[0].idnacionalidad.idnacionalidad;
    }
    if (isNaN(idPais)) {
      this.nuevoInforme.nuevoUsuario[0].idpais = this.nuevoInforme.nuevoUsuario[0].idpais.idpais;
    }
    user.idRegistrador = this.idRegistrador;
    user.tipoIdentificacion = parseInt(this.nuevoInforme.nuevoUsuario[0].tipoIdentificacion);
    user.idgenero = parseInt(this.nuevoInforme.nuevoUsuario[0].idgenero);
    //console.log(user);
    if (user.nombres) {
      this.servicio.editarUsuario(user).subscribe((res) => {
        if (res) {
          //console.log(res, 'Registrado con Éxito!!');
          localStorage.removeItem('editarUsuario');
          //this.editandoUsuario = new NuevoUsuario();
          this.successAlert();
          this.cargando = false;
          this.editando = false;
          this.existeActivo = false;
          this.existePasivo = false;
          this.count = 0;
          this.nuevoInforme = new InformeIngreso();
          setTimeout(() => {
            this.router.navigate(['usuarios']);
          }, 3000);
        }
      },
        (err) => {
          console.log(err);
          this.errorAlert();
        });
    } else {
      this.notificarError();
    }
    //console.log('idCiud,', idCiud.length);
    //console.log('idNac,', idNac.length);
    //console.log('idPais,', idPais.length);
    //console.log('idLugIng,', idLugIng.length); 
  }
  registrarUsuario() {
    this.cargando = true;
    this.notificarGuardando();
    var registros = new Array;
    var nRegistros = 0;
    nRegistros = this.nuevoInforme.nuevoUsuario.length;
    console.log(this.nuevoInforme);
    for (let i = 0; i < nRegistros; i++) {
      var user: NuevoUsuario = new NuevoUsuario()
      for (let s = 0; s < this.nuevoInforme.nuevoUsuario[i].salud.length; s++) {
        //console.log(this.nuevoInforme.nuevoUsuario[i].salud[s]);
        user.salud.push(this.nuevoInforme.nuevoUsuario[i].salud[s])
      }
      if (this.count == 0) {
        user.idParentesco = 1;
        this.nuevoInforme.nuevoUsuario[i].idParentesco = user.idParentesco;
      }
      user.idRegistrador = this.idRegistrador;
      user.idParentesco = this.nuevoInforme.nuevoUsuario[i].idParentesco;
      user.nombres = this.nuevoInforme.nuevoUsuario[i].nombres;
      user.apellidos = this.nuevoInforme.nuevoUsuario[i].apellidos;
      if (user.telefono) {
        user.telefono = this.nuevoInforme.nuevoUsuario[i].telefono.toString();
      }
      if (user.telefonoContacto) {
        user.telefonoContacto = this.nuevoInforme.nuevoUsuario[i].telefonoContacto.toString();
      }
      user.fechaIngresoEcuador = this.nuevoInforme.nuevoUsuario[i].fechaIngresoEcuador;
      user.fechaIngresoFundacion = this.nuevoInforme.nuevoUsuario[i].fechaIngresoFundacion;
      user.fechaNacimiento = this.nuevoInforme.nuevoUsuario[i].fechaNacimiento;
      user.habilidades = this.nuevoInforme.nuevoUsuario[i].habilidades;
      user.idciudad = this.nuevoInforme.nuevoUsuario[i].idciudad;
      user.idgenero = parseInt(this.nuevoInforme.nuevoUsuario[i].idgenero);
      user.idnacionalidad = this.nuevoInforme.nuevoUsuario[i].idnacionalidad;
      user.idpais = this.nuevoInforme.nuevoUsuario[i].idpais;
      user.identificacion = this.nuevoInforme.nuevoUsuario[i].identificacion;
      user.lugarIngreso = this.nuevoInforme.nuevoUsuario[i].idlugarIngreso;
      user.nivelInstruccion = this.nuevoInforme.nuevoUsuario[i].nivelInstruccion;
      user.oficio = this.nuevoInforme.nuevoUsuario[i].oficio;
      user.profesion = this.nuevoInforme.nuevoUsuario[i].profesion;
      user.provincia = this.nuevoInforme.nuevoUsuario[i].provincia;
      user.situacionMigratoria = this.nuevoInforme.nuevoUsuario[i].situacionMigratoria;
      user.tipoIdentificacion = parseInt(this.nuevoInforme.nuevoUsuario[i].tipoIdentificacion);
      user.foto = this.nuevoInforme.nuevoUsuario[i].foto;
      registros.push(user);


      //for (let r = 0; r < registros.length; r++) {
      //console.log('for_registro_exitoso_: ', registros[r]);
      const documentDefinition = this.getDocumentDefinition(user);
      pdfMake.createPdf(documentDefinition).download('FNJ_' + user.identificacion);
      //}


      //console.log('Registros[]_: ', registros);
      if (user.nombres && user.apellidos && user.fechaIngresoEcuador && user.fechaIngresoFundacion && user.fechaNacimiento
        && user.habilidades && user.idciudad && user.idgenero && user.idnacionalidad && user.idpais && user.identificacion
        && user.lugarIngreso && user.nivelInstruccion && user.oficio && user.profesion && user.provincia && user.situacionMigratoria
        && user.tipoIdentificacion == 0 || user.tipoIdentificacion == 1 || user.tipoIdentificacion == 2 && user.idParentesco
        && user.telefono) {
        this.servicio.registrarUsuario(registros).subscribe((res) => {
          console.log('Res_: ', res);
          if (res) {
            for (let r = 0; r < registros.length; r++) {
              //console.log('for_registro_exitoso_: ', registros[r]);
              const documentDefinition = this.getDocumentDefinition(registros[r]);
              pdfMake.createPdf(documentDefinition).download('FNJ_' + registros[r].identificacion);
            }
            this.successAlert();
            this.cargando = false;
            setTimeout(() => {
              this.ngOnInit();
            }, 1500);
          }
        }, (err) => {
          setTimeout(() => {
            this.notificarError();
            this.cargando = false;
          }, 1000);
        });
      } else {
        if (!user.telefono) {
          this.notificarCamposFaltantes('Teléfono');
        }
        if (!user.idParentesco) {
          this.notificarCamposFaltantes('Parentesco Familiar');
        }
        if (!user.nombres) {
          this.notificarCamposFaltantes('Nombres');
        }
        if (!user.apellidos) {
          this.notificarCamposFaltantes('Apellidos');
        }
        if (!user.fechaIngresoEcuador) {
          this.notificarCamposFaltantes('Fecha de Ingreso al Ecuador');
        }
        if (!user.fechaIngresoFundacion) {
          this.notificarCamposFaltantes('Fecha de Ingreso a la Fundación');
        }
        if (!user.fechaNacimiento) {
          this.notificarCamposFaltantes('Fecha de Nacimiento');
        }
        if (!user.habilidades) {
          this.notificarCamposFaltantes('Habilidades');
        }
        if (!user.idciudad) {
          this.notificarCamposFaltantes('Ciudad');
        }
        if (!user.idgenero) {
          this.notificarCamposFaltantes('Género');
        }
        if (!user.idnacionalidad) {
          this.notificarCamposFaltantes('Nacionalidad');
        }
        if (!user.idpais) {
          this.notificarCamposFaltantes('País');
        }
        if (!user.identificacion) {
          this.notificarCamposFaltantes('Identificación');
        }
        if (!user.lugarIngreso) {
          this.notificarCamposFaltantes('Lugar de Ingreso');
        }
        if (!user.nivelInstruccion) {
          this.notificarCamposFaltantes('Nivel de Instrucción');
        }
        if (!user.oficio) {
          this.notificarCamposFaltantes('Oficio');
        }
        if (!user.profesion) {
          this.notificarCamposFaltantes('Profesión');
        }
        if (!user.provincia) {
          this.notificarCamposFaltantes('Provincia');
        }
        if (!user.situacionMigratoria) {
          this.notificarCamposFaltantes('Situación Migratoria');
        }
        if (!user.tipoIdentificacion) {
          this.notificarCamposFaltantes('Tipo de Documento de Identificación');
        }
        setTimeout(() => {
          this.notificarError();
          this.cargando = false;
        }, 1000);
      }
    }
  }
  agregarFamiliar() {
    this.ionContent.scrollToTop(1000);
    setTimeout(() => {
      this.notificarCampoParentesco();
    }, 500);
    this.count = this.count + 1;
    this.removerF = true;
    this.nuevoInforme.nuevoUsuario.push(new NuevoUsuario());
  }
  removerFamiliar() {
    this.confirmarRemoverF();
  }
  agregarCondicionMedica(obj, index) {
    this.nuevoInforme.nuevoUsuario[index].salud.push({});
  }
  removerCondicionMedica(obj, indexUser, indexCM) {
    this.confirmarRemoverCM(obj, indexUser, indexCM);
  }
  previsualizarFoto($event, index): void {
    var inputFile = (<HTMLInputElement>document.getElementById('filechooser'));
    inputFile = $event.target.files[0];
    let reader = new FileReader();
    reader.onload = ($event: any) => {
      for (let i = 0; i < this.nuevoInforme.nuevoUsuario.length; i++) {
        if (i == index) {
          this.img_new = $event.target.result;
          this.nuevoInforme.nuevoUsuario[i].foto = this.img_new;
        }
      }
    }
    reader.readAsDataURL($event.target.files[0]);
  }
  previsualizarCertificado($event, index, ind): void {
    var foto;
    var inputFile = (<HTMLInputElement>document.getElementById('filechooser'));
    inputFile = $event.target.files[0];
    let reader = new FileReader();
    reader.onload = ($event: any) => {
      for (let i = 0; i < this.nuevoInforme.nuevoUsuario.length; i++) {
        for (let s = 0; s < this.nuevoInforme.nuevoUsuario[i].salud.length; s++) {
          if (i == index && s == ind) {
            this.img_new = $event.target.result;
            this.nuevoInforme.nuevoUsuario[i].salud[s].foto = this.img_new;
          }
        }
      }
    }
    reader.readAsDataURL($event.target.files[0]);
  }
  async cancelarEdicion() {

    let alert = this.alertCtrl.create({
      header: 'Cancelar edición?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.router.navigate(['formulario-ingreso']);
          }
        },
        {
          text: 'Si',
          handler: () => {
            localStorage.removeItem('editarUsuario');
          }
        }
      ]
    });
    (await alert).present();
  }
  async confirmarRemoverCM(obj, indexUser, indexCM) {
    let alert = this.alertCtrl.create({
      header: '¿Remover condición médica: ' + obj.condicionMedica + '?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          /* handler: () => {
            this.router.navigate(['formulario-ingreso']);
          } */
        },
        {
          text: 'Si',
          handler: () => {
            this.nuevoInforme.nuevoUsuario[indexUser].salud.splice(indexCM, 1);
          }
        }
      ]
    });
    (await alert).present();
  }
  async confirmarRemoverF() {
    let alert = this.alertCtrl.create({
      header: '¿Remover el último Familiar?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          /* handler: () => {
            this.router.navigate(['formulario-ingreso']);
          } */
        },
        {
          text: 'Si',
          handler: () => {
            this.nuevoInforme.nuevoUsuario.pop();
            this.count = this.count - 1;
            if (this.count == 0) {
              this.removerF = false;
            }
          }
        }
      ]
    });
    (await alert).present();
  }
  async confirmarActivacion(identificacion) {
    let alert = this.alertCtrl.create({
      header: '¿Activar el perfil de ' + identificacion + '?',
      buttons: [
        {
          text: 'No, Cancelar',
          role: 'cancel',
          /* handler: () => {
            this.router.navigate(['formulario-ingreso']);
          } */
        },
        {
          text: 'Si, Activar',
          handler: () => {
            this.servicio.activarUsuario(identificacion);
          }
        }
      ]
    });
    (await alert).present();
  }
  errorAlert() {
    Swal.fire({
      icon: 'error',
      title: 'Algo ha salido mal!',
      text: 'Por favor vuelve a intentar',
      timer: 3000
    })
  }
  successAlert() {
    Swal.fire({
      icon: 'success',
      title: '¡Enhorabuena!',
      text: 'Nuevo Albergado Registrado Exitosamente',
      showConfirmButton: false,
      timer: 3500
    })
  }
  home() {
    this.router.navigate(['bienvenido']);
  }
  async notificarCampoParentesco() {
    const toast = await this.toastCtrl.create({
      message: '¡¡Por favor añade un parentesco familiar!!',
      duration: 3000,
      color: 'secondary',
      cssClass: 'toastAlert',
      position: 'middle'
    });
    toast.present();
  }
  async notificarCamposFaltantes(obj) {
    const toast = await this.toastCtrl.create({
      message: 'Ups! Te faltó llenar: ' + obj,
      duration: 3000,
      color: 'warning',
      cssClass: 'toastAlert',
      position: 'top'
    });
    toast.present();
  }
  async notificarRefugiado() {
    Swal.fire({
      icon: 'warning',
      title: '¡Foto de Perfil Eliminada!',
      text: 'Refugiados no pueden tener foto de perfil',
      showConfirmButton: false,
      timer: 1500
    })
  }
  async notificarError() {
    const toast = await this.toastCtrl.create({
      message: 'Debes llenar todos los campos',
      duration: 3000,
      color: 'danger',
      cssClass: 'toastAlert'
    });
    toast.present();
  }
  async notificarGuardando() {
    const toast = await this.toastCtrl.create({
      message: 'Guardando datos del nuevo albergado...',
      duration: 3000,
      color: 'warning',
      cssClass: 'toastAlert'
    });
    toast.present();
  }
  capitalize(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    console.log(str)
    return splitStr.join(' ');
  }
  getDocumentDefinition(user) {
    //sessionStorage.setItem('acta', JSON.stringify(this.acta));
    return {

      content: [
        //{text: 'noBorders:', fontSize: 14, bold: true, pageBreak: 'after', margin: [0, 0, 0, 8]},
        {
          style: 'tableExample',
          alignment: 'center',
          table: {
            headerRows: 1,
            widths: ['auto', 320, 'auto'],
            body: [
              [
                {
                  image: this.logoSap,
                  width: 70
                },
                { text: 'Fundación Nuestros Jóvenes\nCASA DE ACOGIDA TEMPORAL\n SAN ANTONIO DE PICHINCHA', style: 'tableTitle' },
                {
                  image: this.logoFnj,
                  width: 85
                }
              ]
            ]
          },
          layout: 'noBorders'
        },
        {
          style: 'tableExample',
          color: '#444',
          table: {
            widths: [220, '*', '*'],
            headerRows: 2,
            // keepWithHeaderRows: 1,
            body: [
              [{ text: 'FECHA DE INGRESO AL ALBERGUE\n28/07/2020', style: 'tableInsideHeader', colSpan: 0 },
              { text: 'Nombres y Apellidos\nKevin Nicolay Cevallos Gaibor', style: 'tableInsideHeader', colSpan: 2 },
              {}],

              [{ text: 'Género:\nMasculino', style: 'tableInsideHeader' },
              { text: 'Documento de Identidad:\n.-1725348708', style: 'tableInsideHeader', colSpan: 1 },
              { text: 'Tipo de Documento:\nCédula', style: 'tableInsideHeader' }],

              [{ text: 'Nivel de Instrucción:\nBachillerato', style: 'tableInsideHeader' },
              { text: 'Oficio:\nProfesor', style: 'tableInsideHeader', colSpan: 1 },
              { text: 'Habilidades:\nCarpintero, Cocinero, Albañil', style: 'tableInsideHeader' }],

              [{ text: 'Profesión:\nTecnólogo en Desarrollo de Software', style: 'tableInsideHeader' },
              { text: 'Nacionalidad\nECUATORIANA', style: 'tableInsideHeader', alignment: 'center' },
              { text: 'Ciudad\nQUITO', style: 'tableInsideHeader', alignment: 'center' }],

              [{ text: 'Estado/Provincia\nPICHINCHA', style: 'tableInsideHeader', alignment: 'center' },
              { text: 'Fecha de Nacimiento\n28/07/1998', style: 'tableInsideHeader', colSpan: 1, alignment: 'center' },
              { text: 'Edad:\n22 años', style: 'tableInsideHeader', alignment: 'center' }],

              [{ text: 'Último País de Reisdencia:\nCOLOMBIA', style: 'tableInsideHeader', alignment: 'center' },
              { text: 'Teléfono\n0978857892', style: 'tableInsideHeader', colSpan: 1, alignment: 'center' },
              { text: 'Teléfono de Contacto:\n0995388241', style: 'tableInsideHeader', alignment: 'center' }],

              [{ text: 'Fecha de Ingreso al Ecuador\n25/07/2020', style: 'tableInsideHeader' },
              { text: 'Lugar de Ingreso al Ecuador:', style: 'tableInsideHeader' },
              { text: 'Fecha límite de estadía en Ecuador\n25/08/2020', style: 'tableInsideHeader' }],

              [{ text: 'Situación Migratoria\nSolicitante', style: 'tableInsideHeader' },
              { text: 'Condición Médica\nEstado: Enfermedad, Descripción: Gripe\nEstado: Discapacidad, Descripción: Discapacidad Visual 30%\nEstado: Enfermedad, Descripción: Tos\nEstado: Embarazada, Descripción: 3 Meses de Embarazo\n', style: 'tableInsideHeader', colSpan: 2, rowSpan: 1 },
              {}],

              [{ text: 'Observaciones de Ingreso', style: 'tableInsideHeader', alignment: 'center', colSpan: 3 }],

              [{ text: 'Viene Acompañado de 3 Familiares', style: 'textContent', colSpan: 3 }],

              [{ text: 'EGRESO', style: 'header', alignment: 'center', colSpan: 3 }],

              [{ text: 'Día, mes, año y hora:', style: 'tableInsideHeader', colSpan: 1 },
              { text: 'Firma del Albergado', style: 'tableInsideHeader', alignment: 'center', colSpan: 2 },
              {}],

              [{ text: 'Motivo del Egreso:', style: 'tableInsideEgreso' },
              { text: '', style: 'tableInsideHeader', colSpan: 2, rowSpan: 1 },
              {}],

              [{ text: 'Observaciones:', style: 'tableInsideEgreso', colSpan: 1 },
              { text: 'Firma del Responsable del CATSAP', style: 'tableInsideHeader', alignment: 'center', colSpan: 2 },
              {}],

            ]
          }
        }

      ],
      styles: {
        header: {
          fontSize: 15,
          bold: true,
          color: 'black',
          margin: [0, 0, 0, 0]
        },
        textContent: {
          fontSize: 12,
          bold: false,
          color: 'black',
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          bold: true,
          fontSize: 20,
          margin: [0, 0, 0, 0]
        },
        tableHeader: {

          bold: false,
          fontSize: 22,
          color: 'black'
        },
        tableInsideHeader: {

          bold: true,
          fontSize: 12,
          color: 'black'
        },
        tableTitle: {

          bold: true,
          fontSize: 18,
          color: 'black',
          margin: [30, 0, 0, 0]
        },
        tableInsideEgreso: {

          bold: true,
          fontSize: 12,
          color: 'black',
          margin: [0, 0, 0, 35]
        }
      },
      defaultStyle: {
        color: 'black'
        //alignment: 'justify'
      }
      /*  content: [
         {
           columns: [
             [{
               image: this.logoFnj,
               width: 100,
               height: 75,
               style: 'img',
               alignment: 'left'
             }],
             [{
               image: this.logoSap,
               width: 100,
               height: 75,
               style: 'img',
               alignment: 'left'
             }]
           ]
         },
         {
           text: 'Fundacion Nuestros Jóvenes',
           style: 'titulo'
         },
         {
           canvas: [{ type: 'line', x1: 0, y1: 3, x2: 590 - 2 * 30, y2: 3, lineWidth: 3 }]
         },
 
 
         {
           text: 'Nombres: ' + user.nombres,
           style: 'titulo'
         },
         {
           text: 'Código usuario',
           style: 'titulo'
         },
         {
           text: 'Inicio',
           style: 'body'
         },
         {
           text: 'Orden del Dia',
           style: 'subTitulo'
         },
         {
 
         },
         {
           text: 'Desarrollo',
           style: 'subTitulo'
         },
         {
           text: 'this.acta.desarrollo',
           style: 'body'
         },
 
         {
           text: 'this.acta.despedida',
           fontSize: 12,
           margin: [5, 20, 5, 60]
         },
         {
           text: 'this.usuario.name',
           style: 'pie'
         },
         {
           text: 'this.acta.InstitutoPertenciciente',
           style: 'pie'
         }
       ],
       info: {
         title: 'FNJ',
         author: 'this.usuario.name',
         subject: 'Acta',
         keywords: 'Acta, ONLINE Acta',
       },
       styles: {
         titulo: {
           fontSize: 14,
           bold: true,
           margin: [0, 20, 0, 20],
           alignment: 'center',
           textAlign: 'justify'
         },
         subTitulo: {
           fontSize: 13,
           bold: true,
           margin: [5, 10, 5, 10]
         },
         cabecera: {
           fontSize: 12,
           margin: [5, 10, 5, 10],
           textAlign: 'justify'
         },
         body: {
           fontSize: 12,
           fontFamily: 'times new roman',
           margin: [5, 10, 5, 10],
           textAlign: 'justify'
         },
         pie: {
           fontSize: 12,
           fontFamily: 'times new roman',
           margin: [5, 10, 5, 10],
           bold: true,
           alignment: 'center',
           textAlign: 'justify'
         }
       } */
    };
  }


}
