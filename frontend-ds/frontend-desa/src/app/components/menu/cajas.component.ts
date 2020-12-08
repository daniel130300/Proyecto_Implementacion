import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';

import {Router} from '@angular/router'


@Component({
    selector: 'cajas',
    templateUrl: './cajas.component.html',
    styleUrls: ['./pandora.component.css', './containerIndex.component.css'],
    
})

export class GetCajasComponent { 

    public loginid:any[];
    constructor(public service:AppService, private router:Router) {
        this.loginid = [];
    }
    ngOnInit(){
        this.loginid = this.service.get_usuariologueado();
    }
    salir(){
        this.service.reset_session();
        this.router.navigateByUrl('/login');
    }  
} 