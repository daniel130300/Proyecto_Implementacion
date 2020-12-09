import { Component, OnInit, Input, EventEmitter }  from '@angular/core';
import { AppService } from 'src/app/app.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import jsPDF from 'jspdf';
import 'jspdf-autotable';import { parse } from 'url';
import { auto } from '@popperjs/core';
;

const swal = require('sweetalert2');

@Component({

    selector: 'nueva_venta_plus',
    templateUrl: './nueva_venta_plus.component.html'
    
})

export class GetVentaPlusComponent 
{
    public numero_factura: any[];
    public listado_productos: any[];
    public listado_clientes: any[];
    public listado_plazos_pago:   any[];
    public listado_tipos_pago:   any[];
    public listado_tipo_cliente: any[];
    public listado_estados_envio: any[];
    public listado_productos_agregados: any [] = [];
    public subtotal: any = "";
    public descuento: any = "";
    public descuento_calculado: any = "";
    public isv: any = "";
    public total: any = "";

    public fecha_venta: any;
    public Isv: 0.15;
    public id_cliente: any;
    public id_estado_envio: any = "";
    public id_estado_pago: any = "";
    public id_tipo_pago: any = "";
    public id_plazo: any = "";
    public id_tipo_cliente: any = "";

    constructor( public service: AppService ){

        this.listado_productos = [];
        this.listado_clientes = [];
    }
  
    ngOnInit(){
        this.get_plazos_pagos();
        this.get_tipos_pago();
        this.get_tipo_cliente();
        this.get_estados_envio();
    }

    public Productos = {
        id_producto: "",
        nombre_producto: "",
        informacion_adicional_producto: "",
        precio_referencial_venta: "",
        cantidad: "",
        stock: ""
    }

    public Clientes = {
        id_cliente: "",
        nombre_cliente: ""
    }

    public VentasPlus = {
        fecha_venta: "",
        isv: 0.15,
        id_cliente: 1,
        id_estado_envio: "",
        id_estado_pago: "",
        id_tipo_pago: "",
        id_plazo: "",
    }

    public DetalleVentasPlus = {
        id_producto: "",
        precio_referencial_venta: "",
        cantidad_vendida: ""
    }

    formVentas = new FormGroup({
        tipoPago: new FormControl("", Validators.required),
        plazosPago: new FormControl({ value: "", disabled: true }, [Validators.required])
     });


    habilitar_plazos_pago(valor) 
    {
        console.log(valor)

        if(valor == 1 || valor == "") 
        {   
            this.id_plazo = "";
            this.formVentas.get('plazosPago').disable();
        } 
        else if (valor == 2)
        {
            this.formVentas.get('plazosPago').enable();
        }

    }

    asignar_datos_venta()
    {
        if (this.id_plazo == "")
        {
            this.id_plazo = null
        }

        if (this.id_tipo_pago == "1")
        {
            this.id_estado_pago = "5"
        }

        if (this.id_tipo_pago == "2")
        {
            this.id_estado_pago = "6"
        }

        this.VentasPlus = {
            fecha_venta: this.fecha_venta,
            isv: 0.15,
            id_cliente: this.id_cliente,
            id_estado_envio: this.id_estado_envio,
            id_estado_pago: this.id_estado_pago,
            id_tipo_pago: this.id_tipo_pago,
            id_plazo: this.id_plazo,
        }
    }
   
