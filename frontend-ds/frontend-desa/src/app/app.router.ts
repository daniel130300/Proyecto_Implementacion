import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { CommonModule } from '@angular/common';

import {GetProveedoresComponent} from './components/proveedores/mantenimiento_proveedores.component';

import {GetComprasComponent} from './components/compras/mantenimiento_compras.component';

import {GetCategoriasComponent} from './components/categorias/mantenimiento_categorias.component';

import {GetClientesComponent} from './components/clientes/mantenimiento_clientes.component';

import {GetProductosComponent} from './components/productos/mantenimiento_productos.component';

import {GetMarcasComponent} from './components/marcas/mantenimiento._marcas.component';

import {GetModelosComponent} from './components/modelos/mantenimiento_modelos.component';

import {GetCiudadesComponent} from './components/ciudades/mantenimiento_ciudades.component';

import {GetMenuComponent} from './components/menu/menu.component';

import {GetSubcategoriasComponent} from './components/subcategorias/mantenimiento_subcategorias.component';

import {GetEmpleadosComponent} from './components/empleados/mantenimiento_empleados.component';

import {GetVentaPlusComponent} from './components/ventas/nueva_venta_plus.component';

import { GetLoginComponent } from './components/login/login.component';

import { GetVentasPagadasComponent} from './components/ventas/ventas_pagadas.component';

import {GetVentasPendientesEnvioComponent} from './components/ventas/ventas_pendientes_envio.component';

import {GetVentaNormalComponent} from './components/ventas/nueva_venta_normal.component';

import {GetVentasPendientesCobroComponent} from './components/ventas/ventas_pendientes_cobro.component';

import {GetComprasPendientesComponent} from './components/compras/compras_pendientes.component';

import {GetComprasRealizadasComponent} from './components/compras/compras_realizadas.component';

import {GetInventarioComponent} from './components/productos/consulta_inventario.component';

import {GetVentasIncobrablesComponent} from './components/ventas/ventas_incobrables.component';

import {GetDevolucionesComponent} from './components/ventas/devoluciones.component';

import {GetMenuVentasComponent} from './components/menu/menu_ventas.component';
import { GetCajasComponent } from './components/menu/cajas.component';


const routes: Routes = [
    {
        path: 'mantenimiento_proveedores',
        component: GetProveedoresComponent
    },
    
    {
        path: 'mantenimiento_compras',
        component: GetComprasComponent
    },
    {
        path: 'mantenimiento_categorias',
        component: GetCategoriasComponent
    },
    {
        path: 'mantenimiento_clientes',
        component: GetClientesComponent
    },
    {
        path: 'mantenimiento_productos',
        component: GetProductosComponent
    },
    {
        path: 'mantenimiento_marcas',
        component: GetMarcasComponent
    },
    {
        path: 'mantenimiento_modelos',
        component: GetModelosComponent
    },
    {
        path: 'mantenimiento_ciudades',
        component: GetCiudadesComponent
    },
    {
        path: 'mantenimiento_subcategorias',
        component: GetSubcategoriasComponent
    }, 
    {
        path: 'menu',
        component: GetMenuComponent
    },
    {
        path: 'mantenimiento_empleados',
        component: GetEmpleadosComponent
    },
    {
        path: 'login',
        component: GetLoginComponent
    },    
    {
        path: 'nueva_venta_plus',
        component: GetVentaPlusComponent
    },
    {
        path: 'ventas_pagadas',
        component: GetVentasPagadasComponent
    },
    {
        path: 'ventas_pendientes_envio',
        component: GetVentasPendientesEnvioComponent
    },
    {
        path: 'ventas_pendientes_cobro',
        component: GetVentasPendientesCobroComponent
    },
    {
        path: 'devoluciones_venta',
        component: GetDevolucionesComponent
    },

    {
        path: 'nueva_venta_normal',
        component: GetVentaNormalComponent
    },
    {
        path: 'compras_pendientes',
        component: GetComprasPendientesComponent
    },
    {
        path: 'compras_realizadas',
        component: GetComprasRealizadasComponent
    },
    {
        path: 'consulta_inventario',
        component: GetInventarioComponent
    },
    {
        path: 'menu_venta',
        component: GetMenuVentasComponent
    },
    {
        path: 'ventas_incobrables',
        component: GetVentasIncobrablesComponent
    },
    {
        path: 'cajas',
        component: GetCajasComponent
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forRoot(routes)],
    exports: [RouterModule],
    declarations:[]
})

export class AppRoutingModule{}




