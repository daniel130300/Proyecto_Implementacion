import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';

const swal = require( 'sweetalert2' );

@Component({
    selector: 'mantenimiento_proveedores',
    templateUrl: './mantenimiento_proveedores.component.html'
})

export class GetProveedoresComponent {
    
    public listado_proveedores: any[];
    public listado_ciudades: any[];

    constructor(public service:AppService){
        this.listado_proveedores = [];
    }

    public Proveedor = {
        Id_proveedor: "",
        Nombre_compania: "",
        Direccion: "",
        Nombre_contacto: "",
        Apellido_contacto: "",
        Telefono_contacto: "",
        Email_contacto: "",
        Id_ciudad: "",
    }

    ngOnInit(){
        this.get_proveedores();
        this.get_ciudades();
    }

    limpiar_proveedor(){

        this.Proveedor = {

            Id_proveedor: "",
            Nombre_compania:"",
            Direccion:"",
            Nombre_contacto:"",
            Apellido_contacto:"",
            Telefono_contacto:"",
            Email_contacto: "",
            Id_ciudad: "",
        }   
    }

    insertar_proveedor(){

        var response;

        this.service.insertar_proveedor( this.Proveedor ).subscribe(

            data => response = data,

            err => {

                console.log( "Error al consultar servicio" ); 
            },

            () => {

                    this.Proveedor = {
                    Id_proveedor: "",
                    Nombre_compania:"",
                    Direccion:"",
                    Nombre_contacto:"",
                    Apellido_contacto:"",
                    Telefono_contacto:"",
                    Email_contacto: "",
                    Id_ciudad: "",
                }

                this.get_proveedores();

                swal.fire({

                    title: "¡Agregado exitosamente!",
                    icon:  'success'
                });
            }
        );
    }
    
    get_proveedores(){
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

    get_ciudades(){
        var response;
        this.service.get_ciudades().subscribe(
            data=>response = data,
            err => {
                console.log("Error al consultar el servicio");
            },
            ()=>{
                 this.listado_ciudades = response;
            }  
        );
    }

    pasarDatosProveedor(proveedor)
    {
        this.Proveedor = 
        {
            Id_proveedor: proveedor.Id_proveedor,
            Nombre_compania:proveedor.Nombre_compania,
            Direccion:proveedor.Direccion,
            Nombre_contacto:proveedor.Nombre_contacto,
            Apellido_contacto:proveedor.Apellido_contacto,
            Telefono_contacto:proveedor.Telefono_contacto,
            Email_contacto:proveedor.Email_contacto,
            Id_ciudad: proveedor.Id_ciudad
        }      
    }

    update_proveedor()
    {
        var response;
        this.service.update_proveedor(this.Proveedor).subscribe(
            data=>response = data,
            err => {
                console.log("Error al consultar servicio"); 
            },
            ()=>{
   
                this.Proveedor = 
                {
                    Id_proveedor: "",
                    Nombre_compania:"",
                    Direccion:"",
                    Nombre_contacto:"",
                    Apellido_contacto:"",
                    Telefono_contacto:"",
                    Email_contacto: "",
                    Id_ciudad: ""
                }
                this.get_proveedores();
            }
        );
    }

    delete_proveedor(id_proveedor)
    {
        var response;
        var load = 
        {
            Id_proveedor:id_proveedor
        }
        this.service.delete_proveedor(load).subscribe
        (
            data=>response = data,
            err => 
            {
                console.log("Error al consultar servicio"); 
            },
            ()=>
            {
                this.get_proveedores();
            }
        );
    }

}

