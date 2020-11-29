import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-annotation';
import { Label } from 'ng2-charts';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../menu/pandora.component.css', '../menu/containerIndex.component.css'],
})
export class GetDashboardComponent implements OnInit
{

    public ventas_con_devolucion: number = 0;
    public ventas_sin_devolucion: number = 0;
    public listado_ventas_normales_anuales: any[] = [];
    public listado_ventas_plus_anuales: any[] = [];
    public listado_top_5_productos: any[] = [];
    public listado_ventas_no_devoluciones: any[] = [];
    public listado_ventas_si_devoluciones: any[] = [];

    ngOnInit(){

    }

    public barChartOptions: ChartOptions = {
        responsive: true,
        // We use these empty structures as placeholders for dynamic theming.
        scales: { xAxes: [{}], yAxes: [{}] },
        plugins: {
        datalabels: {
            anchor: 'end',
            align: 'end',
        }
        }
    };
    public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    public barChartType: ChartType = 'bar';
    public barChartLegend = true;
    public barChartPlugins = [pluginDataLabels];

    public barChartData: ChartDataSets[] = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
    ];

    constructor(public service: AppService) { 
       this.get_top_productos();
       this.get_ventas_no_devoluciones();
       this.get_ventas_si_devoluciones();
       this.get_ventas_normales_anuales();
       this.get_ventas_plus_anuales();
    }

    // events
    public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
        console.log(event, active);
    }

    public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
        console.log(event, active);
    }

    public pieChartOptions: ChartOptions = {
        responsive: true,
        legend: {
          position: 'top',
        },
        plugins: {
          datalabels: {
            formatter: (value, ctx) => {
              const label = ctx.chart.data.labels[ctx.dataIndex];
              return label;
            },
          },
        }
    };

    public pieChartLabels: Label[] = [['Ventas sin Devolución'], ['Ventas con Devolución']];
    public pieChartData: number[] = [this.ventas_sin_devolucion, this.ventas_con_devolucion];
    public pieChartType: ChartType = 'pie';
    public pieChartLegend = true;
    public pieChartPlugins = [pluginDataLabels];
    public pieChartColors = [
    {
        backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)'],
    },];

    public polarAreaChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
    public polarAreaChartData = [300, 500, 100, 40, 120];
    public polarAreaLegend = true;
    public polarAreaChartType: ChartType = 'polarArea';

    /*FUNCIONES*/

    get_top_productos(){

        var response;

        this.service.get_top_5_productos().subscribe(

            data => response = data,

            err => {

                console.log( "Error al consultar el servicio." );
            },

            () => {

                this.listado_top_5_productos = response;
                console.log(this.listado_top_5_productos);
            }  
        );
    }

    get_ventas_normales_anuales(){

        var response;

        this.service.get_ventas_normales_anuales().subscribe(

            data => response = data,

            err => {

                console.log( "Error al consultar el servicio." );
            },

            () => {

                this.listado_ventas_normales_anuales = response;
                console.log(this.listado_ventas_normales_anuales);
            }  
        );
    }

    get_ventas_plus_anuales(){

        var response;

        this.service.get_ventas_plus_anuales().subscribe(

            data => response = data,

            err => {

                console.log( "Error al consultar el servicio." );
            },

            () => {

                this.listado_ventas_plus_anuales = response;
                console.log(this.listado_ventas_plus_anuales);
            }  
        );
    }

    get_ventas_no_devoluciones(){

        var response;

        this.service.get_grafico_nodevoluciones().subscribe(

            data => response = data,

            err => {

                console.log( "Error al consultar el servicio." );
            },

            () => {
                this.listado_ventas_no_devoluciones = response;
                this.ventas_con_devolucion = Number(this.listado_ventas_no_devoluciones[0]["VentasTotal"]);
                this.ventas_con_devolucion = 220;
                console.log(this.ventas_con_devolucion);
            }  
        );
    }

    get_ventas_si_devoluciones(){

        var response;

        this.service.get_grafico_sidevoluciones().subscribe(

            data => response = data,

            err => {

                console.log( "Error al consultar el servicio." );
            },

            () => {

                this.listado_ventas_si_devoluciones = response;
                this.ventas_sin_devolucion = Number(this.listado_ventas_si_devoluciones[0]["VentasTotal"]);
                this.ventas_sin_devolucion = 20;
                console.log(this.ventas_sin_devolucion);
            }  
        );
    }
}