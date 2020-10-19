
import { Component }  from '@angular/core';
import { AppService } from 'src/app/app.service';
import { getClosureSafeProperty } from '@angular/core/src/util/property';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

const swal = require('sweetalert2');

@Component({

    selector: 'ventas_pendientes_envio',
    templateUrl: './ventas_pendientes_envio.component.html',
    styleUrls: ['../pandora.component.css', '../containerIndex.component.css'],
})

export class GetVentasPendientesEnvioComponent {
    public listado_ventas_pendientes_envio: any[];
    public listado_estatus: any[];
    fechas: any[];
    //currentDate = new Date();
     yesterday = new Date(new Date().setDate(new Date().getDate()));
//DECLARAR
    term: any[];
    constructor( public service: AppService ){

        this.listado_ventas_pendientes_envio = [];
    }

    public VentasPendientesEnvio = {

        Fecha_venta: "",
        Subtotal: "",
        Descuento:"",
        ISV: "",
        Total:"",
        Nombre_compania: "",
        Departamento: "",
        Ciudad: "",
        Direccion: "",
        Nombre_contacto: "",
        Apellido_contacto: "",
        Telefono_contacto: "",
        Email_contacto: ""
    }

    public modifica = {
        Id_venta: "",
        Id_estado_envio: "",
        Fecha_envio: "",
        Fecha_entrega: ""
    }


    ngOnInit(){

        this.get_ventas_pendientes_envio();
        this.get_estado();
    }

    get_ventas_pendientes_envio(){

        var response;

        this.service.get_ventas_pendientes_envio().subscribe(

            data => response = data,

            err => {

                console.log( "Error al consultar el servicio." );
            },

            () => {

                this.listado_ventas_pendientes_envio = response;
            }  
        );
    }

    get_estado(){

        this.listado_estatus = [];

        var response;

        this.service.get_estado().subscribe(

            data => response = data,

            err => {

                console.log( "Error al consultar el servicio." );
            },

            () => {

                this.listado_estatus = response;
            }  
        );
    }
    pasarDatosPendientes(pendientes)
    {
        this.modifica = 
        {
            Id_venta: pendientes.Id_venta,
            Id_estado_envio: pendientes.Id_estado_envio,
            Fecha_envio:pendientes.Fecha_envio,
            Fecha_entrega:pendientes.Fecha_entrega,
        }   

    }
    

    update_ventas_pendientes_envio()
    {
        var response;
        this.modifica.Id_estado_envio='9';
        console.log(this.modifica);
        this.service.update_ventas_pendientes_envio(this.modifica).subscribe(
            data=>response = data,
            err => {
                console.log("Error al consultar servicio"); 
            },
            ()=>{
                if(this.modifica.Id_venta == "")
                {
                    swal.fire({
                        icon: 'error',
                        title:"Por favor, seleccione una venta de la tabla"
                    })
                }
                else
                    if(this.modifica.Fecha_entrega == "" || this.modifica.Fecha_envio == "")
                    {
                        swal.fire({
                            icon: 'error',
                            title:"Por favor, ingrese las fechas solicitadas"
                        })
                    }
                    else
                        if(this.modifica.Fecha_envio > this.modifica.Fecha_entrega)
                        {
                            swal.fire({
                                icon: 'error',
                                title:"Lo sentimos, la fecha de entrega no puede ser menor que la de envío"
                            })
                        }
                        else
                            {
                                this.modifica = 
                                {
                                    Id_venta: "",
                                    Id_estado_envio: "",
                                    Fecha_envio: "",
                                    Fecha_entrega: ""
                                }

                                swal.fire({
                                    title: "Operación realizada exitosamente.",
                                    icon: 'success'
                                });

                                this.get_ventas_pendientes_envio();
                            }
            }
        );
    }

    /*datosVentas_pagadas(ventaspagadas){
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
*/
    
}