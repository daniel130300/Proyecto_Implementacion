
import { Component }  from '@angular/core';
import { AppService } from 'src/app/app.service';
import { getClosureSafeProperty } from '@angular/core/src/util/property';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { DatePipe } from '@angular/common'
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
    constructor( public service: AppService,public datepipe: DatePipe){

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

    generarpdf()
    {
        
        
        var fecha_actual = new Date().toLocaleString()

        const doc = new jsPDF('l', 'mm', [297,420]);

        const autoTable = 'autoTable';

        doc.setFont("helvetica");
        doc.setFont("helvetica");

        doc.setFontSize(20);
        doc.text("Variedades K y D", 210, 10, {align: "center"});
        doc.setFontSize(12);
        doc.text("Dirección: Zonal Belen, cerca de Banco FICOHSA", 160, 16);
        doc.text("Télefono: (504) 9797-7966", 180, 22);
        doc.text("Correo: variedades_k_y_d@gmail.com", 170, 28);
        doc.setFontSize(14);
        doc.text("Reporte Ventas Pendientes de Envio", 206, 36, {align: "center"});
        doc.setFontSize(12);
        doc.text("Fecha: " + fecha_actual, 15, 44);
   
        var img = new Image()
        img.src = 'assets/img/LogoKyD2.png'
        doc.addImage(img, 'png', -10, -20, 80, 80)
        var rows = [];
        
        this.listado_ventas_pendientes_envio.forEach(element => {      

            var temp = [element.Id_venta,this.datepipe.transform(element.Fecha_venta,'yyyy-MM-dd'), element.Subtotal, element.Descuento, element.Isv,
            element.Total,element.Nombre_compania,element.Nombre_departamento,element.Nombre_ciudad, element.Direccion,
            element.Nombre_contacto,element.Apellido_contacto,element.Telefono_contacto,element.Email_contacto,element.Descripcion_estatus];
            rows.push(temp);
        });

        console.log(rows);

        doc[autoTable]({
            head: [['Id Ventas', 'Fecha Venta', 'Subtotal', 'Descuento', 'ISV','Total','Nombre Compañia','Departamento','Ciudad',
            'Direccion','Nombre Contacto','Apellido Contacto','Telefono','Correo Electronico','Estado']],
            body: rows,
            startY: 50,
            styles: {font: "helvetica", fontsize: 12}
        });


        doc.save("Reporte Ventas Pendientes de Envio_"+fecha_actual);
        
       
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
    pasar_datos_pendientes(pendientes)
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
}