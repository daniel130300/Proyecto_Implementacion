import {Component} from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
const swal = require('sweetalert2');

@Component({
    selector:'mantenimiento_marcas',
    templateUrl: './mantenimiento_marcas.component.html'
})

export class GetMarcasComponent {
    
    public listado_marcas: any[];

    constructor(public service:AppService, private router:Router){
        this.listado_marcas=[];
    }

    public marca ={
        id_marca:"",
        nombre:""
    }

     ngOnInit(){
        this.get_marcas();
    }

    volverpro(){
        this.router.navigateByUrl('/mantenimiento_productos');
    }

    get_marcas(){
        var response;
        this.service.get_marcas().subscribe(
                data=>response=data,
                error =>{
                    console.log("Error al consultar el servicio");
                },
                ()=>
                {
                    this.listado_marcas = response;
                    console.log(this.listado_marcas);
                }
            );
    }

    insert_marca(){
        var response;
        this.service.insert_marca(this.marca).subscribe(
            data=>response = data,
            err=>{
                console.log("Error al consultar servicio");
            },
            ()=>{
                this.marca={
                    id_marca:"",
                    nombre:""
                }

                this.get_marcas();
             } 
        );
    }

    eliminar_marca(Id_marca){
        var response;
        var load={
            Id_marca: Id_marca
        }
        this.service.eliminar_marca(load).subscribe(
            data=>response=data,
            err=>{
                console.log("Error al consultar servicio");
            },
            ()=>{
                this.get_marcas();
            }
        );
    }

    pasar_datos_marca(marca){
        this.marca ={
            id_marca:marca.Id_marca,
            nombre :marca.Nombre_marca
        }
    }

    update_marca(Id_marca)
    {
        let regexpLetter: RegExp  = /^[a-zA-Z ]{4,20}$/;

        this.marca = 
        {
            id_marca: this.marca.id_marca,
            nombre: this.marca.nombre
        }
        if(this.marca.nombre == ""){
            swal.fire({
                title: "No se pueden dejar los campos vacios. Vuelva a intentarlo",
                icon: 'error'
            });
        }else
        {
            if(regexpLetter.test(this.marca.nombre) == false){
                swal.fire({
                    title: "Solo puede escribir letras. Vuelva a intentarlo.",
                    icon: 'error'
                });
            }
            else
            {
                var response;
                this.service.update_marca(this.marca).subscribe(
                    data=>response = data,
                    err => {
                        console.log("Error al consultar servicio");
                    },
                    ()=>{
                        this.marca ={
                            id_marca:"",
                            nombre:""
                        }

                        this.get_marcas();
                    }
                );
            }
        }         
    }
}