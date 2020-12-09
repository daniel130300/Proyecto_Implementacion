import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { IfStmt } from '@angular/compiler';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
const swal = require('sweetalert2');


@Component({
    selector: 'compras_pendientes',
    templateUrl: './compras_pendientes.component.html'
})

export class GetComprasPendientesComponent {
    public listado_compras_pendientes: any[];
    public listado_productos_compra: any[];
    public listado_estatus: any[];
    public id_compra: any = "";
    public estatus: any = "";
    public gastos: any = "";
    public subtotal: number; 
    public total: number; 
    public isv: number; 
    public term:any;

    constructor(public service:AppService){
        this.listado_compras_pendientes = [];
        this.subtotal = 0.00;
        this.total = 0.00;
        this.isv = 0.00;
    }

    public Compra = {
        id_compra: "",
        id_estatus: "",
    }

    public Producto = {
        id_producto: "", 
        stock: ""

    }

    public DetalleCompra = {
        id_compra: "",
        id_producto: "", 
        cantidad_ordenada: "", 
        cantidad_recibida: "",
        cantidad_rechazada: ""
    }

    ngOnInit(){
        this.get_compras_pendientes();
        this.get_estatus_compra();
    }
    
    get_compras_pendientes(){
        var response;
        this.service.get_compras_pendientes().subscribe(
            data=>response = data,
            err => {
                console.log("Error al consultar el servicio");
            },
            ()=>{
                 this.listado_compras_pendientes = response;
            }  
        );
    }

    get_productos_compra(id_compra){
        this.listado_productos_compra = [];
        var response;
        this.service.get_productos_compra(id_compra).subscribe(
            data=>response = data,
            err => {
                this.listado_productos_compra = [];
                console.log("Error al consultar el servicio");
            },
            ()=>{
                 this.listado_productos_compra = response;
                 console.log(this.listado_productos_compra);
                 this.calculos();
            }  
        );
    }

    calculos()
    {
        this.subtotal = 0;
        this.isv = 0;
        this.total = 0;
        
        for(var i = 0; i < this.listado_productos_compra.length; i++) {
            this.subtotal += this.listado_productos_compra[i].Cantidad_ordenada * this.listado_productos_compra[i].Precio_compra;
            this.isv = this.subtotal * 0.15;
            this.total = this.subtotal + this.isv;
        }
        this.total +=  parseInt( this.gastos );
    }

    get_estatus_compra(){
        this.listado_estatus = [];
        var response;
        this.service.get_estatus_compra().subscribe(
            data=>response = data,
            err => {
                this.listado_estatus = [];
                console.log("Error al consultar el servicio");
            },
            ()=>{
                 this.listado_estatus = response;
            }  
        );
    }

    pasar_datos_compra(datos_compra)
    {
        this.id_compra = datos_compra.Id_compra;
        this.estatus = datos_compra.Id_estatus;   
        this.gastos = datos_compra.Gastos_adicionales; 
        this.get_productos_compra(datos_compra.Id_compra); 
    }

    pasar_datos_detalle_compra(datos_detalle){
        this.DetalleCompra=
        {
            id_compra: datos_detalle.Id_compra,
            id_producto: datos_detalle.Id_producto, 
            cantidad_ordenada: datos_detalle.Cantidad_ordenada, 
            cantidad_recibida: datos_detalle.Cantidad_recibida,
            cantidad_rechazada: datos_detalle.Cantidad_rechazada
            
        }
        console.log(this.DetalleCompra);
    }

