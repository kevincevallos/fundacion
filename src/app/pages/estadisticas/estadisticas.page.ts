import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';
import { Chart } from "chart.js";
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})
export class EstadisticasPage implements OnInit {
  @ViewChild('barCanvasGenero') barCanvasGenero: ElementRef;
  @ViewChild('barCanvasGlbti') barCanvasGlbti: ElementRef;
  @ViewChild('barCanvasEdad') barCanvasEdad: ElementRef;
  @ViewChild('necEsp') barCanvasNecEsp: ElementRef;
  @ViewChild('ingresosEgresos') ingrEgr: ElementRef;
  @ViewChild('canvasRefugiados') canvasRefugiados: ElementRef;
  @ViewChild('estadoAlerta') canvasEstadoAlerta: ElementRef;
  private barChartGenero: Chart;
  private barChartGlbti: Chart;
  private barChartEdad: Chart;
  private barChartNecesidadesEspeciales: Chart;
  private ingEgr: Chart;
  private donutChartrefug: Chart;
  private donutChartEstadoAlert: Chart;
  genero: boolean;
  edad: boolean;
  ingresos: boolean;
  especiales: boolean;
  refugiados: boolean;
  eAlerta: boolean;
  //según género
  deCeroaUnoV: number = 0;
  deCeroaUnoM: number = 0;
  deDosaCincoV: number = 0;
  deDosaCincoM: number = 0;
  deSeisaDoceV: number = 0;
  deSeisaDoceM: number = 0;
  deTreceaDiecisieteV: number = 0;
  deTreceaDiecisieteM: number = 0;
  deDieciochoaCuarentaV: number = 0;
  deDieciochoaCuarentaM: number = 0;
  deCuarentaUnoaSesentaV: number = 0;
  deCuarentaUnoaSesentaM: number = 0;
  masDeSesentaV: number = 0;
  masDeSesentaM: number = 0;
  //según género GLBTI+
  deSeisaDoceGlbti: number = 0;
  deTreceaDiecisieteGlbti: number = 0;
  deDieciochoaCuarentaGlbti: number = 0;
  deCuarentaUnoaSesentaGlbti: number = 0;
  masDeSesentaGlbti: number = 0;
  totalGlbti: number = 0;
  //segun edad
  deCeroaUno: number = 0;
  deDosaCinco: number = 0;
  deSeisaDoce: number = 0;
  deTreceaDiecisiete = 0;
  deDieciochoaCuarenta = 0;
  deCuarentaUnoaSesenta = 0;
  masDeSesenta = 0;
  //ingresos
  iEnero: number = 0;
  iFebrero: number = 0;
  iMarzo: number = 0;
  iAbril: number = 0;
  iMayo: number = 0;
  iJunio: number = 0;
  iJulio: number = 0;
  iAgosto: number = 0;
  iSeptiembre: number = 0;
  iOctubre: number = 0;
  iNoviembre: number = 0;
  iDiciembre: number = 0;
  totalIngresos: number = 0;
  //egresos
  eEnero: number = 0;
  eFebrero: number = 0;
  eMarzo: number = 0;
  eAbril: number = 0;
  eMayo: number = 0;
  eJunio: number = 0;
  eJulio: number = 0;
  eAgosto: number = 0;
  eSeptiembre: number = 0;
  eOctubre: number = 0;
  eNoviembre: number = 0;
  eDiciembre: number = 0;
  totalEgresos: number = 0;
  fechaActual;
  anioActual;
  //necesidades especiales
  discapacitadosV: number = 0;
  discapacitadosM: number = 0;
  discapacitadosGlbti: number = 0;
  enfermosV: number = 0;
  enfermosM: number = 0;
  enfermosGlbti: number = 0;
  embarazos: number = 0;
  lactancia: number = 0;
  totalDiscapacitados: number = 0;
  totalEnfermos: number = 0;
  totalNecEsp: number = 0;
  //según refugiados
  refugiadosV: number = 0;
  refugiadosM: number = 0;
  refugiadosGlbti: number = 0;
  totalRefugiados: number = 0;
  //según estadoAlerta
  totalPerEstAlert: number = 0;
  usuarios = {};
  constructor(
    private router: Router,
    private servicio: DataService) { }

