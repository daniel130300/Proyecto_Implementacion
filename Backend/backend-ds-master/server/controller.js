const express = require('express');
const router = express.Router();
const http = require('http');
var mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret_key = process.env.SECRET_KEY || "prew";


var con = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Daniel100",
    database: 'variedades_kyd',
    insecureAuth: true,
    multipleStatements: true
});

router.post('/insert_proveedor', (req, res, next) => {
	var query = 'insert into proveedores (Nombre_compania, Direccion, Id_ciudad, Nombre_contacto, Apellido_contacto, Telefono_contacto, Email_contacto)';
	    query = query  + 'values (?,?,?,?,?,?,?)';	
	var values = [req.body.nombre_compania,
				  req.body.direccion,
				  req.body.id_ciudad,
				  req.body.nombre_contacto,
				  req.body.apellido_contacto,
				  req.body.telefono_contacto,
				  req.body.email_contacto];	
	con.query(query, values, (err, result, fields) => {
		if(err) {
				next(err);
		} else {
				res.status(200).json(result);
		}
	});
   
});

router.put('/update_proveedor', (req, res, next) => {
	var query = 'update proveedores set Nombre_compania = ?, Direccion = ?, Id_ciudad = ?, Nombre_contacto = ?, Apellido_contacto = ?, Telefono_contacto = ?, Email_contacto = ?';
	    query = query  + ' where Id_proveedor = ?';
	
	var values = [
				  req.body.nombre_compania,
				  req.body.direccion,
				  req.body.id_ciudad,
				  req.body.nombre_contacto,
				  req.body.apellido_contacto,
				  req.body.telefono_contacto,
				  req.body.email_contacto,
				  req.body.id_proveedor];

	con.query(query, values, (err, result, fields) => {
		if(err) {
			next(err);
		} else {
			res.status(200).json(result);
		}
	});
   
});


router.delete('/delete_proveedor', (req, res, next) => {
	var query = 'update proveedores set Estado_logico = 0 where Id_proveedor = ?';
	
	var values = [req.query.id_proveedor];

	con.query(query, values, (err, result, fields) => {
		if(err) {
			next(err);
		} else {
			res.status(200).json(result);
		}
	});
   
});

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

router.post('/insert_ciudad', (req, res, next) => {
    var query = 'INSERT INTO ciudades (Nombre_ciudad, Id_departamento) VALUES (?, ?)';
    
    var values = [
        req.body.nombre_ciudad,
        req.body.id_departamento
    ];

    con.query(query, values, (err, result, fields) => {
        if(err){
            next(err);
        } else{
            res.status(200).json(result);
        }
    });
});

