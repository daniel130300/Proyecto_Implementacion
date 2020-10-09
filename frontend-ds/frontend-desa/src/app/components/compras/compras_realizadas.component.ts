import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';


@Component({
    selector: 'compras_realizadas',
    templateUrl: './compras_realizadas.component.html'
})

export class GetComprasRealizadasComponent {
    
    public listado_compras: any[];

    term: any;

    constructor(public service:AppService){
        this.listado_compras = [];
    }

    ngOnInit(){
        this.get_compras();
    }
    
    get_compras(){
        var response;
        this.service.get_compras().subscribe(
            data=>response = data,
            err => {
                console.log("Error al consultar el servicio");
            },
            ()=>{
                 this.listado_compras = response;
            }  
        );
    }


}