const express = require('express');
const router = express.Router();
const http = require('http');
var mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret_key = process.env.SECRET_KEY || "prew";

//Conexion a la base de datos MYSQL

var con = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Daniel100",
    database: 'variedades_kyd',
    insecureAuth: true,
    multipleStatements: true
});

/*---------------------------------MANTENIMIENTO PROVEEDORES----------------------------------*/

//Insertar un nuevo Proveedor

router.post('/insert_proveedor', (req, res, next) => {
	var query = 'insert into proveedores (Nombre_compania, Direccion, Id_ciudad, Nombre_contacto, Apellido_contacto, Telefono_contacto, Email_contacto)';
	    query = query  + 'values (?,?,?,?,?,?,?)';	
	var values = [req.body.Nombre_compania,
				  req.body.Direccion,
				  req.body.Id_ciudad,
				  req.body.Nombre_contacto,
				  req.body.Apellido_contacto,
				  req.body.Telefono_contacto,
				  req.body.Email_contacto];	
	con.query(query, values, (err, result, fields) => {
		if(err) {
				next(err);
		} else {
				res.status(200).json(result);
		}
	});
   
});

//Editar un Proveedor

router.put('/update_proveedor', (req, res, next) => {
	var query = 'update proveedores set Nombre_compania = ?, Direccion = ?, Id_ciudad = ?, Nombre_contacto = ?, Apellido_contacto = ?, Telefono_contacto = ?, Email_contacto = ?';
	    query = query  + ' where Id_proveedor = ?';
	
	var values = [
				  req.body.Nombre_compania,
				  req.body.Direccion,
				  req.body.Id_ciudad,
				  req.body.Nombre_contacto,
				  req.body.Apellido_contacto,
				  req.body.Telefono_contacto,
				  req.body.Email_contacto,
				  req.body.Id_proveedor];

	con.query(query, values, (err, result, fields) => {
		if(err) {
			next(err);
		} else {
			res.status(200).json(result);
		}
	});
   
});

//Eliminar un Proveedor

router.delete('/delete_proveedor', (req, res, next) => {
	var query = 'update proveedores set Estado_logico = 0 where Id_proveedor = ?';
	
	var values = [req.query.Id_proveedor];

	con.query(query, values, (err, result, fields) => {
		if(err) {
			next(err);
		} else {
			res.status(200).json(result);
		}
	});
   
});

//Consultar un Proveedor en particular.

router.get('/get_proveedor', (req, res, next) => {
	var query = "select a.Id_proveedor, a.Nombre_compania, a.Nombre_contacto, a.Apellido_contacto, a.Telefono_contacto, a.Email_contacto, a.Direccion, b.Id_ciudad, b.Nombre_ciudad , c.Id_departamento, c.Nombre_departamento from proveedores a inner join ciudades b on a.Id_ciudad = b.Id_ciudad inner join departamentos c on b.Id_departamento = c.Id_departamento where Estado_logico = 1 and a.Nombre_compania like " + "'%"+req.body.Busqueda+"%'" + "or a.Nombre_contacto like " + "'%"+req.body.Busqueda+"%'" + " or a.Apellido_contacto like " + "'%"+req.body.Busqueda+"%'" + "or a.Email_contacto like " + "'%"+req.body.Busqueda+"%'" + "or a.Direccion like " + "'%"+req.body.Busqueda+"%'" + "or b.Nombre_ciudad like " + "'%"+req.body.Busqueda+"%'" +  "or c.Nombre_departamento like " + "'%"+req.body.Busqueda+"%'"; 
	
    con.query(query, (err, result, fields) => {
        if(err){
            next(err);
        }else{
            res.status(200).json(result);
        }
    });
});

//Consultar todos los Proveedores.

router.get('/get_proveedores', (req, res, next) => {
	var query = "select a.Id_proveedor, a.Nombre_compania, a.Nombre_contacto, a.Apellido_contacto, a.Telefono_contacto, a.Email_contacto, a.Direccion, b.Id_ciudad, b.Nombre_ciudad , c.Id_departamento, c.Nombre_departamento from proveedores a inner join ciudades b on a.Id_ciudad = b.Id_ciudad inner join departamentos c on b.Id_departamento = c.Id_departamento where Estado_logico = 1";
	con.query(query, (err, result, fields) => {
		if(err){
			next(err);
		}
		else{
			res.status(200).json(result);
		}
	});
});

/*---------------------------------MANTENIMIENTO PRODUCTOS_PROVEEDORES----------------------------------*/

//Insertar un nuevo registro en Productos_Proveedores

router.post('/insert_producto_proveedor', (req, res, next) => {
	var query = 'insert into productos_proveedores (Id_producto, Id_proveedor)';
	    query = query  + 'values (?,?)';	
	var values = [req.body.Id_producto,
				  req.body.Id_proveedor];	
	con.query(query, values, (err, result, fields) => {
		if(err) {
				next(err);
		} else {
				res.status(200).json(result);
		}
	});
   
});

//Editar un registro en Productos_Proveedores

router.put('/update_producto_proveedor', (req, res, next) => {
	var query = 'update productos_proveedores set Id_producto = ?';
	    query = query  + ' where Id_proveedor = ?';
	
	var values = [
				  req.body.Id_producto,
				  req.body.Id_proveedor];

	con.query(query, values, (err, result, fields) => {
		if(err) {
			next(err);
		} else {
			res.status(200).json(result);
		}
	});
   
});

router.put ('/update_producto_compra', (req, res, next) => {
    var query= 'update productos set  Stock = ? where Id_producto = ?';
        
    var values=[
        req.body.Stock,
        req.body.Id_producto
    ];
    con.query(query, values, (err, result, fields) => {
        if(err){
            next(err);
        }else{
            res.status(200).json(result);
        }
    });
});


//Consultar un registro en Productos_Proveedor.

router.get('/get_producto_proveedor', (req, res, next) => {
	var query = "select pv.Id_producto,p.Descripcion_producto,p.Talla,p.Color,p.Stock,p.Precio_referencial_venta,p.Precio_referencial_compra,p.Punto_reorden,p.Id_modelo,pv.Id_proveedor,pr.Nombre_compania,	pr.Direccion,pr.Id_ciudad,pr.Nombre_contacto,pr.Apellido_contacto,pr.Telefono_contacto,pr.Email_contacto from productos_proveedores pv JOIN productos p ON pv.Id_producto= p.Id_producto JOIN proveedores pr ON pv.Id_proveedor=pr.Id_proveedor  where p.Descripcion_producto like " + "'%"+req.body.Busqueda+"%'"+ "or p.Talla like " + "'%"+req.body.Busqueda+"%'"+ "or p.Color like " + "'%"+req.body.Busqueda+"%'"+ "or pr.Nombre_compania like " + "'%"+req.body.Busqueda+"%'"+ "or pr.Direccion like " + "'%"+req.body.Busqueda+"%'"+ "or pr.Nombre_contacto like " + "'%"+req.body.Busqueda+"%'"+ "or pr.Email_contacto like " + "'%"+req.body.Busqueda+"%'";
	
	con.query(query,  (err, result, fields) => {
		if(err){
			next(err);
		}
		else{
			res.status(200).json(result);
		}
	});
});

//Consultar todos los registros en Productos_Proveedores.
router.get('/get_productos_proveedor', (req, res, next) => {
	var query= 'select a.Id_producto, a.Descripcion_producto, a.Talla, a.Color, a.Stock, a.Precio_referencial_venta, a.Precio_referencial_compra, a.Punto_reorden, b.Descripcion_modelo, c.Nombre_marca, d.Descripcion_subcategoria, e.Descripcion_categoria from productos a inner join modelos b on a.Id_modelo = b.Id_modelo inner join marcas c on b.Id_marca = c.Id_marca inner join subcategorias d on b.Id_subcategoria = d.Id_subcategoria inner join categorias e on d.Id_categoria = e.Id_categoria inner join productos_proveedores f on a.Id_producto = f.Id_producto ';
		query = query + 'where a.Estado_logico = 1 and f.Id_proveedor = ?;';
	
	var values = [req.query.Id_proveedor];

	con.query(query, values, (err, result, fields) => {
		if(err){
			next(err);
		}else{
			res.status(200).json(result);
		}
	});
});


/*---------------------------------MANTENIMIENTO CIUDADES----------------------------------*/

// Consultar todas las ciudades.

router.get('/get_ciudades', (req, res, next) => {
    var query = 'select a.Id_ciudad, a.Nombre_ciudad, b.Id_departamento, b.Nombre_departamento from ciudades a inner join departamentos b on a.Id_departamento = b.Id_departamento';
    con.query(query, (err, result, fields) => {
        if(err){
            next(err);
        }else{
            res.status(200).json(result);
        }
    });
});