    update_detalle_compra()
    {
        this.DetalleCompra=
        {
            id_compra: this.DetalleCompra.id_compra,
            id_producto: this.DetalleCompra.id_producto, 
            cantidad_ordenada: this.DetalleCompra.cantidad_ordenada, 
            cantidad_recibida: this.DetalleCompra.cantidad_recibida,
            cantidad_rechazada: this.DetalleCompra.cantidad_rechazada
            
        }

        if(this.DetalleCompra.cantidad_rechazada == "0")
        {
            this.DetalleCompra.cantidad_rechazada = "0";
        }

        if(this.DetalleCompra.cantidad_recibida == "" || this.DetalleCompra.cantidad_rechazada == "")
        {
            swal.fire({
                title: "No ha ingresado un dato, por favor hágalo para poder guardar.",
                icon: 'error'
            });
        }
        else
        {

            if ( isNaN(parseInt(this.DetalleCompra.cantidad_recibida)) ||  isNaN(parseInt(this.DetalleCompra.cantidad_rechazada)) )
            {
                swal.fire({
                    title: "No puede ingresar texto.",
                    icon: 'error'
                }); 
            }
            else
            {

                if(this.DetalleCompra.cantidad_recibida > this.DetalleCompra.cantidad_ordenada)
                {
                    swal.fire({
                        title: "La cantidad recibida no puede ser mayor que la cantidad ordenada.",
                        icon: 'error'
                    });
                }
                else
                {
                    if(this.DetalleCompra.cantidad_rechazada > this.DetalleCompra.cantidad_ordenada)
                    {
                        swal.fire({
                            title: "La cantidad rechazada no puede ser mayor que la cantidad ordenada.",
                            icon: 'error'
                        });    
                    }
                    else
                    {
                        if(this.DetalleCompra.cantidad_recibida < "0" || this.DetalleCompra.cantidad_rechazada < "0")
                        {
                            swal.fire({
                                title: "La cantidad no puede ser negativa.",
                                icon: 'error'
                            });
                        }
                        else
                        {
                            var response;
                            this.service.update_detalle_compra(this.DetalleCompra).subscribe(
                                data=>response = data,
                                err => {
                                    console.log("Error al consultar servicio"); 
                                },
                                ()=>{

                                    this.DetalleCompra = {
                                        id_compra: "",
                                        id_producto: "", 
                                        cantidad_ordenada: "", 
                                        cantidad_recibida: "",
                                        cantidad_rechazada: "" 
                                    }

                                }
                            );            
                        }
                    }
                }
            }
        }      
    }

    guardar_cambios(){
        
        if(this.id_compra=="")
        {

            swal.fire({
                title: "No ha seleccionado ningún pedido.",
                icon: 'error'
            });
        }
        else 
        {
            if(this.estatus=="4")
            {
                this.Compra = 
                {
                    id_compra: this.id_compra,
                    id_estatus: this.estatus
                }
                
                this.update_compra();

                for(var i = 0; i < this.listado_productos_compra.length; i++) {
                    if(this.id_compra == this.listado_productos_compra[i].Id_compra){
                        this.Producto = 
                        {
                            id_producto: this.listado_productos_compra[i].Id_producto,  
                            stock: this.listado_productos_compra[i].Stock + ( (this.listado_productos_compra[i].Cantidad_recibida)-(this.listado_productos_compra[i].Cantidad_rechazada) )
                        }
                    }
                    
                    this.update_producto_compra();
                }
                
                this.id_compra = "";
                this.estatus = "";
                this.gastos = "";
                this.subtotal = 0.00;
                this.total = 0.00;
                this.isv = 0.00; 
                
                swal.fire({
                    title: "Cambios guardados exitosamente.",
                    icon: 'success'
                });         
            }
            else
            {
                swal.fire({
                    title: "Cambie el Estado a Recibido para poder guardar el pedido recibido.",
                    icon: 'error'
                });

            }
       }
    }

    update_compra(){
        var response;
        this.service.update_compra(this.Compra).subscribe(
            data=>response = data,
            err => {
                console.log("Error al consultar servicio"); 
            },
            ()=>{

                this.Compra = {
                    id_compra: "",
                    id_estatus: ""
                }
                this.listado_compras_pendientes = [];
                this.get_compras_pendientes();
            }
        );
    }

    update_producto_compra(){
        var response;
        this.service.update_producto_compra(this.Producto).subscribe(
            data=>response = data,
            err => {
                console.log("Error al consultar servicio"); 
            },
            ()=>{

                this.Producto = {
                    id_producto: "", 
                    stock: ""
                }
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
            }).then((result) =>{
                if (result.isConfirmed) 
                {
                    this.generarpdf();
                }
            })
    }

    generarpdf()
    {
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
        doc.text("Reporte de Pedidos Pendientes", 123, 40);
        doc.setFontSize(12);
        doc.text("Fecha: " + fecha_actual, 15, 50);
   
        var rows = [];
        
        this.listado_compras_pendientes.forEach(element => {      
            var temp = [element.Id_compra, element.Codigo_factura, element.Fecha_orden, element.Nombre_compania, element.Descripcion_estatus];
            rows.push(temp);
        });

        console.log(rows);

        doc[autoTable]({
            head: [['ID Compra', 'Código Factura', 'Fecha de la Orden', 'Proveedor', 'Estado']],
            body: rows,
            startY: 55,
            styles: {font: "Helvetica", fontsize: 12}
        });

        doc.save("Reporte_Pedidos_Realizados_" + fecha_actual);
    }
}