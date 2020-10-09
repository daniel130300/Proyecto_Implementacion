import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
    selector: 'consulta_inventario',
    templateUrl: './consulta_inventario.component.html'
})

export class GetInventarioComponent {

    public listado_inventario_producto: any[];

    term: any[];

    constructor(public service:AppService){
        this.listado_inventario_producto = [];
    }

    ngOnInit(){
        this.get_productos();
    }

    get_productos(){
        var response;
        this.service.get_productos().subscribe(
            data=>response = data,
            err => {
                console.log("Error al consultar el servicio");
            },
            ()=>{
                 this.listado_inventario_producto = response;
            }  
        );
    }
}
