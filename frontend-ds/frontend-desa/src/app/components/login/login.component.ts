import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { Component, OnDestroy, ViewChild }  from '@angular/core';
import {  NgForm, FormControlDirective } from '@angular/forms';
//import pageSettings from 'node_modules/config/page-settings';
//import swal from 'sweetalert2';
//var requireNode = require('require-node');
//import { Require } from 'node_modules/require-node'
//var require = requireNode;
const swal = require('sweetalert2');

@Component({

    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],

})

export class GetLoginComponent { 
    @ViewChild('login_form') login_form:FormControlDirective;
    public submitted = false;
    public loading = false;
    public loading_data = {
        LoginID:"",
        Contrasenia:""
    }
    constructor(public service:AppService, private router:Router){

    }
    /*ngOnInit(){
        this.get_empleados();
    }*/
    login() {
        if (this.login_form.valid){
            this.submitted = false;
            this.loading = true;
            var response;
            var load = {
                LoginID: this.loading_data.LoginID,
                Contrasenia: this.loading_data.Contrasenia
            };
            this.service.login(load).subscribe(
                data => response = data,
                err => {
                    if (err.status == 400){
                        swal.fire({
                            title: "Error de Autenticacion, Las Credenciales son Incorrectas",
                            icon: 'error'
                        });
                    }else{
                        swal.fire({
                            title: 'Error interno del servidor',
                            icon: 'error'
                        });
                    }
                    this.loading = false;
                },
                () => {
                    try{
                        if (response){
                            this.service.set_session(response);
                            this.router.navigateByUrl('/cajas');
                            this.service.set_usuariologueado(this.loading_data.LoginID);

                        }else{
                            swal.fire({
                                title: 'Error interno del servidor',
                                icon: 'error'
                            });
                            this.loading = false;
                        }
                        this.loading = false;
                    }catch(error){
                        swal.fire({
                            title: 'Error interno del servidor',
                            icon: 'error'
                        });
                        this.loading = false;
                    }
                }
            );
        }else{
            this.submitted=true; 
        }
    }
} 
