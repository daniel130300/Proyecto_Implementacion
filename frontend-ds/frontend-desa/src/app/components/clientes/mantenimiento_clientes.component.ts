import {Component} from "@angular/core";
import { AppService } from 'src/app/app.service';
import { getClosureSafeProperty } from '@angular/core/src/util/property';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { DatePipe } from '@angular/common'

const swal = require('sweetalert2');

@Component({

    selector:'mantenimiento_clientes',
    templateUrl:'./mantenimiento_clientes.component.html'
})

export class GetClientesComponent{
    
    public listado_clientes:any[];
    public listado_ciudades:any[];
    public listado_tipo_cliente:any[];

    constructor( public service:AppService, public datepipe: DatePipe ){

        this.listado_clientes=[];
        this.listado_ciudades=[];
        this.listado_tipo_cliente=[];
    }
    
    term: any[];

    public Persona={
        id_cliente:"",
        nombre_compania:"",
        id_ciudad:"",
        id_tipo_cliente:"",
        direccion:"",
        nombre_contacto:"",
        apellido_contacto:"",
        telefono_contacto:"",
        email_contacto:""
    }

    ngOnInit(){
        this.get_clientes();
        this.get_ciudad();
        this.get_tipo_cliente();
    }

    generarpdf()
    {
        console.log( this.listado_clientes );

        var fecha_actual = new Date().toLocaleString()

        const doc = new jsPDF( 'l', 'mm', [297, 420] );

        const autoTable = 'autoTable';

        doc.setFont( "helvetica" );

        doc.setFontSize( 20 );
        doc.text( "Variedades K y D", 210, 10, { align: "center" } );
        doc.setFontSize( 12 );
        doc.text( "Dirección: Zonal Belen, cerca de Banco FICOHSA", 160, 16 );
        doc.text( "Télefono: (504) 9797-7966", 180, 22 );
        doc.text( "Correo: variedades_k_y_d@gmail.com", 170, 28 );
        doc.setFontSize( 14 );
        doc.text( "Reporte de Clientes", 210, 36, { align: "center" } );
        doc.setFontSize( 12 );
        doc.text( "Fecha: " + fecha_actual, 15, 44 );

        var img = new Image()
        img.src = 'assets/img/LogoKyD2.png'
        doc.addImage( img, 'png', -10, -20, 80, 80 )
   
        var rows = [];
        
        this.listado_clientes.forEach( element => {      
            var temp = [ element.Nombre_compania, element.Direccion, element.Nombre_ciudad, element.Descripcion_cliente, element.Nombre_contacto, element.Apellido_contacto, element.Telefono_contacto, element.Email_contacto ];
            rows.push(temp);
        });

        console.log(rows);

        doc[autoTable]({
            
            head: [[ 'Nombre Compañia', 'Dirección', 'Ciudad', 'Tipo de Cliente', 'Nombre del Contacto', 'Apellido del Contacto', 'Teléfono del Contacto', 'Correo Electrónico' ]],
            body: rows,
            startY: 50,
            styles: {font: "helvetica", fontsize: 12}
        });

        doc.save("Reporte_de_Clientes_" + fecha_actual );
    }

    limpiar_cliente(){

        this.Persona = {
            id_cliente:"",
            nombre_compania:"",
            id_ciudad:"",
            id_tipo_cliente:"",
            direccion:"",
            nombre_contacto:"",
            apellido_contacto:"",
            telefono_contacto:"",
            email_contacto:""
        }
    }

    get_tipo_cliente(){
        var response;
        this.service.get_tipo_cliente().subscribe(
            data=>response=data,
            err=>{
                console.log("ERROR AL CONSULTAR EL SERVICIO");
            },
            ()=>{
                this.listado_tipo_cliente=response;
            }
        )
    }

    get_ciudad(){
        var response;
        this.service.get_ciudad().subscribe(
            data=>response=data,
            err=>{
                console.log("ERROR AL CONSULTAR EL SERVICIO");
            },
            ()=>{
                this.listado_ciudades=response;
            }
        )
    }
    
    get_clientes(){
        var response;
        this.service.get_clientes().subscribe(
            data=>response=data,
            err=>{
                console.log("ERROR AL CONSULTAR EL SERVICIO");
            },
            ()=>{
                this.listado_clientes=response;
            }   
        )
    }

    insertar_cliente(){
        var response;
        this.service.insertar_cliente(this.Persona).subscribe(
            data=>response = data,
            err => {
                console.log("Error al consultar servicio"); 
            },
            ()=>{
                this.Persona = {
                    id_cliente:"",
                    nombre_compania:"",
                    id_ciudad:"",
                    id_tipo_cliente:"",
                    direccion:"",
                    nombre_contacto:"",
                    apellido_contacto:"",
                    telefono_contacto:"",
                    email_contacto:""
                }
                this.get_clientes();
            }
        );
    }

