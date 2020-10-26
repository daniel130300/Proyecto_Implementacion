import { Component }  from '@angular/core';
import { AppService } from 'src/app/app.service';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { DatePipe } from '@angular/common'

const swal = require( 'sweetalert2' );

@Component({
    
    selector: 'mantenimiento_empleados',
    templateUrl: './mantenimiento_empleados.component.html'
})

export class GetEmpleadosComponent {
    
    public listado_empleados: any[];
    public listado_estatus:   any[];
    public listado_puestos:   any[];

    constructor( public service: AppService, public datepipe: DatePipe ){

        this.listado_empleados = [];
    }

    generarpdf()
    {
        console.log(this.listado_empleados);

        var fecha_actual = new Date().toLocaleString()

        const doc = new jsPDF('l', 'mm', [297, 420]);

        const autoTable = 'autoTable';

        doc.setFont("helvetica");

        doc.setFontSize(20);
        doc.text("Variedades K y D", 210, 10, {align: "center"});
        doc.setFontSize(12);
        doc.text("Dirección: Zonal Belen, cerca de Banco FICOHSA", 210, 16, {align: "center"});
        doc.text("Télefono: (504) 9797-7966", 210, 22, {align: "center"});
        doc.text("Correo: variedades_k_y_d@gmail.com", 210, 28, {align: "center"});
        doc.setFontSize(14);
        doc.text("Reporte Mensual de Empleados", 210, 36, {align: "center"});
        doc.setFontSize(12);
        doc.text("Fecha: " + fecha_actual, 30, 46, {align: "center"});

        var img = new Image()
        img.src = 'assets/img/LogoKyD2.png'
        doc.addImage(img, 'png', -10, -20, 80, 80)
   
        var rows = [];
        
        this.listado_empleados.forEach(element => {      
            var temp = [element.Id_empleado, element.Identidad, element.Nombre, element.Apellido, element.Telefono , element.Email, element.Direccion, element.Salario, this.datepipe.transform(element.Fecha_nacimiento,'yyyy-MM-dd'),
                        this.datepipe.transform(element.Fecha_contratacion,'yyyy-MM-dd'), this.datepipe.transform(element.Fecha_despido,'yyyy-MM-dd'), element.Descripcion_puesto];
            rows.push(temp);
        });

        console.log(rows);

        doc[autoTable]({
            head: [['ID Empleado', 'Identidad', 'Nombre', 'Apellido', 'Teléfono', 'Email', 'Dirección', 
                    'Salario', 'Fecha de Nacimiento', 'Fecha de Contratación', 'Fecha de Despido', 'Puesto']],
            body: rows,
            startY: 50,
            styles: {font: "helvetica", fontsize: 12}
        });

        doc.save("Reporte_Empleados_" + fecha_actual);
    }

    public Empleado = {
        
        Id_empleado: "",
        Identidad: "",
        Nombre: "",
        Apellido: "",
        Telefono: "",
        Email: "",
        Direccion: "",
        Salario: "",
        LoginID: "",
        Contrasenia: "",
        Fecha_nacimiento: "",
        Fecha_contratacion: String( new Date().toISOString().substring( 0, 10 ) ),
        Fecha_despido: null,
        Id_estatus: "1",
        Descripcion_estatus: "",
        Id_puesto: "",
        Descripcion_puesto: ""
    }

    ngOnInit(){

        this.get_empleados();
        this.get_estatus();
        this.get_puestos();
    }
    
    limpiar_empleado(){

        this.Empleado = {

            Id_empleado: "",
            Identidad: "",
            Nombre: "",
            Apellido: "",
            Telefono: "",
            Email: "",
            Direccion: "",
            Salario: "",
            LoginID: "",
            Contrasenia: "",
            Fecha_nacimiento: "",
            Fecha_contratacion: String( new Date().toISOString().substring( 0, 10 ) ),
            Fecha_despido: null,
            Id_estatus: "1",
            Descripcion_estatus: "",
            Id_puesto: "",
            Descripcion_puesto: ""
        }   
    }

