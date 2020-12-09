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

export class GetDashboardComponent
{

    private test: number[]  = [];
    private nombre_top = []; 
    private top = [];
    private ventas_label = [];
    private ventas_normales_data = []; 
    private ventas_plus_data = []; 
    public ventas_con_devolucion: number = 0;
    public ventas_sin_devolucion: number = 0;
    public listado_ventas_normales_anuales: any[];
    public listado_ventas_plus_anuales: any[];
    public listado_top_5_productos: any[];
    public listado_ventas_no_devoluciones: any[];
    public listado_ventas_si_devoluciones: any[];

    constructor(public service: AppService) { 
       this.listado_ventas_si_devoluciones = [];
       this.listado_ventas_no_devoluciones = [];
       this.listado_top_5_productos = [];
       this.listado_ventas_plus_anuales = [];
       this.listado_ventas_normales_anuales = [];
    }

    ngOnInit(){
        this.get_top_productos();
        this.get_ventas_devoluciones();
        this.get_ventas_anuales();
    }

    get_top_productos(){

        var response;

        this.service.get_top_5_productos().subscribe(

            data => response = data,

            err => {

                console.log( "Error al consultar el servicio." );
            },

            () => {

                this.listado_top_5_productos = response;
                for (const t of this.listado_top_5_productos) {
                    this.top.push(t.Cantidad);
                    this.nombre_top.push(t.Producto);
                }
            }  
        );
    }

    get_ventas_anuales(){

        var response;

        this.service.get_ventas_normales_anuales().subscribe(

            data => response = data,

            err => {

                console.log( "Error al consultar el servicio." );
            },

            () => {

                this.listado_ventas_normales_anuales = response;
                for (const t of this.listado_ventas_normales_anuales) {
                    this.ventas_normales_data.push(t.Total);
                }
            }  
        );

        this.service.get_ventas_plus_anuales().subscribe(

            data => response = data,

            err => {

                console.log( "Error al consultar el servicio." );
            },

            () => {

                this.listado_ventas_plus_anuales = response;
                for (const t of this.listado_ventas_plus_anuales) {
                    this.ventas_label.push(t.Mes);
                    this.ventas_plus_data.push(t.Total);
                }
            }  
        );

        var set = new Set ()
    }

    get_ventas_devoluciones(){

        var response;

        this.service.get_grafico_nodevoluciones().subscribe(

            data => response = data,

            err => {

                console.log( "Error al consultar el servicio." );
            },

            () => {
                this.listado_ventas_no_devoluciones = response;
                this.ventas_con_devolucion = Number(this.listado_ventas_no_devoluciones[0]["VentasTotal"]);
                this.test.push(this.ventas_con_devolucion);
            }  
        );

        this.service.get_grafico_sidevoluciones().subscribe(

            data => response = data,

            err => {

                console.log( "Error al consultar el servicio." );
            },

            () => {

                this.listado_ventas_si_devoluciones = response;
                this.ventas_sin_devolucion = Number(this.listado_ventas_si_devoluciones[0]["VentasTotal"]);
                this.test.push(this.ventas_sin_devolucion);
            }  
        );
    }

    public barchartoptions: ChartOptions = {
        responsive: true,
        scales: { xAxes: [{}], yAxes: [{}] },
        plugins: {
        datalabels: {
            anchor: 'end',
            align: 'end',
        }
        }
    };
    public barchartcabels: Label[] = this.ventas_label;
    public barcharttype: ChartType = 'bar';
    public barchartlegend = true;
    public barchartplugins = [pluginDataLabels];

    public barchartdata: ChartDataSets[] = [
        { data: this.ventas_plus_data, label: 'Ventas Plus' },
        { data: this.ventas_normales_data, label: 'Ventas Normales' }
    ];

    public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
        console.log(event, active);
    }

    public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
        console.log(event, active);
    }

    public piechartoptions: ChartOptions = {
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

    public piechartlabels: Label[] = [['Ventas sin Devolución'], ['Ventas con Devolución']];
    public piechartdata: number[] = this.test;
    public pieCharttype: ChartType = 'pie';
    public piechartlegend = true;
    public piechartplugins = [pluginDataLabels];
    public piechartcolors = [
    {
        backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)'],
    },];
    
    public polarareachartlabels: Label[] = this.nombre_top;
    public polarareachartdata: number[] = this.top;
    public polararealegend = true;
    public polarareacharttype: ChartType = 'polarArea';
    public polarareachartcolors: Array<any> = [
        {
          backgroundColor: [
            'rgba(52, 152, 219,0.4)',
            'rgba(26, 188, 156,0.4)',
            'rgba(241, 196, 15,0.4)',
            'rgba(211, 84, 0,0.4)',
            'rgba(127, 140, 141,0.4)'
          ],
        }
      ];
}