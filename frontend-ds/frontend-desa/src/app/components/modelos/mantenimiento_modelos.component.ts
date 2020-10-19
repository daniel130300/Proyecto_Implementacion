import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
const swal = require('sweetalert2');

@Component({
    selector: 'mantenimiento_modelos',
    templateUrl: './mantenimiento_modelos.component.html'
})

export class GetModelosComponent {
    
    public listado_modelos: any[];
    public listado_marcas: any[];
    public listado_subcategorias: any[];

    constructor(public service:AppService, private router:Router){
        this.listado_modelos = [];
        this.listado_marcas = [];
        this.listado_subcategorias = [];
    }

    public Modelo = {
        Id_modelo: "",
        Descripcion_modelo: "",
        Id_marca: "",
        Id_subcategoria: ""
    }

    ngOnInit(){
        this.get_modelos();
        this.get_marcas();
        this.get_subcategorias();
    }

    volverpro(){
        this.router.navigateByUrl('/mantenimiento_productos');
     }

    get_modelos(){
        var response;
        this.service.get_modelos().subscribe(
            data=>response = data,
            err => {
                console.log("Error al consultar el servicio");
            },
            ()=>{
                 this.listado_modelos = response;
            }  
        );
    }

    get_marcas(){
        var response;
        this.service.get_marcas().subscribe(
            data=>response = data,
            err => {
                console.log("Error al consultar el servicio");
            },
            ()=>{
                 this.listado_marcas = response;
            }  
        );
    }

    get_subcategorias(){
        var response;
        this.service.get_subcategorias().subscribe(
            data=>response = data,
            err => {
                console.log("Error al consultar el servicio");
            },
            ()=>{
                 this.listado_subcategorias = response;
            }  
        );
    }

    insertar_modelo(){
        var response;
        this.service.insertar_modelo(this.Modelo).subscribe(
            data=>response = data,
            err => {
                console.log("Error al consultar servicio"); 
            },
            ()=>{
                    this.Modelo = {
                        Id_modelo: "",
                        Descripcion_modelo: "",
                        Id_marca: "",
                        Id_subcategoria: "",
                }
                this.get_modelos();
            }
        );
    }

    pasarDatosModelos(modelo)
    {
        this.Modelo = 
        {
            Id_modelo: modelo.Id_modelo,
            Descripcion_modelo: modelo.Descripcion_modelo,
            Id_marca: modelo.Id_marca,
            Id_subcategoria: modelo.Id_subcategoria
        }      
    }

    update_modelo()
    {
        let regexpLetter: RegExp  = /^[a-zA-Z ]{4,20}$/;

        this.Modelo = {
            Id_modelo: this.Modelo.Id_modelo,
            Descripcion_modelo: this.Modelo.Descripcion_modelo,
            Id_marca: this.Modelo.Id_modelo,
            Id_subcategoria: this.Modelo.Id_subcategoria
        }
        if(this.Modelo.Descripcion_modelo == "" || this.Modelo.Id_marca == "" || this.Modelo.Id_modelo == ""){
            swal.fire({
                title: "No se pueden dejar los campos vacios. Vuelva a intentarlo",
                icon: 'error'
            });
        }else
            if(regexpLetter.test(this.Modelo.Descripcion_modelo) == false){
                swal.fire({
                    title: "Solo puede escribir letras. Vuelva a intentarlo.",
                    icon: 'error'
                });
            }else
                {
                    var response;
                    this.service.update_modelo(this.Modelo).subscribe (
                    data => response = data,
                    err => {
                        console.log("Error al consultar servicio"); 
                    },
                    ()=>{
   
                      this.Modelo = 
                        {
                            Id_modelo: "",
                            Descripcion_modelo: "",
                            Id_marca: "",
                            Id_subcategoria: "",
                        }
                        this.get_modelos();
                    }
                    );
                }
        
    }

    delete_modelo(id_modelo)
    {
        var response;
        var load = 
        {
            Id_modelo: id_modelo
        }
        this.service.delete_modelo(load).subscribe
        (
            data=>response = data,
            err => 
            {
                console.log("Error al consultar servicio"); 
            },
            ()=>
            {
                this.get_modelos();
            }
        );
    }

}