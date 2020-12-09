import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
const swal = require('sweetalert2');


@Component({
    selector: 'mantenimiento_subcategorias',
    templateUrl: './mantenimiento_subcategorias.component.html'
})

export class GetSubcategoriasComponent {
    
    public listado_subcategorias: any[];

    public listado_categorias: any[];

    constructor(public service:AppService, private router:Router){
        this.listado_subcategorias = [];
    }

    public Subcategorias = {
        id_subcategoria: "",
        descripcion_subcategoria: "",
        id_categoria: ""
    }

    ngOnInit(){
        this.get_subcategorias();
        this.get_categorias();
    }

    volverpro(){
        this.router.navigateByUrl('/mantenimiento_productos');
     }

    insertar_subcategorias(){
        var response;
        this.service.insertar_subcategorias(this.Subcategorias).subscribe(
            data=>response = data,
            err => {
                console.log("Error al consultar servicio"); 
            },
            ()=>{
                this.Subcategorias = {
                    id_subcategoria: "",
                    descripcion_subcategoria: "",
                    id_categoria: ""
                }
                this.get_subcategorias();
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

    get_categorias(){
        this.listado_categorias = [];
        var response;
        this.service.get_categorias().subscribe(
            data=>response = data,
            err => {
                this.listado_categorias = [];
                console.log("Error al consultar el servicio");
            },
            ()=>{
                this.listado_categorias = response;
            }  
        );
    }

    pasar_datos_subcategorias(subcategorias)
    {
        this.Subcategorias = 
        {
            id_subcategoria: subcategorias.Id_subcategoria,
            descripcion_subcategoria: subcategorias.Descripcion_subcategoria,
            id_categoria:subcategorias.Id_categoria
        }      
    }

    update_subcategorias()
    {
        let regexpLetter: RegExp  = /^[a-zA-Z ]{4,20}$/;
        
        this.Subcategorias =
        {
            id_categoria: this.Subcategorias.id_categoria,
            id_subcategoria: this.Subcategorias.id_subcategoria,
            descripcion_subcategoria: this.Subcategorias.descripcion_subcategoria
        }
        if(this.Subcategorias.descripcion_subcategoria == "" || this.Subcategorias.id_categoria == "" || this.Subcategorias.id_subcategoria == ""){
            swal.fire({
                title: "No se pueden dejar los campos vacios. Vuelva a intentarlo",
                icon: 'error'
            });
        }
        else
        {
            if(regexpLetter.test(this.Subcategorias.descripcion_subcategoria) == false){
                swal.fire({
                    title: "Solo puede escribir letras. Vuelva a intentarlo.",
                    icon: 'error'
                });
            }
            else
            {
                var response;
                this.service.update_subcategorias(this.Subcategorias).subscribe(
                    data=>response = data,
                    err => {
                        console.log("Error al consultar servicio"); 
                    },
                    ()=>{

                        this.Subcategorias = 
                        {
                            id_subcategoria: "",
                            descripcion_subcategoria: "",
                            id_categoria: ""
                        }
                        this.get_subcategorias();
                    }
                );
            }
        }   
    }

    limpiar_subcategorias()
    {
        this.Subcategorias = {
            id_subcategoria: "",
            descripcion_subcategoria: "",
            id_categoria: ""
        }
    }
}

