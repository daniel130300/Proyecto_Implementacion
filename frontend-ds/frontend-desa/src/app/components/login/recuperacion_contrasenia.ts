import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, ViewChild }  from '@angular/core';
import {  NgForm, FormControlDirective } from '@angular/forms';

const swal = require('sweetalert2');

@Component({

    selector: 'recuperacion_contrasenia',
    templateUrl: './recuperacion_contrasenia.html',
    styleUrls: ['./recuperacion_contrasenia.component.css']
})

export class GetRecuperacionContrasenia implements OnInit{ 
    
    
    constructor(public service:AppService, private router:Router){

    }

    ngOnInit(): void {

        
    }

    volverpro(){
        this.router.navigateByUrl('/login');
     }

    OnReset()
    {
        console.log("Sent Email");
    }

} 
