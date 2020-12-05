import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { Component, OnDestroy, ViewChild }  from '@angular/core';
import {  NgForm, FormControlDirective } from '@angular/forms';

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
    public LoadingData = {
        login_id:"",
        contrasenia:""
    }
    constructor(public service:AppService, private router:Router){

    }

    login() {
        if (this.login_form.valid){
            this.submitted = false;
            this.loading = true;
            var response;
            var Load = {
                login_id: this.LoadingData.login_id,
                contrasenia: this.LoadingData.contrasenia
            };
            this.service.login(Load).subscribe(
                data => response = data,
                err => {
                    if (err.status == 400){
                        swal.fire({
                            title: "Error de autenticación, las credenciales son incorrectas",
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
                            this.service.set_session(response["token"]);
                            this.router.navigateByUrl('/cajas');
                            this.service.set_usuariologueado(this.LoadingData.login_id, response["roles"]);
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
