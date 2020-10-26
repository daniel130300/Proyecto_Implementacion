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
    
    /* ------------------------------------- DECLARACIONES DE TIPO GLOBAL ------------------------------------------------------- */
    public listado_compras_pendientes: any[];
    public listado_productos_compra: any[];
    public listado_estatus: any[];
    public Id_Compra: any = "";
    public Estatus: any = "";
    public Gastos: any = "";
    public subtotal: number; //variable para calcular el subtotal de la compra
    public total: number; //variable para calcular el total de la compra
    public isv: number; //variable para calcular el isv de la compra


    constructor(public service:AppService){
        this.listado_compras_pendientes = [];
        this.subtotal = 0.00;
        this.total = 0.00;
        this.isv = 0.00;
    }

    /* ------------------------------------------- DECLARACION DE OBJETOS ------------------------------------------------------- */
    /* Objeto que almacena el Id_compra y el Id_estatus para actualizarlo en la base de datos */
    public Compra = {
        Id_compra: "",
        Id_estatus: "",
    }

    public Producto = {
        Id_producto: "", 
        Stock: ""

    }

    public Detalle_compra = {
        Id_compra: "",
        Id_producto: "", 
        Cantidad_ordenada: "", 
        Cantidad_recibida: "",
        Cantidad_rechazada: ""
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
        this.total +=  parseInt( this.Gastos );
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

    pasarDatosCompra(compra)
    {

        this.Id_Compra = compra.Id_compra;
        this.Estatus = compra.Id_estatus;   
        this.Gastos = compra.Gastos_adicionales; 
        this.get_productos_compra(compra.Id_compra); 

    }

    pasarDatosDetalleCompra(detalle){

        
        
        this.Detalle_compra=
        {
            Id_compra: detalle.Id_compra,
            Id_producto: detalle.Id_producto, 
            Cantidad_ordenada: detalle.Cantidad_ordenada, 
            Cantidad_recibida: detalle.Cantidad_recibida,
            Cantidad_rechazada: detalle.Cantidad_rechazada
            
        }
        console.log(this.Detalle_compra);

        //this.update_detalle_compra();
    }

    update_detalle_compra()
    {

        this.Detalle_compra=
        {
            Id_compra: this.Detalle_compra.Id_compra,
            Id_producto: this.Detalle_compra.Id_producto, 
            Cantidad_ordenada: this.Detalle_compra.Cantidad_ordenada, 
            Cantidad_recibida: this.Detalle_compra.Cantidad_recibida,
            Cantidad_rechazada: this.Detalle_compra.Cantidad_rechazada
            
        }

        if(this.Detalle_compra.Cantidad_rechazada == "0")
        {
            this.Detalle_compra.Cantidad_rechazada = "0";
        }

        if(this.Detalle_compra.Cantidad_recibida == "" || this.Detalle_compra.Cantidad_rechazada == "")
        {
            swal.fire({
                title: "No ha ingresado un dato, por favor hágalo para poder guardar.",
                icon: 'error'
            });
        }
        else
        {

            if ( isNaN(parseInt(this.Detalle_compra.Cantidad_recibida)) ||  isNaN(parseInt(this.Detalle_compra.Cantidad_rechazada)) )
            {
                swal.fire({
                    title: "No puede ingresar texto.",
                    icon: 'error'
                }); 
            }
            else
            {

                if(this.Detalle_compra.Cantidad_recibida > this.Detalle_compra.Cantidad_ordenada)
                {
                    swal.fire({
                        title: "La cantidad recibida no puede ser mayor que la cantidad ordenada.",
                        icon: 'error'
                    });
                }
                else
                {
                    if(this.Detalle_compra.Cantidad_rechazada > this.Detalle_compra.Cantidad_ordenada)
                    {
                        swal.fire({
                            title: "La cantidad rechazada no puede ser mayor que la cantidad ordenada.",
                            icon: 'error'
                        });    
                    }
                    else
                    {
                        if(this.Detalle_compra.Cantidad_recibida < "0" || this.Detalle_compra.Cantidad_rechazada < "0")
                        {
                            swal.fire({
                                title: "La cantidad no puede ser negativa.",
                                icon: 'error'
                            });
                        }
                        else
                        {
                            var response;
                            this.service.update_detalle_compra(this.Detalle_compra).subscribe(
                                data=>response = data,
                                err => {
                                    console.log("Error al consultar servicio"); 
                                },
                                ()=>{

                                    this.Detalle_compra = {
                                        Id_compra: "",
                                        Id_producto: "", 
                                        Cantidad_ordenada: "", 
                                        Cantidad_recibida: "",
                                        Cantidad_rechazada: "" 
                                    }

                                }
                            );            
                        }
                    }
                }


            }


        }
        
    }

    guardarCambios(){
        
       if(this.Id_Compra=="")
       {

            swal.fire({
                title: "No ha seleccionado ningún pedido.",
                icon: 'error'
            });
       }
       else 
       {
           //console.log(this.Estatus);
           if(this.Estatus=="4")
           {
               this.Compra = 
               {
                   Id_compra: this.Id_Compra,
                   Id_estatus: this.Estatus
               }
               
                this.update_compra();

                for(var i = 0; i < this.listado_productos_compra.length; i++) {
                    if(this.Id_Compra == this.listado_productos_compra[i].Id_compra){
                        this.Producto = 
                        {
                            Id_producto: this.listado_productos_compra[i].Id_producto,  
                            Stock: this.listado_productos_compra[i].Stock + ( (this.listado_productos_compra[i].Cantidad_recibida)-(this.listado_productos_compra[i].Cantidad_rechazada) )
                        }
                    }
                    //console.log(this.Detalle_compras.Id_producto);    
                    this.update_producto_compra();
                }
                
                this.Id_Compra = "";
                this.Estatus = "";
                this.Gastos = "";
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
                    Id_compra: "",
                    Id_estatus: ""
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
                    Id_producto: "", 
                    Stock: ""
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

        console.log(this.listado_compras_pendientes);

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
        //doc.text("Identidad: " + String(this.VentasNormal.Identidad), 15, 85);
   
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

        //doc.text("¡Gracias por su compra!", 75, 280);

        doc.save("Reporte_Pedidos_Realizados_" + fecha_actual);
       
    }
}