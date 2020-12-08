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
    public term:any = "";

    constructor(public service:AppService){
        this.listado_proveedores = [];
    }

    public Proveedor = {
        id_proveedor: "",
        nombre_compania: "",
        direccion: "",
        nombre_contacto: "",
        apellido_contacto: "",
        telefono_contacto: "",
        email_contacto: "",
        id_ciudad: "",
    }

    ngOnInit(){
        this.get_proveedores();
        this.get_ciudades();
    }

    limpiar_proveedor(){

        this.Proveedor = {

            id_proveedor: "",
            nombre_compania:"",
            direccion:"",
            nombre_contacto:"",
            apellido_contacto:"",
            telefono_contacto:"",
            email_contacto: "",
            id_ciudad: "",
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
                    id_proveedor: "",
                    nombre_compania:"",
                    direccion:"",
                    nombre_contacto:"",
                    apellido_contacto:"",
                    telefono_contacto:"",
                    email_contacto: "",
                    id_ciudad: "",
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
            id_proveedor: proveedor.Id_proveedor,
            nombre_compania:proveedor.Nombre_compania,
            direccion:proveedor.Direccion,
            nombre_contacto:proveedor.Nombre_contacto,
            apellido_contacto:proveedor.Apellido_contacto,
            telefono_contacto:proveedor.Telefono_contacto,
            email_contacto:proveedor.Email_contacto,
            id_ciudad: proveedor.Id_ciudad
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
                    id_proveedor: "",
                    nombre_compania:"",
                    direccion:"",
                    nombre_contacto:"",
                    apellido_contacto:"",
                    telefono_contacto:"",
                    email_contacto: "",
                    id_ciudad: ""
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
            id_proveedor:id_proveedor
        }
        console.log(id_proveedor);
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

