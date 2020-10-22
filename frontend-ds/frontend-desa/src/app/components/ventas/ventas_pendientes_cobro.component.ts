import { Component }  from '@angular/core';
import { AppService } from 'src/app/app.service';
import { getClosureSafeProperty } from '@angular/core/src/util/property';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { DatePipe } from '@angular/common'

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

    constructor( public service: AppService, public datepipe: DatePipe ){

        this.listado_ventas_pendientes_cobro = [];
    }

    ngOnInit(){

        this.get_ventas_pendientes_cobro();
        this.get_estado();
    }

    generarpdf()
    {
        console.log(this.listado_ventas_pendientes_cobro);

        var fecha_actual = new Date().toLocaleString()

        const doc = new jsPDF('l', 'mm', [297, 420]);

        const autoTable = 'autoTable';

        doc.setFont("courier");

        doc.setFontSize(20);
        doc.text("Variedades K y D", 210, 10, {align: "center"});
        doc.text("Reporte Ventas Pendientes de Cobro", 210, 22, {align: "center"});
        doc.setFontSize(12);
        doc.text("Fecha: " + fecha_actual, 15, 45);

        var img = new Image()
        img.src = 'assets/img/LogoKyD2.png'
        doc.addImage(img, 'png', -10, -20, 80, 80)
   
        var rows = [];
        
        this.listado_ventas_pendientes_cobro.forEach(element => {      
            var temp = [element.Id_venta, this.datepipe.transform(element.Fecha_venta,'yyyy-MM-dd'), element.Descripcion_plazo,
                        this.datepipe.transform(element.Fecha_envio,'yyyy-MM-dd'), this.datepipe.transform(element.Fecha_entrega,'yyyy-MM-dd'), 
                        element.Nombre_compania, element.Nombre_contacto, element.Apellido_contacto, element.Telefono_contacto, element.Subtotal,
                        element.Descuento, element.Isv, element.Total, element.Cantidad_abonada, element.Estado];
            rows.push(temp);
        });

        console.log(rows);

        doc[autoTable]({
            head: [['ID Venta', 'Fecha Venta', 'Plazo de Pago', 'Fecha Envio', 'Fecha Entrega', 'Nombre Compañia', 'Nombre Contacto', 
                    'Apellido Contacto', 'Telefono Contacto', 'Subtotal', 'Descuento', 'ISV', 'Total', 'Total Abono', 'Estado']],
            body: rows,
            startY: 50,
            styles: {font: "courier", fontsize: 12}
        });

        doc.save("Reporte Ventas Pendientes de Cobro");
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
        if (this.Cantidad_abono <= this.Cantidad_pendiente && this.Cantidad_abono >0)
        {   
            this.insertar_abono_venta();
            swal.fire({
                icon: 'success',
                title:"Abono agregado exitosamente."
              })
        }
        else
        {
            swal.fire({
                icon: 'error',
                title:"La cantidad abonada no puede ser mayor a la cantidad pendiente y(o) menor a 0"
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