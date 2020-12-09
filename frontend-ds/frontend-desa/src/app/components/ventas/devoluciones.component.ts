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
 public id_venta:"";
 term: any[];

  constructor( public service: AppService ){

        this.listado_productos = [];
        this.listado_ventas=[];
    }
    
    public cantidad =
    {
        id_venta:"",
        cantidad_devuelta: "",
        id_producto:"",
    }

    public Devoluciones =
    {
        fecha_venta:"",
        informacion_adicional_producto:""
    }
    
    public Productos = {
        id_producto: "",
        nombre_producto: "",
        informacion_adicional_producto: "",
        cantidad_vendida:"",
        cantidad_devuelta:""
    }

    ngOnInit(){
        this.get_devoluciones_venta();
    }

    get_devoluciones_venta()
    {
        var response;
        this.service.get_devoluciones_venta().subscribe(
            data=>response=data,
            err=>{
                console.log("Error al consultar servicio.");
            },
            ()=>
            {
                this.listado_ventas=response;
            }
        )
    }
    
    get_devoluciones_productos(id_venta)
    {
        var response;
        this.service.get_devoluciones_productos(id_venta).subscribe(
            data=>response=data,
            err=>{
                console.log("Error al consultar servicio.");
            },
            ()=>
            {
                this.listado_productos=response;
            }
        )
    }
    
    pasar_datos_venta(devoluciones)
    {
        this.Devoluciones = 
        {
            fecha_venta:String(devoluciones.Fecha_venta).substring(0, 10),
            informacion_adicional_producto: "Talla: " + devoluciones.Talla + ", Color: " + devoluciones.Color + ", Modelo: " + devoluciones.Descripcion_modelo + ", Marca: " + devoluciones.Nombre_marca + ", Subcategoria: " + devoluciones.Descripcion_subcategoria,
        }
        this.id_venta=devoluciones.Id_venta
    }
    
    pasarDatosProducto(producto)
    {
        this.Productos = 
        {
            id_producto: producto.Id_producto,
            nombre_producto: producto.Descripcion_producto,
            informacion_adicional_producto: "Talla: " + producto.Talla + ", Color: " + producto.Color + ", Modelo: " + producto.Descripcion_modelo + ", Marca: " + producto.Nombre_marca + ", Subcategoria: " + producto.Descripcion_subcategoria, 
            cantidad_devuelta: producto.Cantidad_devuelta,
            cantidad_vendida:producto.Cantidad_vendida
        }
    }
    
    update_Cantidad(id_venta){

        this.cantidad = {
            id_venta: this.id_venta,
            cantidad_devuelta: this.Productos.cantidad_devuelta,
            id_producto: this.Productos.id_producto,
        }
        var response;
        this.service.update_devoluciones(this.cantidad).subscribe(
            data=>response = data,
            err => {
                console.log("Error al consultar el servicio");
            },
            ()=>{
                 this.cantidad={id_venta:"",cantidad_devuelta:"",id_producto:""}
                 this.Productos={id_producto: "",
                 nombre_producto: "",
                 informacion_adicional_producto: "",
                 cantidad_vendida:"",
                 cantidad_devuelta:""}
                 this.Devoluciones={
                 fecha_venta:"",
                 informacion_adicional_producto:""
                 }
                this.id_venta=""
                this.get_devoluciones_venta()
            }  
        );
    }

    AgregarDevolucion()
    {
        if (this.Devoluciones.fecha_venta == "")
        {
            swal.fire({
                icon: 'error',
                title:"No ha seleccionado una venta."
              })
        }
        else if (this.Productos.id_producto == "")
        {
            swal.fire({
                icon: 'error',
                title:"No ha seleccionado un producto."
              })
        }
        else
        {
            if (this.Productos.cantidad_devuelta != "" && parseInt(this.Productos.cantidad_devuelta) > 0 && parseInt(this.Productos.cantidad_devuelta) <= parseInt(this.Productos.cantidad_vendida))
            {
                this.listado_productos.unshift(this.Productos);
                console.log(this.listado_productos); 
                this.update_Cantidad(this.id_venta);
                swal.fire({
                    icon: 'success',
                    title:"¡Agregado exitoso!"
                  })
            }
            else if (parseInt(this.Productos.cantidad_devuelta) > parseInt(this.Productos.cantidad_vendida))
            {
                swal.fire({
                    icon: 'error',
                    title:"Cantidad devuelta excede la cantidad vendida."
                  })
            }
        }
    }
}