import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
const swal = require('sweetalert2');


@Component({
    selector: 'mantenimiento_productos',
    templateUrl: './mantenimiento_productos.component.html'
})

export class GetProductosComponent {
    
    public listado_productos: any[];
    public listado_categorias: any[];
    public listado_subcategorias: any[];
    public listado_marcas: any[];
    public listado_modelos: any[];
    public listado_proveedores: any[];
    public id_categoria: any="";
    public id_subcategoria: any="";
    public id_marca: any="";
    term: any[];
    
    constructor(public service:AppService, private router:Router){
        this.listado_productos = [];
        
    }

    public Producto = {
        id_producto: "", 
        descripcion_producto: "", 
        talla: null, 
        color: "", 
        stock: "", 
        precio_referencial_venta: "", 
        precio_referencial_compra: "", 
        punto_reorden: "",
        id_modelo: ""
    }
    public Categ = { id_subcategoria: "" }

    public prove = { id_proveedor: ""}

    public modelos={    
        id_marca:"",
        id_subcategoria:""
    }
    public actualizar={
        id_producto:"",
        id_proveedor:""
    }
    
    redirigir_categorias(){
        this.router.navigateByUrl('/mantenimiento_categorias');
    }

    redirigir_subcategorias(){
        this.router.navigateByUrl('/mantenimiento_subcategorias');
    }

    redirigir_marcas(){
        this.router.navigateByUrl('/mantenimiento_marcas');
    }

    redirigir_modelos(){
        this.router.navigateByUrl('/mantenimiento_modelos');
    }

    redirigir_proveedores(){
        this.router.navigateByUrl('/mantenimiento_proveedores');
    }

    ngOnInit(){
        this.get_productos();
        this.get_categorias();
        this.get_marcas();
        this.get_proveedores();
    }

    get_categorias(){
        this.listado_categorias = [];
        var response;
        this.service.get_categorias().subscribe(
            data=>response = data,
            err => {
                this.listado_categorias = [];
                console.log("Error al consultar el servicio");
            },
            ()=>{
                this.listado_categorias = response;
            }  
        );
    }

    get_subcategorias(){
        this.listado_subcategorias = [];
        var response;
        this.service.get_subcategorias().subscribe(
            data=>response = data,
            err => {
                this.listado_subcategorias = [];
                console.log("Error al consultar el servicio");
            },
            ()=>{
                this.listado_subcategorias = response;
            }  
        );
    }

    get_marcas(){
        this.listado_marcas = [];
        var response;
        this.service.get_marcas().subscribe(
            data=>response = data,
            err => {
                this.listado_marcas = [];
                console.log("Error al consultar el servicio");
            },
            ()=>{
                this.listado_marcas = response;
            }  
        );
    }

    get_modelos(){
        this.listado_modelos = [];
        var response;
        this.service.get_modelos().subscribe(
            data=>response = data,
            err => {
                this.listado_modelos = [];
                console.log("Error al consultar el servicio");
            },
            ()=>{
                this.listado_modelos = response;
            }  
        );
    }

    get_proveedores(){
        this.listado_proveedores = [];
        var response;
        this.service.get_proveedores().subscribe(
            data=>response = data,
            err => {
                console.log("Error al consultar el servicio");
            },
            ()=>{
                this.listado_proveedores = response;
            }  
        );
    }

    insertar_producto(){
        var response;

        if(this.Producto.descripcion_producto!="" && this.Producto.talla!="" && this.Producto.color!="" && this.Producto.stock!="" && this.Producto.precio_referencial_venta!="" && this.Producto.precio_referencial_compra!="" && this.Producto.punto_reorden!="" && this.Producto.id_modelo!="")
        {
            this.service.insertar_producto(this.Producto).subscribe(
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
                        stock: "", 
                        precio_referencial_venta: "", 
                        precio_referencial_compra: "", 
                        punto_reorden: "",
                        id_modelo: ""
                    }
                    this.get_productos();
                }
            );
            
            this.service.insert_producto_proveedor(this.prove).subscribe(
                data=>response = data,
                err => {
                    console.log("Error al consultar servicio"); 
                },
                ()=>{
                    this.prove = { id_proveedor: ""}
                    this.get_productos();
                }
            );

            this.id_categoria = "";
            this.id_subcategoria = "";
            this.id_marca = "";
            
            this.get_productos();

