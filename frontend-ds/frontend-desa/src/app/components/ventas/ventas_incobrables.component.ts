// Aqui codificara Melvin

//Aqui codifica Marcela

import { Component }  from '@angular/core';
import { AppService } from 'src/app/app.service';
import { getClosureSafeProperty } from '@angular/core/src/util/property';

@Component({

    selector: 'ventas_incobrables',
    templateUrl: './ventas_incobrables.component.html'
})

export class GetVentasIncobrablesComponent {
    public listado_ventas_incobrables: any[];
    public listado_clientes: any[];
    public listado_detalle_ventas: any[];
    term: any[];
    

    constructor( public service: AppService ){

        this.listado_ventas_incobrables = [];
    }

    public VentasIncobrables = {
        Id_venta: "",
        Cod_factura: "",
        Fecha_venta: "",
        Fecha_envio: "",
        Fecha_entrega: "",
        Subtotal: "",
        Descuento: "",
        Isv: "",
        Total:"",
        Identidad: "",
        Id_cliente: "",
        Nombre_compania: "",
        Nombre_contacto: "",
        Apellido_contacto: "",
        Telefono_contacto: "",
        Email_contacto: "",
        Descripcion_estatus:""
    }

    public busqueda = {
         Id_estatus: ""
    }

    ngOnInit(){

        this.get_ventas_incobrables();
    }

    get_ventas_incobrables(){

        var response;

        this.service.get_ventas_incobrables().subscribe(

            data => response = data,

            err => {

                console.log( "Error al consultar el servicio." );
            },

            () => {

                this.listado_ventas_incobrables = response;
            }  
        );
    }

    datosVentas_incobrables(ventasincobrables){
        this.busqueda = {
            Id_estatus: ventasincobrables.Id_estatus
        }
    }

    get_venta_incobrable(id_estatus) {

        var response;

        var load = { Id_estatus: id_estatus }

        this.service.get_ventas_incobrables().subscribe
        (
            data => response = data,
            
            err => {

                console.log( "Error al consultar el servicio." ); 
            },

            () => {

                this.get_ventas_incobrables();
            }
        );
    }

    
}