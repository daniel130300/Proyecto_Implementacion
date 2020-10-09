import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpUrlEncodingCodec, HttpParameterCodec, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
    private endpoint: string;

    constructor(private httpClient: HttpClient) {
        this.endpoint = "http://"+window.location.hostname+":8200/api"
    }
    //LLAMADA A VENTAS PENDIENTES DE ENVIO
    get_ventas_pendientes_envio():Observable<any>{
        return this.httpClient.get(this.endpoint + "/get_ventas_pendientes_envio", {responseType: 'json'})
    }

    update_ventas_pendientes_envio(load):Observable<any>{
        return this.httpClient.put(this.endpoint + "/update_ventas_pendientes_envio", load, {responseType:'json'});
    }

    get_estado():Observable<any>{
        return this.httpClient.get(this.endpoint + "/get_unicos_estados", {responseType: 'json'})
    }
    //LLAMADA A VENTAS_PAGADAS

    get_ventas_pagadas():Observable<any>{
        return this.httpClient.get(this.endpoint + "/get_ventas_pagadas", {responseType: 'json'})
    }

    get_venta_pagada():Observable<any>{
        return this.httpClient.get(this.endpoint + "/get_venta_pagada", {responseType: 'json'})
    }

    // Llamadas a servicios del backend para mantenimiento de proveedores
    get_proveedores():Observable<any>{
        return this.httpClient.get(this.endpoint + "/get_proveedores", {responseType: 'json'})
    }

    insertar_proveedor(load):Observable<any>{
        return this.httpClient.post(this.endpoint + "/insert_proveedor", load, {responseType:'json'});
    }

    update_proveedor(load):Observable<any>{
        return this.httpClient.put(this.endpoint + "/update_proveedor", load, {responseType:'json'});
    }

    delete_proveedor(load):Observable<any>{
        return this.httpClient.delete(this.endpoint + "/delete_proveedor", {params: load, responseType:'json'});
    }
    
    //Llamadas a servicios del backend para mantenimiento de compras

    get_compras():Observable<any>{
        return this.httpClient.get(this.endpoint + "/get_compras", {responseType: 'json'})
    }

    get_productos_proveedor(id_proveedor):Observable<any>{
        let params = new HttpParams()
                .set('Id_proveedor', id_proveedor)
        
        return this.httpClient.get(this.endpoint + "/get_productos_proveedor", {params});
    }

    insertar_compra(load):Observable<any>{
        return this.httpClient.post(this.endpoint + "/insert_compras", load, {responseType:'json'});
    }

    update_compra(load):Observable<any>{
        return this.httpClient.put(this.endpoint + "/update_compra", load, {responseType:'json'});
    }

    delete_compra(load):Observable<any>{
        return this.httpClient.delete(this.endpoint + "/delete_compras", {params: load, responseType:'json'});
    }

    //Llamadas a servicios para mantenimiento de categorias

    get_categorias():Observable<any>{
        return this.httpClient.get(this.endpoint + "/get_categorias", {responseType: 'json'})
    }

    insertar_categorias(load):Observable<any>{
        return this.httpClient.post(this.endpoint + "/insert_categoria", load, {responseType:'json'});
    }

    update_categorias(load):Observable<any>{
        return this.httpClient.put(this.endpoint + "/update_categoria", load, {responseType:'json'});
    }

    delete_categorias(load):Observable<any>{
        return this.httpClient.delete(this.endpoint + "/delete_categoria", {params: load, responseType:'json'});
    }


    //llamadas a servivios del backend para el mantenimiento de clientes
    get_clientes():Observable<any>{
        return this.httpClient.get(this.endpoint+"/get_clientes",{responseType:'json'})
    }
    insertar_cliente(load):Observable<any>{
        return this.httpClient.post(this.endpoint + "/insert_cliente", load, {responseType:'json'});
    }
    update_cliente(load):Observable<any>{
        return this.httpClient.put(this.endpoint + "/update_cliente", load, {responseType:'json'});
    }
    delete_cliente(load):Observable<any>{
        return this.httpClient.delete(this.endpoint + "/delete_cliente", {params: load, responseType:'json'});
    }
    get_ciudad():Observable<any>{
        return this.httpClient.get(this.endpoint+"/get_ciudades",{responseType:'json'})
    }
    get_tipo_cliente():Observable<any>{
        return this.httpClient.get(this.endpoint+"/get_tipo_cliente",{responseType:'json'})
    }

    get_subcategoria_filtrado(id_categoria):Observable<any>{
        let params = new HttpParams()
            .set('Id_categoria', id_categoria)
            
    
        return this.httpClient.get(this.endpoint + "/get_subcategoria_filtrado", {params});
    }

    get_modelo_filtrado(id_marca,id_subcategoria):Observable<any>{
        let params = new HttpParams()
        .set('Id_marca',id_marca)
        .set('Id_subcategoria', id_subcategoria)
        
        return this.httpClient.get(this.endpoint + "/get_modelo_filtrado", {params});
    }

    // Llamadas a servicios del backend para mantenimiento de productos

    get_subcategorias():Observable<any>{
        return this.httpClient.get(this.endpoint + "/get_subcategorias", {responseType: 'json'});
    }

    get_modelos():Observable<any>{
        return this.httpClient.get(this.endpoint + "/get_modelos", {responseType: 'json'});
    }

    get_productos():Observable<any>{
        return this.httpClient.get(this.endpoint + "/get_productos", {responseType: 'json'});
    }

    insertar_producto(load):Observable<any>{
        return this.httpClient.post(this.endpoint + "/Insert_productos", load, {responseType:'json'});
    }

    insert_producto_proveedor(load):Observable<any>{
        return this.httpClient.post(this.endpoint + "/insert_productos_proveedores", load, {responseType:'json'});
    }

    update_producto_proveedor(load):Observable<any>{
        return this.httpClient.put(this.endpoint + "/update_productos_proveedores", load, {responseType:'json'});
    }

    update_producto(load):Observable<any>{
        return this.httpClient.put(this.endpoint + "/update_productos", load, {responseType:'json'});
    }

    delete_producto(load):Observable<any>{
        return this.httpClient.delete(this.endpoint + "/delete_productos", {params: load, responseType:'json'});
    }

    //Llamadas a servicios para mantenimiento de marcas

    get_marcas():Observable<any>{
        return this.httpClient.get(this.endpoint + "/get_marcas", {responseType: 'json'})
    }

    insert_marca(load):Observable<any>{
      return this.httpClient.post(this.endpoint + "/insert_marca",load,{responseType:'json'});

    }

    update_marca(load):Observable<any>{
      return this.httpClient.put(this.endpoint + "/update_marca",
      load,{responseType: 'json'});
    }

    eliminar_marca(load):Observable<any>{
      return this.httpClient.delete(this.endpoint + "/delete_marca",
      {params: load,responseType:'json'});
    }

    //Llamada a servicios para mantenimiento de las ciudades
    
    get_ciudades():Observable<any> {
        return this.httpClient.get(this.endpoint + "/get_ciudades", {responseType: 'json'})
    }

    insertar_ciudad(load):Observable<any> {
        return this.httpClient.post(this.endpoint + "/insert_ciudad", load, {responseType: 'json'})
    }

    update_ciudad(load):Observable<any> {
        return this.httpClient.put(this.endpoint + "/update_ciudad", load, {responseType: 'json'})
    }

    delete_ciudad(load):Observable<any> {
        return this.httpClient.delete(this.endpoint + "/delete_ciudad", {params: load, responseType: 'json'})
    }

    // Llamadas a servicios del backend para mantenimiento de modelos
    insertar_modelo(load):Observable<any> {
        return this.httpClient.post(this.endpoint + "/insert_modelo", load, {responseType: 'json'})
    }

    update_modelo(load):Observable<any> {
        return this.httpClient.put(this.endpoint + "/update_modelo", load, {responseType: 'json'})
    }

    delete_modelo(load):Observable<any> {
        return this.httpClient.delete(this.endpoint + "/delete_modelo", {params: load, responseType: 'json'})
    }


    // Llamadas a servicios del backend para mantenimiento de subcategorias

    insertar_subcategorias(load):Observable<any>{
        return this.httpClient.post(this.endpoint + "/insert_subcategoria", load, {responseType:'json'});
    }

    update_subcategorias(load):Observable<any>{
        return this.httpClient.put(this.endpoint + "/update_subcategoria", load, {responseType:'json'});
    }

    delete_subcategorias(load):Observable<any>{
        return this.httpClient.delete(this.endpoint + "/delete_subcategorias", {params: load, responseType:'json'});
    }

     // Llamada a los servicios para el mantenimiento de los empleados.
    get_empleados(): Observable<any>{

        return this.httpClient.get( this.endpoint + "/get_empleados", {responseType: 'json'} )
    }

    insertar_empleado( load ): Observable<any>{

        return this.httpClient.post( this.endpoint + "/insert_empleados", load, {responseType: 'json'} );
    }

    update_empleado( load ): Observable<any>{

        return this.httpClient.put( this.endpoint + "/update_empleados", load, {responseType: 'json'} );
    }

    get_estatus(): Observable<any>{

        return this.httpClient.get( this.endpoint + "/get_estatus", {responseType: 'json'} )
    }

    get_puestos(): Observable<any>{

        return this.httpClient.get( this.endpoint + "/get_puestos", {responseType: 'json'} )
    }

    //Comboboxes

    get_departamentos():Observable<any> {
        return this.httpClient.get(this.endpoint + "/get_departamentos", {responseType: 'json'})
    }

    login(payload):Observable<any>{
        return this.httpClient.post(this.endpoint + "/login", payload, {responseType: 'json'})
    }
    
    get_tipos_pago():Observable<any>{
        return this.httpClient.get(this.endpoint + "/get_tipos", {responseType: 'json'})
    }

    get_plazos_pago():Observable<any>{
        return this.httpClient.get(this.endpoint + "/get_plazos", {responseType: 'json'})
    }

        
    //Llamadas a servicios del backend para mantenimiento de compras detalle
    
    get_detalle_compras():Observable<any>{
        return this.httpClient.get(this.endpoint + "/get_detalle_compras", {responseType: 'json'})
    }

    insertar_detalle_compras(load):Observable<any>{
        return this.httpClient.post(this.endpoint + "/insert_detalle_compras", load, {responseType:'json'});
    }

    update_detalle_compra(load):Observable<any>{
        return this.httpClient.put(this.endpoint + "/update_detalle_compras", load, {responseType:'json'});
    }

    //Llamadas a servicios del backend para mantenimiento de ventas_plus y venta normal

    insertar_venta_plus( load ): Observable<any>{

        return this.httpClient.post( this.endpoint + "/insert_venta_plus", load, {responseType: 'json'} );
    }

    insertar_detalle_venta( load ): Observable<any>{

        return this.httpClient.post( this.endpoint + "/insert_detalle_venta", load, {responseType: 'json'} );
    }

    get_estados_envio(): Observable<any>{

        return this.httpClient.get( this.endpoint + "/get_estados_envio", {responseType: 'json'} )
    }

    get_clientes_filtrados(id_tipo_cliente):Observable<any>{
        let params = new HttpParams()
                .set('Id_tipo_cliente', id_tipo_cliente)
        
        return this.httpClient.get(this.endpoint + "/get_clientes_filtrados", {params});
    }

    restar_producto_inventario(load):Observable<any>{
        return this.httpClient.put(this.endpoint + "/restar_producto_inventario", load, {responseType:'json'});
    }

    agregar_producto_inventario(load):Observable<any>{
        return this.httpClient.put(this.endpoint + "/agregar_producto_inventario", load, {responseType:'json'});
    }

    get_ventas_pendientes_cobro(): Observable<any>{

        return this.httpClient.get( this.endpoint + "/get_ventas_pendientes_cobro", {responseType: 'json'} )
    }

    get_ventas_incobrables(): Observable<any>{

        return this.httpClient.get( this.endpoint + "/get_ventas_incobrables", {responseType: 'json'} )
    }
    
    get_estado_incobrable(): Observable<any>{

        return this.httpClient.get( this.endpoint + "/get_estado_incobrable", {responseType: 'json'} )
    }

    insertar_abono_venta(load):Observable<any>{
        return this.httpClient.post(this.endpoint + "/insert_abono_venta", load, {responseType:'json'});
    }

    insertar_venta_normal(load):Observable<any>{
        return this.httpClient.post(this.endpoint + "/insert_venta_normal", load, {responseType:'json'});
    }

    insertar_detalle_venta_normal(load):Observable<any>{
        return this.httpClient.post(this.endpoint + "/insert_detalle_venta_normal", load, {responseType:'json'});
    }

    get_devoluciones_venta():Observable<any>{
        return this.httpClient.get(this.endpoint + "/get_devoluciones_venta", {responseType: 'json'})
    }

    get_devoluciones_productos(id_venta):Observable<any>{
        let params = new HttpParams()
                .set('Id_venta', id_venta)
        
        return this.httpClient.get(this.endpoint + "/get_devolucion_productos", {params});
    }

    //Actualizar la cantidad devuelta
      update_devoluciones(load):Observable<any>{
        return this.httpClient.put(this.endpoint + "/update_devoluciones", load, {responseType:'json'});
    }


     /* ------------------------------ Compras pendientes ---------------- */
     get_compras_pendientes():Observable<any>{
        return this.httpClient.get(this.endpoint + "/get_compras_pendientes", {responseType: 'json'})
    }

    get_productos_compra(id_compra):Observable<any>{
        let params = new HttpParams()
                .set('Id_compra', id_compra)
        
        return this.httpClient.get(this.endpoint + "/get_productos_compra", {params});
    }

    get_estatus_compra(): Observable<any>{

        return this.httpClient.get( this.endpoint + "/get_estatus_compra", {responseType: 'json'} )
    }

    update_producto_compra(load):Observable<any>{
        return this.httpClient.put(this.endpoint + "/update_producto_compra", load, {responseType:'json'});
    }

    set_session(token){
        localStorage.setItem("KyD", JSON.stringify(token));
    }

    set_usuariologueado(LoginID){
        localStorage.setItem("loggedUser",JSON.stringify(LoginID));
    }

    get_usuariologueado(){
        if(localStorage.getItem("loggedUser"))
        return JSON.parse(localStorage.getItem("loggedUser"));
    }

    get_session(){
        if(localStorage.getItem("KyD") && JSON.parse(localStorage.getItem("KyD")).token){
            return JSON.parse(localStorage.getItem("KyD"));
        }else{
            return false;
        }
    }

    reset_session(){
        localStorage.removeItem("KyD");
        localStorage.removeItem("loggedUser");
    }
}

