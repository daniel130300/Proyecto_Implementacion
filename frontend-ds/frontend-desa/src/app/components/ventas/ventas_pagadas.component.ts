//Aqui codifica Marcela

import { Component }  from '@angular/core';
import { AppService } from 'src/app/app.service';
import { getClosureSafeProperty } from '@angular/core/src/util/property';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { DatePipe } from '@angular/common'

@Component({

    selector: 'ventas_pagadas',
    templateUrl: './ventas_pagadas.component.html'
})

export class GetVentasPagadasComponent {
    public listado_ventas_pagadas: any[];
    public listado_clientes: any[];
    public listado_detalle_ventas: any[];
    term: any[];
    

    constructor( public service: AppService, public datepipe: DatePipe){

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

    generarpdf()
    {
        console.log(this.listado_ventas_pagadas);

        var fecha_actual = new Date().toLocaleString()

        const doc = new jsPDF('l', 'mm', [297, 420]);

        const autoTable = 'autoTable';

        doc.setFont("helvetica");

        doc.setFontSize(20);
        doc.text("Variedades K y D", 210, 10, {align: "center"});
        doc.text("Reporte Ventas Pagadas", 210, 22, {align: "center"});
        doc.setFontSize(12);
        doc.text("Fecha: " + fecha_actual, 15, 45);

        var img = new Image()
        img.src = 'assets/img/LogoKyD2.png'
        doc.addImage(img, 'png', -10, -20, 80, 80)
   
        var rows = [];
        
        this.listado_ventas_pagadas.forEach(element => {      
            var temp = [element.Id_venta, this.datepipe.transform(element.Fecha_venta,'yyyy-MM-dd'), this.datepipe.transform(element.Fecha_envio,'yyyy-MM-dd'), this.datepipe.transform(element.Fecha_entrega,'yyyy-MM-dd'), element.Subtotal, element.Descuento, element.Isv, element.Total, element.Identidad, element.Nombre_compania, element.Nombre_contacto, element.Apellido_contacto, element.Telefono_contacto, element.Telefono_contacto, element.Email_contacto];
            rows.push(temp);
        });

        console.log(rows);

        doc[autoTable]({
            head: [['ID Venta', 'Fecha Venta', 'Fecha Envio', 'Fecha Entrega', 'Subtotal', 'Descuento', 'ISV', 'Total', 'Identidad Cliente', 'Nombre Compañia', 'Nombre Contacto', 'Apellido Contacto', 'Telefono', 'Email']],
            body: rows,
            startY: 50,
            styles: {font: "helvetica", fontsize: 12}
        });

        doc.save("Reporte Ventas Pagadas "+fecha_actual);
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