import { Component, Input, OnInit, Inject } from '@angular/core';
import { AppService } from 'src/app/app.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';;

const swal = require('sweetalert2');

@Component({

    selector: 'nueva_venta_normal',
    templateUrl: './nueva_venta_normal.component.html'
    
})

export class GetVentaNormalComponent
{
    public numero_factura: any[];
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
        fecha_venta: "", 
        identidad: "",
        isv: 0.15,
        id_estado_envio:10,
        id_estado_pago:5,
        id_tipo_pago:1,
    }
    public DetalleVentaNormal = {
        id_producto: "",
        precio_referencial_venta: "",
        cantidad_vendida: ""
    }

    public Productos = {
        id_producto: "",
        nombre_producto: "",
        informacion_adicional_producto: "",
        precio_referencial_venta: "",
        cantidad: "",
        stock:""
    }

    ngOnInit(){

    }

    insertar_venta_normal() 
    {
        if(this.listado_productos_agregados.length == 0)
        {
            swal.fire({
                title: "No ha ingresado ningún producto a la compra, por favor hágalo para poder enviar la compra.",
                icon: 'error'
            });
        }
        else
        {
            swal.fire
            ({
                title: '¿Desea imprimir la factura para esta venta?',
                showCancelButton: true,
                confirmButtonText: `Si`,
                cancelButtonText: `No`,
            }).then((result) => 
            {
                if (result.isConfirmed) 
                {                         
                    var response;
                    this.service.insertar_venta_normal(this.VentasNormal).subscribe
                    (
                        data=>response = data,
                        err => 
                        {
                            console.log("Error al consultar servicio"); 
                        },
                        ()=>
                        {
                            this.pasarDatosDetalleVenta();
                            this.generarpdf();
                            this.VentasNormal = 
                            {
                                fecha_venta: "",
                                identidad: "",
                                isv: 0.15,
                                id_estado_envio:10,
                                id_estado_pago:5,
                                id_tipo_pago:1,
                            }
                        }
                    );
                }
                else
                {                
                    var response;
                    this.service.insertar_venta_normal(this.VentasNormal).subscribe
                    (
                        data=>response = data,
                        err => 
                        {
                            console.log("Error al consultar servicio"); 
                        },
                        ()=>
                        {
                            this.pasarDatosDetalleVenta();
                            this.VentasNormal = 
                            {
                                fecha_venta: "",
                                identidad: "",
                                isv: 0.15,
                                id_estado_envio:10,
                                id_estado_pago:5,
                                id_tipo_pago:1,
                            }
                        }
                    );
                }
            })
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

    get_factura(){
        this.numero_factura = [];
        var response;
        this.service.get_cod_factura().subscribe(
            data=>response = data,
            err => {
                this.numero_factura = [];
                console.log("Error al consultar el servicio");
            },
            ()=>{
                this.numero_factura = response;
                this.service.set_codigo_factura(this.numero_factura);
            }  
        );
    }

    pasarDatosProducto(producto)
    {
        this.Productos = 
        {
            id_producto: producto.Id_producto,
            nombre_producto: producto.Descripcion_producto,
            precio_referencial_venta: producto.Precio_referencial_venta,
            informacion_adicional_producto: "Talla: " + producto.Talla + ", Color: " + producto.Color + ", Modelo: " + producto.Descripcion_modelo + ", Marca: " + producto.Nombre_marca + ", Subcategoria: " + producto.Descripcion_subcategoria, 
            cantidad: "",
            stock: producto.Stock
        }
    }
    //Funcion para agregar producto

    AgregarProductoVenta()
    {
        if(this.Productos.id_producto == "")
        {
            swal.fire({
                title: "No ha seleccionado ningún producto.",
                icon: 'error'
            });
        }
        else
        {
            
            if(this.Productos.cantidad == "")
            {
                swal.fire({
                    title: "No ha ingresado ninguna cantidad, por favor hágalo para poder agregar.",
                    icon: 'error'
                });
            }
            else
            {
                if (this.Productos.cantidad < this.Productos.stock)
                {
                    this.listado_productos_agregados.unshift(this.Productos);
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

    //Funcion Eliminar producto
    EliminarProductoVenta(id)
    {
        for(var i = this.listado_productos_agregados.length - 1; i >= 0; i--) 
        {
            if(this.listado_productos_agregados[i].id_producto === id) 
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
            id_producto: "",
            nombre_producto: "",
            precio_referencial_venta: "",
            informacion_adicional_producto: "", 
            cantidad: "",
            stock:""
        }
    }

    
    //Funcion para calculos
    calculos()
    {
        this.subtotal = 0;
        this.isv = 0;
        this.total = 0;
        for(var i = 0; i < this.listado_productos_agregados.length; i++) {
            this.subtotal += this.listado_productos_agregados[i].cantidad * this.listado_productos_agregados[i].precio_referencial_venta;
            this.isv = this.subtotal * 0.15;
            this.total = this.subtotal + this.isv;
        }

        this.subtotal = parseFloat(this.subtotal).toFixed(2);
        this.isv = parseFloat(this.isv).toFixed(2);
        this.total = parseFloat(this.total).toFixed(2);
    }


    //Funcion para pasar los datos a la detalle Venta

    pasarDatosDetalleVenta()
    {
        for(var i = 0; i < this.listado_productos_agregados.length; i++) 
        {
            this.DetalleVentaNormal = {
                id_producto: this.listado_productos_agregados[i].id_producto,
                precio_referencial_venta: this.listado_productos_agregados[i].precio_referencial_venta,
                cantidad_vendida: this.listado_productos_agregados[i].cantidad
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

    generarpdf()
    {
        this.get_factura();
        
        var codigo = (JSON.stringify(this.service.get_codigo_factura()[0].Id_venta));

        var fecha_actual = new Date().toLocaleString()

        const doc = new jsPDF();

        const autoTable = 'autoTable';

        doc.setFont("courier");

        doc.setFontSize(20);
        doc.text("Variedades K y D", 110, 10, {align: "center"});
        doc.setFontSize(12);
        doc.text("Dirección: Zonal Belen, cerca de Banco FICOHSA", 45, 20);
        doc.text("Télefono: (504) 9797-7966", 75, 30);
        doc.text("Correo: variedades_k_y_d@gmail.com", 65, 40);
        doc.text("No. Factura: " + String(codigo), 15, 65);
        doc.text("Fecha: " + fecha_actual, 15, 75);
        doc.text("Identidad: " + String(this.VentasNormal.identidad), 15, 85);
   
        var rows = [];
        
        this.listado_productos_agregados.forEach(element => {      
            var temp = [element.id_producto, element.nombre_producto, element.informacion_adicional_producto, element.precio_referencial_venta, element.cantidad];
            rows.push(temp);
        });

        doc[autoTable]({
            head: [['Cod Producto', 'Nombre Producto', 'Información Adicional', 'Precio Referencial Venta', 'Cantidad']],
            body: rows,
            startY: 100,
            styles: {font: "courier", fontsize: 12}
        });

        doc.text("Subtotal: " + String(this.subtotal), 15, 240);
        doc.text("ISV: " + String(this.isv), 15, 250);
        doc.text("Total: " + String(this.total), 15, 260);

        doc.text("¡Gracias por su compra!", 75, 280);


        doc.save("Factura_Normal_" + "Num_Factura_" + codigo + "_Fecha_" + fecha_actual);
    }
}