//Consultar una ciudad 
router.get('/get_ciudad', (req, res, next) => {
	var query = "SELECT c.Id_ciudad, c.Nombre_ciudad, c.Id_departamento, d.Nombre_departamento FROM ciudades c inner join departamentos d on c.Id_departamento=d.Id_departamento where c.Nombre_ciudad like "+"'%"+ req.body.Busqueda+"%'"+" or d.Nombre_departamento like "+"'%"+ req.body.Busqueda+"%'";
	con.query(query, (err, result, fields) => {
		if(err) {
				next(err);
		} else {
				res.status(200).json(result);

		}
	});
   
});

// Insertar una nueva ciudad.

router.post('/insert_ciudad', (req, res, next) => {
    var query = 'INSERT INTO ciudades (Nombre_ciudad, Id_departamento) VALUES (?, ?)';
    
    var values = [
        req.body.Nombre_ciudad,
        req.body.Id_departamento
    ];

    con.query(query, values, (err, result, fields) => {
        if(err){
            next(err);
        } else{
            res.status(200).json(result);
        }
    });
});

// Actualizar ciudad.

router.put('/update_ciudad', (req, res, next) => {
    var query = 'UPDATE ciudades SET Nombre_ciudad = ?, Id_departamento = ? WHERE Id_ciudad = ?';
    
    var values = [
        req.body.Nombre_ciudad,
        req.body.Id_departamento,
        req.body.Id_ciudad
    ];

    con.query(query, values, (err, result, fields) => {
        if(err){
            next(err);
        } else{
            res.status(200).json(result);
        }
    });
});

router.get('/get_departamentos', (req, res, next) => {
    var query = 'SELECT * FROM departamentos';
    con.query(query, (err, result, fields) => {
    	if(err) {
    		next(err);
    	}else {
    		res.status(200).json(result);
    	}
    });
});


/*---------------------------------MANTENIMIENTO CLIENTES----------------------------------*/

//Insertar cliente

router.post('/insert_cliente', (req, res, next) => {
    var query = 'INSERT INTO clientes (Nombre_compania, Id_ciudad, Id_tipo_cliente, Direccion, Nombre_contacto, Apellido_contacto, Telefono_contacto, Email_contacto) ';
        query = query + 'values (?, ?, ?, ?, ?, ?, ?, ?)';

    var values = [req.body.Nombre_compania,
        req.body.Id_ciudad,
        req.body.Id_tipo_cliente,
        req.body.Direccion,
        req.body.Nombre_contacto,
        req.body.Apellido_contacto,
        req.body.Telefono_contacto,
        req.body.Email_contacto
    ];
    
    con.query(query, values, (err, result, fields) => {
        if(err) {
            next(err);
        }else {
            res.status(200).json(result);
        }
    })
    
});

//Actualizar cliente

router.put('/update_cliente', (req, res, next) => {
    var query = 'UPDATE clientes SET Nombre_compania = ?, Id_ciudad = ?, Id_tipo_cliente = ?, Direccion = ?, Nombre_contacto = ?, Apellido_contacto = ?, Telefono_contacto = ?, Email_contacto = ?';
        query = query + 'WHERE Id_cliente = ?';

        var values = [req.body.Nombre_compania,
            req.body.Id_ciudad,
            req.body.Id_tipo_cliente,
            req.body.Direccion,
            req.body.Nombre_contacto,
            req.body.Apellido_contacto,
            req.body.Telefono_contacto,
            req.body.Email_contacto,
            req.body.Id_cliente
        ];
    
    con.query(query, values, (err, result, fields) => {
        if(err) {
            next(err);
        }else {
            res.status(200).json(result);
        }
    })
    
});

//Eliminar un Cliente

router.delete('/delete_cliente', (req, res, next) => {
    var query = 'update clientes set Estado_logico = 0 where Id_cliente = ?';
    var values = [req.query.Id_cliente];

    con.query(query, values, (err, result, fields) => {
        if(err) {
            next(err);
        }else {
            res.status(200).json(result);
        }
    })
});

//Consultar todos los clientes

router.get('/get_clientes', (req, res, next) => {
    var query = 'select a.Id_cliente, a.Nombre_compania, a.Nombre_contacto, a.Apellido_contacto, a.Telefono_contacto, a.Email_contacto, c.Id_tipo_cliente, c.Descripcion_cliente, c.Descuento_cliente, a.Direccion, b.Id_ciudad, b.Nombre_ciudad, d.Id_departamento, d.Nombre_departamento from clientes a inner join ciudades b on a.Id_ciudad = b.Id_ciudad inner join tipo_cliente c on a.Id_tipo_cliente = c.Id_tipo_cliente inner join departamentos d on b.Id_departamento = d.Id_departamento where Estado_logico = 1';
    con.query(query, (err, result, fields) => {
        if(err) {
            next(err);
        }else {
            res.status(200).json(result);
        }
    })
});

//Consultar cliente especifico

router.get('/get_cliente_especifico', (req, res, next) => {
    var query = "select a.Id_cliente, a.Nombre_compania, a.Nombre_contacto, a.Apellido_contacto, a.Telefono_contacto, a.Email_contacto, c.Id_tipo_cliente, c.Descripcion_cliente, c.Descuento_cliente, a.Direccion, b.Id_ciudad, b.Nombre_ciudad, d.Id_departamento, d.Nombre_departamento from clientes a inner join ciudades b on a.Id_ciudad = b.Id_ciudad inner join tipo_cliente c on a.Id_tipo_cliente = c.Id_tipo_cliente inner join departamentos d on b.Id_departamento = d.Id_departamento where Estado_logico = 1 and a.Nombre_compania like " + "'%"+req.body.Busqueda+"%'" + "or a.Nombre_contacto like " + "'%"+req.body.Busqueda+"%'" + "or a.Apellido_contacto like " + "'%"+req.body.Busqueda+"%'" + "or a.Email_contacto like " + "'%"+req.body.Busqueda+"%'" + "or a.Direccion like " + "'%"+req.body.Busqueda+"%'" + "or b.Nombre_ciudad like " + "'%"+req.body.Busqueda+"%'" + "or d.Nombre_departamento like " + "'%"+req.body.Busqueda+"%'";

    con.query(query, (err, result, fields) => {
        if(err) {
            next(err);
        }else {
            res.status(200).json(result);
        }
    })
    
});

router.get('/get_tipo_cliente', (req, res, next) => {
    var query = 'SELECT * FROM tipo_cliente';
    var values = [req.query.Id_categoria];
    con.query(query, values, (err, result, fileds) => {
        if(err){
            next(err);
        } else {
            res.status(200).json(result);
        }
    });
    
});


/*---------------------------------MANTENIMIENTO PRODUCTOS----------------------------------*/

//Consulta Productos

router.get('/get_productos', (req, res, next) => {
	var query= 'select a.Id_producto, a.Descripcion_producto, a.Talla, a.Color, a.Stock,a.Precio_referencial_venta, a.Precio_referencial_compra, a.Punto_reorden, b.Descripcion_modelo, c.Nombre_marca, d.Descripcion_subcategoria, e.Descripcion_categoria, g.Nombre_compania from productos a inner join modelos b on a.Id_modelo = b.Id_modelo inner join marcas c on b.Id_marca = c.Id_marca inner join subcategorias d on b.Id_subcategoria = d.Id_subcategoria inner join categorias e on d.Id_categoria = e.Id_categoria inner join productos_proveedores f on a.Id_producto = f.Id_producto inner join proveedores g on f.Id_proveedor = g.Id_proveedor  where a.Estado_logico = 1';
    con.query(query, (err, result, fields) => {
        if(err){
            next(err);
        }else{
            res.status(200).json(result);
        }
    });
});

//Buscar Productos

router.get('/get_productos_Buscar', (req, res, next) => {
	var query= 'select a.Id_producto, a.Descripcion_producto, a.Talla, a.Color, a.Stock, a.Precio_referencial_venta, a.Precio_referencial_compra, a.Punto_reorden, c.Nombre_marca, d.Descripcion_subcategoria, e.Descripcion_categoria from productos a inner join modelos b on a.Id_modelo = b.Id_modelo inner join marcas c on b.Id_marca = c.Id_marca inner join subcategorias d on b.Id_subcategoria = d.Id_subcategoria inner join categorias e on d.Id_categoria = e.Id_categoria';
	query = query + " where Estado_logico = 1 and a.Descripcion_producto like " + "'%"+req.body.Busqueda+"%'" + "or a.Talla like " + "'%"+req.body.Busqueda+"%'" + "or a.Color like " + "'%"+req.body.Busqueda+"%'" + "or c.Nombre_marca like " + "'%"+req.body.Busqueda+"%'" + "or d.Descripcion_subcategoria like " + "'%"+req.body.Busqueda+"%'" + "or e.Descripcion_categoria like " + "'%"+req.body.Busqueda+"%'";
    con.query(query, (err, result, fields) => {
        if(err){
            next(err);
        }else{
            res.status(200).json(result);
        }
    });
});

//Insertar Productos