  ionViewWillEnter() {
    this.anioActual = 0;
    this.fechaActual = new Date();
    this.anioActual = new Date(this.fechaActual).getFullYear();
    this.reiniciarValores();
    this.getUsuarios();
  }
  reiniciarValores() {
    this.deCeroaUno = 0;
    this.deCeroaUnoV = 0;
    this.deCeroaUnoM = 0;
    this.deDosaCinco = 0;
    this.deDosaCincoV = 0;
    this.deDosaCincoM = 0;
    this.deSeisaDoce = 0;
    this.deSeisaDoceV = 0;
    this.deSeisaDoceM = 0;
    this.deTreceaDiecisiete = 0;
    this.deTreceaDiecisieteV = 0;
    this.deTreceaDiecisieteM = 0;
    this.deDieciochoaCuarenta = 0;
    this.deDieciochoaCuarentaV = 0
    this.deDieciochoaCuarentaM = 0;
    this.deCuarentaUnoaSesenta = 0;
    this.deCuarentaUnoaSesentaV = 0;
    this.deCuarentaUnoaSesentaM = 0;
    this.masDeSesenta = 0;
    this.masDeSesentaV = 0;
    this.masDeSesentaM = 0;
    this.totalGlbti = 0;
    this.deSeisaDoceGlbti = 0;
    this.deTreceaDiecisieteGlbti = 0;
    this.deDieciochoaCuarentaGlbti = 0;
    this.deCuarentaUnoaSesentaGlbti = 0;
    this.masDeSesentaGlbti = 0;
    this.discapacitadosV = 0;
    this.discapacitadosM = 0;
    this.discapacitadosGlbti = 0;
    this.enfermosV = 0;
    this.enfermosM = 0;
    this.enfermosGlbti = 0;
    this.embarazos = 0;
    this.lactancia = 0;
    this.totalDiscapacitados = 10;
    this.totalEnfermos = 10;
    this.totalNecEsp = 15;
    this.refugiadosV = 0;
    this.refugiadosM = 0;
    this.refugiadosGlbti = 0;
    this.totalRefugiados = 0;
    this.totalPerEstAlert = 0;
  }
  reiniciarValoresIngresosEgresos() {
    this.iEnero = 0;
    this.iFebrero = 0;
    this.iMarzo = 0;
    this.iAbril = 0;
    this.iMayo = 0;
    this.iJunio = 0;
    this.iJulio = 0;
    this.iAgosto = 0;
    this.iSeptiembre = 0;
    this.iOctubre = 0;
    this.iNoviembre = 0;
    this.iDiciembre = 0;
    this.eEnero = 0;
    this.eFebrero = 0;
    this.eMarzo = 0;
    this.eAbril = 0;
    this.eMayo = 0;
    this.eJunio = 0;
    this.eJulio = 0;
    this.eAgosto = 0;
    this.eSeptiembre = 0;
    this.eOctubre = 0;
    this.eNoviembre = 0;
    this.eDiciembre = 0;
    this.totalIngresos = 0;
    this.totalEgresos = 0;
  }
  home() {
    this.router.navigate(['bienvenido']);
  }
  ngOnInit() {
  }
  cambiarSegmento($event) {
    var value = $event.target.value;
    //console.log('event_: ', $event.target.value);
    if (value == 'Género') {
      this.genero = true;
      this.edad = false;
      this.ingresos = false;
      this.especiales = false;
      this.refugiados = false;
      this.eAlerta = false;
    }
    if (value == 'Edad') {
      this.genero = false;
      this.edad = true;
      this.ingresos = false;
      this.especiales = false;
      this.refugiados = false;
      this.eAlerta = false;
    }
    if (value == 'IngresosEgresos') {
      this.genero = false;
      this.edad = false;
      this.ingresos = true;
      this.especiales = false;
      this.refugiados = false;
      this.eAlerta = false;
    }
    if (value == 'Especiales') {
      this.genero = false;
      this.edad = false;
      this.ingresos = false;
      this.especiales = true;
      this.refugiados = false;
      this.eAlerta = false;
    }
    if (value == 'Refugiados') {
      this.genero = false;
      this.edad = false;
      this.ingresos = false;
      this.especiales = false;
      this.refugiados = true;
      this.eAlerta = false;
    }
    if (value == 'EstadoAlerta') {
      this.genero = false;
      this.edad = false;
      this.ingresos = false;
      this.especiales = false;
      this.refugiados = false;
      this.eAlerta = true;
    }
  }
  getUsuarios() {
    this.servicio.getUsuarios().subscribe((usuarios) => {
      this.usuarios = usuarios;
      this.filtrarDatos();
      this.filtrarIngresosEgresos(this.fechaActual);
    });
  }
  filtrarDatos() {
    for (var key in this.usuarios) {
      if (Object.prototype.hasOwnProperty.call(this.usuarios, key)) {
        const fNacimiento = this.usuarios[key].fechaNacimiento;
        const fIngreso = this.usuarios[key].fechaIngresoEcuador;
        const genero = this.usuarios[key].idgenero.idgenero;
        const refugiado = this.usuarios[key].situacionMigratoria;
        let ref = refugiado.includes('Refugiado');
        for (let s = 0; s < this.usuarios[key].salud.length; s++) {
          const estadoDiscapacidad = this.usuarios[key].salud[s].estadoDiscapacidad;
          if (estadoDiscapacidad == 1) {
            if (genero == 1) {
              this.discapacitadosV = this.discapacitadosV + 1;
            }
            if (genero == 2) {
              this.discapacitadosM = this.discapacitadosM + 1;
            }
            if (genero == 3) {
              this.discapacitadosGlbti = this.discapacitadosGlbti + 1;
            }
            s++
          }
          if (estadoDiscapacidad == 2) {
            if (genero == 1) {
              this.enfermosV = this.enfermosV + 1;
            }
            if (genero == 2) {
              this.enfermosM = this.enfermosM + 1;
            }
            if (genero == 3) {
              this.enfermosGlbti = this.enfermosGlbti + 1;
            }
            s++
          }
          if (estadoDiscapacidad == 3) {
            this.embarazos = this.embarazos + 1;
            s++
          }
          if (estadoDiscapacidad == 4) {
            this.lactancia = this.lactancia + 1;
            s++
          }
        }
        let edad = this.calcularEdad(fNacimiento);
        if (edad <= 1) {
          if (genero == 1) {
            this.deCeroaUnoV = this.deCeroaUnoV + 1;
          }
          if (genero == 2) {
            this.deCeroaUnoM = this.deCeroaUnoM + 1;
          }
        }
        if (edad >= 2 && edad <= 5) {
          if (genero == 1) {
            this.deDosaCincoV = this.deDosaCincoV + 1;
          }
          if (genero == 2) {
            this.deDosaCincoM = this.deDosaCincoM + 1;
          }
        }
        if (edad >= 6 && edad <= 12) {
          if (genero == 1) {
            this.deSeisaDoceV = this.deSeisaDoceV + 1;
          }
          if (genero == 2) {
            this.deSeisaDoceM = this.deSeisaDoceM + 1;
          }
          if (genero == 3) {
            this.deSeisaDoceGlbti = this.deSeisaDoceGlbti + 1;
          }
        }
        if (edad >= 13 && edad <= 17) {
          if (genero == 1) {
            this.deTreceaDiecisieteV = this.deTreceaDiecisieteV + 1;
          }
          if (genero == 2) {
            this.deTreceaDiecisieteM = this.deTreceaDiecisieteM + 1;
          }
          if (genero == 3) {
            this.deTreceaDiecisieteGlbti = this.deTreceaDiecisieteGlbti + 1;
          }
        }
        if (edad >= 18 && edad <= 40) {
          if (genero == 1) {
            this.deDieciochoaCuarentaV = this.deDieciochoaCuarentaV + 1;
          }
          if (genero == 2) {
            this.deDieciochoaCuarentaM = this.deDieciochoaCuarentaM + 1;
          }
          if (genero == 3) {
            this.deDieciochoaCuarentaGlbti = this.deDieciochoaCuarentaGlbti + 1;
          }
        }
        if (edad >= 41 && edad <= 60) {
          if (genero == 1) {
            this.deCuarentaUnoaSesentaV = this.deCuarentaUnoaSesentaV + 1;
          }
          if (genero == 2) {
            this.deCuarentaUnoaSesentaM = this.deCuarentaUnoaSesentaM + 1;
          }
          if (genero == 3) {
            this.deCuarentaUnoaSesentaGlbti = this.deCuarentaUnoaSesentaGlbti + 1;
          }
        }
        if (edad > 60) {
          if (genero == 1) {
            this.masDeSesentaV = this.masDeSesentaV + 1;
          }
          if (genero == 2) {
            this.masDeSesentaM = this.masDeSesentaM + 1;
          }
          if (genero == 3) {
            this.masDeSesentaGlbti = this.masDeSesentaGlbti + 1;
          }
        }
        if (ref) {
          if (genero == 1) {
            this.refugiadosV = this.refugiadosV + 1;
          }
          if (genero == 2) {
            this.refugiadosM = this.refugiadosM + 1;
          }
          if (genero == 3) {
            this.refugiadosGlbti = this.refugiadosGlbti + 1;
          }
        }
      }
    }
    this.deCeroaUno = this.deCeroaUnoV + this.deCeroaUnoM;
    this.deDosaCinco = this.deDosaCincoV + this.deDosaCincoM;
    this.deSeisaDoce = this.deSeisaDoceV + this.deSeisaDoceM + this.deSeisaDoceGlbti;
    this.deTreceaDiecisiete = this.deTreceaDiecisieteV + this.deTreceaDiecisieteM + this.deTreceaDiecisieteGlbti;
    this.deDieciochoaCuarenta = this.deDieciochoaCuarentaV + this.deDieciochoaCuarentaM + this.deDieciochoaCuarentaGlbti;
    this.deCuarentaUnoaSesenta = this.deCuarentaUnoaSesentaV + this.deCuarentaUnoaSesentaM + this.deCuarentaUnoaSesentaGlbti;
    this.masDeSesenta = this.masDeSesentaV + this.masDeSesentaM + this.masDeSesentaGlbti;
    this.totalGlbti = this.deSeisaDoceGlbti + this.deTreceaDiecisieteGlbti + this.deDieciochoaCuarentaGlbti + this.deCuarentaUnoaSesentaGlbti + this.masDeSesentaGlbti;
    this.totalDiscapacitados = this.discapacitadosV + this.discapacitadosM + this.discapacitadosGlbti;
    this.totalEnfermos = this.enfermosV + this.enfermosM + this.enfermosGlbti;
    this.totalNecEsp = this.totalDiscapacitados + this.totalEnfermos + this.embarazos + this.lactancia;
    this.totalRefugiados = this.refugiadosV + this.refugiadosM + this.refugiadosGlbti;
    this.dibujarDatos();
  }
  filtrarIngresosEgresos(anio) {
    if (this.ingEgr) {
      this.ingEgr.destroy();
    }
    anio = new Date(anio).getFullYear();
    this.reiniciarValoresIngresosEgresos();
    for (var key in this.usuarios) {
      if (Object.prototype.hasOwnProperty.call(this.usuarios, key)) {
        const fIngreso = this.usuarios[key].fechaIngresoEcuador;
        let mesIngreso = new Date(fIngreso).getMonth();
        let anioIngreso = new Date(fIngreso).getFullYear();
        if (anioIngreso == anio) {
          if (mesIngreso == 0) {
            this.iEnero = this.iEnero + 1;
          }
          if (mesIngreso == 1) {
            this.iFebrero = this.iFebrero + 1;
          }
          if (mesIngreso == 2) {
            this.iMarzo = this.iMarzo + 1;
          }
          if (mesIngreso == 3) {
            this.iAbril = this.iAbril + 1;
          }
          if (mesIngreso == 4) {
            this.iMayo = this.iMayo + 1;
          }
          if (mesIngreso == 5) {
            this.iJunio = this.iJunio + 1;
          }
          if (mesIngreso == 6) {
            this.iJulio = this.iJulio + 1;
          }
          if (mesIngreso == 7) {
            this.iAgosto = this.iAgosto + 1;
          }
          if (mesIngreso == 8) {
            this.eSeptiembre = this.eSeptiembre + 1;
          }
          if (mesIngreso == 9) {
            this.iOctubre = this.iOctubre + 1;
          }
          if (mesIngreso == 10) {
            this.iNoviembre = this.iNoviembre + 1;
          }
          if (mesIngreso == 11) {
            this.iDiciembre = this.iDiciembre + 1;
          }
        }
      }
    }
    this.dibujarDatos();
  }
  calcularEdad(fNacimiento) {
    let fechaNacimiento = new Date(fNacimiento).getTime();
    var fHoy = new Date().getTime();
    let diferencia = fHoy - fechaNacimiento;
    let edad = diferencia / (1000 * 60 * 60 * 24);
    edad = Math.floor(edad / 365);
    return edad;
  }
  dibujarDatos() {
    if (this.barChartGenero) {
      this.barChartGenero.destroy();
    }
    if (this.barChartGlbti) {
      this.barChartGlbti.destroy();
    }
    if (this.barChartEdad) {
      this.barChartEdad.destroy();
    }
    if (this.barChartNecesidadesEspeciales) {
      this.barChartNecesidadesEspeciales.destroy();
    }
    if (this.ingEgr) {
      this.ingEgr.destroy();
    }
    if (this.donutChartrefug) {
      this.donutChartrefug.destroy();
    }
    if (this.donutChartEstadoAlert) {
      this.donutChartEstadoAlert.destroy();
    }
    //Según Género
    this.barChartGenero = new Chart(this.barCanvasGenero.nativeElement, {
      type: "bar",
      data: {
        labels: ["0-1 Año Varones", "0-1 Año Mujeres", "2-5 Años Varones", "2-5 Años Mujeres", "6-12 Años Varones",
          "6-12 Años Mujeres", "13-17 Años Varones", "13-17 Años Mujeres", "18-40 Años Varones", "18-40 Años Mujeres",
          "41-60 Años Varones", "41-60 Años Mujeres", "+60 Años Varones", "+60 Años Mujeres"],
        datasets: [
          {
            label: "Valor según Género",
            data: [this.deCeroaUnoV, this.deCeroaUnoM, this.deDosaCincoV, this.deDosaCincoM,
            this.deSeisaDoceV, this.deSeisaDoceM, this.deTreceaDiecisieteV,
            this.deTreceaDiecisieteM, this.deDieciochoaCuarentaV, this.deDieciochoaCuarentaM,
            this.deCuarentaUnoaSesentaV, this.deCuarentaUnoaSesentaM, this.masDeSesentaV, this.masDeSesentaM],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
    //Según GéneroGlbti
    this.barChartGlbti = new Chart(this.barCanvasGlbti.nativeElement, {
      type: "bar",
      data: {
        labels: ["6-12 Años", "13-17 Años", "18-40 Años ", "41-60 Años", "+60 Años", "Total GLBTI+"],
        datasets: [
          {
            label: "Valor según GLBTI+",
            data: [this.deSeisaDoceGlbti, this.deTreceaDiecisieteGlbti, this.deDieciochoaCuarentaGlbti,
            this.deCuarentaUnoaSesentaGlbti, this.masDeSesentaGlbti, this.totalGlbti],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
    //Según Edad
    this.barChartEdad = new Chart(this.barCanvasEdad.nativeElement, {
      type: "bar",
      data: {
        labels: ["0-1 Años", "2-5 Años", "6-12 Años", "13-17 Años", "18-40 Años", "41-60 Años", "+60 Años"],
        datasets: [
          {
            label: "Valor según Edad",
            data: [this.deCeroaUno, this.deDosaCinco, this.deSeisaDoce, this.deTreceaDiecisiete,
            this.deDieciochoaCuarenta, this.deCuarentaUnoaSesenta, this.masDeSesenta],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
    //Según NecEsp
    this.barChartNecesidadesEspeciales = new Chart(this.barCanvasNecEsp.nativeElement, {
      type: "bar",
      data: {
        labels: ["Discapacitados Varones", "Discapacitados Mujeres", "Discapacitados GLBTI+", "Enfermos Varones",
          "Enfermos Mujeres", "Enfermos GLBTI+", "Embarazos", "En Lactancia", "Total Discapacitados", "Total Enfermos",
          "Total Nec. Esp."],
        datasets: [
          {
            label: "Valor según Necesidades Especiales",
            data: [this.discapacitadosV, this.discapacitadosM, this.discapacitadosGlbti,
            this.enfermosV, this.enfermosM, this.enfermosGlbti, this.embarazos, this.lactancia,
            this.totalDiscapacitados, this.totalEnfermos, this.totalNecEsp],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
    //Según Refugiados
    this.donutChartrefug = new Chart(this.canvasRefugiados.nativeElement, {
      type: "doughnut",
      data: {
        labels: ["Refugiados Varones", "Refugiados Mujeres", "Refugiados GLBTI+", "Total Refugiados"],
        datasets: [
          {
            label: "",
            data: [this.refugiadosV, this.refugiadosM, this.refugiadosGlbti, this.totalRefugiados],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)"
            ],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#21B05C"]
          }
        ]
      }
    });
    //Según EstadoAlerta
    this.donutChartEstadoAlert = new Chart(this.canvasEstadoAlerta.nativeElement, {
      type: "doughnut",
      data: {
        labels: ["Personas en Estado de Alerta"],
        datasets: [
          {
            label: "",
            data: [this.totalPerEstAlert],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)"
            ],
            hoverBackgroundColor: ["#FF6384"]
          }
        ]
      }
    });
    //Ingresos y Egresos
    this.ingEgr = new Chart(this.ingrEgr.nativeElement, {
      type: "line",
      data: {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        datasets: [
          {
            label: "Ingresos por Mes",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [this.iEnero, this.iFebrero, this.iMarzo, this.iAbril, this.iMayo, this.iJunio,
            this.iJulio, this.iAgosto, this.iSeptiembre, this.iOctubre, this.iNoviembre, this.iDiciembre],
            spanGaps: false
          },
          {
            label: "Egresos por Mes",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(220,20,60,0.4)",
            borderColor: "rgba(220,20,60,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(220,20,60,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(220,20,60,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [this.eEnero, this.eFebrero, this.eMarzo, this.eAbril, this.eMayo, this.eJunio,
            this.eJulio, this.eAgosto, this.eSeptiembre, this.eOctubre, this.eNoviembre, this.eDiciembre],
            spanGaps: false
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }
}