            swal.fire({
                title: "¡Agregado exitosamente!",
                icon:  'success'
            }); 
        } 
    }

    update_productos_proveedores()
    {
        var response;
        this.actualizar={
            id_proveedor:this.prove.id_proveedor,
            id_producto:this.Producto.id_producto
        }
        this.service.update_producto_proveedor(this.actualizar).subscribe(
            data=>response = data,
            err => {
                console.log("Error al consultar servicio"); 
            },
            ()=>{
                this.actualizar={
                    id_proveedor:"",
                    id_producto:""
                }
                this.get_proveedores();
            }
        );
    }
    
    get_productos(){
        var response;
        this.service.get_productos().subscribe(
            data=>response = data,
            err => {
                console.log("Error al consultar el servicio");
            },
            ()=>{
                 this.listado_productos = response;
            }  
        );
    }

    pasarproveedor(prove){
        this.prove = { id_proveedor: prove.Id_proveedor}
    }
    
    pasarDatosProducto(producto)
    {
        this.get_subcategorias();
        this.get_modelos();
        this.get_proveedores();

        this.Producto = 
        {
            id_producto: producto.Id_producto, 
            descripcion_producto: producto.Descripcion_producto, 
            talla: producto.Talla, 
            color: producto.Color, 
            stock: producto.Stock, 
            precio_referencial_venta: producto.Precio_referencial_venta, 
            precio_referencial_compra: producto.Precio_referencial_compra, 
            punto_reorden: producto.Punto_reorden,
            id_modelo: producto.Id_modelo
        }

        this.id_categoria = producto.Id_categoria;
        this.id_subcategoria = producto.Id_subcategoria;
        this.id_marca = producto.Id_marca;
        this.prove.id_proveedor = producto.Id_proveedor;
    }


    update_producto(id_producto)
    {
        let regexpLetterNumbers = /^[a-zA-Z0-9\s]{4,50}$/;
        let regexpNumber  =  /^[0-9]{1,5}$/;
        let regexpLetter =  /^[a-zA-Z\s]{4,50}$/;

        this.Producto = 
        {
            id_producto: this.Producto.id_producto, 
            descripcion_producto: this.Producto.descripcion_producto, 
            talla: this.Producto.talla, 
            color: this.Producto.color, 
            stock: this.Producto.stock, 
            precio_referencial_venta: this.Producto.precio_referencial_venta, 
            precio_referencial_compra: this.Producto.precio_referencial_compra, 
            punto_reorden: this.Producto.punto_reorden,
            id_modelo: this.Producto.id_modelo
        }

        if(this.Producto.descripcion_producto == "" || this.Producto.color == "" || 
           this.Producto.stock == "" || this.Producto.precio_referencial_venta == "" || 
           this.Producto.precio_referencial_compra == "" || this.Producto.punto_reorden == "" || this.Producto.id_modelo == "")
        {
            swal.fire({
                title: "Es necesario que los campos no queden vacios. Vuelve a intentarlo.",
                icon: 'error'
            });

        }
        else
        {
            if(regexpLetterNumbers.test(this.Producto.descripcion_producto) == false || regexpLetter.test(this.Producto.color) == false)
            {
                swal.fire({
                    title: "Solo se permiten letras. Vuelve a intentarlo",
                    icon: 'error'
                });
            }
            else if(regexpNumber.test(this.Producto.stock) == false || 
                    regexpNumber.test(this.Producto.precio_referencial_venta) == false || 
                    regexpNumber.test(this.Producto.precio_referencial_compra) == false || 
                    regexpNumber.test(this.Producto.punto_reorden) == false )
            {
                swal.fire({
                    title: "Solo se permiten numeros. Vuelve a intentarlo.",
                    icon: 'error'
                });
            }
            else
            {
                console.log(this.Producto);

                var response;
                this.service.update_producto(this.Producto).subscribe(
                    data=>response = data,
                    err => 
                    {
                        console.log("Error al consultar servicio"); 
                    },
                    ()=>{
                        this.get_productos();
                    }
                );

                this.actualizar={
                    id_proveedor:this.prove.id_proveedor,
                    id_producto:this.Producto.id_producto
                }

                this.service.update_producto_proveedor(this.actualizar).subscribe(
                    data=>response = data,
                    err => {
                        console.log("Error al consultar servicio"); 
                    },
                    ()=>{
                        this.actualizar=
                        {
                            id_proveedor:"",
                            id_producto:""
                        }
                        this.get_productos();
                    }
                );

                this.get_productos();

                this.Producto = 
                {
                    id_producto: "", 
                    descripcion_producto: "", 
                    talla: "", 
                    color: "", 
                    stock: "", 
                    precio_referencial_venta: "", 
                    precio_referencial_compra: "", 
                    punto_reorden: "",
                    id_modelo: ""
                }

                this.id_categoria = "";
                this.id_subcategoria = "";
                this.id_marca = "";
                this.prove.id_proveedor = "";

                swal.fire({

                    title: "¡Editado exitosamente!",
                    icon:  'success'
                });
            }
        }       
    }

    delete_producto(id_producto)
    {
        var response;
        var load = 
        {
            Id_producto:id_producto
        }
        this.service.delete_producto(load).subscribe
        (
            data=>response = data,
            err => 
            {
                console.log("Error al consultar servicio"); 
            },
            ()=>
            {
                this.get_productos();
            }
        );

        swal.fire({

            title: "¡Eliminado exitosamente!",
            icon:  'success'
        });
    }

    limpiaralv()
    {
        
        this.Producto = 
        {
            id_producto: "", 
            descripcion_producto: "", 
            talla: "", 
            color: "", 
            stock: "", 
            precio_referencial_venta: "", 
            precio_referencial_compra: "", 
            punto_reorden: "",
            id_modelo: ""
        }
        
        this.id_categoria = "";
        this.id_subcategoria = "";
        this.id_marca = "";
        this.prove.id_proveedor = "";
    
    }
    get_subcategoria_filtrado(id_categoria){
        var response;
        this.service.get_subcategoria_filtrado(id_categoria).subscribe(
            data=>response=data,
            err=>{
                console.log("ERROR AL CONSULTAR EL SERVICIO");
            },
            ()=>{
                this.listado_subcategorias=response;
            }   
        )
    }
    get_modelo_filtrado(){
        var response;
        this.modelos={
            id_marca:this.id_marca,
            id_subcategoria:this.id_subcategoria
            
        }
        this.service.get_modelo_filtrado(this.id_marca,this.id_subcategoria).subscribe(
            data=>response=data,
            err=>{
                console.log("ERROR AL CONSULTAR EL SERVICIO");
            },
            ()=>{
                
                this.listado_modelos=response;
            }   
        )
    }
}