router.post ('/Insert_productos', (req, res, next) => {
    var query = 'insert into productos (Descripcion_producto, Talla, Color, Stock, Precio_referencial_venta, Precio_referencial_compra, Punto_reorden, Id_modelo)';
        query=query+ 'values (?,?,?,?,?,?,?,?)';
    var values=[
        req.body.Descripcion_producto,
        req.body.Talla,
        req.body.Color,
        req.body.Stock,
        req.body.Precio_referencial_venta,
        req.body.Precio_referencial_compra,
        req.body.Punto_reorden,
        req.body.Id_modelo
    ];
    con.query(query, values, (err, result, fields) => {
        if(err){
            next(err);
        }else{
            res.status(200).json(result);
        }
    });
});

//Actualizar Productos

router.put ('/update_productos', (req, res, next) => {
    var query= 'update productos set  Descripcion_producto = ?, Talla = ? , Color = ?, Stock = ?, Precio_referencial_venta = ?, Precio_referencial_compra = ?, Punto_reorden = ?, Id_modelo=?';
        query=query+ 'where Id_producto = ?';
    var values=[
        req.body.Descripcion_producto,
        req.body.Talla,
        req.body.Color,
        req.body.Stock,
        req.body.Precio_referencial_venta,
        req.body.Precio_referencial_compra,
        req.body.Punto_reorden,
        req.body.Id_modelo,
        req.body.Id_producto
    ];
    con.query(query, values, (err, result, fields) => {
        if(err){
            next(err);
        }else{
            res.status(200).json(result);
        }
    });
});

//Eliminar producto

router.delete('/delete_productos', (req, res, next) => {
    var query= 'update productos set Estado_logico = 0 where Id_producto = ?';
   var values=[req.query.Id_producto];
    con.query(query, values, (err, result, fields) => {
        if(err){
            next(err);
        }else{
            res.status(200).json(result);
        }
    });
});


//Productos filtrados segun MODELO

router.get('/get_modelo_filtrado', (req, res, next) => {
	var query= 'select a.Id_modelo, a.Descripcion_modelo from modelos a where a.Id_marca=? and a.Id_subcategoria=?';
		var values = [req.query.Id_marca,
			req.query.Id_subcategoria];
    con.query(query, values, (err, result, fields) => {
        if(err){
            next(err);
        }else{
            res.status(200).json(result);
        }
    });
});
//Insertar un nuevo registro

router.post('/insert_productos_proveedores',(req,res,next)=>{
	var query='set @codigo=(select max(Id_producto)  from productos); INSERT INTO productos_proveedores (Id_producto, Id_proveedor) VALUES (@codigo,?)';
	var values=[req.body.Id_proveedor]
		con.query(query,values,(err,result,fields)=>{
			if(err){
				next(err);
			}else{
				res.status(200).json(result);
			}
		});
	});

router.put('/update_productos_proveedores', (req, res, next) => {
	var query = 'update productos_proveedores set Id_proveedor = ? where Id_producto = ?';
	var values = [
					req.body.Id_proveedor,
					req.body.Id_producto
				];

	con.query(query, values, (err, result, fields) => {
		if(err) {
			next(err);
		} else {
			res.status(200).json(result);
		}
	});
});

//Productos filtrados segun categoria

router.get('/get_subcategoria_filtrado', (req, res, next) => {
	var query= 'select a.Id_subcategoria, a.Descripcion_subcategoria from subcategorias a inner join categorias b on a.Id_categoria=b.Id_categoria where b.Id_categoria = ?';
		var values = [req.query.Id_categoria];
    con.query(query, values, (err, result, fields) => {
        if(err){
            next(err);
        }else{
            res.status(200).json(result);
        }
    });
});


/*---------------------------------MANTENIMIENTO VENTAS----------------------------------*/

//Consultar todas ventas

router.get('/get_ventas', (req, res, next) => {
	var query = 'select a.Id_venta, a.Cod_factura, a.Fecha_venta, a.Fecha_envio, a.Fecha_entrega, a.Identidad, a.ISV, b.Id_cliente, b.Nombre_compania, c.Id_estatus, c.Descripcion_estatus, d.Id_tipo_pago, d.Descripcion_tipo_pago, e.Id_plazo, e.Descripcion_plazo from ventas a inner join clientes b on a.Id_cliente = b.Id_cliente inner join Estatus c on a.Id_estatus = c.Id_estatus inner join tipo_pago d on a.Id_tipo_pago = d.Id_tipo_pago inner join plazos_pago e on a.Id_plazo = e.Id_plazo';
	con.query(query, (err, result, fields) => {
		if(err) {
				next(err);
		} else {
				res.status(200).json(result);

		}
	});
   
});

//Consultar una sola venta

router.get('/get_venta', (req, res, next) => {
	var query = "select a.Id_venta, a.Cod_factura, a.Fecha_venta, a.Fecha_envio, a.Fecha_entrega, a.Identidad, a.ISV, b.Id_cliente, b.Nombre_compania, c.Id_estatus, c.Descripcion_estatus, d.Id_tipo_pago, d.Descripcion_tipo_pago, e.Id_plazo, e.Descripcion_plazo from ventas a inner join clientes b on a.Id_cliente = b.Id_cliente inner join Estatus c on a.Id_estatus = c.Id_estatus inner join tipo_pago d on a.Id_tipo_pago = d.Id_tipo_pago inner join plazos_pago e on a.Id_plazo = e.Id_plazo where a.Cod_factura like " + "'%"+req.body.Busqueda+"%'" + "or a.Identidad like " + "'%"+req.body.Busqueda+"%'" + "or b.Nombre_compania like " + "'%"+req.body.Busqueda+"%'";
	
	con.query(query, (err, result, fields) => {
		if(err) {
				next(err);
		} else {
				res.status(200).json(result);

		}
	});
   
});

//Insertar una nueva venta

router.post ('/Insert_venta_plus', (req, res, next) => {
	var query = 'insert into ventas (Fecha_venta, ISV, Id_cliente, Id_estado_envio, Id_estado_pago, Id_tipo_pago, Id_plazo) ';
	var FechaActual = new Date();
        query=query+ 'values (?,?,?,?,?,?,?)';
    var values=[
    	FechaActual,
        req.body.Isv,
        req.body.Id_cliente,
        req.body.Id_estado_envio,
		req.body.Id_estado_pago,
		req.body.Id_tipo_pago,   
        req.body.Id_plazo
    ];
    con.query(query, values, (err, result, fields) => {
        if(err){
            next(err);
        }else{
            res.status(200).json(result);
        }
    });
});


/*---------------------------------MANTENIMIENTO DETALLE_VENTAS----------------------------------*/

//Consultar todos los detalles de ventas

router.get('/get_detalle_ventas', (req, res, next) => {
	var query = 'select * from detalle_ventas';
	con.query(query, (err, result, fields) => {
		if(err) {
				next(err);
		} else {
				res.status(200).json(result);

		}
	});
});

//Consultar los producto de una venta especifica

router.get('/get_productos_venta', (req, res, next) => {
	var query = 'select dv.Id_venta, dv.Id_producto, a.Descripcion_producto, a.Talla, a.Color, a.Stock, a.Precio_referencial_venta, a.Precio_referencial_compra, a.Punto_reorden, c.Nombre_marca, d.Descripcion_subcategoria, e.Descripcion_categoria, dv.Precio_venta, dv.Cantidad_vendida, dv.Cantidad_devuelta from detalle_ventas dv inner join productos a on dv.Id_producto=a.Id_producto inner join modelos b on a.Id_modelo = b.Id_modelo inner join marcas c on b.Id_marca = c.Id_marca inner join subcategorias d on b.Id_subcategoria = d.Id_subcategoria inner join categorias e on d.Id_categoria = e.Id_categoria where dv.Id_venta = ?';
	var values = [req.query.Id_venta];
	con.query(query, values, (err, result, fields) => {
		if(err) {
				next(err);
		} else {
				res.status(200).json(result);

		}
	});
});

//Consultar un solo detalle de venta CAMBIOS

router.get('/get_detalle_venta', (req, res, next) => {
	var query = 'select * from detalle_ventas where Id_venta = ? and Id_producto = ?';
	var values = [req.query.Id_venta,
				  req.query.Id_producto];
	
	con.query(query, values, (err, result, fields) => {
		if(err) {
				next(err);
		} else {
				res.status(200).json(result);

		}
	});
   
});

//Insertar un nuevo detalle CAMBIOS

router.post('/insert_detalle_venta',(req,res,next)=>{
	var query='set @codigo = (select max(Id_venta) from ventas); INSERT INTO detalle_ventas (Id_venta, Id_producto, Precio_venta, Cantidad_vendida, Cantidad_devuelta) VALUES (@codigo,?,?,?,?)';
	var values=[
		req.body.Id_producto,
		req.body.Precio_referencial_venta,
		req.body.Cantidad_vendida,
		0
	]
	
	con.query(query,values,(err,result,fields)=>{
		if(err){
			next(err);
		}else{
			res.status(200).json(result);
		}
	});
});


//Actualizar la tabla detalle de ventas

