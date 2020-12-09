import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
const swal = require('sweetalert2');


@Component({
    selector: 'mantenimiento_compras',
    templateUrl: './mantenimiento_compras.component.html'
})


export class GetComprasComponent {

    public listado_proveedores: any[]; 
    public listado_productos: any[];
    public listado_productos_compras: any[];
    public subtotal: number;
    public total: number;
    public isv: number;
    public Informacion_adicional: any = "";


    constructor(public service:AppService){
        this.listado_productos_compras = [];
        this.subtotal = 0.00;
        this.total = 0.00;
        this.isv = 0.00;
    }

    public Compra = {
        id_compra: "0",
        codigo_factura: "",
        fecha_orden: "",
        fecha_recibida: "",
        gastos_adicionales: "0",
        id_proveedor: "",
        id_estatus: "3"
    }

    public Producto = {
        id_producto: "", 
        descripcion_producto: "", 
        talla: "", 
        color: "", 
        cantidad_ordenada: "", 
        precio_referencial_compra: "", 
        descripcion_modelo: "",
        nombre_marca: "",
        descripcion_subcategoria: "",
        descripcion_categoria: ""
    }

    public Detalle_compras = {
        id_producto: "", 
        precio_compra: "",
        cantidad_ordenada: "", 
        cantidad_recibida: "0", 
        cantidad_rechazada: "0" 
    }

    ngOnInit(){
        this.get_proveedores();
    }

    get_proveedores(){
        this.listado_proveedores = [];
        var response;
        this.service.get_proveedores().subscribe(
            data=>response = data,
            err => {
                this.listado_proveedores = [];
                console.log("Error al consultar el servicio");
            },
            ()=>{
                 this.listado_proveedores = response;
            }  
        );
    }

    get_productos(id_proveedor){
        this.listado_productos = [];
        var response;
        this.service.get_productos_proveedor(id_proveedor).subscribe(
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

    pasar_datos_producto(producto)
    {
        this.Producto = 
        {
            id_producto: producto.Id_producto, 
            descripcion_producto: producto.Descripcion_producto, 
            talla: producto.Talla, 
            color: producto.Color, 
            cantidad_ordenada: "",
            precio_referencial_compra: producto.Precio_referencial_compra,
            descripcion_modelo: producto.Descripcion_modelo,
            nombre_marca: producto.Nombre_marca,
            descripcion_subcategoria: producto.Descripcion_subcategoria,
            descripcion_categoria: producto.Descripcion_categoria   
        }

        this.Informacion_adicional = this.Producto.descripcion_modelo + ', ' + this.Producto.nombre_marca + ', ' + this.Producto.descripcion_subcategoria + ', ' + this.Producto.descripcion_categoria
    }

    agregar_producto(producto) 
    {
        if( (producto.Id_producto == "") && (producto.Cantidad_ordenada == "") )
        {
            swal.fire({
                title: "No ha buscado ningún producto, por favor hágalo para poder agregar.",
                icon: 'error'
            });
        }
        else
        {
            if( producto.Cantidad_ordenada == "")
            {
                swal.fire({
                    title: "No ha ingresado ninguna cantidad, por favor hágalo para poder agregar.",
                    icon: 'error'
                });
            }
            else
            {
                
                this.listado_productos_compras.unshift(producto);

                this.calculos();

                this.Producto = {
                    id_producto: "", 
                    descripcion_producto: "", 
                    talla: "", 
                    color: "", 
                    cantidad_ordenada: "",
                    precio_referencial_compra: "", 
                    descripcion_modelo: "",
                    nombre_marca: "",
                    descripcion_subcategoria: "",
                    descripcion_categoria: ""
                }

                this.Informacion_adicional = ""
            }
        }
    }

    eliminar_producto(id) 
    {
        console.log(id);
        for(var i = this.listado_productos_compras.length - 1; i >= 0; i--) {
            if(this.listado_productos_compras[i].Id_producto === id) {
               this.listado_productos_compras.splice(i, 1);
            }
        }

        this.calculos();
    }

    calculos()
    {
        this.subtotal = 0;
        this.isv = 0;
        this.total = 0;
        
        for(var i = 0; i < this.listado_productos_compras.length; i++) {
            this.subtotal += this.listado_productos_compras[i].cantidad_ordenada * this.listado_productos_compras[i].precio_referencial_compra;
            this.isv = this.subtotal * 0.15;
            this.total = this.subtotal + this.isv;
        }
        
        if(this.Compra.gastos_adicionales == "")
        {
            this.total +=  0;
        }
        else
        {
            this.total +=  parseInt( this.Compra.gastos_adicionales );
        }
    }

    insertar_compra(){
        if(this.listado_productos_compras.length == 0){
            swal.fire({
                title: "No ha ingresado ningún producto al pedido, por favor hágalo para poder enviar el pedido.",
                icon: 'error'
            });
        }
        else{

            var response;
            this.service.insertar_compra(this.Compra).subscribe(
                data=>response = data,
                err => {
                    console.log("Error al consultar servicio"); 
                },
                ()=>{

                    this. pasar_datos_detalle_compras();
                    
                    this.Compra = {
                        id_compra: "0",
                        codigo_factura: "",
                        fecha_orden: "",
                        fecha_recibida: "",
                        gastos_adicionales: "0",
                        id_proveedor: "",
                        id_estatus: "3"
                    }

                    swal.fire({
                        title: "Pedido envido exitosamente.",
                        icon: 'success'
                    });
                }
            );
        }  
    }

    pasar_datos_detalle_compras()
    {

        for(var i = 0; i < this.listado_productos_compras.length; i++) {
            this.Detalle_compras = 
            {
                id_producto: this.listado_productos_compras[i].id_producto, 
                precio_compra: this.listado_productos_compras[i].precio_referencial_compra,
                cantidad_ordenada: this.listado_productos_compras[i].cantidad_ordenada, 
                cantidad_recibida: "0",
                cantidad_rechazada: "0"
            }    
            this.insertar_detalle_compras();
        }
    }

    insertar_detalle_compras(){
        var response;
        this.service.insertar_detalle_compras(this.Detalle_compras).subscribe(
            data=>response = data,
            err => {
                console.log("Error al consultar servicio"); 
            },
            ()=>{
                    this.Producto = {
                        id_producto: "", 
                        descripcion_producto: "", 
                        talla: "", 
                        color: "", 
                        cantidad_ordenada: "", 
                        precio_referencial_compra: "", 
                        descripcion_modelo: "",
                        nombre_marca: "",
                        descripcion_subcategoria: "",
                        descripcion_categoria: ""
                    }

                    this.Detalle_compras = {
                        id_producto: "", 
                        precio_compra: "",
                        cantidad_ordenada: "", 
                        cantidad_recibida: "0", 
                        cantidad_rechazada: "0"
                    }

                    this.subtotal = 0;
                    this.total = 0;
                    this.isv = 0;
                    this.listado_productos_compras = [];
            }
        );
    }
}