router.put('/update_ciudad', (req, res, next) => {
    var query = 'UPDATE ciudades SET Nombre_ciudad = ?, Id_departamento = ? WHERE Id_ciudad = ?';
    
    var values = [
        req.body.nombre_ciudad,
        req.body.id_departamento,
        req.body.id_ciudad
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

router.post('/insert_cliente', (req, res, next) => {
    var query = 'INSERT INTO clientes (Nombre_compania, Id_ciudad, Id_tipo_cliente, Direccion, Nombre_contacto, Apellido_contacto, Telefono_contacto, Email_contacto) ';
        query = query + 'values (?, ?, ?, ?, ?, ?, ?, ?)';

    var values = [req.body.nombre_compania,
        req.body.id_ciudad,
        req.body.id_tipo_cliente,
        req.body.direccion,
        req.body.nombre_contacto,
        req.body.apellido_contacto,
        req.body.telefono_contacto,
        req.body.email_contacto
    ];
    
    con.query(query, values, (err, result, fields) => {
        if(err) {
            next(err);
        }else {
            res.status(200).json(result);
        }
    })
    
});

router.put('/update_cliente', (req, res, next) => {
    var query = 'UPDATE clientes SET Nombre_compania = ?, Id_ciudad = ?, Id_tipo_cliente = ?, Direccion = ?, Nombre_contacto = ?, Apellido_contacto = ?, Telefono_contacto = ?, Email_contacto = ?';
        query = query + 'WHERE Id_cliente = ?';

        var values = [req.body.nombre_compania,
            req.body.id_ciudad,
            req.body.id_tipo_cliente,
            req.body.direccion,
            req.body.nombre_contacto,
            req.body.apellido_contacto,
            req.body.telefono_contacto,
            req.body.email_contacto,
            req.body.id_cliente
        ];
    
    con.query(query, values, (err, result, fields) => {
        if(err) {
            next(err);
        }else {
            res.status(200).json(result);
        }
    })
    
});

router.delete('/delete_cliente', (req, res, next) => {
    var query = 'update clientes set Estado_logico = 0 where Id_cliente = ?';
    var values = [req.query.id_cliente];

    con.query(query, values, (err, result, fields) => {
        if(err) {
            next(err);
        }else {
            res.status(200).json(result);
        }
    })
});

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

router.get('/get_productos', (req, res, next) => {
	var query= 'select a.Id_producto, a.Descripcion_producto, a.Talla, a.Color, a.Stock, a.Precio_referencial_venta, a.Precio_referencial_compra, a.Punto_reorden, b.Id_modelo, b.Descripcion_modelo, c.Id_marca, c.Nombre_marca, d.Id_subcategoria, d.Descripcion_subcategoria, e.Id_categoria, e.Descripcion_categoria, g.Id_proveedor, g.Nombre_compania from productos a inner join modelos b on a.Id_modelo = b.Id_modelo inner join marcas c on b.Id_marca = c.Id_marca inner join subcategorias d on b.Id_subcategoria = d.Id_subcategoria inner join categorias e on d.Id_categoria = e.Id_categoria inner join productos_proveedores f on a.Id_producto = f.Id_producto inner join proveedores g on f.Id_proveedor = g.Id_proveedor where a.Estado_logico = 1 order by a.Id_producto desc';
    con.query(query, (err, result, fields) => {
        if(err){
            next(err);
        }else{
            res.status(200).json(result);
        }
    });
});

router.post ('/Insert_productos', (req, res, next) => {
    var query = 'insert into productos (Descripcion_producto, Talla, Color, Stock, Precio_referencial_venta, Precio_referencial_compra, Punto_reorden, Id_modelo)';
        query=query+ 'values (?,?,?,?,?,?,?,?)';
    var values=[
        req.body.descripcion_producto,
        req.body.talla,
        req.body.color,
        req.body.stock,
        req.body.precio_referencial_venta,
        req.body.precio_referencial_compra,
        req.body.punto_reorden,
        req.body.id_modelo
    ];
    con.query(query, values, (err, result, fields) => {
        if(err){
            next(err);
        }else{
            res.status(200).json(result);
        }
    });
});

router.put ('/update_productos', (req, res, next) => {
    var query = 'update productos set Descripcion_producto = ?, Talla = ? , Color = ?, Stock = ?, Precio_referencial_venta = ?, Precio_referencial_compra = ?, Punto_reorden = ?, Id_modelo = ?';
        query = query + ' where Id_producto = ?';
    var values=[
        req.body.descripcion_producto,
        req.body.talla,
        req.body.color,
        req.body.stock,
        req.body.precio_referencial_venta,
        req.body.precio_referencial_compra,
        req.body.punto_reorden,
        req.body.id_modelo,
        req.body.id_producto
    ];
    con.query(query, values, (err, result, fields) => {
        if(err){
            next(err);
        }else{
            res.status(200).json(result);
        }
    });
});

router.delete('/delete_productos', (req, res, next) => {
    var query= 'update productos set Estado_logico = 0 where Id_producto = ?';
   var values=[req.query.id_producto];
    con.query(query, values, (err, result, fields) => {
        if(err){
            next(err);
        }else{
            res.status(200).json(result);
        }
    });
});

router.get('/get_modelo_filtrado', (req, res, next) => {
	var query= 'select a.Id_modelo, a.Descripcion_modelo from modelos a where a.Id_marca=? and a.Id_subcategoria=?';
		var values = [req.query.id_marca,
			req.query.id_subcategoria];
    con.query(query, values, (err, result, fields) => {
        if(err){
            next(err);
        }else{
            res.status(200).json(result);
        }
    });
});

router.post('/insert_productos_proveedores',(req,res,next)=>{
	var query='set @codigo=(select max(Id_producto) from productos); INSERT INTO productos_proveedores (Id_producto, Id_proveedor) VALUES (@codigo,?)';
	var values=[req.body.id_proveedor]
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
					req.body.id_proveedor,
					req.body.id_producto
				];

	con.query(query, values, (err, result, fields) => {
		if(err) {
			next(err);
		} else {
			res.status(200).json(result);
		}
	});
});

router.get('/get_subcategoria_filtrado', (req, res, next) => {
	var query= 'select a.Id_subcategoria, a.Descripcion_subcategoria from subcategorias a inner join categorias b on a.Id_categoria=b.Id_categoria where b.Id_categoria = ?';
		var values = [req.query.id_categoria];
    con.query(query, values, (err, result, fields) => {
        if(err){
            next(err);
        }else{
            res.status(200).json(result);
        }
    });
});

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

router.post ('/Insert_venta_plus', (req, res, next) => {
	var query = 'insert into ventas (Fecha_venta, ISV, Id_cliente, Id_estado_envio, Id_estado_pago, Id_tipo_pago, Id_plazo) ';
	var FechaActual = new Date();
        query=query+ 'values (?,?,?,?,?,?,?)';
    var values=[
    	FechaActual,
        req.body.isv,
        req.body.id_cliente,
        req.body.id_estado_envio,
		req.body.id_estado_pago,
		req.body.id_tipo_pago,   
        req.body.id_plazo
    ];
    con.query(query, values, (err, result, fields) => {
        if(err){
            next(err);
        }else{
            res.status(200).json(result);
        }
    });
});

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

router.post('/insert_detalle_venta',(req,res,next)=>{
	var query='set @codigo = (select max(Id_venta) from ventas); INSERT INTO detalle_ventas (Id_venta, Id_producto, Precio_venta, Cantidad_vendida, Cantidad_devuelta) VALUES (@codigo,?,?,?,?)';
	var values=[
		req.body.id_producto,
		req.body.precio_referencial_venta,
		req.body.cantidad_vendida,
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

router.get('/get_id_venta', (req, res, next) => {
    var query = 'select max(Id_venta) Id_venta from ventas';
    con.query(query, (err, result, fileds) => {
        if(err){
            next(err);
        } else {
            res.status(200).json(result);
        }
    });
    
});

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

router.post('/insert_categoria', (req, res, next) => {
	var query = 'insert into categorias (Descripcion_categoria)';
	    query = query  + 'values (?)';
	
	var values = [req.body.descripcion_categoria];

	
	con.query(query, values, (err, result, fields) => {
		if(err) {
				next(err);
		} else {
				res.status(200).json(result);

		}
	});
   
});

router.put('/update_categoria', (req, res, next) => {
	var query = 'update categorias set Descripcion_categoria = ?';
	    query = query  + ' where Id_categoria = ?';
	
	var values = [
				  req.body.descripcion_categoria,
				  req.body.id_categoria
	            ];

	
	con.query(query, values, (err, result, fields) => {
		if(err) {
				next(err);
		} else {
				res.status(200).json(result);

		}
	});
   
});

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

router.post('/insert_subcategoria', (req, res, next) => {
    var query = 'insert into subcategorias (Descripcion_subcategoria, Id_categoria)';
        query = query  + 'values (?,?)';
    
    var values = [
                  req.body.descripcion_subcategoria,
                  req.body.id_categoria
                ];

    
    con.query(query, values, (err, result, fields) => {
        if(err) {
                next(err);
        } else {
                res.status(200).json(result);

        }
    });
   
});

router.put('/update_subcategoria', (req, res, next) => {
    var query = 'update subcategorias set Descripcion_subcategoria = ?, Id_categoria = ?';
        query = query  + ' where Id_subcategoria = ?';
    
    var values = [
                  req.body.descripcion_subcategoria,
                  req.body.id_categoria,
                  req.body.id_subcategoria
                ];

    
    con.query(query, values, (err, result, fields) => {
        if(err) {
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

router.post('/insert_marca', (req, res, next) => {
    var query = 'insert into marcas (Nombre_marca)';
    query= query + ' values(?)';

    var values = [
        req.body.nombre];

 con.query(query,values,(err,result,fields) => {
     if(err){
         next(err);
     }else {
         res.status(200).json(result);
     }
    });

});

router.put('/update_marca', (req, res, next) => {
    var query = 'update marcas set Nombre_marca = ? ';
    query= query + 'where Id_marca = ?';

    var values = [req.body.nombre,
        req.body.id_marca];

 con.query(query,values,(err,result,fields) => {
     if(err){
         next(err);
     }else {
         res.status(200).json(result);
     }
    });

});

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

router.post('/insert_modelo', (req, res, next) => {
    var query = 'insert into modelos(Descripcion_modelo,Id_marca, Id_subcategoria)';
    query= query + ' values(?,?,?)';

    var values = [
        req.body.descripcion_modelo,
        req.body.id_marca,
        req.body.id_subcategoria
    	];

 con.query(query,values,(err,result,fields) => {
     if(err){
         next(err);
     }else {
         res.status(200).json(result);
     }
    });
});


router.put('/update_modelo', (req, res, next) => {
    var query = 'update modelos set Descripcion_modelo = ?, Id_marca = ?, Id_subcategoria = ? ';
    query= query + 'where Id_modelo = ?';

    var values = [req.body.descripcion_modelo,
        req.body.id_marca,
        req.body.id_subcategoria,
    	req.body.id_modelo];

 con.query(query,values,(err,result,fields) => {
     if(err){
         next(err);
     }else {
         res.status(200).json(result);
     }
    });

});

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

router.post('/insert_empleados', (req, res, next) => {
    
    var emp = {Identidad: req.body.identidad,
    			Nombre: req.body.nombre, 
    			Apellido: req.body.apellido, 
    			Telefono: req.body.telefono, 
    			Email: req.body.email, 
    			Direccion: req.body.direccion, 
    			Salario: req.body.salario, 
    			LoginID: req.body.loginid, 
    			Contrasenia: req.body.contrasenia, 
    			Fecha_nacimiento: req.body.fecha_nacimiento, 
    			Fecha_contratacion: req.body.fecha_contratacion, 
    			Fecha_despido: req.body.fecha_despido, 
    			Id_puesto: req.body.id_puesto, 
    			Id_estatus: req.body.id_estatus
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

router.put('/update_empleados', (req, res, next) => {
    var query = 'update empleados set Identidad=?, Nombre=?, Apellido=?, Telefono=?, Email=?, Direccion=?, Salario=?, LoginID=?, Contrasenia=?, Fecha_nacimiento=?, Fecha_contratacion=?, Fecha_despido=?, Id_puesto=?, Id_estatus=? ';
    	query= query + 'where Id_empleado=?';
    
    var values=[
    			req.body.identidad,
    			req.body.nombre, 
    			req.body.apellido, 
    			req.body.telefono, 
    			req.body.email, 
    			req.body.direccion, 
    			req.body.salario, 
    			req.body.loginid, 
    			req.body.contrasenia, 
    			req.body.fecha_nacimiento, 
    			req.body.fecha_contratacion, 
    			req.body.fecha_despido, 
    			req.body.id_puesto, 
    			req.body.id_estatus,
    			req.body.id_empleado
    ];

    con.query(query, values, (err, result, fields) => {
    	if(err) {
    		next(err);
    	}else {
    		res.status(200).json(result);
    	}
    });
});

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

router.get('/get_compras', (req, res, next) => {
	var query = 'SELECT c.Id_compra, c.Codigo_factura, c.Fecha_orden, c.Fecha_recibida, c.Gastos_adicionales, c.Id_proveedor, p.Nombre_compania, c.Id_estatus, es.Descripcion_estatus, (dc.Cantidad_ordenada*dc.Precio_compra)+c.Gastos_adicionales as Monto_total FROM  compras c inner join detalle_compras dc on c.Id_compra = dc.Id_compra join proveedores p on c.Id_proveedor = p.Id_proveedor inner join estatus es on c.Id_estatus = es.Id_estatus where c.Id_estatus = 4 group by c.Id_compra';
	con.query(query, (err, result, fields) => {
		if(err) {
				next(err);
		} else {
				res.status(200).json(result);

		}
	});
   
});

router.get('/get_compras_pendientes', (req, res, next) => {
	var query = 'SELECT c.Id_compra, c.Codigo_factura, c.Fecha_orden, c.Fecha_recibida, c.Gastos_adicionales, c.Id_proveedor, p.Nombre_compania, c.Id_estatus, es.Descripcion_estatus FROM  compras c inner join proveedores p on c.Id_proveedor = p.Id_proveedor inner join estatus es on c.Id_estatus = es.Id_estatus where c.Id_estatus = 3';
	con.query(query, (err, result, fields) => {
		if(err) {
				next(err);
		} else {
				res.status(200).json(result);

		}
	});
   
});

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

router.post('/insert_compras', (req, res, next) => {
    var query = 'insert into compras (Codigo_factura, Fecha_orden, Fecha_recibida, Gastos_adicionales, Id_proveedor, Id_estatus) ';
		query= query + 'values (?, ?, ?, ?, ?, ?)';
	var FechaActual = new Date();

    var values=[
				req.body.codigo_factura,	
    			FechaActual,
    			null,
    			req.body.gastos_adicionales, 
    			req.body.id_proveedor, 
    			req.body.id_estatus	
    ];

    con.query(query, values, (err, result, fields) => {
    	if(err) {
    		next(err);
    	}else {
    		res.status(200).json(result);
    	}
    });
});

router.put('/update_compra', (req, res, next) => {
    var query = 'update compras set  Fecha_recibida=?, Id_estatus=? ';
		query= query + 'where Id_compra=?';
	
	var FechaActual = new Date();
    
    var values=[ 
    			FechaActual, 
    			req.body.id_estatus,
    			req.body.id_compra
    ];

    con.query(query, values, (err, result, fields) => {
    	if(err) {
    		next(err);
    	}else {
    		res.status(200).json(result);
    	}
    });
});

router.post('/insert_detalle_compras',(req,res,next)=>{
	var query='set @codigo=(select max(Id_compra)  from compras); INSERT INTO detalle_compras (Id_compra, Id_producto, Precio_compra, Cantidad_ordenada, Cantidad_recibida, Cantidad_rechazada) VALUES (@codigo,?,?,?,?,?)';
	var values=[
		req.body.id_producto,
		req.body.precio_compra,
		req.body.cantidad_ordenada,
		req.body.cantidad_recibida,
		req.body.cantidad_rechazada
	]

	con.query(query,values,(err,result,fields)=>{
		if(err){
			next(err);
		}else{
			res.status(200).json(result);
		}
	});
});

router.put('/update_detalle_compras', (req, res, next) => {
    var query = 'update detalle_compras set Cantidad_ordenada=?, Cantidad_recibida=?, Cantidad_rechazada=?';
    	query= query + ' where Id_compra=? and Id_producto = ?';
    
    var values=[
    			req.body.cantidad_ordenada, 
    			req.body.cantidad_recibida, 
    			req.body.cantidad_rechazada,
    			req.body.id_compra,
    			req.body.id_producto
    ];

    con.query(query, values, (err, result, fields) => {
    	if(err) {
    		next(err);
    	}else {
    		res.status(200).json(result);
    	}
    });
});

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
		LoginID: req.body.login_id,
		Contrasenia: req.body.contrasenia
	};
	const get_token = (user) => {
		var query = "SELECT LoginID, Contrasenia, Id_puesto FROM empleados WHERE LoginID = ?"
		con.query(query, [user.LoginID], (err, result, fields) => {
			if (err || result.length == 0){
				res.status(400).json({message: "Usuario o Contraseña Incorrectos"});
			} else {
				bcrypt.compare(user.Contrasenia, result[0].Contrasenia, (error, isMatch) => {
					if (isMatch){
						var token = jwt.sign({userID: result[0].LoginID}, secret_key);
						var roles = result[0].Id_puesto;
						res.status(200).json({roles, token});
					
					}else if(error){
						res.status(400).json(error);
					}else {
						res.status(400).json({message: "Usuario o Contraseña Incorrectos"});
					}
				});
			}
		});
	}
	get_token(user);
});	

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

router.get('/get_ventas_pendientes_envio', (req, res, next) => {
	var query = "select v.Id_venta, v.Fecha_venta, SUM(dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta)) as Subtotal, SUM(dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta)) * tc.Descuento_cliente as Descuento, ((SUM(dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta))) - (SUM(dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta)) * tc.Descuento_cliente)) * v.Isv as Isv, ((SUM(dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta))) -  (SUM(dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta)) * tc.Descuento_cliente) + (((SUM(dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta))) - (SUM(dv.Precio_venta*(dv.Cantidad_vendida-dv.Cantidad_devuelta)) * tc.Descuento_cliente)) * v.Isv)) as Total, c.Nombre_compania, dep.Nombre_departamento, ciu.Nombre_ciudad, c.Direccion ,c.Nombre_contacto, c.Apellido_contacto, c.Telefono_contacto, c.Email_contacto, es.Descripcion_estatus from ventas v join detalle_ventas dv on v.Id_venta = dv.Id_venta  join clientes c on v.Id_cliente = c.Id_cliente  join tipo_cliente tc on c.Id_tipo_cliente = tc.Id_tipo_cliente join ciudades ciu on c.Id_ciudad=ciu.Id_ciudad join departamentos dep on ciu.Id_departamento= dep.Id_departamento join estatus es on v.Id_estado_pago=es.Id_estatus where v.Id_estado_pago in (5,6) and v.Id_estado_envio = 8 group by v.Id_venta";

	con.query(query, (err, result, fields) => {
		if(err) {
				next(err);
		} else {
				res.status(200).json(result);

		}
	});
   
});

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
				  req.body.cantidad,
				  req.body.id_producto,
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
					req.body.abono, 
					req.body.id_venta
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
						req.body.identidad,
						req.body.isv,
						req.body.id_estado_envio,
						req.body.id_estado_pago,
						req.body.id_tipo_pago,
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
		req.body.id_producto,
		req.body.precio_referencial_venta,
		req.body.cantidad_vendida,
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
	
	var values = [req.query.id_venta,
				  req.query.id_producto];
	
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

    var values = [req.body.cantidad_devuelta,
        req.body.id_venta,
        req.body.id_producto];

 	con.query(query,values,(err,result,fields) => {
    if(err){
        next(err);
    }else {
        res.status(200).json(result);
	}
    });
});

router.get('/get_top_5_productos', (req, res, next) => {
	var query = 'SELECT p.Descripcion_producto Producto, count(dv.Id_producto) Cantidad FROM detalle_ventas dv inner join productos p on dv.Id_producto = p.Id_producto group by p.Descripcion_producto order by count(dv.Id_producto) DESC limit 5';
	con.query(query, (err, result, fields) => {
		if(err) {
				next(err);
		} 
		else{
				res.status(200).json(result);
		}
	});
});

router.get('/get_ventas_normales_anuales', (req, res, next) => {
	var query = "SELECT MONTH( a.Fecha_venta ) Mes, ROUND( SUM( ( b.Cantidad_vendida * b.Precio_venta ) + ( ( b.Cantidad_vendida * b.Precio_venta ) * a.ISV ) ), 2 ) Total FROM ventas a INNER JOIN detalle_ventas b ON a.Id_venta = b.Id_venta WHERE a.Id_plazo IS NULL AND YEAR( a.Fecha_venta ) = YEAR( NOW() ) GROUP BY MONTH( a.Fecha_venta )";
	con.query(query, (err, result, fields) => {
		if(err) {
				next(err);
		} 
		else{
				res.status(200).json(result);
		}
	});
});

router.get('/get_ventas_plus_anuales', (req, res, next) => {
	var query = "SELECT MONTH( a.Fecha_venta ) Mes, ROUND( SUM( ( b.Cantidad_vendida -b.Cantidad_devuelta ) * b.Precio_venta ) - SUM( ( ( b.Cantidad_vendida - b.Cantidad_devuelta ) * b.Precio_venta ) * d.Descuento_cliente )  + ( ( SUM( ( b.Cantidad_vendida - b.Cantidad_devuelta ) * b.Precio_venta ) - SUM( ( ( b.Cantidad_vendida - b.Cantidad_devuelta ) * b.Precio_venta ) * d.Descuento_cliente ) ) * a.ISV ), 2 ) Total FROM ventas a INNER JOIN detalle_ventas b ON a.Id_venta = b.Id_venta INNER JOIN clientes c ON a.Id_cliente = c.Id_cliente INNER JOIN tipo_cliente d ON c.Id_tipo_cliente = d.Id_tipo_cliente WHERE a.Id_plazo IS NOT NULL AND YEAR( a.Fecha_venta ) = YEAR( NOW() ) GROUP BY MONTH( a.Fecha_venta )";
	con.query(query, (err, result, fields) => {
		if(err) {
				next(err);
		} 
		else{
				res.status(200).json(result);
		}
	});
});

router.get('/get_grafico_nodevoluciones', (req, res, next) => {
	var query = 'select count(distinct dv.Id_venta) as VentasTotal from ventas as v join detalle_ventas as dv on v.Id_venta=dv.Id_venta where Cantidad_devuelta=0';
	con.query(query, (err, result, fields) => {
		if(err) {
				next(err);
		} else {
				res.status(200).json(result);

		}
	});
   
});

router.get('/get_grafico_sidevoluciones', (req, res, next) => {
	var query = 'select count(distinct dv.Id_venta) as VentasTotal from ventas as v join detalle_ventas as dv on v.Id_venta=dv.Id_venta where Cantidad_devuelta!=0';
	con.query(query, (err, result, fields) => {
		if(err) {
				next(err);
		} else {
				res.status(200).json(result);

		}
	});
});


module.exports = router;