import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
const swal = require('sweetalert2');

@Component({
    selector: 'mantenimiento_categorias',
    templateUrl: './mantenimiento_categorias.component.html'
})

export class GetCategoriasComponent {
    
    public listado_categorias: any[];

    constructor(public service:AppService, private router:Router){
        this.listado_categorias = [];
    }

    public Categorias = {
        Id_categoria: "", //CATEGORIA
        Descripcion_categoria: "" //Hola Mundo
        
    }

    ngOnInit(){
        this.get_categorias();
    }

    volverpro(){
        this.router.navigateByUrl('/mantenimiento_productos');
     }

    insertar_categorias(){
        var response;
        this.service.insertar_categorias(this.Categorias).subscribe(
            data=>response = data,
            err => {
                console.log("Error al consultar servicio"); 
            },
            ()=>{
                    this.Categorias = {
                        Id_categoria: "",
                        Descripcion_categoria: ""
                }
                this.get_categorias();
            }
        );
    }
    
    get_categorias(){
        var response;
        this.service.get_categorias().subscribe(
            data=>response = data,
            err => {
                console.log("Error al consultar el servicio");
            },
            ()=>{
                 this.listado_categorias = response;
            }  
        );
    }

    pasarDatosCategorias(Categorias)
    {
        this.Categorias = 
        {
            Id_categoria: Categorias.Id_categoria,
            Descripcion_categoria: Categorias.Descripcion_categoria
        }      
    }

    update_categorias()
    {
        let regexpLetter: RegExp  = /^[a-zA-Z ]{4,20}$/;

        this.Categorias = {
            Id_categoria: this.Categorias.Id_categoria,
            Descripcion_categoria: this.Categorias.Descripcion_categoria
        }
        if(this.Categorias.Descripcion_categoria == ""){
            swal.fire({
                title: "No se pueden dejar los campos vacios. Vuelva a intentarlo",
                icon: 'error'
            });
        }else
            if(regexpLetter.test(this.Categorias.Descripcion_categoria) == false){
                swal.fire({
                    title: "Solo puede escribir letras. Vuelva a intentarlo.",
                    icon: 'error'
                });
            }else
                {
                    var response;
                    this.service.update_categorias(this.Categorias).subscribe(
                    data=>response = data,
                    err => {
                        console.log("Error al consultar servicio"); 
                    },
                    ()=>{
   
                        this.Categorias = 
                        {
                            Id_categoria: "",
                            Descripcion_categoria: ""
                        }
                        this.get_categorias();
                    }
                );
                }
        
    }
}