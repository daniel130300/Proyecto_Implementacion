import { Component }  from '@angular/core';
import { AppService } from 'src/app/app.service';

const swal = require( 'sweetalert2' );

@Component({
    
    selector: 'mantenimiento_empleados',
    templateUrl: './mantenimiento_empleados.component.html'
})

export class GetEmpleadosComponent {
    
    public listado_empleados: any[];
    public listado_estatus:   any[];
    public listado_puestos:   any[];

    constructor( public service: AppService ){

        this.listado_empleados = [];
    }

    public Empleado = {
        
        Id_empleado: "",
        Identidad: "",
        Nombre: "",
        Apellido: "",
        Telefono: "",
        Email: "",
        Direccion: "",
        Salario: "",
        LoginID: "",
        Contrasenia: "",
        Fecha_nacimiento: "",
        Fecha_contratacion: String( new Date().toISOString().substring( 0, 10 ) ),
        Fecha_despido: null,
        Id_estatus: "1",
        Descripcion_estatus: "",
        Id_puesto: "",
        Descripcion_puesto: ""
    }

    ngOnInit(){

        this.get_empleados();
        this.get_estatus();
        this.get_puestos();
    }
    
    limpiar_empleado(){

        this.Empleado = {

            Id_empleado: "",
            Identidad: "",
            Nombre: "",
            Apellido: "",
            Telefono: "",
            Email: "",
            Direccion: "",
            Salario: "",
            LoginID: "",
            Contrasenia: "",
            Fecha_nacimiento: "",
            Fecha_contratacion: String( new Date().toISOString().substring( 0, 10 ) ),
            Fecha_despido: null,
            Id_estatus: "1",
            Descripcion_estatus: "",
            Id_puesto: "",
            Descripcion_puesto: ""
        }   
    }

    insertar_empleado(){

        var response;

        this.service.insertar_empleado( this.Empleado ).subscribe(

            data => response = data,

            err => {

                console.log( "Error al consultar el servicio." ); 
            },

            () => {

                this.Empleado = {

                    Id_empleado: "",
                    Identidad: "",
                    Nombre: "",
                    Apellido: "",
                    Telefono: "",
                    Email: "",
                    Direccion: "",
                    Salario: "",
                    LoginID: "",
                    Contrasenia: "",
                    Fecha_nacimiento: "",
                    Fecha_contratacion: String( new Date().toISOString().substring( 0, 10 ) ),
                    Fecha_despido: null,
                    Id_estatus: "1",
                    Descripcion_estatus: "",
                    Id_puesto: "",
                    Descripcion_puesto: ""
                }
                
                this.get_empleados();

                swal.fire({
                    
                    title: "¡Usuario agregado exitosamente!",
                    icon:  'success'
                });
            }
        );       
    }
    
    get_empleados(){

        var response;

        this.service.get_empleados().subscribe(

            data => response = data,

            err => {

                console.log( "Error al consultar el servicio." );
            },

            () => {

                this.listado_empleados = response;
            }  
        );
    }

    get_estatus(){

        this.listado_estatus = [];

        var response;

        this.service.get_estatus().subscribe(

            data => response = data,

            err => {

                console.log( "Error al consultar el servicio." );
            },

            () => {

                this.listado_estatus = response;
            }  
        );
    }

    get_puestos(){

        this.listado_puestos = [];

        var response;

        this.service.get_puestos().subscribe(

            data => response = data,

            err => {

                console.log( "Error al consultar el servicio." );
            },

            () => {

                this.listado_puestos = response;
            }  
        );
    }

    pasarDatosEmpleado( empleado )
    {
        this.Empleado = {

            Id_empleado: empleado.Id_empleado,
            Identidad: empleado.Identidad,
            Nombre: empleado.Nombre,
            Apellido: empleado.Apellido,
            Telefono: empleado.Telefono,
            Email: empleado.Email,
            Direccion: empleado.Direccion,
            Salario: empleado.Salario,
            LoginID: empleado.LoginID,
            Contrasenia: empleado.Contrasenia,
            Fecha_nacimiento: String( empleado.Fecha_nacimiento ).substring( 0, 10 ),
            Fecha_contratacion: String( empleado.Fecha_contratacion ).substring( 0, 10 ),
            Fecha_despido: String( empleado.Fecha_contratacion ).substring( 0, 10 ),
            Id_estatus: empleado.Id_estatus,
            Descripcion_estatus: empleado.Descripcion_estatus,
            Id_puesto: empleado.Id_puesto,
            Descripcion_puesto: empleado.Descripcion_puesto
        }      
    }

    update_empleado(){

        var response;

        this.service.update_empleado( this.Empleado ).subscribe(
            
            data => response = data,

            err => {

                console.log( "Error al consultar el servicio." ); 
            },

            () => {
   
                this.Empleado = {

                    Id_empleado: "",
                    Identidad: "",
                    Nombre: "",
                    Apellido: "",
                    Telefono: "",
                    Email: "",
                    Direccion: "",
                    Salario: "",
                    LoginID: "",
                    Contrasenia: "",
                    Fecha_nacimiento: "",
                    Fecha_contratacion: String( new Date().toISOString().substring( 0, 10 ) ),
                    Fecha_despido: null,
                    Id_estatus: "1",
                    Descripcion_estatus: "",
                    Id_puesto: "",
                    Descripcion_puesto: ""
                }

                this.get_empleados();

                swal.fire({
                    title: "¡Usuario actualizado exitosamente!",
                    icon: 'success'
                });
            }
        );
    }

    /*delete_empleado( id_empleado ) {

        var response;

        var load = { Id_empleado: id_empleado }

        this.service.delete_empleado( load ).subscribe
        (
            data => response = data,
            
            err => {

                console.log( "Error al consultar el servicio." ); 
            },

            () => {

                this.get_empleados();
            }
        );
    }*/

}