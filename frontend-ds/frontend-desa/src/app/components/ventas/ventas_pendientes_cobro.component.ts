//Aqui codifica Marcela

import { Component }  from '@angular/core';
import { AppService } from 'src/app/app.service';
import { getClosureSafeProperty } from '@angular/core/src/util/property';


const swal = require('sweetalert2');

@Component({

    selector: 'ventas_pendientes_cobro',
    templateUrl: './ventas_pendientes_cobro.component.html'
})



export class GetVentasPendientesCobroComponent {
    public listado_ventas_pendientes_cobro: any[];
    public listado_estados: any[];
    public Id_venta: any;
    public Id_estado: any = "";
    public Cantidad_abono: any;
    public Total_venta: any;
    public Total_abonado: any;
    public Cantidad_pendiente: any;
    
    term: any[];

    constructor( public service: AppService ){

        this.listado_ventas_pendientes_cobro = [];
    }

    ngOnInit(){

        this.get_ventas_pendientes_cobro();
        this.get_estado();
    }

    public Abono_venta = {
        Id_venta: "",
        Abono: ""
    }

    get_ventas_pendientes_cobro(){

        var response;

        this.service.get_ventas_pendientes_cobro().subscribe(

            data => response = data,

            err => {

                console.log( "Error al consultar el servicio." );
            },

            () => {

                this.listado_ventas_pendientes_cobro = response;
            }  
        );
    }

    get_estado(){

        this.listado_estados = [];

        var response;

        this.service.get_estado_incobrable().subscribe(

            data => response = data,

            err => {

                console.log( "Error al consultar el servicio." );
            },

            () => {

                this.listado_estados = response;
            }  
        );
    }

    pasarIdVenta(Venta)
    {
       this.Id_venta = Venta.Id_venta;
       this.Total_venta = Venta.Total ;
       this.Total_abonado = Venta.Cantidad_abonada;
       this.Cantidad_pendiente = this.Total_venta - this.Total_abonado; 
    }

    Asignar_datos_abono()
    {
        this.Abono_venta = 
        {
            Id_venta: this.Id_venta,
            Abono: this.Cantidad_abono
        }   
    }

    insertar_abono_venta(){
        var response;
        this.Asignar_datos_abono();
        this.service.insertar_abono_venta(this.Abono_venta).subscribe(
            data=>response = data,
            err => {
                console.log("Error al consultar servicio"); 
            },
            ()=>{
                this.get_ventas_pendientes_cobro();
                this.LimpiarInputs();
            }
        );
    }


    InsertarAbonoValidado()
    {
        if (this.Cantidad_abono <= this.Cantidad_pendiente)
        {   
            this.insertar_abono_venta();
        }
        else
        {
            swal.fire({
                icon: 'error',
                title:"La cantidad abonada no puede ser mayor a la cantidad pendiente"
              })
        }
    }

    LimpiarInputs()
    {
        this.Id_venta = "";
        this.Id_estado = "";
        this.Cantidad_abono = "";
        this.Total_venta = "";
        this.Total_abonado = "";
        this.Cantidad_pendiente = "";
    }

}