    insertar_empleado(){

        var response;

        this.service.insertar_empleado( this.Empleado ).subscribe(

            data => response = data,

            err => {

                console.log( "Error al consultar el servicio." ); 
            },

            () => {

                this.Empleado = {

                    Id_empleado: "",
                    Identidad: "",
                    Nombre: "",
                    Apellido: "",
                    Telefono: "",
                    Email: "",
                    Direccion: "",
                    Salario: "",
                    LoginID: "",
                    Contrasenia: "",
                    Fecha_nacimiento: "",
                    Fecha_contratacion: String( new Date().toISOString().substring( 0, 10 ) ),
                    Fecha_despido: null,
                    Id_estatus: "1",
                    Descripcion_estatus: "",
                    Id_puesto: "",
                    Descripcion_puesto: ""
                }
                
                this.get_empleados();

                swal.fire({
                    
                    title: "¡Usuario agregado exitosamente!",
                    icon:  'success'
                });
            }
        );       
    }
    
    get_empleados(){

        var response;

        this.service.get_empleados().subscribe(

            data => response = data,

            err => {

                console.log( "Error al consultar el servicio." );
            },

            () => {

                this.listado_empleados = response;
            }  
        );
    }

    get_estatus(){

        this.listado_estatus = [];

        var response;

        this.service.get_estatus().subscribe(

            data => response = data,

            err => {

                console.log( "Error al consultar el servicio." );
            },

            () => {

                this.listado_estatus = response;
            }  
        );
    }

    get_puestos(){

        this.listado_puestos = [];

        var response;

        this.service.get_puestos().subscribe(

            data => response = data,

            err => {

                console.log( "Error al consultar el servicio." );
            },

            () => {

                this.listado_puestos = response;
            }  
        );
    }

    pasarDatosEmpleado( empleado )
    {
        this.Empleado = {

            Id_empleado: empleado.Id_empleado,
            Identidad: empleado.Identidad,
            Nombre: empleado.Nombre,
            Apellido: empleado.Apellido,
            Telefono: empleado.Telefono,
            Email: empleado.Email,
            Direccion: empleado.Direccion,
            Salario: empleado.Salario,
            LoginID: empleado.LoginID,
            Contrasenia: empleado.Contrasenia,
            Fecha_nacimiento: String( empleado.Fecha_nacimiento ).substring( 0, 10 ),
            Fecha_contratacion: String( empleado.Fecha_contratacion ).substring( 0, 10 ),
            Fecha_despido: String( empleado.Fecha_contratacion ).substring( 0, 10 ),
            Id_estatus: empleado.Id_estatus,
            Descripcion_estatus: empleado.Descripcion_estatus,
            Id_puesto: empleado.Id_puesto,
            Descripcion_puesto: empleado.Descripcion_puesto
        }      
    }

    update_empleado(){

        var response;

        this.service.update_empleado( this.Empleado ).subscribe(
            
            data => response = data,

            err => {

                console.log( "Error al consultar el servicio." ); 
            },

            () => {
   
                this.Empleado = {

                    Id_empleado: "",
                    Identidad: "",
                    Nombre: "",
                    Apellido: "",
                    Telefono: "",
                    Email: "",
                    Direccion: "",
                    Salario: "",
                    LoginID: "",
                    Contrasenia: "",
                    Fecha_nacimiento: "",
                    Fecha_contratacion: String( new Date().toISOString().substring( 0, 10 ) ),
                    Fecha_despido: null,
                    Id_estatus: "1",
                    Descripcion_estatus: "",
                    Id_puesto: "",
                    Descripcion_puesto: ""
                }

                this.get_empleados();

                swal.fire({
                    title: "¡Usuario actualizado exitosamente!",
                    icon: 'success'
                });
            }
        );
    }

}