router.put('/update_detalle_venta', (req, res, next) => {
	var query = 'update detalle_ventas set Precio_venta = ?, Cantidad_vendida = ?, Cantidad_devuelta = ? ';
	    query = query  + 'where Id_venta =? and Id_producto = ?';
	
	var values = [
				  req.body.Precio_venta,
				  req.body.Cantidad_vendida,
				  req.body.Cantidad_devuelta,
				  req.body.Id_venta,
				  req.body.Id_producto
	];

	
	con.query(query, values, (err, result, fields) => {
		if(err) {
				next(err);
		} else {
				res.status(200).json(result);

		}
	});
   
});


/*---------------------------------MANTENIMIENTO CUENTAS POR COBRAR----------------------------------*/

//Consultar todas las cuentas por cobrar
router.get('/get_cuentas_por_cobrar', (req, res, next) => {
	var query = 'select cpc.Id_cobro, cpc.Abono, cpc.Id_venta, v.Cod_factura, v.Fecha_venta, v.Fecha_envio, v.Fecha_entrega, v.Identidad, v.ISV, v.Id_cliente, c.Nombre_compania , v.Id_empleado, e.Nombre, e.Apellido, v.Id_estatus, es.Descripcion_estatus, v.Id_tipo_pago, tp.Descripcion_tipo_pago, v.Id_plazo, pp.Descripcion_plazo from cuentas_por_cobrar cpc inner join ventas v on cpc.Id_venta=v.Id_venta inner join clientes c on v.Id_cliente = c.Id_cliente inner join empleados e on v.Id_empleado = e.Id_empleado inner join estatus es  on v.Id_estatus = es.Id_estatus inner join tipo_pago tp on v.Id_tipo_pago = tp.Id_tipo_pago inner join plazos_pago pp on v.Id_plazo = pp.Id_plazo';
	con.query(query, (err, result, fields) => {
		if(err) {
				next(err);
		} else {
				res.status(200).json(result);

		}
	});
   
});

//Consultar una sola cuenta por cobrar
router.get('/get_cuenta_por_cobrar', (req, res, next) => {
	var query = "select cpc.Id_cobro, cpc.Abono, cpc.Id_venta, v.Cod_factura, v.Fecha_venta, v.Fecha_envio, v.Fecha_entrega, v.Identidad, v.ISV, v.Id_cliente, c.Nombre_compania , v.Id_empleado, e.Nombre, e.Apellido, v.Id_estatus, es.Descripcion_estatus, v.Id_tipo_pago, tp.Descripcion_tipo_pago, v.Id_plazo, pp.Descripcion_plazo from cuentas_por_cobrar cpc inner join ventas v on cpc.Id_venta=v.Id_venta inner join clientes c on v.Id_cliente = c.Id_cliente inner join empleados e on v.Id_empleado = e.Id_empleado inner join estatus es  on v.Id_estatus = es.Id_estatus inner join tipo_pago tp on v.Id_tipo_pago = tp.Id_tipo_pago inner join plazos_pago pp on v.Id_plazo = pp.Id_plazo where v.Cod_factura like " +"'%"+ req.body.Busqueda+"%'" + " or v.Identidad like " +"'%"+ req.body.Busqueda+"%'" + " or c.Nombre_compania like " +"'%"+ req.body.Busqueda+"%'" + " or e.Nombre like " +"'%"+ req.body.Busqueda+"%'" + " or e.Apellido like " +"'%"+ req.body.Busqueda+"%'" + " or es.Descripcion_estatus like " +"'%"+ req.body.Busqueda+"%'" + " or tp.Descripcion_tipo_pago like " +"'%"+ req.body.Busqueda+"%'" + " or pp.Descripcion_plazo like " +"'%"+ req.body.Busqueda+"%' " ;
	
	
	con.query(query, (err, result, fields) => {
		if(err) {
				next(err);
		} else {
				res.status(200).json(result);

		}
	});
   
});

//Insertar una nueva cuenta por cobrar

//Insertar una nueva cuenta por cobrar

router.post('/insert_cuentas_por_cobrar', (req, res, next) => {
	var query = 'INSERT INTO cuentas_por_cobrar (Abono, Id_venta) ';
	    query = query  + 'values (?,?)';
	
	var values = [req.body.Abono,
				  req.body.Id_venta		  
	];

	
	con.query(query, values, (err, result, fields) => {
		if(err) {
				next(err);
		} else {
				res.status(200).json(result);

		}
	});
   
});

//Actualizar campo en cuentas por cobrar

router.put('/update_cuentas_por_cobrar', (req, res, next) => {
	var query = 'update cuentas_por_cobrar set Abono = ?, Id_venta = ?';
	    query = query  + 'where Id_cobro =?';
	
	var values = [req.body.Abono,
				  req.body.Id_venta,
				  req.body.Id_cobro
	];

	
	con.query(query, values, (err, result, fields) => {
		if(err) {
				next(err);
		} else {
				res.status(200).json(result);

		}
	});
   
});


/*---------------------------------MANTENIMIENTO CATEGORIAS----------------------------------*/

//Consultar todas los categorias

router.get('/get_categorias', (req, res, next) => {
    var query = 'SELECT * FROM categorias';
    con.query(query, (err, result, fileds) => {
        if(err){
            next(err);
        } else {
            res.status(200).json(result);
        }
    });
    
});

//Consultar una sola categoria 
router.get('/get_categoria', (req, res, next) => {
	var query = 'select * from categorias where Id_categoria=? or Descripcion_categoria like ' +"'%"+ req.body.Busqueda+"%'";
	var values = [req.body.Busqueda];
	con.query(query, values, (err, result, fields) => {
		if(err) {
				next(err);
		} else {
				res.status(200).json(result);

		}
	});
   
});

//Insertar datos

router.post('/insert_categoria', (req, res, next) => {
	var query = 'insert into categorias (Descripcion_categoria)';
	    query = query  + 'values (?)';
	
	var values = [req.body.Descripcion_categoria];

	
	con.query(query, values, (err, result, fields) => {
		if(err) {
				next(err);
		} else {
				res.status(200).json(result);

		}
	});
   
});

//Actualizar los datos

router.put('/update_categoria', (req, res, next) => {
	var query = 'update categorias set Descripcion_categoria = ?';
	    query = query  + ' where Id_categoria = ?';
	
	var values = [
				  req.body.Descripcion_categoria,
				  req.body.Id_categoria
	            ];

	
	con.query(query, values, (err, result, fields) => {
		if(err) {
				next(err);
		} else {
				res.status(200).json(result);

		}
	});
   
});


//---------------------------------MANTENIMIENTO SUBCATEGORIAS----------------------------------/

//Consultar todas las subcategorias
router.get('/get_subcategorias', (req, res, next) => {
    var query ='SELECT s.Id_subcategoria, s.Descripcion_subcategoria, c.Id_categoria, c.Descripcion_categoria FROM subcategorias s JOIN categorias c ON s.Id_categoria = c.Id_Categoria';
    con.query(query, (err, result, fileds) => {
        if(err){
            next(err);
        } else {
            res.status(200).json(result);
        }
    });
    
});

//Buscar subcategoria
router.get('/get_subcategoria', (req, res, next) => {
    var query ="SELECT s.Id_subcategoria,s.Descripcion_subcategoria,c.Id_categoria,c.Descripcion_categoria FROM subcategorias s JOIN categorias c ON s.Id_categoria = c.Id_Categoria where s.Descripcion_subcategoria like " + "'%"+req.body.Busqueda+"%'"+ "or c.Descripcion_categoria like " + "'%"+req.body.Busqueda+"%'"; 
    con.query(query,  (err, result, fileds) => {
        if(err){
            next(err);
        } else {
            res.status(200).json(result);
        }
    });
    
});

//Insertar datos
router.post('/insert_subcategoria', (req, res, next) => {
    var query = 'insert into subcategorias (Descripcion_subcategoria, Id_categoria)';
        query = query  + 'values (?,?)';
    
    var values = [
                  req.body.Descripcion_subcategoria,
                  req.body.Id_categoria
                ];

    
    con.query(query, values, (err, result, fields) => {
        if(err) {
                next(err);
        } else {
                res.status(200).json(result);

        }
    });
   
});

//Actualizar los datos
router.put('/update_subcategoria', (req, res, next) => {
    var query = 'update subcategorias set Descripcion_subcategoria = ?, Id_categoria = ?';
        query = query  + ' where Id_subcategoria = ?';
    
    var values = [
                  req.body.Descripcion_subcategoria,
                  req.body.Id_categoria,
                  req.body.Id_subcategoria
                ];

    
    con.query(query, values, (err, result, fields) => {
        if(err) {
                next(err);
        } else {
                res.status(200).json(result);

        }
    });
   
});

/*---------------------------------MANTENIMIENTO MARCAS----------------------------------*/

//Consultar todas las marcas

router.get('/get_marcas', (req, res, next) => {
    var query = 'SELECT * FROM marcas;';
 con.query(query,(err,result,fields) => {
     if(err){
         next(err);
     }else {
         res.status(200).json(result);

     }
    });

});

