import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {AppRoutingModule} from './app.router';

import {GetProveedoresComponent} from './components/proveedores/mantenimiento_proveedores.component';

import {GetComprasComponent} from './components/compras/mantenimiento_compras.component';

import {GetCategoriasComponent} from './components/categorias/mantenimiento_categorias.component';

import {GetClientesComponent} from './components/clientes/mantenimiento_clientes.component';

import {GetProductosComponent} from './components/productos/mantenimiento_productos.component';

import {GetMarcasComponent} from './components/marcas/mantenimiento._marcas.component';

import {GetModelosComponent} from './components/modelos/mantenimiento_modelos.component';

import {GetCiudadesComponent} from './components/ciudades/mantenimiento_ciudades.component';

import {GetMenuComponent} from './components/menu/menu.component';

import {GetSubcategoriasComponent} from './components/subcategorias/mantenimiento_subcategorias.component'

import {GetEmpleadosComponent} from './components/empleados/mantenimiento_empleados.component';

import {GetLoginComponent} from './components/login/login.component';

import {GetVentaPlusComponent} from './components/ventas/nueva_venta_plus.component';

import {AppService} from './app.service'

import {HttpClientModule} from '@angular/common/http';

import {GetVentasIncobrablesComponent} from './components/ventas/ventas_incobrables.component'

import {GetVentasPendientesEnvioComponent} from './components/ventas/ventas_pendientes_envio.component';

import {GetVentasPagadasComponent} from './components/ventas/ventas_pagadas.component';

import {GetComprasPendientesComponent} from './components/compras/compras_pendientes.component';

import {GetComprasRealizadasComponent} from './components/compras/compras_realizadas.component';

import {GetVentasPendientesCobroComponent} from './components/ventas/ventas_pendientes_cobro.component';

import {GetVentaNormalComponent} from './components/ventas/nueva_venta_normal.component';

import {GetDevolucionesComponent} from './components/ventas/devoluciones.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

import {GetInventarioComponent} from './components/productos/consulta_inventario.component';

import {GetMenuVentasComponent} from './components/menu/menu_ventas.component';

import {FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ //Componentes
    AppComponent,
    GetProveedoresComponent,
    GetComprasComponent,
    GetCategoriasComponent,
    GetSubcategoriasComponent,
    GetClientesComponent,
    GetProductosComponent,
    GetMarcasComponent,
    GetModelosComponent,
    GetCiudadesComponent,
    GetMenuComponent,
    GetEmpleadosComponent,
    GetLoginComponent,
    GetVentaPlusComponent,
    GetVentasPendientesEnvioComponent,
    GetVentasPagadasComponent,
    GetComprasPendientesComponent,
    GetComprasRealizadasComponent,
    GetVentaNormalComponent,
    GetInventarioComponent,
    GetVentasPendientesCobroComponent,
    GetDevolucionesComponent,
    GetMenuVentasComponent,
    GetVentasIncobrablesComponent
  ],
  imports: [ //Modulos
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
  ],
  providers: [ //Servicios
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

