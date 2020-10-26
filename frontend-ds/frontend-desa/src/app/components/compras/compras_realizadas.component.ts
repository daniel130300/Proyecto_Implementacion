import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
const swal = require('sweetalert2');


@Component({
    selector: 'compras_realizadas',
    templateUrl: './compras_realizadas.component.html'
})

export class GetComprasRealizadasComponent {
    
    public listado_compras: any[];

    term: any;

    constructor(public service:AppService){
        this.listado_compras = [];
    }

    ngOnInit(){
        this.get_compras();
    }
    
    get_compras(){
        var response;
        this.service.get_compras().subscribe(
            data=>response = data,
            err => {
                console.log("Error al consultar el servicio");
            },
            ()=>{
                 this.listado_compras = response;
            }  
        );
    }

    generar_reporte(){
        swal.fire
            ({
                title: '¿Desea generar reporte de pedidos realizados?',
                showDenyButton: true,
                confirmButtonText: `Si`,
                denyButtonText: `No`
            }).then((result) => 
            {
                if (result.isConfirmed) 
                {
                    this.generarpdf();
                }

            })
    }

    generarpdf()
    {

        console.log(this.listado_compras);

        var fecha_actual = new Date().toLocaleString()
        
        var img = new Image()
        img.src = 'assets/img/LogoKyD2.png'
        
        const doc = new jsPDF('l', 'mm', 'a4');

        const autoTable = 'autoTable';

        doc.setFont("Helvetica");

        doc.setFontSize(20);
        doc.addImage(img, 'png', -10, -20, 80, 80)
        doc.text("Variedades K y D", 155, 14, {align: "center"});
        doc.setFontSize(12);
        doc.text("Dirección: Zonal Belen, cerca de Banco FICOHSA", 110, 20);
        doc.text("Télefono: (504) 9797-7966", 130, 26);
        doc.text("Correo: variedades_k_y_d@gmail.com", 120, 32);
        doc.setFontSize(14);
        doc.text("Reporte de Pedidos Realizados", 123, 40);
        doc.setFontSize(12);
        doc.text("Fecha: " + fecha_actual, 15, 50);
        //doc.text("Identidad: " + String(this.VentasNormal.Identidad), 15, 85);
   
        var rows = [];
        
        this.listado_compras.forEach(element => {      
            var temp = [element.Id_compra, element.Codigo_factura, element.Descripcion_estatus, element.Nombre_compania, element.Fecha_orden, element.Fecha_recibida, element.Gastos_adicionales, element.Monto_total];
            rows.push(temp);
        });

        console.log(rows);

        doc[autoTable]({
            head: [['ID Compra', 'Código Factura', 'Estado', 'Proveedor', 'Fecha de la Orden', 'Fecha de Recibido', 'Gastos Adicionales', 'Monto Total']],
            body: rows,
            startY: 55,
            styles: {font: "Helvetica", fontsize: 12}
        });

        //doc.text("¡Gracias por su compra!", 75, 280);

        doc.save("Reporte_Pedidos_Realizados_" + fecha_actual);
       
    }

}