//Consultar una marca en particular 

router.get('/get_marca', (req, res, next) => {
    var query ="select * from marcas where Nombre_Marca like " + "'%"+req.body.Busqueda+"%'";
 con.query(query,(err,result,fields) => {
     if(err){
         next(err);
     }else {
         res.status(200).json(result);
     }
    });

});

//Insertar una nueva marca

router.post('/insert_marca', (req, res, next) => {
    var query = 'insert into marcas (Nombre_marca)';
    query= query + ' values(?)';

    var values = [
        req.body.Nombre];

 con.query(query,values,(err,result,fields) => {
     if(err){
         next(err);
     }else {
         res.status(200).json(result);
     }
    });

});

//Actualizar una marca

router.put('/update_marca', (req, res, next) => {
    var query = 'update marcas set Nombre_marca = ? ';
    query= query + 'where Id_marca = ?';

    var values = [req.body.Nombre,
        req.body.Id_marca];

 con.query(query,values,(err,result,fields) => {
     if(err){
         next(err);
     }else {
         res.status(200).json(result);
     }
    });

});


/*---------------------------------MANTENIMIENTO MODELOS----------------------------------*/

//Consultar todos los modelos

router.get('/get_modelos', (req, res, next) => {
    var query = 'select a.Id_modelo, a.Descripcion_modelo, b.Id_marca, b.Nombre_marca, c.Id_subcategoria, c.Descripcion_subcategoria, d.Id_categoria, d.Descripcion_categoria from modelos a inner join marcas b on a.Id_marca = b.Id_marca inner join subcategorias c on a.Id_subcategoria = c.Id_subcategoria inner join categorias d on c.Id_categoria = d.Id_categoria';
 con.query(query,(err,result,fields) => {
     if(err){
         next(err);
     }else {
         res.status(200).json(result);

     }
    });

});

router.get('/get_subcategorias', (req, res, next) => {
    var query ='SELECT s.Id_subcategoria,s.Descripcion_subcategoria,c.Id_categoria,c.Descripcion_categoria FROM subcategorias s JOIN categorias c ON s.Id_categoria = c.Id_Categoria';
    con.query(query, (err, result, fileds) => {
        if(err){
            next(err);
        } else {
            res.status(200).json(result);
        }
    });
    
});

router.get('/get_marcas', (req, res, next) => {
    var query = 'SELECT * FROM marcas;';
 con.query(query,(err,result,fields) => {
     if(err){
         next(err);
     }else {
         res.status(200).json(result);

     }
    });

});

//Consultar un modelo en particular 

router.get('/get_modelo', (req, res, next) => {
    var query = "select a.Id_modelo, a.Descripcion_modelo, b.Id_marca, b.Nombre_marca, c.Id_subcategoria, c.Descripcion_subcategoria, d.Id_categoria, d.Descripcion_categoria from modelos a inner join marcas b on a.Id_marca = b.Id_marca inner join subcategorias c on a.Id_subcategoria = c.Id_subcategoria inner join categorias d on c.Id_categoria = d.Id_categoria where a.Descripcion_modelo like " + "'%"+req.body.Busqueda+"%'" + "or b.Nombre_marca like" + "'%"+req.body.Busqueda+"%'" + "or c.Descripcion_subcategoria like " + "'%"+req.body.Busqueda+"%'" + "or d.Descripcion_categoria like " + "'%"+req.body.Busqueda+"%'";
 con.query(query,(err,result,fields) => {
     if(err){
         next(err);
     }else {
         res.status(200).json(result);
     }
    });

});

//Insertar un nuevo modelo

router.post('/insert_modelo', (req, res, next) => {
    var query = 'insert into modelos(Descripcion_modelo,Id_marca, Id_subcategoria)';
    query= query + ' values(?,?,?)';

    var values = [
        req.body.Descripcion_modelo,
        req.body.Id_marca,
        req.body.Id_subcategoria
    	];

 con.query(query,values,(err,result,fields) => {
     if(err){
         next(err);
     }else {
         res.status(200).json(result);
     }
    });

});

//Actualizar un modelo

router.put('/update_modelo', (req, res, next) => {
    var query = 'update modelos set Descripcion_modelo = ?, Id_marca = ?, Id_subcategoria = ? ';
    query= query + 'where Id_modelo = ?';

    var values = [req.body.Descripcion_modelo,
        req.body.Id_marca,
        req.body.Id_subcategoria,
    req.body.Id_modelo];

 con.query(query,values,(err,result,fields) => {
     if(err){
         next(err);
     }else {
         res.status(200).json(result);
     }
    });

});

/*---------------------------------MANTENIMIENTO EMPLEADOS----------------------------------*/

//consultar todos los empleados

router.get('/get_empleados', (req, res, next) => {
    var query = 'SELECT em.Id_empleado, em.Identidad, em.Nombre,em.Apellido,em.Telefono,em.Email,em.Direccion,em.Salario,em.LoginID,em.Contrasenia,em.Fecha_nacimiento,em.Fecha_contratacion,em.Fecha_despido,e.Id_estatus,e.Descripcion_estatus,p.Id_puesto,p.Descripcion_puesto FROM empleados em JOIN estatus e ON e.Id_estatus = em.Id_estatus JOIN puestos p ON em.Id_puesto = p.Id_puesto;';
    con.query(query, (err, result, fields) => {
    	if(err) {
    		next(err);
    	}else {
    		res.status(200).json(result);
    	}
    });
});

//Consultar un empleado
router.get('/get_empleado', (req, res, next) => {
	var query="SELECT em.Id_empleado, em.Identidad, em.Nombre,em.Apellido,em.Telefono,em.Email,em.Direccion,em.Salario,em.LoginID,em.Contrasenia,em.Fecha_nacimiento,em.Fecha_contratacion,em.Fecha_despido,e.Id_estatus,e.Descripcion_estatus,p.Id_puesto,p.Descripcion_puesto FROM empleados em JOIN estatus e ON e.Id_estatus = em.Id_estatus JOIN puestos p ON em.Id_puesto = p.Id_puesto where em.Nombre like " + "'%"+req.body.Busqueda+"%'"  + "or em.Identidad like " + "'%"+req.body.Busqueda+"%'" + "or em.Apellido like " + "'%"+req.body.Busqueda+"%'"+ "or em.Email like " + "'%"+req.body.Busqueda+"%'"+ "or em.Direccion like " + "'%"+req.body.Busqueda+"%'";
	 con.query(query,(err,result,fields) => {
		 if(err){
			 next(err);
		 }else {
			 res.status(200).json(result);
		 }
		});
	
	});

//Insertar nuevo empleado

router.post('/insert_empleados', (req, res, next) => {
    /*var query = 'insert into empleados (Identidad, Nombre, Apellido, Telefono, Email, Direccion, Salario, LoginID, Contrasenia, Fecha_nacimiento, Fecha_contratacion, Fecha_despido, Id_puesto, Id_estatus) ';
    	query= query + 'values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)';*/
    
    var emp = {Identidad: req.body.Identidad,
    			Nombre: req.body.Nombre, 
    			Apellido: req.body.Apellido, 
    			Telefono: req.body.Telefono, 
    			Email: req.body.Email, 
    			Direccion: req.body.Direccion, 
    			Salario: req.body.Salario, 
    			LoginID: req.body.LoginID, 
    			Contrasenia: req.body.Contrasenia, 
    			Fecha_nacimiento: req.body.Fecha_nacimiento, 
    			Fecha_contratacion: req.body.Fecha_contratacion, 
    			Fecha_despido: req.body.Fecha_despido, 
    			Id_puesto: req.body.Id_puesto, 
    			Id_estatus: req.body.Id_estatus
	};
	const create_empleado = (emp) => {
		var query = 'insert into empleados (Identidad, Nombre, Apellido, Telefono, Email, Direccion, Salario, LoginID, Contrasenia, Fecha_nacimiento, Fecha_contratacion, Fecha_despido, Id_puesto, Id_estatus) values (?)';
		con.query(query, [Object.values(emp)], (err, result, fields) => {
			if(err) {
				console.log(err);
				res.status(500).send();
			}else {
				res.status(200).send();
			}
		});
	};

	bcrypt.hash(emp.Contrasenia, 10).then((hashedPassword) => {
		emp.Contrasenia = hashedPassword;
		create_empleado(emp);
	});
});


//Actualizar Empleado

