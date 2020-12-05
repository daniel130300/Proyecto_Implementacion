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
    public Id_categoria: any="";
    public Id_subcategoria: any="";
    public Id_marca: any="";
    term: any[];
    
    constructor(public service:AppService, private router:Router){
        this.listado_productos = [];
        
    }

    public Producto = {
        Id_producto: "", 
        Descripcion_producto: "", 
        Talla: null, 
        Color: "", 
        Stock: "", 
        Precio_referencial_venta: "", 
        Precio_referencial_compra: "", 
        Punto_reorden: "",
        Id_modelo: ""
    }
    public Categ = { Id_subcategoria: "" }

    public prove = { Id_proveedor: ""}

    public modelos={
        
        Id_marca:"",
        Id_subcategoria:""
    }
    public actualizar={
        Id_producto:"",
        Id_proveedor:""
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

        if(this.Producto.Descripcion_producto!="" && this.Producto.Talla!="" && this.Producto.Color!="" && this.Producto.Stock!="" && this.Producto.Precio_referencial_venta!="" && this.Producto.Precio_referencial_compra!="" && this.Producto.Punto_reorden!="" && this.Producto.Id_modelo!="")
        {
            this.service.insertar_producto(this.Producto).subscribe(
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
                            Stock: "", 
                            Precio_referencial_venta: "", 
                            Precio_referencial_compra: "", 
                            Punto_reorden: "",
                            Id_modelo: ""
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
                    this.prove = { Id_proveedor: ""}
                    this.get_productos();
                }
            );

            this.Id_categoria = "";
            this.Id_subcategoria = "";
            this.Id_marca = "";
            
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
            Id_proveedor:this.prove.Id_proveedor,
            Id_producto:this.Producto.Id_producto
        }
        this.service.update_producto_proveedor(this.actualizar).subscribe(
            data=>response = data,
            err => {
                console.log("Error al consultar servicio"); 
            },
            ()=>{
                this.actualizar={
                    Id_proveedor:"",
                    Id_producto:""
                    
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
        this.prove = { Id_proveedor: prove.Id_proveedor}
    }
    
    pasarDatosProducto(producto)
    {
        this.get_subcategorias();
        this.get_modelos();
        this.get_proveedores();

        this.Producto = 
        {
            Id_producto: producto.Id_producto, 
            Descripcion_producto: producto.Descripcion_producto, 
            Talla: producto.Talla, 
            Color: producto.Color, 
            Stock: producto.Stock, 
            Precio_referencial_venta: producto.Precio_referencial_venta, 
            Precio_referencial_compra: producto.Precio_referencial_compra, 
            Punto_reorden: producto.Punto_reorden,
            Id_modelo: producto.Id_modelo
        }

        this.Id_categoria = producto.Id_categoria;
        this.Id_subcategoria = producto.Id_subcategoria;
        this.Id_marca = producto.Id_marca;
        this.prove.Id_proveedor = producto.Id_proveedor;
    }


    update_producto(id_producto)
    {
        let regexpLetterNumbers = /^[a-zA-Z0-9\s]{4,50}$/;
        let regexpNumber  =  /^[0-9]{1,5}$/;
        let regexpLetter =  /^[a-zA-Z\s]{4,50}$/;

        this.Producto = 
        {
            Id_producto: this.Producto.Id_producto, 
            Descripcion_producto: this.Producto.Descripcion_producto, 
            Talla: this.Producto.Talla, 
            Color: this.Producto.Color, 
            Stock: this.Producto.Stock, 
            Precio_referencial_venta: this.Producto.Precio_referencial_venta, 
            Precio_referencial_compra: this.Producto.Precio_referencial_compra, 
            Punto_reorden: this.Producto.Punto_reorden,
            Id_modelo: this.Producto.Id_modelo
        }

        if(this.Producto.Descripcion_producto == "" || this.Producto.Color == "" || 
           this.Producto.Stock == "" || this.Producto.Precio_referencial_venta == "" || 
           this.Producto.Precio_referencial_compra == "" || this.Producto.Punto_reorden == "" || this.Producto.Id_modelo == "")
        {
            swal.fire({
                title: "Es necesario que los campos no queden vacios. Vuelve a intentarlo.",
                icon: 'error'
            });

        }
        else
        {
            if(regexpLetterNumbers.test(this.Producto.Descripcion_producto) == false || regexpLetter.test(this.Producto.Color) == false)
            {
                swal.fire({
                    title: "Solo se permiten letras. Vuelve a intentarlo",
                    icon: 'error'
                });
            }
            else if(regexpNumber.test(this.Producto.Stock) == false || 
                    regexpNumber.test(this.Producto.Precio_referencial_venta) == false || 
                    regexpNumber.test(this.Producto.Precio_referencial_compra) == false || 
                    regexpNumber.test(this.Producto.Punto_reorden) == false )
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
                    Id_proveedor:this.prove.Id_proveedor,
                    Id_producto:this.Producto.Id_producto
                }

                this.service.update_producto_proveedor(this.actualizar).subscribe(
                    data=>response = data,
                    err => {
                        console.log("Error al consultar servicio"); 
                    },
                    ()=>{
                        this.actualizar=
                        {
                            Id_proveedor:"",
                            Id_producto:""
                        }
                        this.get_productos();
                    }
                );

                this.get_productos();

                this.Producto = 
                {
                    Id_producto: "", 
                    Descripcion_producto: "", 
                    Talla: "", 
                    Color: "", 
                    Stock: "", 
                    Precio_referencial_venta: "", 
                    Precio_referencial_compra: "", 
                    Punto_reorden: "",
                    Id_modelo: ""
                }

                this.Id_categoria = "";
                this.Id_subcategoria = "";
                this.Id_marca = "";
                this.prove.Id_proveedor = "";

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
            Id_producto: "", 
            Descripcion_producto: "", 
            Talla: "", 
            Color: "", 
            Stock: "", 
            Precio_referencial_venta: "", 
            Precio_referencial_compra: "", 
            Punto_reorden: "",
            Id_modelo: ""
        }
        
        this.Id_categoria = "";
        this.Id_subcategoria = "";
        this.Id_marca = "";
        this.prove.Id_proveedor = "";
    
    }
    get_subcategoria_filtrado(Id_categoria){
        var response;
        this.service.get_subcategoria_filtrado(Id_categoria).subscribe(
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
            Id_marca:this.Id_marca,
            Id_subcategoria:this.Id_subcategoria
            
        }
        this.service.get_modelo_filtrado(this.Id_marca,this.Id_subcategoria).subscribe(
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


