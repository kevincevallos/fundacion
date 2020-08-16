import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';
import { Chart } from "chart.js";
import { truncate } from 'fs';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})
export class EstadisticasPage implements OnInit {
  @ViewChild('barCanvas') barCanvas: ElementRef;
  @ViewChild('barCanvas2') barCanvas2: ElementRef;
  @ViewChild("necEsp") necEsp: ElementRef;
  @ViewChild("lineCanvas") lineCanvas: ElementRef;
  private barChart: Chart;
  private barChart2: Chart;
  private necesidadesEspeciales: Chart;
  private lineChart: Chart;
  genero: boolean;
  edad: boolean;
  ingresosEgresos: boolean;
  especiales: boolean;
  //según género
  cbebesVarones: number = 2;
  cbebesMujeres: number = 3;
  cniños: number = 2;
  cniñas: number = 5;
  cadolescentesVarones: number = 3;
  cadolescentesMujeres: number = 1;
  cadultosVarones: number = 4;
  cadultosMujeres: number = 5;
  cLgbti: number = 3;
  cmujeresEmbarazadas = 5;
  cfamilias: number = 6;
  //segun edad
  deCeroaCinco: number = 4;
  deSeisaOnce: number = 3;
  deDoceaDieciocho: number = 3;
  deDiecinueveaCincuentaynueve = 6;
  deSesentaEnAdelante = 8;
  //ingresos
  iEnero: number = 2;
  iFebrero: number = 3;
  iMarzo: number = 4;
  iAbril: number = 3;
  iMayo: number = 5;
  iJunio: number = 6;
  iJulio: number = 5;
  iAgosto: number = 4;
  iSeptiembre: number = 3;
  iOctubre: number = 2;
  iNoviembre: number = 3;
  iDiciembre: number = 2;
  //egresos
  eEnero: number = 1;
  eFebrero: number = 3;
  eMarzo: number = 3;
  eAbril: number = 2;
  eMayo: number = 2;
  eJunio: number = 2;
  eJulio: number = 2;
  eAgosto: number = 3;
  eSeptiembre: number = 4;
  eOctubre: number = 1;
  eNoviembre: number = 1;
  eDiciembre: number = 3;
  //necesidades especiales
  chombresNecEsp: number = 5;
  cmujeresNecEsp: number = 9;
  constructor(private appComponent: AppComponent, private router: Router) { }

/*   ionViewWillEnter() {
    this.appComponent.checkRoute();
  } */
  ngAfterViewInit() {
    //Según Género
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: ["Bebés Varones", "Bebés Mujeres", "Niños", "Niñas", "Adolescentes Varones",
          "Adolescentes Mujeres", "Adultos Varones", "Adultos Mujeres", "LGBTI", "Mujeres Embarazadas",
          "Familias"],
        datasets: [
          {
            label: "Valor según Género",
            data: [this.cbebesVarones, this.cbebesMujeres, this.cniños, this.cniñas,
            this.cadolescentesVarones, this.cadolescentesMujeres, this.cadultosVarones,
            this.cadultosMujeres, this.cLgbti, this.cmujeresEmbarazadas, this.cfamilias],
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
    //Según Edad
    this.barChart2 = new Chart(this.barCanvas2.nativeElement, {
      type: "bar",
      data: {
        labels: ["0 - 5 años (Bebés)", "6 - 11 años (Niños)", "12 - 18 años (Adolescentes)", "19 - 59 años (Adultos)", "60 años y más (Adultos Mayores)"],
        datasets: [
          {
            label: "Valor según Edad",
            data: [this.deCeroaCinco, this.deSeisaOnce, this.deDoceaDieciocho,
            this.deDiecinueveaCincuentaynueve, this.deSesentaEnAdelante],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)"
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
    //Necesidades Especiales
    this.necesidadesEspeciales = new Chart(this.necEsp.nativeElement, {
      type: "doughnut",
      data: {
        labels: ["Mujeres", "Hombres"],
        datasets: [
          {
            label: "Cantidad:",
            data: [this.chombresNecEsp, this.cmujeresNecEsp],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)"
            ],
            hoverBackgroundColor: ["#FF6384", "#36A2EB"]
          }
        ]
      }
    });
    //Ingresos y Egresos
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
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
  ionViewWillLeave() {
    /* this.genero = false;
    this.edad = false;
    this.ingresosEgresos = false; */
  }
  ngOnInit() {
  }
  home() {
    this.router.navigate(['bienvenido']);
  }
  cambiarSegmento($event) {
    var value = $event.target.value;
    console.log('event_: ', $event.target.value);
    if (value == 'Género') {
      this.genero = true;
      this.edad = false;
      this.ingresosEgresos = false;
      this.especiales = false;
    }
    if (value == 'Edad') {
      this.genero = false;
      this.edad = true;
      this.ingresosEgresos = false;
      this.especiales = false;
    }
    if (value == 'IngresosEgresos') {
      this.genero = false;
      this.edad = false;
      this.ingresosEgresos = true;
      this.especiales = false;
    }
    if (value == 'Especiales') {
      this.genero = false;
      this.edad = false;
      this.ingresosEgresos = false;
      this.especiales = true;
    }
  }

}
