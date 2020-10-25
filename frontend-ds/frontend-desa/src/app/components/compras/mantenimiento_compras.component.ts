import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
const swal = require('sweetalert2');


@Component({
    selector: 'mantenimiento_compras', //asi es como se manda a llamar en el browser para que se muestre el html
    templateUrl: './mantenimiento_compras.component.html'
})


export class GetComprasComponent {

    /* ------------------------------------- DECLARACIONES DE TIPO GLOBAL ------------------------------------------------------- */
    public listado_proveedores: any[]; //array que recibira los proveedores desde la base de datos y se mostraran en un combobox
    public listado_productos: any[];   //array que recibe los productos del proveedor seleccionado y se muestran en la ventana modal para ser seleccionados
    public listado_productos_compras: any[]; //array en que se van ingresando los productos de la compra (detalle de la compra)
    public subtotal: number; //variable para calcular el subtotal de la compra
    public total: number; //variable para calcular el total de la compra
    public isv: number; //variable para calcular el isv de la compra
    public Informacion_adicional: any = "";


    constructor(public service:AppService){
        this.listado_productos_compras = []; //Si no se inicializa en el constructor los arrays no son capaz de llenarse
        this.subtotal = 0.00;
        this.total = 0.00;
        this.isv = 0.00;
    }


    /* ------------------------------------------- DECLARACION DE OBJETOS ------------------------------------------------------- */
    /* Objeto que trae el Id_proveedor y los Gastos_adicionales de la compra */
    public Compra = {
        Id_compra: "0",
        Codigo_factura: "",
        Fecha_orden: "",
        Fecha_recibida: "",
        Gastos_adicionales: "0",
        Id_proveedor: "",
        Id_estatus: "3"
    }

    /* Objeto que recibira los datos de un producto de la ventana modal y posteriormente los pasara al array de listado_productos_compras */
    public Producto = {
        Id_producto: "", 
        Descripcion_producto: "", 
        Talla: "", 
        Color: "", 
        Cantidad_ordenada: "", 
        Precio_referencial_compra: "", 
        Descripcion_modelo: "",
        Nombre_marca: "",
        Descripcion_subcategoria: "",
        Descripcion_categoria: ""
    }

    /* Objeto que sirve como puente o almacenamiento temporal para poder insertar los datos del detalle de la compra recibe los datos del array listado_productos_compras */
    public Detalle_compras = {
        Id_producto: "", 
        Precio_compra: "",
        Cantidad_ordenada: "", 
        Cantidad_recibida: "0", 
        Cantidad_rechazada: "0" 
    }

    ngOnInit(){
        this.get_proveedores();

    }

    /* ---------------------------------------------------------- FUNCIONES --------------------------------------------------------------- */
    //Funcion para llenar el listado de proveedores y que se muestre en el combo box
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

    //Funcion para llenar el listado de productos y que se muestren en la ventana modal
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

    /* Funcion que pasa los datos de la ventana modal a la ventana principal y  muestra el producto seleccionado */
    pasarDatosProducto(producto)
    {
        this.Producto = 
        {
            Id_producto: producto.Id_producto, 
            Descripcion_producto: producto.Descripcion_producto, 
            Talla: producto.Talla, 
            Color: producto.Color, 
            Cantidad_ordenada: "",
            Precio_referencial_compra: producto.Precio_referencial_compra,
            Descripcion_modelo: producto.Descripcion_modelo,
            Nombre_marca: producto.Nombre_marca,
            Descripcion_subcategoria: producto.Descripcion_subcategoria,
            Descripcion_categoria: producto.Descripcion_categoria   
        }

        this.Informacion_adicional = this.Producto.Descripcion_modelo + ', ' + this.Producto.Nombre_marca + ', ' + this.Producto.Descripcion_subcategoria + ', ' + this.Producto.Descripcion_categoria
        
    }