router.put('/update_empleados', (req, res, next) => {
    var query = 'update empleados set Identidad=?, Nombre=?, Apellido=?, Telefono=?, Email=?, Direccion=?, Salario=?, LoginID=?, Contrasenia=?, Fecha_nacimiento=?, Fecha_contratacion=?, Fecha_despido=?, Id_puesto=?, Id_estatus=? ';
    	query= query + 'where Id_empleado=?';
    
    var values=[
    			req.body.Identidad,
    			req.body.Nombre, 
    			req.body.Apellido, 
    			req.body.Telefono, 
    			req.body.Email, 
    			req.body.Direccion, 
    			req.body.Salario, 
    			req.body.LoginID, 
    			req.body.Contrasenia, 
    			req.body.Fecha_nacimiento, 
    			req.body.Fecha_contratacion, 
    			req.body.Fecha_despido, 
    			req.body.Id_puesto, 
    			req.body.Id_estatus,
    			req.body.Id_empleado
    ];

    con.query(query, values, (err, result, fields) => {
    	if(err) {
    		next(err);
    	}else {
    		res.status(200).json(result);
    	}
    });
});

// Consultar estados.

router.get('/get_estatus', (req, res, next) => {
    var query = 'SELECT * FROM estatus LIMIT 2;';
    con.query(query, (err, result, fields) => {
    	if(err) {
    		next(err);
    	}else {
    		res.status(200).json(result);
    	}
    });
});

// Consultar puestos.

router.get('/get_puestos', (req, res, next) => {
    var query = 'SELECT * FROM puestos;';
    con.query(query, (err, result, fields) => {
    	if(err) {
    		next(err);
    	}else {
    		res.status(200).json(result);
    	}
    });
});

/*---------------------------------MANTENIMIENTO COMPRAS----------------------------------*/

//Consultar todas compras
router.get('/get_compras', (req, res, next) => {
	var query = 'SELECT c.Id_compra, c.Fecha_orden, c.Fecha_recibida, c.Gastos_adicionales, c.Id_proveedor, p.Nombre_compania, c.Id_estatus, es.Descripcion_estatus FROM  compras c inner join proveedores p on c.Id_proveedor = p.Id_proveedor inner join estatus es on c.Id_estatus = es.Id_estatus where c.Id_estatus = 4';
	con.query(query, (err, result, fields) => {
		if(err) {
				next(err);
		} else {
				res.status(200).json(result);

		}
	});
   
});

//Consultar compras en estado pendiente de recibido
router.get('/get_compras_pendientes', (req, res, next) => {
	var query = 'SELECT c.Id_compra, c.Fecha_orden, c.Fecha_recibida, c.Gastos_adicionales, c.Id_proveedor, p.Nombre_compania, c.Id_estatus, es.Descripcion_estatus FROM  compras c inner join proveedores p on c.Id_proveedor = p.Id_proveedor inner join estatus es on c.Id_estatus = es.Id_estatus where c.Id_estatus = 3';
	con.query(query, (err, result, fields) => {
		if(err) {
				next(err);
		} else {
				res.status(200).json(result);

		}
	});
   
});


//Consultar una sola compra
router.get('/get_compra', (req, res, next) => {
	var query = "SELECT c.Id_compra, c.Fecha_orden, c.Fecha_recibida, c.Gastos_adicionales, c.Id_proveedor, p.Nombre_compania, c.Id_estatus, es.Descripcion_estatus FROM  compras c inner join proveedores p on c.Id_proveedor = p.Id_proveedor inner join estatus es on c.Id_estatus=es.Id_estatus where c.Id_compra = ? or p.Nombre_compania like  " +"'%"+ req.body.Busqueda+"%'" + "or es.Descripcion_estatus like "+"'%"+ req.body.Busqueda+"%'" ;
	var values = [req.body.Busqueda];
	
	con.query(query, values, (err, result, fields) => {
		if(err) {
				next(err);
		} else {
				res.status(200).json(result);

		}
	});
   
});

/* Consultar estatus de compras */
router.get('/get_estatus_compra', (req, res, next) => {
    var query = 'SELECT * FROM estatus where Id_estatus = 3 or Id_estatus = 4;';
    con.query(query, (err, result, fields) => {
    	if(err) {
    		next(err);
    	}else {
    		res.status(200).json(result);
    	}
    });
});



//Insertar nueva compra

//------------------------------------------------------HICE MODIFICACIONES AQUI-----------------------------------------------------
router.post('/insert_compras', (req, res, next) => {
    var query = 'insert into compras (Fecha_orden, Fecha_recibida, Gastos_adicionales, Id_proveedor, Id_estatus) ';
		query= query + 'values (?, ?, ?, ?, ?)';
	var FechaActual = new Date();

    var values=[
    			FechaActual, //Inserta la fecha actual sin que sea mandada del frontend
    			null, //FECHA RECIBIDA NULL ya que no se necesita al insertar la compra
    			req.body.Gastos_adicionales, 
    			req.body.Id_proveedor, 
    			req.body.Id_estatus	
    ];

    con.query(query, values, (err, result, fields) => {
    	if(err) {
    		next(err);
    	}else {
    		res.status(200).json(result);
    	}
    });
});


//Actualizar compra

router.put('/update_compra', (req, res, next) => {
    var query = 'update compras set  Fecha_recibida=?, Id_estatus=? ';
		query= query + 'where Id_compra=?';
	
	var FechaActual = new Date();
    
    var values=[ 
    			FechaActual, 
    			req.body.Id_estatus,
    			req.body.Id_compra
    ];

    con.query(query, values, (err, result, fields) => {
    	if(err) {
    		next(err);
    	}else {
    		res.status(200).json(result);
    	}
    });
});


/*---------------------------------MANTENIMIENTO DETALLE_COMPRAS----------------------------------*/

//---------------------------------------------------------------COMENTE ESTA API PORQUE USAMOS UNA NUEVA---------------------------------------------------------

router.post('/insert_detalle_compras',(req,res,next)=>{
	var query='set @codigo=(select max(Id_compra)  from compras); INSERT INTO detalle_compras (Id_compra, Id_producto, Precio_compra, Cantidad_ordenada, Cantidad_recibida, Cantidad_rechazada) VALUES (@codigo,?,?,?,?,?)';
	var values=[
		req.body.Id_producto,
		req.body.Precio_compra,
		req.body.Cantidad_ordenada,
		req.body.Cantidad_recibida,
		req.body.Cantidad_rechazada
	]

	con.query(query,values,(err,result,fields)=>{
		if(err){
			next(err);
		}else{
			res.status(200).json(result);
		}
	});
});

//Actualizar registro en detalle_compras

router.put('/update_detalle_compras', (req, res, next) => {
    var query = 'update detalle_compras set Cantidad_ordenada=?, Cantidad_recibida=?, Cantidad_rechazada=?';
    	query= query + ' where Id_compra=? and Id_producto = ?';
    
    var values=[
    			req.body.Cantidad_ordenada, 
    			req.body.Cantidad_recibida, 
    			req.body.Cantidad_rechazada,
    			req.body.Id_compra,
    			req.body.Id_producto
    ];

    con.query(query, values, (err, result, fields) => {
    	if(err) {
    		next(err);
    	}else {
    		res.status(200).json(result);
    	}
    });
});


//consultar todos los registros en detalle_compras

router.get('/get_detalle_compras', (req, res, next) => {
    var query = 'SELECT * FROM detalle_compras';
    con.query(query, (err, result, fields) => {
    	if(err) {
    		next(err);
    	}else {
    		res.status(200).json(result);
    	}
    });
});

//Consultar los productos de una compra
router.get('/get_productos_compra', (req, res, next) => {
	var query = 'select dc.Id_compra, dc.Id_producto, a.Descripcion_producto, a.Talla, a.Color, a.Stock, b.Descripcion_modelo, c.Nombre_marca, d.Descripcion_subcategoria, e.Descripcion_categoria, dc.Precio_compra, dc.Cantidad_ordenada, dc.Cantidad_recibida, dc.Cantidad_rechazada from detalle_compras dc inner join productos a on dc.Id_producto=a.Id_producto inner join modelos b on a.Id_modelo = b.Id_modelo inner join marcas c on b.Id_marca = c.Id_marca inner join subcategorias d on b.Id_subcategoria = d.Id_subcategoria inner join categorias e on d.Id_categoria = e.Id_categoria where dc.Id_compra = ?';
	var values = [req.query.Id_compra];
	
	con.query(query, values, (err, result, fields) => {
		if(err) {
				next(err);
		} else {
				res.status(200).json(result);

		}
	});
   
});

//consultar un registro en detalle_compras

router.get('/get_detalle_compras_buscar', (req, res, next) => {
    var query = 'SELECT * FROM detalle_compras where Id_compra = ? and Id_producto = ?';
    var values = [req.query.Id_compra,
    			  req.query.Id_producto];
 con.query(query,values,(err,result,fields) => {
     if(err){
         next(err);
     }else {
         res.status(200).json(result);
     }
    });

});



/*---------------------------------MANTENIMIENTO CIUDADES----------------------------------*/

// Consultar todas las ciudades.

router.get('/get_ciudades', (req, res, next) => {
    var query = 'SELECT	* FROM ciudades';
    con.query(query, (err, result, fields) => {
        if(err){
            next(err);
        }else{
            res.status(200).json(result);
        }
    });
});

