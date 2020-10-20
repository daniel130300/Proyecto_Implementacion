import { Component }  from '@angular/core';
import { AppService } from 'src/app/app.service';
import jsPDF from 'jspdf';
import { PdfMakeWrapper, Txt, Table } from 'pdfmake-wrapper';
import {pdfmake} from 'pdfmake';
import pdfFonts from "pdfmake/build/vfs_fonts"; 
const swal = require('sweetalert2');

@Component({

    selector: 'nueva_venta_normal',
    templateUrl: './nueva_venta_normal.component.html'
    
})

export class GetVentaNormalComponent 
{
    public listado_productos: any[];
    public listado_clientes: any[];
    public listado_plazos_pago:   any[];
    public listado_tipos_pago:   any[];
    public listado_tipo_cliente: any[];
    public listado_productos_agregados: any [] = [];
    public subtotal: any = 0;
    public isv: any = 0;
    public total: any = 0;


    constructor( public service: AppService ){

        this.listado_productos = [];
        this.listado_clientes = [];
    }

    public VentasNormal = {
        Fecha_venta: "",
        Identidad: "",
        ISV: 0.15,
        Id_estado_envio:10,
        Id_estado_pago:5,
        Id_tipo_pago:1,
    }
    public DetalleVentaNormal = {
        Id_producto: "",
        Precio_referencial_venta: "",
        Cantidad_vendida: ""
    }

    public Productos = {
        Id_producto: "",
        Nombre_producto: "",
        Informacion_adicional_producto: "",
        Precio_referencial_venta: "",
        Cantidad: "",
        Stock:""
    }

    ngOnInit(){

    }