    pasar_datos_cliente(clientes){
        this.Persona= {
            id_cliente:clientes.Id_cliente,
            nombre_compania:clientes.Nombre_compania,
            id_ciudad:clientes.Id_ciudad,
            id_tipo_cliente:clientes.Id_tipo_cliente,
            direccion:clientes.Direccion,
            nombre_contacto:clientes.Nombre_contacto,
            apellido_contacto:clientes.Apellido_contacto,
            telefono_contacto:clientes.Telefono_contacto,
            email_contacto:clientes.Email_contacto
        }
    }

    update_cliente(){
        let regexpNumber: RegExp  = /^[+ 0-9]{8}$/;
        let regexpLetter: RegExp  = /^[a-zA-Z ]{4,20}$/;
        let regexpLetter1: RegExp  = /^[a-zA-Z ]{3,20}$/;
        let regexpMix: RegExp  = /^[A-Za-z0-9 ]{3,15}$/;
        let regexpDic: RegExp  = /^[A-Za-z0-9.# ]{10,300}$/;
        let regexpEmail: RegExp  = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        
        this.Persona= {
            id_cliente:this.Persona.id_cliente,
            nombre_compania:this.Persona.nombre_compania,
            id_ciudad:this.Persona.id_ciudad,
            id_tipo_cliente:this.Persona.id_tipo_cliente,
            direccion:this.Persona.direccion,
            nombre_contacto:this.Persona.nombre_contacto,
            apellido_contacto:this.Persona.apellido_contacto,
            telefono_contacto:this.Persona.telefono_contacto,
            email_contacto:this.Persona.email_contacto
        }

        if(this.Persona.apellido_contacto==""||this.Persona.direccion==""||this.Persona.email_contacto==""||this.Persona.id_ciudad==""||this.Persona.id_cliente==""
        ||this.Persona.id_tipo_cliente==""||this.Persona.nombre_compania==""||this.Persona.nombre_contacto==""||this.Persona.telefono_contacto==""){
            swal.fire({
                title: "No ha ingresado un dato, por favor hágalo para poder guardar.",
                icon: 'error'
            });
        }else{
             
            if(regexpNumber.test(this.Persona.telefono_contacto)==false ){
                
                swal.fire({
                    title: "Ingrese solo numeros, por favor hágalo para poder guardar.",
                    icon: 'error'
                });
            }else{
                if(regexpLetter1.test(this.Persona.nombre_contacto)==false||regexpLetter.test(this.Persona.apellido_contacto)==false)
                {
                    swal.fire({
                        title: "Solo se ingresan letras, por favor hágalo para poder guardar.",
                        icon: 'error'
                    });
                }else{
                    if(regexpEmail.test(this.Persona.email_contacto)==false){
                        swal.fire({
                            title: "Formato incorrecto en Email, por favor hágalo para poder guardar.",
                            icon: 'error'
                        });
                    }else{
                        if(regexpMix.test(this.Persona.nombre_compania)==false){
                            swal.fire({
                                title: "No debe de colocar caracteres especiales, por favor hágalo para poder guardar.",
                                icon: 'error'
                            });
                        }else{
                            if(regexpDic.test(this.Persona.direccion)==false){
                                swal.fire({
                                    title: "El formato no es el correcto, por favor hágalo para poder guardar.",
                                    icon: 'error'
                                });
                            }else{
                                var response;
                                this.service.update_cliente(this.Persona).subscribe(
                                    data=>response = data,
                                    err => {
                                        console.log("Error al consultar servicio"); 
                                    },
                                    ()=>{
                                
                           
                                        this.Persona = {
                                            id_cliente:"",
                                            nombre_compania:"",
                                            id_ciudad:"",
                                            id_tipo_cliente:"",
                                            direccion:"",
                                            nombre_contacto:"",
                                            apellido_contacto:"",
                                            telefono_contacto:"",
                                            email_contacto:""
                                        } 

                                        this.get_clientes();
                                        this.limpiar_cliente();
                                    }
                                );
                            }
                        }     
                    }     
                }
            }
        }    
    }

    delete_cliente(id_cliente){ 
        var response;
        var load={
            id_cliente:id_cliente
        }
        this.service.delete_cliente(load).subscribe(
            data=>response=data,
            err=>{
                console.log("Error al consultar servicio");
            },
            ()=>{
                this.get_clientes();
            }
        );
    }
}