router.post('/login', (req, res, next) =>{
	var user = {
		LoginID: req.body.LoginID,
		Contrasenia: req.body.Contrasenia
	};
	const get_token = (user) => {
		var query = "SELECT LoginID, Contrasenia FROM empleados WHERE LoginID = ?"
		con.query(query, [user.LoginID], (err, result, fields) => {
			if (err || result.lenght == 0){
				/*console.log(user.Contrasenia, result[0].Contrasenia);*/
				console.log(err);
				res.status(400).json({message: "Usuario o Contraseña Incorrectos"});
			} else {
				/*console.log(user.Contrasenia, result[1].Contrasenia);*/
				bcrypt.compare(user.Contrasenia, result[0].Contrasenia, (error, isMatch) => {
					if (isMatch){
						var token = jwt.sign({userID: result[0].LoginID}, secret_key);
						res.status(200).json({token});
					}else if(error){
						res.status(400).json(error);
					}else {
						res.status(400).json({message: "Usuario o Contraña Incorrectos"});
					}
				});
			}
		});
	}
	get_token(user);
});	

/*---------------------------------MANTENIMIENTO TIPOS DE PAGO----------------------------------*/

// Consultar todos los tipos de pago.

router.get('/get_tipos', (req, res, next) => {
    var query = 'select * from tipo_pago';
    con.query(query, (err, result, fields) => {
        if(err){
            next(err);
        }else{
            res.status(200).json(result);
        }
    });
});

/*---------------------------------MANTENIMIENTO PLAZOS DE PAGO----------------------------------*/

// Consultar todos los tipos de pago.

router.get('/get_plazos', (req, res, next) => {
    var query = 'select * from plazos_pago';
    con.query(query, (err, result, fields) => {
        if(err){
            next(err);
        }else{
            res.status(200).json(result);
        }
    });
});

//CONSULTA VENTAS PENDIENTES DE ENVIO
router.get('/get_ventas_pendientes_envio', (req, res, next) => {
	var query = "select v.Id_venta, v.Fecha_venta, SUM(dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta)) as Subtotal, SUM(dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta)) * tc.Descuento_cliente as Descuento, ((SUM(dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta))) - (SUM(dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta)) * tc.Descuento_cliente)) * v.Isv as Isv, ((SUM(dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta))) -  (SUM(dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta)) * tc.Descuento_cliente) + (((SUM(dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta))) - (SUM(dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta)) * tc.Descuento_cliente)) * v.Isv)) as Total, c.Nombre_compania, dep.Nombre_departamento, ciu.Nombre_ciudad, c.Direccion ,c.Nombre_contacto, c.Apellido_contacto, c.Telefono_contacto, c.Email_contacto, es.Descripcion_estatus from ventas v join detalle_ventas dv on v.Id_venta = dv.Id_venta  join clientes c on v.Id_cliente = c.Id_cliente  join tipo_cliente tc on c.Id_tipo_cliente = tc.Id_tipo_cliente join ciudades ciu on c.Id_ciudad=ciu.Id_ciudad join departamentos dep on ciu.Id_departamento= dep.Id_departamento join estatus es on v.Id_estado_pago=es.Id_estatus where v.Id_estado_pago in (5,6) and v.Id_estado_envio = 8 group by v.Id_venta";

//	var values = [req.query.Id_estatus ];
	con.query(query, (err, result, fields) => {
		if(err) {
				next(err);
		} else {
				res.status(200).json(result);

		}
	});
   
});

//CONSULTA DE DOS UNICOS ESTADOS PARA LOS PENDIENTES DE ENVIO
router.get('/get_unicos_estados', (req, res, next) => {
	var query = "select * from estatus where Id_estatus >=8";
	
	con.query(query, (err, result, fields) => {
		if(err) {
				next(err);
		} else {
				res.status(200).json(result);

		}
	});
   
});

//ACTUALIZAR FECHAS EN VENTAS PENDIENTES DE ENVIO
router.put('/update_ventas_pendientes_envio', (req, res, next) => {
	var query = 'update ventas set Id_estado_envio=?, Fecha_envio = ?, Fecha_entrega= ? ';
	    query = query  + 'where Id_venta=?';
	
	var values = [
				  req.body.Id_estado_envio,
				  req.body.Fecha_envio,
				  req.body.Fecha_entrega,
				  req.body.Id_venta
	];

	
	con.query(query, values, (err, result, fields) => {
		if(err) {
				next(err);
		} else {
				res.status(200).json(result);
		}
	});
   
});
//CONSULTA DE VENTAS_PAGADAS

router.get('/get_ventas_pagadas', (req, res, next) => {
	var query = "select v.Id_venta, v.Fecha_venta, v.Fecha_envio, v.Fecha_entrega , SUM(dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta)) as Subtotal, SUM(dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta)) *if(tc.Descuento_cliente is NULL, 0, tc.Descuento_cliente) as Descuento, ((SUM(dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta))) - (SUM(dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta)) * if(tc.Descuento_cliente is NULL, 0, tc.Descuento_cliente))) * v.Isv as Isv, ((SUM(dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta))) -  (SUM(dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta)) * if(tc.Descuento_cliente is NULL, 0, tc.Descuento_cliente)) + (((SUM(dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta))) - (SUM(dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta)) * if(tc.Descuento_cliente is NULL, 0, tc.Descuento_cliente))) * v.Isv)) as Total, v.Identidad, c.Nombre_compania, c.Nombre_contacto, c.Apellido_contacto, c.Telefono_contacto, c.Email_contacto, es.Descripcion_estatus from ventas v  join detalle_ventas dv on v.Id_venta = dv.Id_venta  left join clientes c on v.Id_cliente = c.Id_cliente  left join tipo_cliente tc on c.Id_tipo_cliente = tc.Id_tipo_cliente join estatus es on v.Id_estado_envio=es.Id_estatus where v.Id_estado_pago = 5  and v.Id_estado_envio in(9,10) group by v.Id_venta";
	con.query(query, (err, result, fields) => {
		if(err) {
				next(err);
		} else {
				res.status(200).json(result);

		}
	}); 
   
});

//UNA SOLA VENTA PAGADA

router.get('/get_venta_pagada', (req, res, next) => {
	var query = "select v.Id_venta, v.Cod_factura, v.Fecha_venta, v.Fecha_envio, v.Fecha_entrega, (dv.Precio_venta * dv.Cantidad_vendida) Subtotal, v.ISV, ((dv.Precio_venta*dv.Cantidad_vendida)-v.ISV) Total, v.Id_cliente, c.Nombre_compania, c.Nombre_contacto,  c.Apellido_contacto, c.Telefono_contacto, c.Email_contacto from ventas v join detalle_ventas dv on v.Id_venta=dv.Id_venta join clientes c  on v.Id_cliente=c.Id_cliente ";
		query = query  + 'where Id_estatus=?';

	var values = [req.query.Id_estatus ];
	
	con.query(query, values, (err, result, fields) => {
		if(err) {
				next(err);
		} else {
				res.status(200).json(result);

		}
	});
   
});

//Obtener los estados de envio

router.get('/get_estados_envio', (req, res, next) => {
	var query = "select * from estatus where Id_estatus = 8 or Id_estatus = 10"
	
	con.query(query, (err, result, fields) => {
		if(err) {
				next(err);
		} else {
				res.status(200).json(result);
		}
	});
});

//Obtener los clientes filtrados por tipode cliente

router.get('/get_clientes_filtrados', (req, res, next) => {
	var query = 'select a.Id_cliente, a.Nombre_compania, a.Nombre_contacto, a.Apellido_contacto, a.Telefono_contacto, a.Email_contacto, c.Id_tipo_cliente, c.Descripcion_cliente, c.Descuento_cliente, a.Direccion, b.Id_ciudad, b.Nombre_ciudad, d.Id_departamento, d.Nombre_departamento from clientes a inner join ciudades b on a.Id_ciudad = b.Id_ciudad inner join tipo_cliente c on a.Id_tipo_cliente = c.Id_tipo_cliente inner join departamentos d on b.Id_departamento = d.Id_departamento where Estado_logico = 1 and a.Id_tipo_cliente = ?';
	var values = [req.query.Id_tipo_cliente];
    con.query(query, values, (err, result, fields) => {
        if(err) {
            next(err);
        }else {
            res.status(200).json(result);
        }
    })
});


router.put('/restar_producto_inventario', (req, res, next) => {
	var query = 'update productos set Stock = Stock - ? where Id_producto = ? ';

	var values = [
				  req.body.Cantidad,
				  req.body.Id_producto,
	];
	
	con.query(query, values, (err, result, fields) => {
		if(err) {
				next(err);
		} else {
				res.status(200).json(result);

		}
	});
});

router.put('/agregar_producto_inventario', (req, res, next) => {
	var query = 'update productos set Stock = Stock + ? where Id_producto = ? ';

	var values = [
				  req.body.Cantidad,
				  req.body.Id_producto,
	];
	
	con.query(query, values, (err, result, fields) => {
		if(err) {
				next(err);
		} else {
				res.status(200).json(result);

		}
	});
});

