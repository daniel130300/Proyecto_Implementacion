import {Component} from "@angular/core";
import { AppService } from 'src/app/app.service';
//import {} from ;
@Component({
    selector:'mantenimiento_clientes',
    templateUrl:'./mantenimiento_clientes.component.html'
})

export class GetClientesComponent{
    public listado_clientes:any[];
    public listado_ciudades:any[];
    public listado_tipo_cliente:any[];
    constructor(public service:AppService){
        this.listado_clientes=[];
        this.listado_ciudades=[];
        this.listado_tipo_cliente=[];
    }
    public Persona={
        Id_cliente:"",
        Nombre_compania:"",
        Id_ciudad:"",
        Id_tipo_cliente:"",
        Direccion:"",
        Nombre_contacto:"",
        Apellido_contacto:"",
        Telefono_contacto:"",
        Email_contacto:""
    }
    ngOnInit(){
        this.get_clientes();
        this.get_ciudad();
        this.get_tipo_cliente();
    }

    limpiar_cliente(){

        this.Persona = {

            Id_cliente:"",
            Nombre_compania:"",
            Id_ciudad:"",
            Id_tipo_cliente:"",
            Direccion:"",
            Nombre_contacto:"",
            Apellido_contacto:"",
            Telefono_contacto:"",
            Email_contacto:""
        }   
    }

    get_tipo_cliente(){
        var response;
        this.service.get_tipo_cliente().subscribe(
            data=>response=data,
            err=>{
                console.log("ERROR AL CONSULTAR EL SERVICIO");
            },
            ()=>{
                this.listado_tipo_cliente=response;
              //  console.log(this.listado_clientes);
            }
            
        )
    }
    get_ciudad(){
        var response;
        this.service.get_ciudad().subscribe(
            data=>response=data,
            err=>{
                console.log("ERROR AL CONSULTAR EL SERVICIO");
            },
            ()=>{
                this.listado_ciudades=response;
              //  console.log(this.listado_clientes);
            }
            
        )
    }
    
    get_clientes(){
        var response;
        this.service.get_clientes().subscribe(
            data=>response=data,
            err=>{
                console.log("ERROR AL CONSULTAR EL SERVICIO");
            },
            ()=>{
                this.listado_clientes=response;
              //  console.log(this.listado_clientes);
            }   
        )
    }

    insertar_cliente(){
        var response;
        this.service.insertar_cliente(this.Persona).subscribe(
            data=>response = data,
            err => {
                console.log("Error al consultar servicio"); 
            },
            ()=>{
                    this.Persona = {
                        Id_cliente:"",
                        Nombre_compania:"",
                        Id_ciudad:"",
                        Id_tipo_cliente:"",
                        Direccion:"",
                        Nombre_contacto:"",
                        Apellido_contacto:"",
                        Telefono_contacto:"",
                        Email_contacto:""
                }
                this.get_clientes();
            }
        );

    }
    pasarDatosCliente(clientes){
        this.Persona= {
            Id_cliente:clientes.Id_cliente,
            Nombre_compania:clientes.Nombre_compania,
            Id_ciudad:clientes.Id_ciudad,
            Id_tipo_cliente:clientes.Id_tipo_cliente,
            Direccion:clientes.Direccion,
            Nombre_contacto:clientes.Nombre_contacto,
            Apellido_contacto:clientes.Apellido_contacto,
            Telefono_contacto:clientes.Telefono_contacto,
            Email_contacto:clientes.Email_contacto
          
            }
        
    }
    update_cliente(){
        var response;
        this.service.update_cliente(this.Persona).subscribe(
            data=>response = data,
            err => {
                console.log("Error al consultar servicio"); 
            },
            ()=>{
   
                this.Persona = {
                    Id_cliente:"",
                    Nombre_compania:"",
                    Id_ciudad:"",
                    Id_tipo_cliente:"",
                    Direccion:"",
                    Nombre_contacto:"",
                    Apellido_contacto:"",
                    Telefono_contacto:"",
                    Email_contacto:""
            }
            this.get_clientes();
            }
        );
    }
   delete_cliente(Id_cliente){ 
        var response;
        var load={
            Id_cliente:Id_cliente
        }
        this.service.delete_cliente(load).subscribe(
            data=>response=data,
            err=>{
                console.log("Error al consultar servicio");
            },
            ()=>{
                this.get_clientes();
            }
        );

    }


}