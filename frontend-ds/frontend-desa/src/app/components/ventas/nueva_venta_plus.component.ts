import { Component, OnInit, Input, EventEmitter }  from '@angular/core';
import { AppService } from 'src/app/app.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

const swal = require('sweetalert2');

@Component({

    selector: 'nueva_venta_plus',
    templateUrl: './nueva_venta_plus.component.html'
    
})

export class GetVentaPlusComponent 
{
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

    public Fecha_venta: any;
    public Isv: 0.15;
    public Id_cliente: any;
    public Id_estado_envio: any = "";
    public Id_estado_pago: any = "";
    public Id_tipo_pago: any = "";
    public Id_plazo: any = "";
    public Id_tipo_cliente: any = "";

    constructor( public service: AppService ){

        this.listado_productos = [];
        this.listado_clientes = [];
    }
  
    ngOnInit(){
        this.get_plazos_pagos();
        this.get_tipos_pago();
        this.get_tipo_cliente();
        this.get_estados_envio();
        //this.HabilitarPlazosPago();
    }

    //DECLARACION DE OBJETOS

    public Productos = {
        Id_producto: "",
        Nombre_producto: "",
        Informacion_adicional_producto: "",
        Precio_referencial_venta: "",
        Cantidad: "",
        Stock: ""
    }

    public Clientes = {
        Id_cliente: "",
        Nombre_cliente: ""
    }

    public VentasPlus = {
        Fecha_venta: "",
        Isv: 0.15,
        Id_cliente: 1,
        Id_estado_envio: "",
        Id_estado_pago: "",
        Id_tipo_pago: "",
        Id_plazo: "",
    }

    public DetalleVentasPlus = {
        Id_producto: "",
        Precio_referencial_venta: "",
        Cantidad_vendida: ""
    }

    //PRUEBA DE VALIDACIONES

    formVentas = new FormGroup({
        tipoPago: new FormControl("", Validators.required),
        plazosPago: new FormControl({ value: "", disabled: true }, [Validators.required])
     });


    HabilitarPlazosPago(valor) 
    {
        console.log(valor)

        if(valor == 1 || valor == "") 
        {   
            this.Id_plazo = "";
            this.formVentas.get('plazosPago').disable();
        } 
        else if (valor == 2)
        {
            this.formVentas.get('plazosPago').enable();
        }

    }

    // TODAS LAS FUNCIONES NECESARIAS PARA INSERTAR VENTA Y DETALLE DE LA VENTA

    Asignar_datos_venta()
    {
        if (this.Id_plazo == "")
        {
            this.Id_plazo = null
        }

        if (this.Id_tipo_pago == "1")
        {
            this.Id_estado_pago = "5"
        }

        if (this.Id_tipo_pago == "2")
        {
            this.Id_estado_pago = "6"
        }

        this.VentasPlus = {
            Fecha_venta: this.Fecha_venta,
            Isv: 0.15,
            Id_cliente: this.Id_cliente,
            Id_estado_envio: this.Id_estado_envio,
            Id_estado_pago: this.Id_estado_pago,
            Id_tipo_pago: this.Id_tipo_pago,
            Id_plazo: this.Id_plazo,
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
            var response;
            this.Asignar_datos_venta();
            this.service.insertar_venta_plus(this.VentasPlus).subscribe(
                data=>response = data,
                err => {
                    console.log("Error al consultar servicio"); 
                },
                ()=>{
                    this.pasarDatosDetalleVenta();
                    this.LimpiarInputs();
                }
            );

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

    //TODAS LAS FUNCIONES PARA LLENAR LOS COMBOBOXES Y TABLAS DE LAS FORMAS MODALES

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

    //FUNCIONES PARA PASAR DATOS ENTRE FORMULARIOS

    pasarDatosCliente(cliente)
    {
        this.Clientes = 
        {
            Id_cliente:cliente.Id_cliente,
            Nombre_cliente:cliente.Nombre_compania
        }
        
        this.Id_cliente = cliente.Id_cliente
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

    pasarDatosDetalleVenta()
    {
        for(var i = 0; i < this.listado_productos_agregados.length; i++) 
        {
            this.DetalleVentasPlus = {
                Id_producto: this.listado_productos_agregados[i].Id_producto,
                Precio_referencial_venta: this.listado_productos_agregados[i].Precio_referencial_venta,
                Cantidad_vendida: this.listado_productos_agregados[i].Cantidad
            }
            
            this.insertar_detalle_venta_plus();
        }
    }

    //FUNCION PARA AGREGAR Y ELIMINAR PRODUCTOS DE LA TABLA TEMPORAL DEL DETALLE DE LA VENTA

    AgregarProductoVenta()
    {
        
        if(this.Clientes.Id_cliente == "")
        {
            swal.fire({
                title: "No ha seleccionado ningún cliente.",
                icon: 'error'
            });
        }
        else
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
                        this.restar_inventario();
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

        
    }

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
    
    calculos()
    {
        this.subtotal = 0;
        this.descuento_calculado = 0;
        this.isv = 0;
        this.total = 0;
        console.log(this.listado_productos_agregados);
        for(var i = 0; i < this.listado_productos_agregados.length; i++) 
        {
            this.subtotal += this.listado_productos_agregados[i].Cantidad * this.listado_productos_agregados[i].Precio_referencial_venta;
            this.descuento_calculado = this.subtotal * this.descuento
            this.isv = (this.subtotal - this.descuento_calculado) * 0.15;
            this.total = (this.subtotal - this.descuento_calculado) + this.isv;
        }

    }

    //FUNCIONES PARA LIMPIAR TODOS LOS INPUTS

    LimpiarInputsProductos()
    {
        this.Productos = 
        {
            Id_producto: "",
            Nombre_producto: "",
            Precio_referencial_venta: "",
            Informacion_adicional_producto: "", 
            Cantidad: "",
            Stock: ""
        }
    }

    LimpiarInputsClientes()
    {
        this.Clientes = 
        {
            Id_cliente:"",
            Nombre_cliente:""
        }
    }

    LimpiarInputsVariablesGlobales()
    {
        this.Fecha_venta = "";
        this.Isv = 0.15;
        this.Id_cliente = "";
        this.Id_estado_envio = "";
        this.Id_estado_pago = "";
        this.Id_tipo_pago = "";
        this.Id_plazo = "";
        this.Id_tipo_cliente = "",
        this.subtotal = "",
        this.descuento = "",
        this.descuento_calculado = "",
        this.isv = "",
        this.total = "",
        this.listado_productos_agregados = [];
    }

    LimpiarInputs()
    {
        this.LimpiarInputsVariablesGlobales();
        this.LimpiarInputsClientes();
        this.LimpiarInputsProductos();
    }
}
   