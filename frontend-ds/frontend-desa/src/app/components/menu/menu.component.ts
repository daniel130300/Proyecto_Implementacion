import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';

import {Router} from '@angular/router'


@Component({
    selector: 'menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./pandora.component.css', './containerIndex.component.css'],
    
})

export class GetMenuComponent { 

    public LoginID:any[];
    constructor(public service:AppService, private router:Router) {
        this.LoginID = [];
    }
    ngOnInit(){
        console.log(this.service.get_session());
        console.log(this.service.get_usuariologueado());
        this.LoginID = this.service.get_usuariologueado();
        console.log(this.LoginID);
    }
    salir(){
        this.service.reset_session();
        this.router.navigateByUrl('/login');
        console.log(this.service.get_session());
        console.log(this.service.get_usuariologueado());
    }  
} 