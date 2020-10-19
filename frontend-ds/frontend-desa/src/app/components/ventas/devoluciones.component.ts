import { Component }  from '@angular/core';
import { AppService } from 'src/app/app.service';
const swal = require('sweetalert2');

@Component({

    selector: 'Devoluciones',
    templateUrl: './Devoluciones.component.html'
})


export class GetDevolucionesComponent
{
 public listado_productos: any[];
 public listado_estatus: any[];
 public listado_ventas: any[];
 public Id_venta:"";
 term: any[];

  constructor( public service: AppService ){

        this.listado_productos = [];
        this.listado_ventas=[];
    }
    
    public cantidad =
    {
        Id_venta:"",
        Cantidad_devuelta: "",
        Id_producto:"",
    }

    public Devoluciones =
    {
        Fecha_Venta:"",
        Informacion_adicional_producto:""
    }
    
    public Productos = {
        Id_producto: "",
        Nombre_producto: "",
        Informacion_adicional_producto: "",
        Cantidad_vendida:"",
        Cantidad_devuelta:""
    }

    ngOnInit(){
        this.get_devoluciones_venta();
    }

    //Consultar datos de Venta
    get_devoluciones_venta()
    {
        var response;
        this.service.get_devoluciones_venta().subscribe(
            data=>response=data,
            err=>{
                console.log("ERROR AL CONSULTAR EL SERVICIO");
            },
            ()=>
            {
                this.listado_ventas=response;
            }
        )
    }
    //Consultar Productos
    get_devoluciones_productos(Id_venta)
    {
        var response;
        this.service.get_devoluciones_productos(Id_venta).subscribe(
            data=>response=data,
            err=>{
                console.log("ERROR AL CONSULTAR EL SERVICIO");
            },
            ()=>
            {
                this.listado_productos=response;
            }
        )
    }
    
    pasarDatosVenta(Devoluciones)
    {
        this.Devoluciones = 
        {
            Fecha_Venta:String(Devoluciones.Fecha_venta).substring(0, 10),
            Informacion_adicional_producto: "Talla: " + Devoluciones.Talla + ", Color: " + Devoluciones.Color + ", Modelo: " + Devoluciones.Descripcion_modelo + ", Marca: " + Devoluciones.Nombre_marca + ", Subcategoria: " + Devoluciones.Descripcion_subcategoria,
        }
        this.Id_venta=Devoluciones.Id_venta
    }
    //Funcion para pasar los productos
    pasarDatosProducto(producto)
    {
        this.Productos = 
        {
            Id_producto: producto.Id_producto,
            Nombre_producto: producto.Descripcion_producto,
            Informacion_adicional_producto: "Talla: " + producto.Talla + ", Color: " + producto.Color + ", Modelo: " + producto.Descripcion_modelo + ", Marca: " + producto.Nombre_marca + ", Subcategoria: " + producto.Descripcion_subcategoria, 
            Cantidad_devuelta: producto.Cantidad_devuelta,
            Cantidad_vendida:producto.Cantidad_vendida
        }
    }
    
    //Funcion para actualizar la cantidad devuelta
    update_Cantidad(Id_venta){

        this.cantidad = {
            Id_venta: this.Id_venta,
            Cantidad_devuelta: this.Productos.Cantidad_devuelta,
            Id_producto: this.Productos.Id_producto,
        }
        var response;
        this.service.update_devoluciones(this.cantidad).subscribe(
            data=>response = data,
            err => {
                console.log("Error al consultar el servicio");
            },
            ()=>{
                 this.cantidad={Id_venta:"",Cantidad_devuelta:"",Id_producto:""}
                 this.Productos={Id_producto: "",
                 Nombre_producto: "",
                 Informacion_adicional_producto: "",
                 Cantidad_vendida:"",
                 Cantidad_devuelta:""}
                 this.Devoluciones={
                 Fecha_Venta:"",
                 Informacion_adicional_producto:""
                 }
                this.Id_venta=""
                this.get_devoluciones_venta()
            }  
        );
    }

    //Funcion para actualizar en la base

    AgregarDevolucion()
    {
        if (this.Devoluciones.Fecha_Venta == "")
        {
            swal.fire({
                icon: 'error',
                title:"No ha seleccionado una venta"
              })
        }
        else if (this.Productos.Id_producto == "")
        {
            swal.fire({
                icon: 'error',
                title:"No ha seleccionado un producto"
              })
        }
        else
        {
            if (this.Productos.Cantidad_devuelta != "" && parseInt(this.Productos.Cantidad_devuelta) > 0 && parseInt(this.Productos.Cantidad_devuelta) <= parseInt(this.Productos.Cantidad_vendida))
            {
                this.listado_productos.unshift(this.Productos);
                console.log(this.listado_productos); 
                this.update_Cantidad(this.Id_venta);
                swal.fire({
                    icon: 'success',
                    title:"¡Agregado exitoso!"
                  })
            }
            else if (parseInt(this.Productos.Cantidad_devuelta) > parseInt(this.Productos.Cantidad_vendida))
            {
                swal.fire({
                    icon: 'error',
                    title:"Cantidad devuelta excede la cantidad vendida"
                  })
            }
        }
    }
}