    generarpdf()
    {
        /*
        let contenido = document.getElementById("venta").textContent;
        let pdf = new jsPDF();
        pdf.text("Instituto Tecnólogico de Administración de Empresas", 20, 20);
        pdf.text(contenido, 30, 30);
        pdf.save("PDF_PRUEBA_NUEVA");
        */
    

        /*
        PdfMakeWrapper.setFonts(pdfFonts);
    
        const pdf = new PdfMakeWrapper();
           
        pdf.header('This is a header');
        pdf.add('Hello world!');
        
        pdf.add(
            new Txt('hi!').bold().end
        );

        pdf.add(
            new Table([
                [ 'column 1', 'column 2'],
                [ 'column 1', 'column 2']
            ]).end
        );
        
        pdf.create().open();
        */
       
    }

    
    //Funcion para insertar la venta normal
    insertar_venta_normal(){
        if(this.listado_productos_agregados.length == 0){
            swal.fire({
                title: "No ha ingresado ningún producto a la compra, por favor hágalo para poder enviar la compra.",
                icon: 'error'
            });
        }
        else
        {
            swal.fire({
                title: '¿Desea imprimir la factura para esta venta?',
                showDenyButton: true,
                confirmButtonText: `Si`,
                denyButtonText: `No`
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) 
                {
                    this.generarpdf();
                }
                else if (result.isDenied) 
                {
                  
                }
              })


            var response;
            this.service.insertar_venta_normal(this.VentasNormal).subscribe(
                data=>response = data,
                err => {
                    console.log("Error al consultar servicio"); 
                },
                ()=>{
                        console.log(this.VentasNormal);
                        this.pasarDatosDetalleVenta();
                        this.VentasNormal = {
                            Fecha_venta: "",
                            Identidad: "",
                            ISV: 0.15,
                            Id_estado_envio:10,
                            Id_estado_pago:5,
                            Id_tipo_pago:1,
                    }
                
                }
            );
        }

    }
  
    //************************************************************ */
      //Funcion para insertar el detalle de venta
      insertar_detalle_venta_normal(){
        var response;
        this.service.insertar_detalle_venta_normal(this.DetalleVentaNormal).subscribe(
            data=>response = data,
            err => {
                console.log("Error al consultar servicio"); 
            },
            ()=>{
                this.LimpiarInputs();
            }
        );
    }

    //-------------------------------------------------------

    get_productos(){
        this.listado_productos = [];
        var response;
        this.service.get_productos().subscribe(
            data=>response = data,
            err => {
                this.listado_productos = [];
                console.log("Error al consultar el servicio");
            },
            ()=>{
                 this.listado_productos = response;
            }  
        );
    }

    pasarDatosProducto(producto)
    {
        this.Productos = 
        {
            Id_producto: producto.Id_producto,
            Nombre_producto: producto.Descripcion_producto,
            Precio_referencial_venta: producto.Precio_referencial_venta,
            Informacion_adicional_producto: "Talla: " + producto.Talla + ", Color: " + producto.Color + ", Modelo: " + producto.Descripcion_modelo + ", Marca: " + producto.Nombre_marca + ", Subcategoria: " + producto.Descripcion_subcategoria, 
            Cantidad: "",
            Stock: producto.Stock
        }
    }
    //Funcion para agregar producto

    AgregarProductoVenta()
    {
        if(this.Productos.Id_producto == "")
        {
            swal.fire({
                title: "No ha seleccionado ningún producto.",
                icon: 'error'
            });
        }
        else
        {
            
            if(this.Productos.Cantidad == "")
            {
                swal.fire({
                    title: "No ha ingresado ninguna cantidad, por favor hágalo para poder agregar.",
                    icon: 'error'
                });
            }
            else
            {
                if (this.Productos.Cantidad < this.Productos.Stock)
                {
                    this.listado_productos_agregados.unshift(this.Productos);
                    console.log(this.listado_productos_agregados); 
                    this.calculos();
                    this.restar_producto_inventario_venta();
                    this.LimpiarInputsProductos();
                }
                else
                {
                    swal.fire({
                        icon: 'error',
                        title:"No hay suficiente unidades en el inventario"
                    })
                }
            }
            

        }


    }
   /* AgregarProductoVenta()
    {
        this.listado_productos_agregados.unshift(this.Productos);
        console.log(this.listado_productos_agregados); 
        this.calculos();
        this.LimpiarInputsProductos();
    }*/
    //Funcion Eliminar producto
     EliminarProductoVenta(id)
    {
        for(var i = this.listado_productos_agregados.length - 1; i >= 0; i--) 
        {
            if(this.listado_productos_agregados[i].Id_producto === id) 
            {
               this.agregar_inventario(this.listado_productos_agregados[i]) 
               this.listado_productos_agregados.splice(i, 1);
            }
        }

        this.calculos();
    }

    //Funcion Para limpiar los texbox
    LimpiarInputsProductos()
    {
        this.Productos = 
        {
            Id_producto: "",
            Nombre_producto: "",
            Precio_referencial_venta: "",
            Informacion_adicional_producto: "", 
            Cantidad: "",
            Stock:""
        }
    }

    
    //Funcion para calculos
    calculos()
    {
        this.subtotal = 0;
        this.isv = 0;
        this.total = 0;
        console.log(this.listado_productos_agregados);
        for(var i = 0; i < this.listado_productos_agregados.length; i++) {
            this.subtotal += this.listado_productos_agregados[i].Cantidad * this.listado_productos_agregados[i].Precio_referencial_venta;
            this.isv = this.subtotal * 0.15;
            this.total = this.subtotal + this.isv;
        }
    }


    //Funcion para pasar los datos a la detalle Venta

    pasarDatosDetalleVenta()
    {
        for(var i = 0; i < this.listado_productos_agregados.length; i++) 
        {
            this.DetalleVentaNormal = {
                Id_producto: this.listado_productos_agregados[i].Id_producto,
                Precio_referencial_venta: this.listado_productos_agregados[i].Precio_referencial_venta,
                Cantidad_vendida: this.listado_productos_agregados[i].Cantidad
            }
            
            this.insertar_detalle_venta_normal();
        }
    }

    //Funcion Para Restar en el Invenatario
    restar_producto_inventario_venta()
    {
        var response;
        this.service.restar_producto_inventario(this.Productos).subscribe(
            data=>response=data,
            err=>{
                console.log("ERROR AL CONSULTAR EL SERVICIO");
            },
            ()=>{
                
            }   
        )
    }
    //Funcion para agregar 
    agregar_inventario(producto)
    {
        var response;
        this.service.agregar_producto_inventario(producto).subscribe(
            data=>response=data,
            err=>{
                console.log("ERROR AL CONSULTAR EL SERVICIO");
            },
            ()=>{
                
            }   
        )
    }

    //Funcion Para Limpiar
    LimpiarInputsVariablesGlobales()
    {
        this.subtotal = "",
        this.isv = "",
        this.total = "",
        this.listado_productos_agregados = [];
    }
    LimpiarInputs()
    {
        this.LimpiarInputsVariablesGlobales();
        this.LimpiarInputsProductos();
    }

}