//Obtener las ventas pendientes de cobro

router.get('/get_ventas_pendientes_cobro', (req, res, next) => {

		var query = "select v.Id_venta, v.Fecha_venta, p.Descripcion_plazo, v.Fecha_envio, v.Fecha_entrega, c.Nombre_compania, "
		+ "c.Nombre_contacto, c.Apellido_contacto, c.Telefono_contacto, c.Email_contacto, "
		+ "SUM(Distinct dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta)) as Subtotal, "
		+ "SUM(Distinct dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta)) * tc.Descuento_cliente as Descuento, "
		+ "((SUM(Distinct dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta))) - (SUM(Distinct dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta)) * tc.Descuento_cliente)) * v.Isv as Isv, "
		+ "((SUM(Distinct dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta))) -  (SUM(Distinct dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta)) * tc.Descuento_cliente) + (((SUM(Distinct dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta))) - (SUM(Distinct dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta)) * tc.Descuento_cliente)) * v.Isv)) as Total, "
		+ "SUM(cpc.Abono) as Cantidad_abonada, "
		+ "e.Descripcion_estatus as Estado "
		+ "from ventas v "
		+ "inner join plazos_pago p on v.Id_plazo = p.Id_plazo "
		+ "inner join estatus e on v.Id_estado_envio = e.Id_estatus "
		+ "inner join detalle_ventas dv on v.Id_venta = dv.Id_venta " 
		+ "inner join clientes c on v.Id_cliente = c.Id_cliente " 
		+ "inner join tipo_cliente tc on c.Id_tipo_cliente = tc.Id_tipo_cliente " 
		+ "left join cuentas_por_cobrar cpc on v.Id_venta = cpc.Id_venta "
		+ "where v.Id_estado_pago = 6 and v.Id_estado_envio in (9,10) "
		+ "group by v.Id_venta "
		+ "order by Fecha_venta asc"
		

	con.query(query, (err, result, fields) => {
		if(err) {
				next(err);
		} else {
				res.status(200).json(result);

		}
	});
   
});

router.get('/get_ventas_incobrables', (req, res, next) => {

	var query = "select v.Id_venta, v.Fecha_venta, p.Descripcion_plazo, v.Fecha_envio, v.Fecha_entrega, c.Nombre_compania, "
	+ "c.Nombre_contacto, c.Apellido_contacto, c.Telefono_contacto, c.Email_contacto, "
	+ "SUM(Distinct dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta)) as Subtotal, "
	+ "SUM(Distinct dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta)) * tc.Descuento_cliente as Descuento, "
	+ "((SUM(Distinct dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta))) - (SUM(Distinct dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta)) * tc.Descuento_cliente)) * v.Isv as Isv, "
	+ "((SUM(Distinct dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta))) -  (SUM(Distinct dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta)) * tc.Descuento_cliente) + (((SUM(Distinct dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta))) - (SUM(Distinct dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta)) * tc.Descuento_cliente)) * v.Isv)) as Total, "
	+ "SUM(cpc.Abono) as Cantidad_abonada, "
	+ "e.Descripcion_estatus as Estado "
	+ "from ventas v "
	+ "inner join plazos_pago p on v.Id_plazo = p.Id_plazo "
	+ "inner join estatus e on v.Id_estado_envio = e.Id_estatus "
	+ "inner join detalle_ventas dv on v.Id_venta = dv.Id_venta " 
	+ "inner join clientes c on v.Id_cliente = c.Id_cliente " 
	+ "inner join tipo_cliente tc on c.Id_tipo_cliente = tc.Id_tipo_cliente " 
	+ "left join cuentas_por_cobrar cpc on v.Id_venta = cpc.Id_venta "
	+ "where v.Id_estado_pago = 7 and v.Id_estado_envio in (9,10) "
	+ "group by v.Id_venta "
	+ "order by Fecha_venta asc"
	

con.query(query, (err, result, fields) => {
	if(err) {
			next(err);
	} else {
			res.status(200).json(result);

	}
});

});

//Obtener el estado de incobrable para ventas pendientes de cobro

router.get('/get_estado_incobrable', (req, res, next) => {
	var query = "select * from estatus where Id_estatus = 7"
	
	con.query(query, (err, result, fields) => {
		if(err) {
				next(err);
		} else {
				res.status(200).json(result);
		}
	});
});

router.post('/insert_abono_venta', (req, res, next) => {
    var query = 'insert into cuentas_por_cobrar (Abono, Id_venta)';
    	query = query + 'values (?, ?)';
    
	var values = [
					req.body.Abono, 
					req.body.Id_venta
				];

    con.query(query, values, (err, result, fields) => {
    	if(err) {
    		next(err);
    	}else {
    		res.status(200).json(result);
    	}
    });
});



router.post('/insert_venta_normal', (req, res, next) => {
	var query = 'INSERT INTO ventas (Fecha_venta,Identidad, ISV,Id_estado_envio,Id_estado_pago,Id_tipo_pago) ';
	var fechaAc = new Date();
	query = query  + 'values (?,?,?,?,?,?)';
	
			var values = [
						fechaAc,
						req.body.Identidad,
						req.body.ISV,
						req.body.Id_estado_envio,
						req.body.Id_estado_pago,
						req.body.Id_tipo_pago,
		]
		con.query(query,values,(err,result,fields)=>{
			if(err){
				next(err);
			}else{
				res.status(200).json(result);
			}
});
});

router.post('/insert_detalle_venta_normal',(req,res,next)=>{
	var query='set @codigo = (select max(Id_venta) from ventas); INSERT INTO detalle_ventas (Id_venta, Id_producto, Precio_venta, Cantidad_vendida,Cantidad_devuelta) VALUES (@codigo,?,?,?,?)';
	var values=[
		req.body.Id_producto,
		req.body.Precio_referencial_venta,
		req.body.Cantidad_vendida,
		0
	]
	
	con.query(query,values,(err,result,fields)=>{
		if(err){
			next(err);
		}else{
			res.status(200).json(result);
		}
	});
});


router.get('/get_devoluciones_venta', (req, res, next) => {
	var query = "select v.Id_venta,c.Nombre_contacto,v.Fecha_venta, c.Nombre_compania, "
	+"SUM(Distinct dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta)) as Subtotal, "
	+"SUM(Distinct dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta)) * tc.Descuento_cliente as Descuento, "
	+"((SUM(Distinct dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta))) - (SUM(Distinct dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta)) * tc.Descuento_cliente)) * v.Isv as Impuesto, "
	+"((SUM(Distinct dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta))) -  (SUM(Distinct dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta)) * tc.Descuento_cliente) + (((SUM(Distinct dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta))) - (SUM(Distinct dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta)) * tc.Descuento_cliente)) * v.Isv)) as Total "
	+"from ventas v "
	+"JOIN detalle_ventas dv ON v.Id_venta = dv.Id_venta "
	+"JOIN clientes c ON v.Id_cliente = c.Id_cliente "
	+"JOIN tipo_cliente tc ON c.Id_tipo_cliente = tc.Id_tipo_cliente "
	+"WHERE v.Fecha_venta between DATE_SUB(NOW(), INTERVAL 1 MONTH) and now() " 
	+"group by v.Id_venta";
	
	var values = [req.query.Id_venta,
				  req.query.Id_producto];
	
	con.query(query, values, (err, result, fields) => {
		if(err) {
				next(err);
		} else {
				res.status(200).json(result);

		}
	});
   
});


router.get('/get_devolucion_productos', (req, res, next) => {
	var query = "select p.Id_producto, s.Descripcion_subcategoria,ma.Nombre_marca,m.Descripcion_modelo, "+
	"p.Talla,p.Color,p.Precio_referencial_venta,dv.Cantidad_vendida,dv.Cantidad_devuelta,p.Descripcion_producto "+
	"from productos p "+
	"JOIN modelos m "+
	"ON p.Id_modelo=m.Id_modelo "+
	"JOIN subcategorias s "+
	"ON m.Id_subcategoria= s.Id_subcategoria "+
	"JOIN marcas ma "+
	"ON m.Id_marca= ma.Id_marca "+
	"JOIN detalle_ventas dv "+
	"ON p.Id_producto= dv.Id_producto "+
	"WHERE dv.Id_venta = ? "

	var values = [req.query.Id_venta];

	
	con.query(query,values, (err, result, fields) => {
		if(err) {
				next(err);
		} else {
				res.status(200).json(result);

		}
	});
   
});

router.put('/update_devoluciones', (req, res, next) => {
    var query = 'UPDATE detalle_ventas SET Cantidad_devuelta = ? ';
    query= query + 'WHERE Id_venta = ? AND Id_producto = ?';

    var values = [req.body.Cantidad_devuelta,
        req.body.Id_venta,
        req.body.Id_producto];

 con.query(query,values,(err,result,fields) => {
     if(err){
         next(err);
     }else {
         res.status(200).json(result);
     }
    });

});


module.exports = router;