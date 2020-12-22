CREATE DATABASE  IF NOT EXISTS `variedades_kyd` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `variedades_kyd`;
-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: localhost    Database: variedades_kyd
-- ------------------------------------------------------
-- Server version	5.7.27-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `Id_categoria` int(11) NOT NULL AUTO_INCREMENT,
  `Descripcion_categoria` varchar(100) NOT NULL,
  PRIMARY KEY (`Id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Zapatos'),(2,'Mochilas'),(4,'Juguetes'),(5,'Categoria Nueva'),(8,'asdfgh'),(9,'asdasdasdas'),(10,'Nuevo campo'),(11,'CategoriaPrueba');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ciudades`
--

DROP TABLE IF EXISTS `ciudades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ciudades` (
  `Id_ciudad` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre_ciudad` varchar(100) NOT NULL,
  `Id_departamento` int(11) NOT NULL,
  PRIMARY KEY (`Id_ciudad`),
  KEY `IX_Relationship26` (`Id_departamento`) USING BTREE,
  CONSTRAINT `Ciudades_Departamentos` FOREIGN KEY (`Id_departamento`) REFERENCES `departamentos` (`Id_departamento`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciudades`
--

LOCK TABLES `ciudades` WRITE;
/*!40000 ALTER TABLE `ciudades` DISABLE KEYS */;
INSERT INTO `ciudades` VALUES (1,'Tegucigalpa',1),(2,'Comayaguela',1),(3,'Omoa',2),(4,'Choloma',2);
/*!40000 ALTER TABLE `ciudades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `Id_cliente` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre_compania` varchar(50) NOT NULL,
  `Id_ciudad` int(11) DEFAULT NULL,
  `Id_tipo_cliente` int(11) DEFAULT NULL,
  `Direccion` varchar(300) NOT NULL,
  `Nombre_contacto` varchar(100) NOT NULL,
  `Apellido_contacto` varchar(100) NOT NULL,
  `Telefono_contacto` varchar(20) NOT NULL,
  `Email_contacto` varchar(150) NOT NULL,
  `Estado_logico` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`Id_cliente`),
  KEY `IX_Relationship16` (`Id_ciudad`) USING BTREE,
  KEY `IX_Relationship18` (`Id_tipo_cliente`) USING BTREE,
  CONSTRAINT `Clientes_Ciudades` FOREIGN KEY (`Id_ciudad`) REFERENCES `ciudades` (`Id_ciudad`),
  CONSTRAINT `Clientes_TipoClientes` FOREIGN KEY (`Id_tipo_cliente`) REFERENCES `tipo_cliente` (`Id_tipo_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'Zapateria Mendz',1,1,'Blvd. Morazan','Erick','Nolasco','43243243','erick_nolasco@gmail.com',1),(2,'TimeOut',1,1,'Mall Las Cascadas','Alba','Herrera','2341232','alejandra.herrera@gmail.com',1),(3,'Zapateria Casquito',1,2,'La Kennedy','Juan Carlos','Ordoñez','4342342342','casquito@gmail.com',1),(4,'dsdasfds',2,1,'rewrew','fsdfsdf','dsfsdf','3424','dfsfds',1),(5,'fdsfdsfds',3,2,'Ciudad Lempira, Bloque B1','Héctor','López','97977966','fdsfds',1),(6,'Prueba',3,1,'Ciudad Lempira','Daniel','López','9977345','daniel.lopez130300@outlook.com',0),(7,'dsadsa',1,2,'dsfdfsdsfds','dsfsdfsd','sdfdsfdsfd','324342342','dfsdfds@rewr.com',0),(8,'Jugueteria Merlon',1,2,'Blvd. Suyapa','Merlon','Mejia','94602404','merlon@gmail.com',1),(9,'Compañia Prueba',1,1,'Blvd. Morazan','Héctor','López','213123333','daniel130300@outlook.com',0),(10,'432432',1,2,'543534dsffgdf','Hector','Lopez','34534534','232@gmail.com',1),(11,'edgffdgfdg',1,1,'543534dsffgdf','Hector','Lopez','34534534','432432@gmail.com',1),(12,'345543',1,1,'43243242334324','reretret','ertertert','32445354','trtertert@gmail.com',1),(13,'rerewdsf45',1,1,'34324sdfdsf','dsfdsfds','fsdfsdf','23432432','3424fsd@gmail.com',1),(14,'dsfdfsfsd',1,1,'34324324324dsfsdfdfs','dsasdadsdsa','sadasdadsdas','54353455','342342@gmail.com',1),(15,'fsdfsd324234',1,1,'fd','dfd','sdfsdfdsfdfsdfssdfsd','43243234','dsads@gmail.com',1),(16,'CIA Nueva',1,1,'543534dsffgdf','Hector','Lopez','34534534','das@gmail.com',1),(17,'fdsjnfsdknf4324',2,1,'fdgfdggfrewrwerwe','fdskjnfdskjn','dfsdsfds','43423343','trertet@gmaal.com',1),(18,'gdfgdfgdfgdfggd',2,2,'432432gdfgdfg','Hector','Lopez','34534534','fsdfsdds@unicah.edu',1),(19,'Industrias ASAP',2,1,'Arturo Quezada','Oscar','Lopez','98242312','oscar@gmail.com',1),(20,'Luis M Company',2,2,'Cerro Grande Etapa 4','Luis','Martinez','97977966','luis_martinez@gmail.com',0),(21,'dsfsdfsdf',1,2,'Ciudad Lempira','Hector Daniel','Lopez','34534534','hlopez@gmail.com',0);
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compras`
--

DROP TABLE IF EXISTS `compras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compras` (
  `Id_compra` int(11) NOT NULL AUTO_INCREMENT,
  `Fecha_orden` date NOT NULL,
  `Fecha_recibida` date DEFAULT NULL,
  `Gastos_adicionales` double DEFAULT NULL,
  `Id_proveedor` int(11) DEFAULT NULL,
  `Id_estatus` int(11) DEFAULT NULL,
  `Codigo_factura` int(11) NOT NULL,
  PRIMARY KEY (`Id_compra`),
  KEY `IX_Relationship40` (`Id_proveedor`) USING BTREE,
  KEY `IX_Relationship41` (`Id_estatus`) USING BTREE,
  CONSTRAINT `Compras_Estatus` FOREIGN KEY (`Id_estatus`) REFERENCES `estatus` (`Id_estatus`),
  CONSTRAINT `Compras_Proveedores` FOREIGN KEY (`Id_proveedor`) REFERENCES `proveedores` (`Id_proveedor`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compras`
--

LOCK TABLES `compras` WRITE;
/*!40000 ALTER TABLE `compras` DISABLE KEYS */;
INSERT INTO `compras` VALUES (2,'2020-07-10','2020-07-14',200,NULL,NULL,1),(6,'2020-02-04','2020-07-24',100,NULL,NULL,2),(7,'2020-07-14','2020-07-06',500,NULL,NULL,3),(8,'2020-07-14','2020-07-08',100,NULL,NULL,4),(9,'2020-08-07','2020-08-07',500,1,4,5),(10,'2020-08-07','2020-08-08',100,1,4,6),(11,'2020-08-08','2020-08-08',1200,2,4,7),(12,'2020-08-09','2020-08-09',500,1,4,8),(13,'2020-10-18','2020-10-18',600,2,4,9),(14,'2020-10-18','2020-10-18',0,2,4,10),(15,'2020-10-18','2020-10-19',0,4,4,11),(16,'2020-10-19',NULL,20,1,3,12),(17,'2020-10-25','2020-10-25',0,9,4,423423),(18,'2020-10-25',NULL,0,9,3,324234),(19,'2020-10-28',NULL,200,1,3,543534),(20,'2020-11-06',NULL,100,1,3,432423),(21,'2020-12-04','2020-12-04',100,2,4,432432),(22,'2020-12-08','2020-12-08',100,1,4,432534),(23,'2020-12-08','2020-12-08',100,1,4,324324),(24,'2020-12-08','2020-12-08',200,1,4,324234),(25,'2020-12-08','2020-12-08',200,14,4,432423),(26,'2020-12-09',NULL,100,4,3,454353),(27,'2020-12-09',NULL,100,1,3,453453),(28,'2020-12-09',NULL,0,8,3,432432),(29,'2020-12-09',NULL,100,1,3,342343),(30,'2020-12-09',NULL,10,2,3,343242),(31,'2020-12-09',NULL,100,2,3,432432),(32,'2020-12-13',NULL,0,8,3,543543);
/*!40000 ALTER TABLE `compras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuentas_por_cobrar`
--

DROP TABLE IF EXISTS `cuentas_por_cobrar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cuentas_por_cobrar` (
  `Id_cobro` int(11) NOT NULL AUTO_INCREMENT,
  `Abono` double NOT NULL,
  `Id_venta` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id_cobro`),
  KEY `IX_Relationship42` (`Id_venta`) USING BTREE,
  CONSTRAINT `Ventas_CuentasxCobrar` FOREIGN KEY (`Id_venta`) REFERENCES `ventas` (`Id_venta`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuentas_por_cobrar`
--

LOCK TABLES `cuentas_por_cobrar` WRITE;
/*!40000 ALTER TABLE `cuentas_por_cobrar` DISABLE KEYS */;
INSERT INTO `cuentas_por_cobrar` VALUES (6,100,42),(7,200,42),(8,200,43),(12,100,42),(13,100,42),(14,100,42),(15,100,42),(16,100,42),(17,100,43),(18,100,42),(19,100,42),(20,100,43),(21,100,43),(22,100,42),(23,100,43),(24,50,43),(25,25,43),(26,100,43),(27,100,42),(28,100,43),(29,30,42),(30,30,42),(31,20,43),(32,10,43),(33,10,42),(34,10,42),(35,200,43),(36,100,43),(37,100,43),(38,20,43),(39,100,37),(40,100,37),(41,200,37),(42,100,37),(43,100,37),(44,100,39),(45,100,39),(46,100,39),(47,100,39),(48,50,39),(49,100,43),(50,100,43),(51,100,43),(52,100,43),(53,100,43),(54,2,42),(55,100,39),(56,100,39),(57,100,54),(58,200,54),(59,100,54),(60,100,54),(61,100,54),(62,100,37),(63,-200,39),(64,100,35),(65,100,54),(66,100,238),(67,10,35),(68,300,233),(69,100,273);
/*!40000 ALTER TABLE `cuentas_por_cobrar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departamentos`
--

DROP TABLE IF EXISTS `departamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departamentos` (
  `Id_departamento` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre_departamento` varchar(50) NOT NULL,
  PRIMARY KEY (`Id_departamento`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departamentos`
--

LOCK TABLES `departamentos` WRITE;
/*!40000 ALTER TABLE `departamentos` DISABLE KEYS */;
INSERT INTO `departamentos` VALUES (1,'Francisco Morazán'),(2,'Cortés'),(3,'Atlántida'),(4,'Colón'),(5,'Comayagua'),(6,'Choluteca'),(7,'El Paraíso'),(8,'Gracias a Dios'),(9,'Intibucá'),(10,'Islas de la Bahía'),(11,'La Paz'),(12,'Lempira'),(13,'Ocotepeque'),(14,'Olancho'),(15,'Santa Bárbara'),(16,'Valle'),(17,'Yoro'),(18,'Copán');
/*!40000 ALTER TABLE `departamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_compras`
--

DROP TABLE IF EXISTS `detalle_compras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_compras` (
  `Id_compra` int(11) NOT NULL,
  `Id_producto` int(11) NOT NULL,
  `Precio_compra` double NOT NULL,
  `Cantidad_ordenada` int(11) NOT NULL,
  `Cantidad_recibida` int(11) NOT NULL,
  `Cantidad_rechazada` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id_compra`,`Id_producto`),
  KEY `Productos_DetalleCompras` (`Id_producto`) USING BTREE,
  CONSTRAINT `Compras_DetalleCompras` FOREIGN KEY (`Id_compra`) REFERENCES `compras` (`Id_compra`),
  CONSTRAINT `Productos_DetalleCompras` FOREIGN KEY (`Id_producto`) REFERENCES `productos` (`Id_producto`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_compras`
--

LOCK TABLES `detalle_compras` WRITE;
/*!40000 ALTER TABLE `detalle_compras` DISABLE KEYS */;
INSERT INTO `detalle_compras` VALUES (9,1,400,2,2,0),(10,1,400,2,2,0),(11,2,500,10,10,2),(12,4,1000,20,15,5),(13,7,500,200,190,10),(13,8,200,10,0,0),(14,7,500,20,1,10),(14,8,200,2,2,1),(15,1,400,20,20,10),(16,11,500,10,0,0),(17,10,200,1,0,0),(18,10,200,1,0,0),(19,11,500,1,0,0),(20,6,3,1,0,0),(21,7,500,2,2,0),(22,13,324,4,4,0),(23,13,324,3,3,1),(24,13,324,2,2,0),(25,24,1000,10,5,1),(28,10,200,2,0,0),(30,19,100,3,0,0),(31,19,100,3,0,0),(32,10,200,3,0,0);
/*!40000 ALTER TABLE `detalle_compras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_ventas`
--

DROP TABLE IF EXISTS `detalle_ventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_ventas` (
  `Id_venta` int(11) NOT NULL,
  `Id_producto` int(11) NOT NULL,
  `Precio_venta` double NOT NULL,
  `Cantidad_vendida` int(11) NOT NULL,
  `Cantidad_devuelta` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id_venta`,`Id_producto`),
  KEY `Productos_DetalleVentas` (`Id_producto`) USING BTREE,
  CONSTRAINT `Productos_DetalleVentas` FOREIGN KEY (`Id_producto`) REFERENCES `productos` (`Id_producto`),
  CONSTRAINT `Ventas_DetalleVentas` FOREIGN KEY (`Id_venta`) REFERENCES `ventas` (`Id_venta`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_ventas`
--

LOCK TABLES `detalle_ventas` WRITE;
/*!40000 ALTER TABLE `detalle_ventas` DISABLE KEYS */;
INSERT INTO `detalle_ventas` VALUES (10,1,700,2,0),(31,1,700,2,1),(32,1,700,1,0),(32,2,800,2,0),(33,1,700,2,0),(34,1,700,2,0),(35,1,700,2,0),(36,1,700,2,0),(37,2,800,2,0),(38,1,700,3,0),(39,1,700,10,0),(39,2,800,2,0),(40,1,700,2,0),(41,2,800,2,0),(42,2,800,2,0),(43,1,700,10,0),(43,2,800,3,0),(44,1,700,2,0),(45,1,700,20,0),(45,2,800,20,0),(46,1,700,10,0),(48,1,700,2,0),(49,1,700,2,0),(50,2,800,2,0),(51,1,700,2,1),(51,2,800,3,1),(52,1,700,2,0),(53,2,800,20,0),(54,2,800,10,0),(55,2,800,2,0),(56,1,700,2,0),(57,1,700,5,0),(58,1,700,5,2),(58,4,1800,2,0),(59,4,1800,10,0),(60,10,400,2,1),(61,1,700,2,0),(62,1,700,2,2),(62,4,1800,1,0),(63,1,700,10,0),(64,1,700,1,0),(65,1,700,1,0),(66,1,700,1,0),(67,1,700,3,0),(68,1,700,1,0),(69,1,700,1,0),(70,1,700,1,0),(71,1,700,1,0),(72,1,700,1,0),(73,1,700,1,0),(74,1,700,1,0),(75,1,700,1,0),(76,7,1500,1,0),(77,7,1500,1,0),(78,7,1500,1,0),(79,7,1500,1,0),(80,7,1500,1,0),(81,7,1500,1,0),(82,1,700,1,0),(83,1,700,1,0),(84,7,1500,1,0),(85,7,1500,1,0),(86,1,700,1,0),(87,1,700,1,0),(88,1,700,1,0),(89,7,1500,1,0),(90,7,1500,1,0),(91,7,1500,1,0),(92,7,1500,1,0),(93,7,1500,1,0),(94,7,1500,1,0),(95,7,1500,1,0),(96,7,1500,1,0),(97,7,1500,1,0),(98,7,1500,1,0),(99,4,1800,1,0),(100,7,1500,1,0),(101,7,1500,1,0),(102,7,1500,1,0),(103,7,1500,1,0),(104,7,1500,1,0),(105,7,1500,1,0),(106,7,1500,1,0),(107,7,1500,1,0),(108,7,1500,1,0),(109,7,1500,1,0),(109,12,322,1,0),(110,12,322,1,0),(111,12,322,1,0),(112,7,1500,1,0),(112,12,322,1,0),(113,7,1500,1,0),(114,12,322,1,0),(115,12,322,1,0),(116,7,1500,1,0),(117,12,322,1,0),(118,12,322,1,0),(119,7,1500,1,0),(120,12,322,1,0),(121,12,322,1,0),(122,12,322,1,0),(123,12,322,1,0),(124,12,322,1,0),(125,12,322,1,0),(126,7,1500,1,0),(127,12,322,1,0),(128,12,322,2,0),(129,12,322,1,0),(130,7,1500,1,0),(131,12,322,1,0),(132,12,322,1,0),(133,12,322,1,0),(134,12,322,2,0),(135,12,322,2,0),(136,12,322,1,0),(137,12,322,1,0),(138,12,322,2,0),(139,12,322,2,0),(140,12,322,2,0),(141,12,322,2,0),(142,12,322,2,0),(143,12,322,1,0),(144,12,322,1,0),(145,12,322,2,0),(146,12,322,2,0),(147,12,322,1,0),(148,12,322,1,0),(149,1,700,1,0),(149,4,1800,1,0),(149,7,1500,1,0),(149,11,700,1,0),(149,12,322,1,0),(149,13,222,1,0),(150,12,322,1,0),(151,1,700,1,0),(151,2,800,1,0),(151,4,1800,1,0),(151,7,1500,1,0),(151,10,400,1,0),(151,11,700,1,0),(151,12,322,1,0),(152,7,1500,2,0),(152,12,322,1,0),(153,7,1500,2,0),(154,11,700,1,0),(155,7,1500,1,0),(156,7,1500,1,0),(157,7,1500,1,0),(158,7,1500,1,0),(159,7,1500,1,0),(160,12,322,1,0),(161,12,322,2,0),(162,7,1500,1,0),(163,12,322,2,0),(164,12,322,2,0),(165,12,322,1,0),(166,12,322,1,0),(167,12,322,2,0),(168,12,322,2,0),(169,12,322,2,0),(170,7,1500,1,0),(171,4,1800,1,0),(172,12,322,1,0),(173,7,1500,1,0),(174,12,322,1,0),(175,12,322,1,0),(176,7,1500,1,0),(177,12,322,1,0),(178,7,1500,1,0),(179,7,1500,1,0),(180,7,1500,1,0),(181,7,1500,2,0),(182,7,1500,1,0),(183,12,322,1,0),(184,12,322,1,0),(185,12,322,2,0),(186,7,1500,1,0),(187,12,322,1,0),(188,7,1500,1,0),(189,7,1500,1,0),(190,7,1500,1,0),(191,7,1500,1,0),(192,7,1500,1,0),(193,12,322,1,0),(194,7,1500,1,0),(195,7,1500,1,0),(196,7,1500,1,0),(197,7,1500,1,0),(198,7,1500,1,0),(199,12,322,2,0),(200,7,1500,1,0),(201,7,1500,1,0),(202,12,322,2,0),(203,7,1500,1,0),(204,7,1500,1,0),(205,12,322,1,0),(206,7,1500,1,0),(207,7,1500,1,0),(208,7,1500,1,0),(209,12,322,1,0),(210,12,322,2,0),(211,7,1500,1,0),(212,7,1500,1,0),(213,7,1500,1,0),(214,7,1500,1,0),(215,7,1500,1,0),(216,7,1500,2,0),(217,7,1500,1,0),(218,7,1500,1,0),(219,7,1500,1,0),(220,7,1500,1,0),(221,7,1500,1,0),(222,7,1500,1,0),(223,12,322,2,0),(224,12,322,2,0),(225,7,1500,1,0),(226,7,1500,1,0),(227,12,322,2,0),(228,7,1500,1,0),(229,7,1500,1,0),(230,7,1500,1,0),(231,12,322,2,0),(232,12,322,1,0),(233,7,1500,2,0),(234,6,3,1,0),(235,12,322,1,0),(236,7,1500,1,0),(237,12,322,2,0),(238,7,1500,2,0),(239,12,322,1,0),(240,7,1500,1,0),(241,7,1500,1,0),(242,12,322,1,0),(243,12,322,2,0),(244,7,1500,2,0),(245,2,800,1,0),(245,4,1800,1,0),(245,12,322,2,0),(246,4,1800,1,0),(246,8,1000,1,0),(247,8,1000,1,0),(248,2,800,1,0),(248,8,1000,1,0),(248,12,322,2,0),(249,9,1000,1,0),(249,11,700,1,0),(249,12,322,2,0),(250,12,322,2,0),(251,7,1500,2,0),(252,8,1000,2,0),(253,7,1500,1,0),(253,12,322,1,0),(254,7,1500,1,0),(254,12,322,1,0),(255,1,700,1,0),(255,12,322,1,0),(256,7,1500,1,0),(257,9,1000,2,0),(258,7,1500,1,0),(259,1,700,1,0),(260,1,700,1,0),(261,12,322,1,0),(262,12,322,1,0),(263,12,322,1,0),(264,12,322,1,0),(265,12,322,1,0),(266,9,1000,1,1),(267,7,1500,2,0),(268,7,1500,1,1),(269,17,2000,2,0),(270,20,1200,3,2),(271,20,1200,3,0),(272,21,1200,2,0),(273,21,1200,3,0),(274,18,2000,1,0),(275,21,1200,1,0);
/*!40000 ALTER TABLE `detalle_ventas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleados`
--

DROP TABLE IF EXISTS `empleados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleados` (
  `Id_empleado` int(11) NOT NULL AUTO_INCREMENT,
  `Identidad` varchar(20) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Apellido` varchar(100) NOT NULL,
  `Telefono` varchar(20) NOT NULL,
  `Email` varchar(150) NOT NULL,
  `Direccion` varchar(300) NOT NULL,
  `Salario` double DEFAULT NULL,
  `LoginID` varchar(50) NOT NULL,
  `Contrasenia` char(200) NOT NULL,
  `Fecha_nacimiento` date NOT NULL,
  `Fecha_contratacion` date NOT NULL,
  `Fecha_despido` date DEFAULT NULL,
  `Id_puesto` int(11) DEFAULT NULL,
  `Id_estatus` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id_empleado`),
  KEY `IX_Relationship13` (`Id_puesto`) USING BTREE,
  KEY `IX_Relationship14` (`Id_estatus`) USING BTREE,
  CONSTRAINT `Empleados_Estatus` FOREIGN KEY (`Id_estatus`) REFERENCES `estatus` (`Id_estatus`),
  CONSTRAINT `Empleados_Puestos` FOREIGN KEY (`Id_puesto`) REFERENCES `puestos` (`Id_puesto`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleados`
--

LOCK TABLES `empleados` WRITE;
/*!40000 ALTER TABLE `empleados` DISABLE KEYS */;
INSERT INTO `empleados` VALUES (1,'0801200006012','Hector','Lopez','97977966','daniel13030@outlook.com','Ciudad Lempira',12000,'HLopez','Lopez100','2000-03-13','2020-06-26',NULL,1,1),(2,'0801199712345456','Luis','Oseguera','342545564','LuisOse@otulook.com','lokos 2',12000,'LuisOseguera','LuisOseguera100','2020-07-23','2020-07-19','2020-07-01',1,1),(3,'0801200006012','Hector','Lopez','97977966','daniel130300@outlook.com','Ciudad Lempira, Bloque B1',12000,'HLopez','$2a$10$N5VIRyevWmXlqwTTGKmKTONTFgJQWlG9hNr71g4Faw/kGNbkyqKhq','2020-07-15','2020-07-10','2020-07-07',2,2),(4,'08012123','fdsfdssdf','dsfdsfdsf','324324324','fsdfdsfds','dsfdsfdsfds',432432432,'Melvin','$2a$10$h6MTiNc4kBNy5YLbbXBsu.nC.PfbAjypb7UNB/74cA2ut9zTKxrLO','2020-07-02','2020-07-30','2020-07-20',1,1),(5,'0801200006012','Héctor','López','97977966','daniel130300@outlook.com','Ciudad Lempira, Bloque B1',12000,'HLopez','$2a$10$jFfteXal0VZColk7VeUn6.UIU2ja/RVDwxJIDSZB9VqcEIrEvF/ku','2000-03-13','2020-08-08',NULL,2,1),(6,'0801200006012','Héctor','López','97977966','daniel130300@outlook.com','Ciudad Lempira, Bloque B1',12000,'HDaniel','$2a$10$Ir3V99F7DCIfoKRpfdnWsO6mZa11NMfl/SBcIX5w8waJ5zP2bUdEi','2020-08-05','2020-08-08',NULL,2,1),(7,'0606054435435','Héctor','López','97977966','daniel130300@outlook.com','Ciudad Lempira, Bloque B1',12000,'HBorjas','$2a$10$ZN0HjI4aoVrdlJmcgkRjK.CwRfNCk5S7Wn5wc/ATy5FcucaKuS2r2','2020-08-05','2020-08-08',NULL,2,1),(8,'0801200006012','Hector','Lopez','97977966','daniel130300@outlook.com','Arturo Quezada,Ciudad Lempira',12000,'hlopez','$2a$10$h1GmA6971xaebAueO9Df.eHr8qKckAEJWRVJsFyPELvkrlY6HNaI2','2020-09-30','2020-10-18',NULL,2,1),(9,'0801200006012','Hector','Lopez','4434534534','daniel130300@outlook.com','543534dsffgdf',12000,'dlopez','$2a$10$oMaWEtxSuZxGpbHmDnaBu.1f.MiRayhvKQkNPjy74D.67PDiO13/S','2020-10-09','2020-10-18',NULL,1,1),(10,'54354343','dfgdfgdfg','gdfgdfgdf','543543','gfdgdf@gmail.com','543543543dfgdfgdf',12300,'nose','$2a$10$LH9RBnIYlgoQgivnzCQ0ue6aMuOj/4PgYZhMHnXBG7c1RkWikemne','2020-10-13','2020-10-18',NULL,2,1),(14,'54353454','Luis','Oseguera','32432432','luisoseguera@gmail.com','sadasdasdw3r324',12000,'LuisOseguera','$2a$10$a3UM.NcmgPRZOXJ1g79qs.qDyM28Tz6E2LTtozTUysUY7J4Y9FXga','2020-09-29','2020-10-19',NULL,2,1),(15,'4353453453342','fdsfsdf','fdsfsd','432432342234','dsfs@gmail.com','31232',432342,'teofilo','$2a$10$RWzLJqCG9zba76GqQsYw5.2oQjW4YcQ4HcgbvGIGchz.hlOVRs2Sa','2020-10-06','2020-10-19',NULL,2,1),(16,'4354354353454','dfgdfgdf','fdgdfg','43223432','dfgdfgdf@gmail.com','432432fdsfdsf',4334,'fdsdfssd','$2a$10$8ssbtbeeEF8JSy8A933rUOA.2jKL17MwVYNk54oiT/I9QIC3MeVgO','2001-12-19','2020-10-19',NULL,2,1),(17,'3243243234243','fdsfdssdfds','sddsfsdfd','45435454','dfdfdfdfdfdfgdg@gmail.com','gdgfddfdsfdsfdsd',11000,'dsfdfsds','$2a$10$HJY9buRnrHTe4slHswldZePUC/kw7VbTp1UhAgZ6NrcaG/bGDZaT6','1950-01-11','2020-10-19',NULL,1,1),(18,'4234234234323','Luis','Montoya','94602404','luis_montoya@gmail.com','Arturo Quezada,Ciudad Lempira',10000,'fsdfsd','$2a$10$P6dc0vs1kwPVJcNbX8JFuuJqxsmO05FP2vKOxjfIce2sIwXDWjXWe','2001-12-30','2020-10-28','2020-10-28',1,1),(19,'0801200006012','Iris','Borjas','94602404','iborjas@gmail.com','Arturo Quezada,Ciudad Lempira',12000,'iborjas','$2a$10$uc4AM7c8EPkl7vGjg7K4IeaA9P8cbUUUIwKuqrvITVFyijw67dM56','2000-08-16','2020-12-08',NULL,1,1),(20,'3432423423423','Jowell','Randy','43242342','jowell@outlook.com','543534dsffgdf',12000,'jowell','$2a$10$2SCTYc1fV.CsqbNutyMy3OvRqFw3cSzKsJrWms1IwIhT29MdOXVKy','2001-09-12','2020-12-09','2020-12-09',2,1),(21,'3432423432423','fsdfsdfsdfds','fdsfsdfsdfsdf','32432423','adasdas@gmail.com','fsdfdsadasdas',3242,'lopez','$2a$10$xdRWkvV208i271BC5sbf1.AktiJJTaYH6PeaaTsqyaKdX/cTdtNYm','2001-10-10','2020-12-09','2020-12-09',2,1);
/*!40000 ALTER TABLE `empleados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estatus`
--

DROP TABLE IF EXISTS `estatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estatus` (
  `Id_estatus` int(11) NOT NULL AUTO_INCREMENT,
  `Descripcion_estatus` varchar(50) NOT NULL,
  PRIMARY KEY (`Id_estatus`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estatus`
--

LOCK TABLES `estatus` WRITE;
/*!40000 ALTER TABLE `estatus` DISABLE KEYS */;
INSERT INTO `estatus` VALUES (1,'Activo'),(2,'Inactivo'),(3,'Pendiente de Recibo'),(4,'Recibido'),(5,'Pagado'),(6,'Pendiente de Pago'),(7,'Incobrable'),(8,'Pendiente de Envío'),(9,'Enviado'),(10,'Local');
/*!40000 ALTER TABLE `estatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marcas`
--

DROP TABLE IF EXISTS `marcas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marcas` (
  `Id_marca` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre_marca` varchar(50) NOT NULL,
  PRIMARY KEY (`Id_marca`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marcas`
--

LOCK TABLES `marcas` WRITE;
/*!40000 ALTER TABLE `marcas` DISABLE KEYS */;
INSERT INTO `marcas` VALUES (1,'Nike'),(2,'Rebook'),(3,'Adidas'),(4,'Under Armour'),(5,'IncToys'),(6,'dasdasasdasd'),(7,'NuevaMarca'),(8,'fdfdf');
/*!40000 ALTER TABLE `marcas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modelos`
--

DROP TABLE IF EXISTS `modelos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modelos` (
  `Id_modelo` int(11) NOT NULL AUTO_INCREMENT,
  `Descripcion_modelo` varchar(100) NOT NULL,
  `Id_marca` int(11) DEFAULT NULL,
  `Id_subcategoria` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id_modelo`),
  KEY `IX_Relationship25` (`Id_marca`) USING BTREE,
  KEY `IX_Relationship27` (`Id_subcategoria`),
  CONSTRAINT `Modelos_Marcas` FOREIGN KEY (`Id_marca`) REFERENCES `marcas` (`Id_marca`),
  CONSTRAINT `Modelos_Subcategorias` FOREIGN KEY (`Id_subcategoria`) REFERENCES `subcategorias` (`Id_subcategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modelos`
--

LOCK TABLES `modelos` WRITE;
/*!40000 ALTER TABLE `modelos` DISABLE KEYS */;
INSERT INTO `modelos` VALUES (1,'Nike Runners',1,1),(2,'Nike Airmax',1,1),(3,'Stansmith',2,1),(4,'Elite',3,4),(5,'Jordan',1,1),(6,'trtretre',4,6),(7,'Adidas Originals',3,1),(8,'Mochila Nike',1,4),(9,'HotWheels',5,8),(10,'sdfsdfsdf',7,13),(11,'dfddfdf',6,1),(12,'fdfdfd',2,13);
/*!40000 ALTER TABLE `modelos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plazos_pago`
--

DROP TABLE IF EXISTS `plazos_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plazos_pago` (
  `Id_plazo` int(11) NOT NULL AUTO_INCREMENT,
  `Descripcion_plazo` varchar(50) NOT NULL,
  PRIMARY KEY (`Id_plazo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plazos_pago`
--

LOCK TABLES `plazos_pago` WRITE;
/*!40000 ALTER TABLE `plazos_pago` DISABLE KEYS */;
INSERT INTO `plazos_pago` VALUES (1,'15 dias'),(2,'1 mes'),(3,'3 meses');
/*!40000 ALTER TABLE `plazos_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `Id_producto` int(11) NOT NULL AUTO_INCREMENT,
  `Descripcion_producto` varchar(100) DEFAULT NULL,
  `Talla` varchar(20) DEFAULT NULL,
  `Color` varchar(50) DEFAULT NULL,
  `Stock` int(11) NOT NULL,
  `Precio_referencial_venta` double NOT NULL,
  `Precio_referencial_compra` double NOT NULL,
  `Punto_reorden` int(11) NOT NULL,
  `Id_modelo` int(11) DEFAULT NULL,
  `Estado_logico` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`Id_producto`),
  KEY `IX_Relationship21` (`Id_modelo`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Asaber','9','Azul',2,700,400,2,1,0),(2,'StanSmith Originals a Rayas','9','Blanco',9,800,500,5,3,0),(3,'Nike Runners Moteados','9','Anaranjado',100,800,400,2,1,0),(4,'Runners 2021','7','Azul',1,1800,1000,4,1,0),(5,'Nuevos Nike Runners','8','Negros',10,1200,200,2,1,1),(6,'sdfdsf','1','2',1,3,3,2,2,1),(7,'Converse','8','Azul',78,1500,500,10,1,1),(8,'dsads','8','fdsfsd',16,1000,200,2,1,1),(9,'Adidas Stansmith','8','Blancos',46,1000,400,10,7,1),(10,'Nose','4','Negro',7,400,200,2,7,1),(11,'fds','3','Negro',8,700,500,30,8,1),(12,'fdsfdsffdfds','34','fdsfdffd',342234118,322,232,34,8,1),(13,'Producto Nuevo 3','432','dsfdsdfs',46,222,324,32,8,1),(14,'sadasdasd','12','Rojo',12,9000,1000,2,2,1),(15,'Nuevos Zapatos','12','Azul',11,1200,2000,12,1,1),(16,'Nike Airmax 2020','9','Azules',3,3000,1000,2,2,1),(17,'Nike Airmax 2020','8','Negros con rojo',3,2000,1000,3,2,1),(18,'Mochila Nike Nueva',NULL,'Negra',19,2000,500,3,8,1),(19,'HotWheels Collection',NULL,'Negro',100,300,100,10,9,1),(20,'gdfgdfg','10','Rojo',4,1200,600,1,2,1),(21,'gdfgdfg','10','Rojo',4,1200,600,1,2,1),(22,'New Runners','12','Azul',12,2000,1000,3,1,1),(23,'Runners 2015','7','Negro',10,1200,600,5,1,1),(24,'Hot Wheels Paquete',NULL,'Rojo',21,3000,1000,3,9,1),(25,'Paquete 12',NULL,'Negro',21,2000,1000,6,9,1);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos_proveedores`
--

DROP TABLE IF EXISTS `productos_proveedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos_proveedores` (
  `Id_producto` int(11) NOT NULL,
  `Id_proveedor` int(11) NOT NULL,
  PRIMARY KEY (`Id_producto`,`Id_proveedor`),
  KEY `Proveedores_ProductosProveedores` (`Id_proveedor`) USING BTREE,
  CONSTRAINT `Productos_ProveedoresProductos` FOREIGN KEY (`Id_producto`) REFERENCES `productos` (`Id_producto`),
  CONSTRAINT `Proveedores_ProductosProveedores` FOREIGN KEY (`Id_proveedor`) REFERENCES `proveedores` (`Id_proveedor`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos_proveedores`
--

LOCK TABLES `productos_proveedores` WRITE;
/*!40000 ALTER TABLE `productos_proveedores` DISABLE KEYS */;
INSERT INTO `productos_proveedores` VALUES (4,1),(6,1),(10,1),(11,1),(12,1),(13,1),(17,1),(21,1),(23,1),(2,2),(7,2),(8,2),(19,2),(1,4),(11,4),(9,8),(10,8),(10,9),(13,10),(20,10),(21,10),(13,13),(13,14),(18,14),(24,14),(25,14),(13,15),(14,15);
/*!40000 ALTER TABLE `productos_proveedores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedores`
--

DROP TABLE IF EXISTS `proveedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedores` (
  `Id_proveedor` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre_compania` varchar(50) NOT NULL,
  `Direccion` varchar(300) NOT NULL,
  `Id_ciudad` int(11) DEFAULT NULL,
  `Nombre_contacto` varchar(100) NOT NULL,
  `Apellido_contacto` varchar(100) NOT NULL,
  `Telefono_contacto` varchar(20) NOT NULL,
  `Email_contacto` varchar(150) NOT NULL,
  `Estado_logico` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`Id_proveedor`),
  KEY `IX_Relationship35` (`Id_ciudad`) USING BTREE,
  CONSTRAINT `Proveedores_Ciudades` FOREIGN KEY (`Id_ciudad`) REFERENCES `ciudades` (`Id_ciudad`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedores`
--

LOCK TABLES `proveedores` WRITE;
/*!40000 ALTER TABLE `proveedores` DISABLE KEYS */;
INSERT INTO `proveedores` VALUES (1,'Zapateria Casquito','Colonia Centroamerica',1,'Nelson Alejandro','Martinez ','32432556','Nelson.martinez@gmail.com',1),(2,'Jugueteria Marbella','Colonia Kennedy',1,'Marbella','Carrasco','35543654','marbella.lacarrasco@gmail.com',1),(3,'Juegueteria Marlon','A saber',1,'Marlon','Mejia','324324','david.alejandro@gmail.com',0),(4,'dasdas','fsdfds',1,'dasdas','asdasd','2321','fdsfds',1),(5,'Edwin Cabeza de Pija','QUETIN',2,'CHUPAME','ESTA','34234543','edwinmelapela@gmail.com',0),(6,'dasdas','dsadas',3,'dsadsa','adsasdasd','3432432','fdsfsd',0),(7,'rwerweer','rewrewer',2,'ewrwerwer','ewrewrew','rwerew','ewrwerew3544r',0),(8,'CIA Prueba','Ciudad Lempira, Bloque B1',1,'Héctor','Borjas','97977966','daniel130300@outlook.com',1),(9,'CIA David','Arturo Quezada,Ciudad Lempira',3,'Iris','Borjas','324234','wfdsfsd@gmail.com',1),(10,'3453','',1,'','','','',1),(11,'fsgdfgdf435435','543534erfggdf',1,'sdfdsfsd','dsfsdfsdf','32432443','dfsfds@gmail.com',1),(12,'sadsa','543534354gfdgdfg',1,'gdfgfdg','dgdfg','54354354','dfggfdgf@gmail.com',1),(13,'Proveedor 11','fdsfdsfdsfdsfdssdf',1,'dsfdsfdfs','dsfdsfsdfsd','43434343','fsdfdsdfs@gmail.com',1),(14,'Proveedor 10','dsf3543543534',2,'Hector','Lopez','34534534','daniel130300@outlook.com',1),(15,'Proveedor 12','Arturo Quezada,Ciudad Lempira',2,'Jose','Guillen','94602404','guillen@gmail.com',1),(16,'Proveedor Prueba 200','Arturo Quezada,Ciudad Lempira',2,'Elieth','Colindres','23423423','elieth_colindres@gmail.com',0),(17,'dsfdsfdsfsdfds','Arturo Quezada,Ciudad Lempira',4,'Merlon','Inutil','34324324','iborjas@gmail.com',0);
/*!40000 ALTER TABLE `proveedores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `puestos`
--

DROP TABLE IF EXISTS `puestos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `puestos` (
  `Id_puesto` int(11) NOT NULL AUTO_INCREMENT,
  `Descripcion_puesto` varchar(50) NOT NULL,
  PRIMARY KEY (`Id_puesto`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `puestos`
--

LOCK TABLES `puestos` WRITE;
/*!40000 ALTER TABLE `puestos` DISABLE KEYS */;
INSERT INTO `puestos` VALUES (1,'Gerente'),(2,'Cajero');
/*!40000 ALTER TABLE `puestos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategorias`
--

DROP TABLE IF EXISTS `subcategorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcategorias` (
  `Id_subcategoria` int(11) NOT NULL AUTO_INCREMENT,
  `Descripcion_subcategoria` varchar(50) NOT NULL,
  `Id_categoria` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id_subcategoria`),
  KEY `IX_Relationship22` (`Id_categoria`) USING BTREE,
  CONSTRAINT `Subcategorias_Categorias` FOREIGN KEY (`Id_categoria`) REFERENCES `categorias` (`Id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategorias`
--

LOCK TABLES `subcategorias` WRITE;
/*!40000 ALTER TABLE `subcategorias` DISABLE KEYS */;
INSERT INTO `subcategorias` VALUES (1,'Tenis',1),(2,'Sandalias',1),(3,'Mochila Escolar',2),(4,'Mochila Deportiva',2),(5,'Tacones',1),(6,'Mochila a Ruedas',2),(7,'Nuevo',4),(8,'Autos',4),(9,'rwe',1),(10,'SubNueva',5),(11,'terter',8),(12,'sub nueva',9),(13,'SubNueva',8);
/*!40000 ALTER TABLE `subcategorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_cliente`
--

DROP TABLE IF EXISTS `tipo_cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_cliente` (
  `Id_tipo_cliente` int(11) NOT NULL AUTO_INCREMENT,
  `Descripcion_cliente` varchar(50) NOT NULL,
  `Descuento_cliente` double NOT NULL,
  PRIMARY KEY (`Id_tipo_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_cliente`
--

LOCK TABLES `tipo_cliente` WRITE;
/*!40000 ALTER TABLE `tipo_cliente` DISABLE KEYS */;
INSERT INTO `tipo_cliente` VALUES (1,'Al por Mayor',0.3),(2,'Frecuente',0.25);
/*!40000 ALTER TABLE `tipo_cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_pago`
--

DROP TABLE IF EXISTS `tipo_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_pago` (
  `Id_tipo_pago` int(11) NOT NULL AUTO_INCREMENT,
  `Descripcion_tipo_pago` varchar(50) NOT NULL,
  PRIMARY KEY (`Id_tipo_pago`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_pago`
--

LOCK TABLES `tipo_pago` WRITE;
/*!40000 ALTER TABLE `tipo_pago` DISABLE KEYS */;
INSERT INTO `tipo_pago` VALUES (1,'Contado'),(2,'Crédito');
/*!40000 ALTER TABLE `tipo_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventas`
--

DROP TABLE IF EXISTS `ventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ventas` (
  `Id_venta` int(11) NOT NULL AUTO_INCREMENT,
  `Fecha_venta` date NOT NULL,
  `Fecha_envio` date DEFAULT NULL,
  `Fecha_entrega` date DEFAULT NULL,
  `Identidad` char(20) DEFAULT NULL,
  `ISV` double NOT NULL,
  `Id_cliente` int(11) DEFAULT NULL,
  `Id_empleado` int(11) DEFAULT NULL,
  `Id_estado_envio` int(11) DEFAULT NULL,
  `Id_estado_pago` int(11) DEFAULT NULL,
  `Id_tipo_pago` int(11) DEFAULT NULL,
  `Id_plazo` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id_venta`),
  KEY `IX_Relationship27` (`Id_cliente`) USING BTREE,
  KEY `IX_Relationship29` (`Id_empleado`) USING BTREE,
  KEY `IX_Relationship30` (`Id_estado_envio`) USING BTREE,
  KEY `IX_Relationship31` (`Id_tipo_pago`) USING BTREE,
  KEY `IX_Relationship32` (`Id_plazo`) USING BTREE,
  KEY `Id_estado2` (`Id_estado_pago`),
  CONSTRAINT `Ventas_Clientes` FOREIGN KEY (`Id_cliente`) REFERENCES `clientes` (`Id_cliente`),
  CONSTRAINT `Ventas_Empleado` FOREIGN KEY (`Id_empleado`) REFERENCES `empleados` (`Id_empleado`),
  CONSTRAINT `Ventas_Estatus` FOREIGN KEY (`Id_estado_envio`) REFERENCES `estatus` (`Id_estatus`),
  CONSTRAINT `Ventas_PlazosPago` FOREIGN KEY (`Id_plazo`) REFERENCES `plazos_pago` (`Id_plazo`),
  CONSTRAINT `Ventas_TipoPago` FOREIGN KEY (`Id_tipo_pago`) REFERENCES `tipo_pago` (`Id_tipo_pago`),
  CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`Id_estado_pago`) REFERENCES `estatus` (`Id_estatus`)
) ENGINE=InnoDB AUTO_INCREMENT=276 DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas`
--

LOCK TABLES `ventas` WRITE;
/*!40000 ALTER TABLE `ventas` DISABLE KEYS */;
INSERT INTO `ventas` VALUES (1,'2020-06-26','2020-07-26','2020-07-26','',0.15,1,1,3,1,2,1),(10,'2020-06-26',NULL,NULL,'',0.15,1,1,3,NULL,2,1),(11,'2020-03-13',NULL,NULL,NULL,0.15,4,NULL,5,NULL,2,1),(12,'2020-08-04',NULL,NULL,NULL,0.15,1,NULL,8,5,1,1),(13,'2020-08-04',NULL,NULL,NULL,0.15,1,NULL,8,5,1,1),(14,'2020-07-30',NULL,NULL,NULL,0.15,1,NULL,8,5,1,1),(15,'2020-08-04',NULL,NULL,NULL,0.15,1,NULL,8,5,1,1),(16,'2020-07-28',NULL,NULL,NULL,0.15,1,NULL,8,5,1,1),(17,'2020-07-27',NULL,NULL,NULL,0.15,1,NULL,8,5,1,1),(18,'2020-07-27',NULL,NULL,NULL,0.15,1,NULL,8,5,1,1),(19,'2020-07-27',NULL,NULL,NULL,0.15,1,NULL,9,5,1,1),(20,'2020-07-27',NULL,NULL,NULL,0.15,1,NULL,9,5,1,1),(21,'2020-07-29',NULL,NULL,NULL,0.15,1,NULL,10,5,1,1),(22,'2020-07-29',NULL,NULL,NULL,0.15,1,NULL,10,5,1,1),(23,'2020-07-29',NULL,NULL,NULL,0.15,1,NULL,10,5,1,2),(24,'2020-07-29',NULL,NULL,NULL,0.15,1,NULL,10,5,1,2),(25,'2020-07-29',NULL,NULL,NULL,0.15,1,NULL,10,5,1,2),(26,'2020-07-30',NULL,NULL,NULL,0.15,2,NULL,8,5,1,2),(27,'2020-07-31',NULL,NULL,NULL,0.15,1,NULL,8,5,1,1),(28,'2020-07-30',NULL,NULL,NULL,0.15,1,NULL,8,6,2,2),(29,'2020-08-13',NULL,NULL,NULL,0.15,1,NULL,10,6,2,1),(30,'2020-08-14',NULL,NULL,NULL,0.15,1,NULL,8,6,2,1),(31,'2020-07-29','2020-08-13','2020-08-27',NULL,0.15,1,NULL,9,5,1,2),(32,'2020-07-31','2020-08-27','2020-09-02',NULL,0.15,4,NULL,9,5,1,2),(33,'2020-08-04','2020-10-23','2020-10-24',NULL,0.15,1,NULL,9,5,1,1),(34,'2020-08-04',NULL,NULL,NULL,0.15,1,NULL,10,5,1,1),(35,'2020-08-04','2020-08-28','2020-08-28',NULL,0.15,1,NULL,9,6,2,1),(36,'2020-08-04','2020-10-08','2020-11-24',NULL,0.15,1,NULL,9,5,1,NULL),(37,'2020-08-04',NULL,NULL,NULL,0.15,2,NULL,10,6,2,1),(38,'2020-08-04',NULL,NULL,NULL,0.15,3,NULL,10,5,1,NULL),(39,'2020-08-05',NULL,NULL,NULL,0.15,3,NULL,10,6,2,1),(40,'2020-08-05',NULL,NULL,NULL,0.15,2,NULL,10,5,1,NULL),(41,'2020-08-05','2020-10-30','2020-10-31',NULL,0.15,1,NULL,9,5,1,NULL),(42,'2020-08-05',NULL,NULL,NULL,0.15,4,NULL,9,6,2,1),(43,'2020-08-05',NULL,NULL,NULL,0.15,3,NULL,9,7,2,2),(44,'2020-08-05',NULL,NULL,NULL,0.15,1,NULL,10,5,1,NULL),(45,'2020-08-05',NULL,NULL,NULL,0.15,1,NULL,10,5,1,NULL),(46,'2020-08-06',NULL,NULL,'0801200006012',0.15,NULL,NULL,9,5,1,NULL),(47,'2020-08-07',NULL,NULL,NULL,0.15,2,NULL,1,5,1,NULL),(48,'2020-08-07','2020-12-18','2020-12-31',NULL,0.15,1,NULL,9,5,1,NULL),(49,'2020-08-07',NULL,NULL,'3455345',0.15,NULL,NULL,10,5,1,NULL),(50,'2020-08-07','2020-08-26','2020-09-02',NULL,0.15,5,NULL,9,5,1,NULL),(51,'2020-08-07',NULL,NULL,NULL,0.15,2,NULL,8,5,1,NULL),(52,'2020-08-07',NULL,NULL,'4324324342',0.15,NULL,NULL,10,5,1,NULL),(53,'2020-08-07',NULL,NULL,NULL,0.15,2,NULL,10,5,1,NULL),(54,'2020-08-07',NULL,NULL,NULL,0.15,5,NULL,10,6,2,2),(55,'2020-08-07','2020-10-18','2020-10-21',NULL,0.15,5,NULL,9,5,1,NULL),(56,'2020-08-07','2020-09-04','2020-09-05',NULL,0.15,2,NULL,9,5,1,NULL),(57,'2020-08-07','2020-08-27','2020-08-31',NULL,0.15,2,NULL,9,6,2,1),(58,'2020-08-08','2020-08-20','2020-08-25',NULL,0.15,1,NULL,9,5,1,NULL),(59,'2020-10-18',NULL,NULL,'0801200006012',0.15,NULL,NULL,10,5,1,NULL),(60,'2020-10-18',NULL,NULL,NULL,0.15,2,NULL,10,5,1,NULL),(61,'2020-10-19',NULL,NULL,'0801200006012',0.15,NULL,NULL,10,5,1,NULL),(62,'2020-10-19',NULL,NULL,NULL,0.15,15,NULL,10,5,1,NULL),(63,'2020-10-19',NULL,NULL,'5345345345343',0.15,NULL,NULL,10,5,1,NULL),(64,'2020-10-19',NULL,NULL,'3432432432545',0.15,NULL,NULL,10,5,1,NULL),(65,'2020-10-19',NULL,NULL,'5465464564564',0.15,NULL,NULL,10,5,1,NULL),(66,'2020-10-19',NULL,NULL,'5435333545445',0.15,NULL,NULL,10,5,1,NULL),(67,'2020-10-19',NULL,NULL,'4354353454353',0.15,NULL,NULL,10,5,1,NULL),(68,'2020-10-19',NULL,NULL,'5435435345455',0.15,NULL,NULL,10,5,1,NULL),(69,'2020-10-19',NULL,NULL,'4534534554434',0.15,NULL,NULL,10,5,1,NULL),(70,'2020-10-20',NULL,NULL,'5464545656444',0.15,NULL,NULL,10,5,1,NULL),(71,'2020-10-20',NULL,NULL,'5345355345445',0.15,NULL,NULL,10,5,1,NULL),(72,'2020-10-20',NULL,NULL,'4554545355454',0.15,NULL,NULL,10,5,1,NULL),(73,'2020-10-20',NULL,NULL,'5453554353535',0.15,NULL,NULL,10,5,1,NULL),(74,'2020-10-20',NULL,NULL,'3455333534543',0.15,NULL,NULL,10,5,1,NULL),(75,'2020-10-20',NULL,NULL,'6546546564565',0.15,NULL,NULL,10,5,1,NULL),(76,'2020-10-20',NULL,NULL,'4325454543543',0.15,NULL,NULL,10,5,1,NULL),(77,'2020-10-20',NULL,NULL,'6545464664464',0.15,NULL,NULL,10,5,1,NULL),(78,'2020-10-20',NULL,NULL,'5435354543545',0.15,NULL,NULL,10,5,1,NULL),(79,'2020-10-20',NULL,NULL,'4554543344545',0.15,NULL,NULL,10,5,1,NULL),(80,'2020-10-20',NULL,NULL,'5433545456454',0.15,NULL,NULL,10,5,1,NULL),(81,'2020-10-20',NULL,NULL,'6554464464646',0.15,NULL,NULL,10,5,1,NULL),(82,'2020-10-20',NULL,NULL,'4554355434353',0.15,NULL,NULL,10,5,1,NULL),(83,'2020-10-20',NULL,NULL,'4554645444554',0.15,NULL,NULL,10,5,1,NULL),(84,'2020-10-20',NULL,NULL,'4535543353345',0.15,NULL,NULL,10,5,1,NULL),(85,'2020-10-20',NULL,NULL,'5434545454545',0.15,NULL,NULL,10,5,1,NULL),(86,'2020-10-20',NULL,NULL,'4334543543545',0.15,NULL,NULL,10,5,1,NULL),(87,'2020-10-20',NULL,NULL,'5454335545433',0.15,NULL,NULL,10,5,1,NULL),(88,'2020-10-20',NULL,NULL,'3442234342432',0.15,NULL,NULL,10,5,1,NULL),(89,'2020-10-20',NULL,NULL,'6546466465664',0.15,NULL,NULL,10,5,1,NULL),(90,'2020-10-20',NULL,NULL,'4545335353453',0.15,NULL,NULL,10,5,1,NULL),(91,'2020-10-20',NULL,NULL,'6445465445445',0.15,NULL,NULL,10,5,1,NULL),(92,'2020-10-20',NULL,NULL,'5466545454456',0.15,NULL,NULL,10,5,1,NULL),(93,'2020-10-20',NULL,NULL,'3424342342343',0.15,NULL,NULL,10,5,1,NULL),(94,'2020-10-20',NULL,NULL,'5345345345435',0.15,NULL,NULL,10,5,1,NULL),(95,'2020-10-20',NULL,NULL,'4354353453453',0.15,NULL,NULL,10,5,1,NULL),(96,'2020-10-20',NULL,NULL,'4324234234324',0.15,NULL,NULL,10,5,1,NULL),(97,'2020-10-20',NULL,NULL,'5434345345345',0.15,NULL,NULL,10,5,1,NULL),(98,'2020-10-20',NULL,NULL,'3453453454544',0.15,NULL,NULL,10,5,1,NULL),(99,'2020-10-20',NULL,NULL,'3243242343242',0.15,NULL,NULL,10,5,1,NULL),(100,'2020-10-20',NULL,NULL,'2543453453453',0.15,NULL,NULL,10,5,1,NULL),(101,'2020-10-20',NULL,NULL,'3453453453443',0.15,NULL,NULL,10,5,1,NULL),(102,'2020-10-20',NULL,NULL,'4234234234234',0.15,NULL,NULL,10,5,1,NULL),(103,'2020-10-20',NULL,NULL,'5345345343545',0.15,NULL,NULL,10,5,1,NULL),(104,'2020-10-20',NULL,NULL,'3253454543543',0.15,NULL,NULL,10,5,1,NULL),(105,'2020-10-20',NULL,NULL,'5665565656565',0.15,NULL,NULL,10,5,1,NULL),(106,'2020-10-20',NULL,NULL,'4324324324324',0.15,NULL,NULL,10,5,1,NULL),(107,'2020-10-20',NULL,NULL,'4353453453453',0.15,NULL,NULL,10,5,1,NULL),(108,'2020-10-20',NULL,NULL,'4564646546546',0.15,NULL,NULL,10,5,1,NULL),(109,'2020-10-20',NULL,NULL,'6787876867867',0.15,NULL,NULL,10,5,1,NULL),(110,'2020-10-20',NULL,NULL,'3243243243232',0.15,NULL,NULL,10,5,1,NULL),(111,'2020-10-20',NULL,NULL,'5345345345345',0.15,NULL,NULL,10,5,1,NULL),(112,'2020-10-20',NULL,NULL,'3245435345435',0.15,NULL,NULL,10,5,1,NULL),(113,'2020-10-20',NULL,NULL,'4535345345345',0.15,NULL,NULL,10,5,1,NULL),(114,'2020-10-20',NULL,NULL,'4535345345345',0.15,NULL,NULL,10,5,1,NULL),(115,'2020-10-20',NULL,NULL,'5465465464564',0.15,NULL,NULL,10,5,1,NULL),(116,'2020-10-20',NULL,NULL,'3432435353453',0.15,NULL,NULL,10,5,1,NULL),(117,'2020-10-20',NULL,NULL,'4535345345345',0.15,NULL,NULL,10,5,1,NULL),(118,'2020-10-20',NULL,NULL,'5435345345345',0.15,NULL,NULL,10,5,1,NULL),(119,'2020-10-20',NULL,NULL,'4353453453453',0.15,NULL,NULL,10,5,1,NULL),(120,'2020-10-20',NULL,NULL,'5435435345345',0.15,NULL,NULL,10,5,1,NULL),(121,'2020-10-20',NULL,NULL,'4353453453453',0.15,NULL,NULL,10,5,1,NULL),(122,'2020-10-20',NULL,NULL,'6456456456455',0.15,NULL,NULL,10,5,1,NULL),(123,'2020-10-20',NULL,NULL,'6456456546544',0.15,NULL,NULL,10,5,1,NULL),(124,'2020-10-20',NULL,NULL,'3445345453454',0.15,NULL,NULL,10,5,1,NULL),(125,'2020-10-20',NULL,NULL,'3242342342342',0.15,NULL,NULL,10,5,1,NULL),(126,'2020-10-20',NULL,NULL,'4324324234324',0.15,NULL,NULL,10,5,1,NULL),(127,'2020-10-20',NULL,NULL,'2343242343242',0.15,NULL,NULL,10,5,1,NULL),(128,'2020-10-20',NULL,NULL,'3453453453453',0.15,NULL,NULL,10,5,1,NULL),(129,'2020-10-20',NULL,NULL,'3453453453453',0.15,NULL,NULL,10,5,1,NULL),(130,'2020-10-20',NULL,NULL,'4353453453453',0.15,NULL,NULL,10,5,1,NULL),(131,'2020-10-20',NULL,NULL,'4353454353435',0.15,NULL,NULL,10,5,1,NULL),(132,'2020-10-20',NULL,NULL,'3453453453453',0.15,NULL,NULL,10,5,1,NULL),(133,'2020-10-20',NULL,NULL,'3243242343243',0.15,NULL,NULL,10,5,1,NULL),(134,'2020-10-20',NULL,NULL,'5345345345343',0.15,NULL,NULL,10,5,1,NULL),(135,'2020-10-20',NULL,NULL,'6554645645645',0.15,NULL,NULL,10,5,1,NULL),(136,'2020-10-20',NULL,NULL,'4234234324324',0.15,NULL,NULL,10,5,1,NULL),(137,'2020-10-20',NULL,NULL,'4353453453454',0.15,NULL,NULL,10,5,1,NULL),(138,'2020-10-20',NULL,NULL,'4543534534534',0.15,NULL,NULL,10,5,1,NULL),(139,'2020-10-20',NULL,NULL,'6464564564564',0.15,NULL,NULL,10,5,1,NULL),(140,'2020-10-20',NULL,NULL,'5435345345345',0.15,NULL,NULL,10,5,1,NULL),(141,'2020-10-20',NULL,NULL,'4534534534534',0.15,NULL,NULL,10,5,1,NULL),(142,'2020-10-20',NULL,NULL,'3242342343242',0.15,NULL,NULL,10,5,1,NULL),(143,'2020-10-20',NULL,NULL,'4566546546546',0.15,NULL,NULL,10,5,1,NULL),(144,'2020-10-20',NULL,NULL,'3432423423423',0.15,NULL,NULL,10,5,1,NULL),(145,'2020-10-20',NULL,NULL,'3242432432432',0.15,NULL,NULL,10,5,1,NULL),(146,'2020-10-20',NULL,NULL,'5345345345345',0.15,NULL,NULL,10,5,1,NULL),(147,'2020-10-20',NULL,NULL,'2342342343243',0.15,NULL,NULL,10,5,1,NULL),(148,'2020-10-20',NULL,NULL,'5344534534534',0.15,NULL,NULL,10,5,1,NULL),(149,'2020-10-20',NULL,NULL,'4535435345345',0.15,NULL,NULL,10,5,1,NULL),(150,'2020-10-20',NULL,NULL,'5345345345345',0.15,NULL,NULL,10,5,1,NULL),(151,'2020-10-20',NULL,NULL,'4353453453453',0.15,NULL,NULL,10,5,1,NULL),(152,'2020-10-20',NULL,NULL,'4324234324324',0.15,NULL,NULL,10,5,1,NULL),(153,'2020-10-20',NULL,NULL,'4324324234234',0.15,NULL,NULL,10,5,1,NULL),(154,'2020-10-20',NULL,NULL,'5435345345345',0.15,NULL,NULL,10,5,1,NULL),(155,'2020-10-20',NULL,NULL,'5464564564564',0.15,NULL,NULL,10,5,1,NULL),(156,'2020-10-20',NULL,NULL,'3424323423423',0.15,NULL,NULL,10,5,1,NULL),(157,'2020-10-22',NULL,NULL,'3534543534534',0.15,NULL,NULL,10,5,1,NULL),(158,'2020-10-22',NULL,NULL,'4565464565465',0.15,NULL,NULL,10,5,1,NULL),(159,'2020-10-22',NULL,NULL,'4543543543543',0.15,NULL,NULL,10,5,1,NULL),(160,'2020-10-22',NULL,NULL,'2343243243242',0.15,NULL,NULL,10,5,1,NULL),(161,'2020-10-22',NULL,NULL,'3432543534534',0.15,NULL,NULL,10,5,1,NULL),(162,'2020-10-22',NULL,NULL,'5435345345345',0.15,NULL,NULL,10,5,1,NULL),(163,'2020-10-22',NULL,NULL,'5435345345345',0.15,NULL,NULL,10,5,1,NULL),(164,'2020-10-22',NULL,NULL,'4534534534534',0.15,NULL,NULL,10,5,1,NULL),(165,'2020-10-22',NULL,NULL,'5443534543543',0.15,NULL,NULL,10,5,1,NULL),(166,'2020-10-22',NULL,NULL,'2342342342342',0.15,NULL,NULL,10,5,1,NULL),(167,'2020-10-22',NULL,NULL,'4354353454353',0.15,NULL,NULL,10,5,1,NULL),(168,'2020-10-22',NULL,NULL,'5345345345534',0.15,NULL,NULL,10,5,1,NULL),(169,'2020-10-22',NULL,NULL,'3242342343243',0.15,NULL,NULL,10,5,1,NULL),(170,'2020-10-22',NULL,NULL,'4535345435345',0.15,NULL,NULL,10,5,1,NULL),(171,'2020-10-22',NULL,NULL,'4324234234234',0.15,NULL,NULL,10,5,1,NULL),(172,'2020-10-22',NULL,NULL,'3245435345345',0.15,NULL,NULL,10,5,1,NULL),(173,'2020-10-22',NULL,NULL,'4354353453454',0.15,NULL,NULL,10,5,1,NULL),(174,'2020-10-22',NULL,NULL,'5345345345345',0.15,NULL,NULL,10,5,1,NULL),(175,'2020-10-22',NULL,NULL,'4234234234324',0.15,NULL,NULL,10,5,1,NULL),(176,'2020-10-22',NULL,NULL,'4234243243243',0.15,NULL,NULL,10,5,1,NULL),(177,'2020-10-22',NULL,NULL,'4234234234234',0.15,NULL,NULL,10,5,1,NULL),(178,'2020-10-22',NULL,NULL,'4534534435345',0.15,NULL,NULL,10,5,1,NULL),(179,'2020-10-22',NULL,NULL,'4324234234234',0.15,NULL,NULL,10,5,1,NULL),(180,'2020-10-22',NULL,NULL,'4535345345345',0.15,NULL,NULL,10,5,1,NULL),(181,'2020-10-22',NULL,NULL,'4234234234234',0.15,NULL,NULL,10,5,1,NULL),(182,'2020-10-22',NULL,NULL,'4324324324234',0.15,NULL,NULL,10,5,1,NULL),(183,'2020-10-22',NULL,NULL,'4324234324324',0.15,NULL,NULL,10,5,1,NULL),(184,'2020-10-22',NULL,NULL,'5345343453453',0.15,NULL,NULL,10,5,1,NULL),(185,'2020-10-22',NULL,NULL,'4324234234234',0.15,NULL,NULL,10,5,1,NULL),(186,'2020-10-22',NULL,NULL,'3424234234324',0.15,NULL,NULL,10,5,1,NULL),(187,'2020-10-22',NULL,NULL,'4324324234234',0.15,NULL,NULL,10,5,1,NULL),(188,'2020-10-22',NULL,NULL,'4234234234234',0.15,NULL,NULL,10,5,1,NULL),(189,'2020-10-22',NULL,NULL,'3424234234234',0.15,NULL,NULL,10,5,1,NULL),(190,'2020-10-22',NULL,NULL,'4354353453453',0.15,NULL,NULL,10,5,1,NULL),(191,'2020-10-22',NULL,NULL,'5434534534534',0.15,NULL,NULL,10,5,1,NULL),(192,'2020-10-22',NULL,NULL,'5345345543534',0.15,NULL,NULL,10,5,1,NULL),(193,'2020-10-22',NULL,NULL,'4543534534534',0.15,NULL,NULL,10,5,1,NULL),(194,'2020-10-22',NULL,NULL,'3243242343242',0.15,NULL,NULL,10,5,1,NULL),(195,'2020-10-22',NULL,NULL,'4234234234234',0.15,NULL,NULL,10,5,1,NULL),(196,'2020-10-22',NULL,NULL,'4324324324324',0.15,NULL,NULL,10,5,1,NULL),(197,'2020-10-22',NULL,NULL,'4234324234234',0.15,NULL,NULL,10,5,1,NULL),(198,'2020-10-22',NULL,NULL,'4324324234234',0.15,NULL,NULL,10,5,1,NULL),(199,'2020-10-22',NULL,NULL,'4324232342342',0.15,NULL,NULL,10,5,1,NULL),(200,'2020-10-22',NULL,NULL,'4324324324234',0.15,NULL,NULL,10,5,1,NULL),(201,'2020-10-22',NULL,NULL,'4324234234234',0.15,NULL,NULL,10,5,1,NULL),(202,'2020-10-22',NULL,NULL,'3242342342342',0.15,NULL,NULL,10,5,1,NULL),(203,'2020-10-22',NULL,NULL,'4324234234324',0.15,NULL,NULL,10,5,1,NULL),(204,'2020-10-22',NULL,NULL,'4234234324234',0.15,NULL,NULL,10,5,1,NULL),(205,'2020-10-22',NULL,NULL,'4324234234324',0.15,NULL,NULL,10,5,1,NULL),(206,'2020-10-22',NULL,NULL,'4234234234234',0.15,NULL,NULL,10,5,1,NULL),(207,'2020-10-22',NULL,NULL,'4234234324234',0.15,NULL,NULL,10,5,1,NULL),(208,'2020-10-22',NULL,NULL,'1231231231231',0.15,NULL,NULL,10,5,1,NULL),(209,'2020-10-22',NULL,NULL,'3123123123123',0.15,NULL,NULL,10,5,1,NULL),(210,'2020-10-22',NULL,NULL,'4324234234234',0.15,NULL,NULL,10,5,1,NULL),(211,'2020-10-22',NULL,NULL,'4454543534534',0.15,NULL,NULL,10,5,1,NULL),(212,'2020-10-22',NULL,NULL,'4324234234324',0.15,NULL,NULL,10,5,1,NULL),(213,'2020-10-22',NULL,NULL,'4234234432324',0.15,NULL,NULL,10,5,1,NULL),(214,'2020-10-22',NULL,NULL,'3242343243242',0.15,NULL,NULL,10,5,1,NULL),(215,'2020-10-22',NULL,NULL,'4324234234234',0.15,NULL,NULL,10,5,1,NULL),(216,'2020-10-22',NULL,NULL,'4324324234234',0.15,NULL,NULL,10,5,1,NULL),(217,'2020-10-22',NULL,NULL,'4234234234324',0.15,NULL,NULL,10,5,1,NULL),(218,'2020-10-22',NULL,NULL,'4234234234234',0.15,NULL,NULL,10,5,1,NULL),(219,'2020-10-22',NULL,NULL,'4324234234234',0.15,NULL,NULL,10,5,1,NULL),(220,'2020-10-22',NULL,NULL,'4322342342342',0.15,NULL,NULL,10,5,1,NULL),(221,'2020-10-22',NULL,NULL,'4324234234233',0.15,NULL,NULL,10,5,1,NULL),(222,'2020-10-22',NULL,NULL,'4324234324234',0.15,NULL,NULL,10,5,1,NULL),(223,'2020-10-23',NULL,NULL,'3243242342342',0.15,NULL,NULL,10,5,1,NULL),(224,'2020-10-23',NULL,NULL,'3432423423423',0.15,NULL,NULL,10,5,1,NULL),(225,'2020-10-23',NULL,NULL,'4234234234234',0.15,NULL,NULL,10,5,1,NULL),(226,'2020-10-23',NULL,NULL,'4324234234234',0.15,NULL,NULL,10,5,1,NULL),(227,'2020-10-23',NULL,NULL,NULL,0.15,1,NULL,10,5,1,NULL),(228,'2020-10-23',NULL,NULL,NULL,0.15,11,NULL,10,5,1,NULL),(229,'2020-10-23',NULL,NULL,NULL,0.15,8,NULL,10,5,1,NULL),(230,'2020-10-23',NULL,NULL,NULL,0.15,11,NULL,10,5,1,NULL),(231,'2020-10-23',NULL,NULL,NULL,0.15,14,NULL,10,5,1,NULL),(232,'2020-10-23',NULL,NULL,NULL,0.15,4,NULL,8,5,1,NULL),(233,'2020-10-23','2020-12-24','2020-12-29',NULL,0.15,8,NULL,9,6,2,1),(234,'2020-10-23',NULL,NULL,NULL,0.15,8,NULL,8,5,1,NULL),(235,'2020-10-23',NULL,NULL,NULL,0.15,8,NULL,10,6,2,2),(236,'2020-10-23',NULL,NULL,NULL,0.15,8,NULL,8,6,2,1),(237,'2020-10-23',NULL,NULL,NULL,0.15,4,NULL,8,5,1,NULL),(238,'2020-10-23',NULL,NULL,NULL,0.15,8,NULL,10,6,2,3),(239,'2020-10-23',NULL,NULL,NULL,0.15,12,NULL,10,6,2,3),(240,'2020-10-23',NULL,NULL,NULL,0.15,8,NULL,8,6,2,3),(241,'2020-10-23',NULL,NULL,NULL,0.15,2,NULL,10,5,1,NULL),(242,'2020-10-23',NULL,NULL,'3244324235435',0.15,NULL,NULL,10,5,1,NULL),(243,'2020-10-23',NULL,NULL,NULL,0.15,8,NULL,10,5,1,NULL),(244,'2020-10-23',NULL,NULL,NULL,0.15,4,NULL,8,6,2,1),(245,'2020-10-23',NULL,NULL,NULL,0.15,8,NULL,10,5,1,NULL),(246,'2020-10-23',NULL,NULL,NULL,0.15,11,NULL,8,5,1,NULL),(247,'2020-10-23',NULL,NULL,NULL,0.15,11,NULL,10,6,2,1),(248,'2020-10-23','2020-10-29','2020-10-30',NULL,0.15,8,NULL,9,5,1,NULL),(249,'2020-10-23',NULL,NULL,NULL,0.15,14,NULL,10,5,1,NULL),(250,'2020-10-25',NULL,NULL,'3423423423423',0.15,NULL,NULL,10,5,1,NULL),(251,'2020-10-25',NULL,NULL,NULL,0.15,4,NULL,10,5,1,NULL),(252,'2020-10-25','2020-10-30','2020-10-31',NULL,0.15,10,NULL,9,6,2,1),(253,'2020-10-28',NULL,NULL,'4234234324324',0.15,NULL,NULL,10,5,1,NULL),(254,'2020-10-28',NULL,NULL,NULL,0.15,11,NULL,10,6,2,3),(255,'2020-10-28',NULL,NULL,'4324234234233',0.15,NULL,NULL,10,5,1,NULL),(256,'2020-10-30',NULL,NULL,'4535734753475',0.15,NULL,NULL,10,5,1,NULL),(257,'2020-11-05',NULL,NULL,'0801199909123',0.15,NULL,NULL,10,5,1,NULL),(258,'2020-11-05',NULL,NULL,'0801199909123',0.15,NULL,NULL,10,5,1,NULL),(259,'2020-11-05',NULL,NULL,'0801199909123',0.15,NULL,NULL,10,5,1,NULL),(260,'2020-11-05',NULL,NULL,'4234324324234',0.15,NULL,NULL,10,5,1,NULL),(261,'2020-11-05',NULL,NULL,'3424324324323',0.15,NULL,NULL,10,5,1,NULL),(262,'2020-11-05',NULL,NULL,'3432423432432',0.15,NULL,NULL,10,5,1,NULL),(263,'2020-11-05',NULL,NULL,'3243243242343',0.15,NULL,NULL,10,5,1,NULL),(264,'2020-11-05',NULL,NULL,'4324234324324',0.15,NULL,NULL,10,5,1,NULL),(265,'2020-11-05',NULL,NULL,'4324234234234',0.15,NULL,NULL,10,5,1,NULL),(266,'2020-11-05',NULL,NULL,NULL,0.15,2,NULL,8,6,2,2),(267,'2020-12-04',NULL,NULL,'4234234234234',0.15,NULL,NULL,10,5,1,NULL),(268,'2020-12-04',NULL,NULL,NULL,0.15,4,NULL,8,6,2,1),(269,'2020-12-08',NULL,NULL,'4234234234234',0.15,NULL,NULL,10,5,1,NULL),(270,'2020-12-08',NULL,NULL,NULL,0.15,18,NULL,10,5,1,NULL),(271,'2020-12-08','2020-12-28','2020-12-30',NULL,0.15,2,NULL,9,5,1,NULL),(272,'2020-12-08',NULL,NULL,'4324324234234',0.15,NULL,NULL,10,5,1,NULL),(273,'2020-12-08','2020-12-25','2020-12-30',NULL,0.15,19,NULL,9,6,2,1),(274,'2020-12-08',NULL,NULL,'3243242343243',0.15,NULL,NULL,10,5,1,NULL),(275,'2020-12-08','2020-12-16','2020-12-23',NULL,0.15,8,NULL,9,6,2,3);
/*!40000 ALTER TABLE `ventas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'variedades_kyd'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-22 15:55:08