    //Agrega un producto al arreglo listado_productos_compras y llama la funcion para calcular subtotal, isv y total 
    agregarProducto(producto) 
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
                    Id_producto: "", 
                    Descripcion_producto: "", 
                    Talla: "", 
                    Color: "", 
                    Cantidad_ordenada: "",
                    Precio_referencial_compra: "", 
                    Descripcion_modelo: "",
                    Nombre_marca: "",
                    Descripcion_subcategoria: "",
                    Descripcion_categoria: ""
                }

                this.Informacion_adicional = ""

            
            }
        }

    }

    //Funcion que elimina un producto del listado_productos_compras segun el id
    eliminarProducto(id) 
    {
        console.log(id);
        for(var i = this.listado_productos_compras.length - 1; i >= 0; i--) {
            if(this.listado_productos_compras[i].Id_producto === id) {
               this.listado_productos_compras.splice(i, 1);
            }
        }
        //console.log(this.listado_productos_compras);
        this.calculos();
    }

    //Funcion que calcula el subtotal, isv y total
    calculos()
    {
        this.subtotal = 0;
        this.isv = 0;
        this.total = 0;
        
        for(var i = 0; i < this.listado_productos_compras.length; i++) {
            this.subtotal += this.listado_productos_compras[i].Cantidad_ordenada * this.listado_productos_compras[i].Precio_referencial_compra;
            this.isv = this.subtotal * 0.15;
            this.total = this.subtotal + this.isv;
        }
        
        if(this.Compra.Gastos_adicionales == "")
        {
            this.total +=  0;
        }
        else
        {
            this.total +=  parseInt( this.Compra.Gastos_adicionales );
        }
    }

    /*
    pasarDatosCompra(compra)
    {
        this.Compra = 
        {
            Id_compra:"",
            Fecha_orden: "",
            Fecha_recibida: "",
            Gastos_adicionales:compra.Gastos_adicionales,
            Id_proveedor: compra.Id_proveedor,
            Id_estatus: "3"
        }
        
    }*/

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

                    this. pasarDatosDetalleCompras();
                    
                    //console.log("entro");
                    this.Compra = {
                        Id_compra: "0",
                        Codigo_factura: "",
                        Fecha_orden: "",
                        Fecha_recibida: "",
                        Gastos_adicionales: "0",
                        Id_proveedor: "",
                        Id_estatus: "3"
                    }

                    swal.fire({
                        title: "Pedido envido exitosamente.",
                        icon: 'success'
                    });

                }
            );

        }
        
    }

    pasarDatosDetalleCompras()
    {

        for(var i = 0; i < this.listado_productos_compras.length; i++) {
            this.Detalle_compras = 
            {
                Id_producto: this.listado_productos_compras[i].Id_producto, 
                Precio_compra: this.listado_productos_compras[i].Precio_referencial_compra,
                Cantidad_ordenada: this.listado_productos_compras[i].Cantidad_ordenada, 
                Cantidad_recibida: "0",
                Cantidad_rechazada: "0"
            }
            //console.log(this.Detalle_compras.Id_producto);    
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
                        Id_producto: "", 
                        Descripcion_producto: "", 
                        Talla: "", 
                        Color: "", 
                        Cantidad_ordenada: "", 
                        Precio_referencial_compra: "", 
                        Descripcion_modelo: "",
                        Nombre_marca: "",
                        Descripcion_subcategoria: "",
                        Descripcion_categoria: ""
                    }

                    this.Detalle_compras = {
                        
                        Id_producto: "", 
                        Precio_compra: "",
                        Cantidad_ordenada: "", 
                        Cantidad_recibida: "0", 
                        Cantidad_rechazada: "0"
                    }

                    this.subtotal = 0;
                    this.total = 0;
                    this.isv = 0;
                    this.listado_productos_compras = [];
            }
        );
    }

    /*update_compra()
    {
        var response;
        this.service.update_compra(this.Compra).subscribe(
            data=>response = data,
            err => {
                console.log("Error al consultar servicio"); 
            },
            ()=>{
   
                this.Compra = 
                {
                    Id_compra: "",
                    Fecha_orden: "",
                    Fecha_recibida: "",
                    Gastos_adicionales: "",
                    Id_proveedor: ""
                }
                this.get_compras();
            }
        );
    }*/

    delete_compra(id_compra)
    {
        var response;
        var load = 
        {
            Id_compra:id_compra
        }
        this.service.delete_compra(load).subscribe
        (
            data=>response = data,
            err => 
            {
                console.log("Error al consultar servicio"); 
            },
            ()=>
            {
                //this.get_compras();
            }
        );
    }

}
