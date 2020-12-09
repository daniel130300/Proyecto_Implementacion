import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';

import {Router} from '@angular/router'


@Component({
    selector: 'menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./pandora.component.css', './containerIndex.component.css'],
    
})

export class GetMenuComponent { 

    public login_id:any;
    public rol:any;
    constructor(public service:AppService, private router:Router) {
        this.login_id = [];
        this.rol = [];
    }
    ngOnInit(){
        console.log(this.service.get_session());
        this.login_id = this.service.get_usuariologueado();
        this.rol = this.service.get_rol_usuario();
    }
    salir(){
        this.service.reset_session();
        this.router.navigateByUrl('/login');
    }  
} 