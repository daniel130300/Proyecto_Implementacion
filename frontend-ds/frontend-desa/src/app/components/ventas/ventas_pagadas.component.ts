//Aqui codifica Marcela

import { Component }  from '@angular/core';
import { AppService } from 'src/app/app.service';
import { getClosureSafeProperty } from '@angular/core/src/util/property';

@Component({

    selector: 'ventas_pagadas',
    templateUrl: './ventas_pagadas.component.html'
})

export class GetVentasPagadasComponent {
    public listado_ventas_pagadas: any[];
    public listado_clientes: any[];
    public listado_detalle_ventas: any[];
    term: any[];
    

    constructor( public service: AppService ){

        this.listado_ventas_pagadas = [];
    }

    public VentasPagadas = {

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

        this.get_ventas_pagadas();
    }

    get_ventas_pagadas(){

        var response;

        this.service.get_ventas_pagadas().subscribe(

            data => response = data,

            err => {

                console.log( "Error al consultar el servicio." );
            },

            () => {

                this.listado_ventas_pagadas = response;
            }  
        );
    }

    datosVentas_pagadas(ventaspagadas){
        this.busqueda = {
            Id_estatus: ventaspagadas.Id_estatus
        }
    }

    get_venta_pagada(id_estatus) {

        var response;

        var load = { Id_estatus: id_estatus }

        this.service.get_venta_pagada().subscribe
        (
            data => response = data,
            
            err => {

                console.log( "Error al consultar el servicio." ); 
            },

            () => {

                this.get_ventas_pagadas();
            }
        );
    }

    
}