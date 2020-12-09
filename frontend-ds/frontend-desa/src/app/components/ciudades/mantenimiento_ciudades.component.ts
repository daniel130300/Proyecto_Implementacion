import {Component} from "@angular/core";
import { AppService } from 'src/app/app.service';

@Component({
    selector: 'mantenimiento_ciudades',
    templateUrl: './mantenimiento_ciudades.component.html'
})

export class GetCiudadesComponent{

    public listado_ciudades:any[];
    public listado_departamentos:any[];

    constructor(public service:AppService){
        this.listado_ciudades=[];
    }

    public Ciudad={
        id_ciudad: "",
        nombre_ciudad: "",
        id_departamento: ""
    }

    ngOnInit(){
        this.get_ciudades();
        this.get_departamentos();
    }

    get_ciudades(){
        var response;
        this.service.get_ciudades().subscribe(
            data=>response=data,
            err=>{
                console.log("ERROR AL CONSULTAR EL SERVICIO");
            },
            ()=>{
                this.listado_ciudades=response;
            }  
        )
    }

    insertar_ciudad(){
        var response;
        this.service.insertar_ciudad(this.Ciudad).subscribe(
            data=>response = data,
            err => {
                console.log("Error al consultar servicio"); 
            },
            ()=>{
                    this.Ciudad={
                        id_ciudad:"",
                        nombre_ciudad:"",
                        id_departamento:""
                }
                this.get_ciudades();
            }
        );
    }

    pasar_datos_ciudades(ciudades){
        this.Ciudad={
            id_ciudad:ciudades.Id_ciudad,
            nombre_ciudad:ciudades.Nombre_ciudad,
            id_departamento:ciudades.Id_departamento
        } 
    }

    update_ciudad(){
        var response;
        this.service.update_ciudad(this.Ciudad).subscribe(
            data=>response = data,
            err => {
                console.log("Error al consultar servicio"); 
            },
            ()=>{
                this.Ciudad={
                    id_ciudad:"",
                    nombre_ciudad:"",
                    id_departamento:""
                }

                this.get_ciudades();
            }
        );
    }

   delete_ciudad(id_ciudad){ 
        var response;
        var load={
            Id_ciudad:id_ciudad
        }
        this.service.delete_ciudad(load).subscribe(
            data=>response=data,
            err=>{
                console.log("Error al consultar servicio");
            },
            ()=>{
                this.get_ciudades();
            }
        );

    }
    
    get_departamentos(){
        var response;
        this.service.get_departamentos().subscribe(
            data=>response=data,
            err=>{
                console.log("ERROR AL CONSULTAR EL SERVICIO");
            },
            ()=>{
                this.listado_departamentos=response;
            }
        )
    }
}