    insertar_venta_plus(){
        
        if(this.listado_productos_agregados.length == 0){
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
                    this.asignar_datos_venta();
                    this.service.insertar_venta_plus(this.VentasPlus).subscribe(
                        data=>response = data,
                        err => {
                            console.log("Error al consultar servicio"); 
                        },
                        ()=>{
                            this.pasar_datos_detalle_venta();
                            this.generarpdf();
                            this.LimpiarInputs();
                        }
                    );
                }
                else
                {
                    var response;
                    this.asignar_datos_venta();
                    this.service.insertar_venta_plus(this.VentasPlus).subscribe(
                        data=>response = data,
                        err => {
                            console.log("Error al consultar servicio"); 
                        },
                        ()=>{
                            this.pasar_datos_detalle_venta();
                            this.LimpiarInputs();
                        }
                    );
                }
            })
        }  
    }

    insertar_detalle_venta_plus(){
        var response;
        this.service.insertar_detalle_venta(this.DetalleVentasPlus).subscribe(
            data=>response = data,
            err => {
                console.log("Error al consultar servicio"); 
            },
            ()=>{
                this.LimpiarInputs();
            }
        );
    }

    get_estados_envio()
    {
        var response;
        this.service. get_estados_envio().subscribe(
            data=>response=data,
            err=>{
                console.log("ERROR AL CONSULTAR EL SERVICIO");
            },
            ()=>
            {
                this.listado_estados_envio=response;
            }
        )
    }
  
    get_tipos_pago()
    {
        var response;
        this.service.get_tipos_pago().subscribe(
            data=>response=data,
            err=>{
                console.log("ERROR AL CONSULTAR EL SERVICIO");
            },
            ()=>
            {
                this.listado_tipos_pago=response;
            }
        )
    }

    get_plazos_pagos(){
        var response;
        this.service.get_plazos_pago().subscribe(

            data => response = data,

            err => {

                console.log( "Error al consultar el servicio." );
            },

            () => {

                this.listado_plazos_pago = response;
            }  
        );
    }

    get_tipo_cliente()
    {
        var response;
        this.service.get_tipo_cliente().subscribe(
            data=>response=data,
            err=>{
                console.log("ERROR AL CONSULTAR EL SERVICIO");
            },
            ()=>
            {
                this.listado_tipo_cliente=response;
            }
        )
    }

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

    get_clientes(id_tipo_cliente){
        var response;
        this.service.get_clientes_filtrados(id_tipo_cliente).subscribe(
            data=>response=data,
            err=>{
                console.log("ERROR AL CONSULTAR EL SERVICIO");
            },
            ()=>{
                this.listado_clientes=response;

                if(id_tipo_cliente!="")
                {
                    this.descuento = this.listado_tipo_cliente[id_tipo_cliente-1].Descuento_cliente
                }
                else
                {
                    this.descuento = 0
                }
            }   
        )
    }

    restar_inventario()
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

    pasar_datos_cliente(cliente)
    {
        this.Clientes = 
        {
            id_cliente:cliente.Id_cliente,
            nombre_cliente:cliente.Nombre_compania
        }
        
        this.id_cliente = cliente.Id_cliente
    }

    pasar_datos_producto(producto)
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

    pasar_datos_detalle_venta()
    {
        for(var i = 0; i < this.listado_productos_agregados.length; i++) 
        {
            this.DetalleVentasPlus = {
                id_producto: this.listado_productos_agregados[i].id_producto,
                precio_referencial_venta: this.listado_productos_agregados[i].precio_referencial_venta,
                cantidad_vendida: this.listado_productos_agregados[i].cantidad
            }
            
            this.insertar_detalle_venta_plus();
        }
    }

    agregar_producto_venta()
    {
        
        if(this.Clientes.id_cliente == "")
        {
            swal.fire({
                title: "No ha seleccionado ningún cliente.",
                icon: 'error'
            });
        }
        else
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
                        console.log(this.listado_productos_agregados); 
                        this.calculos();
                        this.restar_inventario();
                        this.limpiar_inputs_productos();
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

        
    }

    eliminar_producto_venta(id)
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
    
    calculos()
    {
        this.subtotal = 0;
        this.descuento_calculado = 0;
        this.isv = 0;
        this.total = 0;
        for(var i = 0; i < this.listado_productos_agregados.length; i++) 
        {
            this.subtotal += this.listado_productos_agregados[i].cantidad * this.listado_productos_agregados[i].precio_referencial_venta;
            this.descuento_calculado = this.subtotal * this.descuento;
            this.isv = (this.subtotal - this.descuento_calculado) * 0.15;
            this.total = (this.subtotal - this.descuento_calculado) + this.isv;
        }

        this.subtotal = parseFloat(this.subtotal).toFixed(2);
        this.descuento_calculado = parseFloat(this.descuento_calculado).toFixed(2);
        this.isv = parseFloat(this.isv).toFixed(2);
        this.total = parseFloat(this.total).toFixed(2);
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

    generarpdf()
    {
        this.get_factura();
        
        var codigo = JSON.stringify(this.service.get_codigo_factura()[0].Id_venta);

        console.log(codigo);
        
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
        doc.text("Cliente: " + String(this.Clientes.nombre_cliente), 15, 85);

        var tipo_pago: String;
        var plazo_pago:String;
        var valor = 95;

        doc.setFont("courier");

        if(this.id_tipo_pago == 1)
        {
            tipo_pago = "Contado";
            doc.text("Tipo de pago: "+ String(tipo_pago), 15, valor);
        }
        else
        {
            tipo_pago = "Crédito";
            doc.text("Tipo de pago: "+ String(tipo_pago), 15, valor);

            valor+=10;

            if(this.id_plazo == 1)
            {
                plazo_pago = "15 días";
            }
            else if(this.id_plazo == 2)
            {
                plazo_pago = "1 mes";
            }
            else{
                plazo_pago = "3 meses";
            }

            doc.text("Plazo de pago: "+ String(plazo_pago), 15, valor);
        }

        valor+=10;

        var tipo_venta: String;

        if(this.id_estado_envio == 8)
        {
            tipo_venta = "Pendiente de envio"
        }
        else
        {   
            tipo_venta = "Local"
        }

        doc.text("Tipo de venta: "+ String(tipo_venta), 15, valor);

        var rows = [];
        
        this.listado_productos_agregados.forEach(element => {      
            var temp = [element.id_producto, element.nombre_producto, element.informacion_adicional_producto, element.precio_referencial_venta, element.cantidad];
            rows.push(temp);
        });

        doc[autoTable]({
            head: [['Cod Producto', 'Nombre Producto', 'Información Adicional', 'Precio Referencial Venta', 'Cantidad']],
            body: rows,
            startY: 130,
            styles: {font: "courier", fontsize: 12}
        });

        doc.text("Subtotal: " + String(this.subtotal), 15, 230);
        doc.text("Descuento: " + String(this.descuento_calculado), 15, 240)
        doc.text("ISV: " + String(this.isv), 15, 250);
        doc.text("Total: " + String(this.total), 15, 260);

        doc.text("¡Gracias por su compra!", 75, 280);


        doc.save("Factura_Plus" +"_Num_Factura_" + codigo + "_Fecha_" + fecha_actual);
    }

    limpiar_inputs_productos()
    {
        this.Productos = 
        {
            id_producto: "",
            nombre_producto: "",
            precio_referencial_venta: "",
            informacion_adicional_producto: "", 
            cantidad: "",
            stock: ""
        }
    }

    limpiar_inputs_clientes()
    {
        this.Clientes = 
        {
            id_cliente:"",
            nombre_cliente:""
        }
    }

    limpiar_inputs_variables_globales()
    {
        this.fecha_venta = "";
        this.Isv = 0.15;
        this.id_cliente = "";
        this.id_estado_envio = "";
        this.id_estado_pago = "";
        this.id_tipo_pago = "";
        this.id_plazo = "";
        this.id_tipo_cliente = "",
        this.subtotal = "",
        this.descuento = "",
        this.descuento_calculado = "",
        this.isv = "",
        this.total = "",
        this.listado_productos_agregados = [];
    }

    LimpiarInputs()
    {
        this.limpiar_inputs_variables_globales();
        this.limpiar_inputs_clientes();
        this.limpiar_inputs_productos();
    }
}
   