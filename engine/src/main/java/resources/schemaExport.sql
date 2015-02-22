CREATE DATABASE  IF NOT EXISTS `myscheduler` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `myscheduler`;
-- MySQL dump 10.13  Distrib 5.6.17, for Win32 (x86)
--
-- Host: 127.0.0.1    Database: myscheduler
-- ------------------------------------------------------
-- Server version	5.5.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_events`
--

DROP TABLE IF EXISTS `tbl_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_events` (
  `id` varchar(45) NOT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `text` varchar(1000) DEFAULT NULL,
  `id_type` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `paid` char(1) DEFAULT 'N',
  `price` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_events`
--

LOCK TABLES `tbl_events` WRITE;
/*!40000 ALTER TABLE `tbl_events` DISABLE KEYS */;
INSERT INTO `tbl_events` VALUES ('ef9fa6ec-8354-9404-d5d9-61f696893fd1','2015-01-14 01:00:00','2015-01-14 03:00:00','44 ',1,25,'N',0.00),('65416cbe-c97f-6c7c-bcb7-3e7a6857b092','2015-01-29 16:00:00','2015-01-29 18:00:00','Fra di Dio',3,1,'N',0.00),('23e13226-fa33-81b5-7e9b-ec49a032c27d','2015-01-31 05:00:00','2015-01-31 08:00:00','Fra di Dio',3,1,'N',0.00),('824cfb31-78e6-1bef-7bf5-48f579607b52','2015-01-29 10:00:00','2015-01-29 13:00:00','Gianni Merda',2,3,'N',0.00),('1c59b610-a2ac-1ffe-5fe5-db333c4ba688','2015-02-02 09:00:00','2015-02-02 14:00:00','questa si ',2,23,'Y',0.00),('19cd4e59-0757-06f0-9d25-a5cebdbfefaf','2015-01-13 03:00:00','2015-01-13 04:00:00','eeee ',3,27,'N',0.00),('2da755c9-deed-af6f-f906-d4d782e4d086','2015-01-07 03:00:00','2015-01-07 05:00:00','Fra di Dio',2,1,'N',0.00),('9ed9a2f8-0243-77a0-275f-05bba32ff9c5','2015-01-30 04:00:00','2015-01-30 06:00:00','pluto plutone',3,4,'N',0.00),('c1b5fc3d-4580-2265-7885-309cac3029ff','2015-01-01 00:00:00','2015-01-01 03:00:00','Fra di Dio',1,1,'N',0.00),('db77df79-585e-e9df-9021-348516cde889','2015-01-30 06:00:00','2015-01-30 11:00:00','questa si ',2,23,'N',0.00),('1720e0e3-b9e6-02b2-07a1-4dec0581b8de','2015-02-01 08:00:00','2015-02-01 11:00:00','Fra di Dio',1,1,'N',0.00),('8611568b-569c-f6d7-f235-d4ae3966c857','2015-02-01 14:00:00','2015-02-01 17:00:00','Simonetta Cippiciappi',2,2,'N',0.00),('ef2c0405-59f3-1985-6de5-dd6b843589b0','2015-02-01 11:00:00','2015-02-01 14:00:00','Simonetta Cippiciappi',2,1,'Y',0.00),('488590e1-daa1-1f09-0804-9242e6909a1c','2015-02-01 18:00:00','2015-02-01 21:00:00','Gianni Merda',2,3,'N',0.00),('e8b6deb9-8983-2590-a9b5-741b744a53bd','2015-02-01 03:00:00','2015-02-01 06:00:00','pluto plutone',3,4,'N',0.00),('0f746ffc-0a88-d53f-ddf7-24ccd4b9079d','2015-02-02 06:00:00','2015-02-02 08:00:00','Simonetta Cippiciappi',1,2,'Y',0.00),('caa4ff1a-f0eb-0d28-d978-452e8998c258','2015-02-03 02:00:00','2015-02-03 04:00:00','Napoleone ',1,7,'N',0.00),('2df5cb7c-63ec-af63-8a07-69426c55e77b','2015-02-08 11:00:00','2015-02-08 13:00:00','Simonetta Cippiciappi',1,2,'N',0.00),('108dd629-402b-8f65-4d0d-d1095d109662','2015-02-08 12:00:00','2015-02-08 15:00:00','Fra di Dio',2,1,'N',0.00),('72633c0f-07ea-7312-5fe9-0bc64d77d65f','2015-02-09 09:00:00','2015-02-09 11:00:00','Simonetta Cippiciappi',2,2,'N',0.00),('c1675dff-52c7-155e-f92a-91ec7ff4dafd','2015-02-09 10:00:00','2015-02-09 13:00:00','Fra di Dio',3,1,'N',0.00),('4bae37e3-2a5c-6ae8-6b57-06cb8ac2ad3a','2015-02-09 11:00:00','2015-02-09 14:00:00','Gianni Merda',4,3,'N',0.00),('910a3afd-ae9d-05b0-c1aa-b49c784f7da2','2015-02-09 15:00:00','2015-02-09 17:00:00','marzia marzi',2,6,'N',0.00),('b6799af7-5255-c928-75d6-5d4bb8a58e90','2015-02-09 15:00:00','2015-02-09 17:00:00','questa si ',3,23,'Y',55.00),('003c8c01-6e7e-14a8-ee96-8e22a03f3c2c','2015-02-18 08:00:00','2015-02-18 10:00:00','Fra di Dio',2,1,'N',0.00),('9db1442e-0b26-4116-fe85-cd0def9b8f03','2015-02-18 09:00:00','2015-02-18 11:00:00','Simonetta Cippiciappi',3,2,'N',0.00),('3b5fc08e-a159-df37-2005-5d8f5641efab','2015-02-18 11:00:00','2015-02-18 13:00:00','Gianni Merda',4,3,'N',0.00),('9b2cbdf5-c7f6-63f6-6eb7-b8228911bdf6','2015-02-18 13:00:00','2015-02-18 14:00:00','marzia marzi',2,6,'Y',48.00);
/*!40000 ALTER TABLE `tbl_events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_types`
--

DROP TABLE IF EXISTS `tbl_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(45) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `color` varchar(45) DEFAULT NULL,
  `w_active` varchar(1) DEFAULT 'Y',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_types`
--

LOCK TABLES `tbl_types` WRITE;
/*!40000 ALTER TABLE `tbl_types` DISABLE KEYS */;
INSERT INTO `tbl_types` VALUES (1,NULL,'test','Calcio 5',4.00,10,'#FFBA8C','N'),(2,NULL,'test 1','Calciotto',3.00,16,'#B8FFB8','Y'),(3,NULL,'boo','Calcio 11',2.70,22,'##8A9DFF','Y'),(4,NULL,'test','Calcio 5',5.00,10,'##FFBA8C','Y');
/*!40000 ALTER TABLE `tbl_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_users`
--

DROP TABLE IF EXISTS `tbl_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `surname` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `tel` varchar(45) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_users`
--

LOCK TABLES `tbl_users` WRITE;
/*!40000 ALTER TABLE `tbl_users` DISABLE KEYS */;
INSERT INTO `tbl_users` VALUES (1,'Fra','di Dio','tabuto83@gmail.com','06 666 755','user'),(2,'Simonetta','Cippiciappi','simoncina@sweetfuffy.com','06 666 999','user'),(3,'Gianni','Merda','g.merda@padremaronno.com','06 666 999','user'),(4,'pluto','plutone','pluto@disney.com','02 3456788',NULL),(5,'Alice','Drogata','alice@wonderland.com','09 666 999',NULL),(6,'marzia','marzi','marzi@marza.com','02 444 5321','user'),(7,'Napoleone','Bonaparte','n.bonaparte@france.fr','06 223 1239',''),(8,'Giancarlo','','','08 761821',NULL),(9,'mary','','','023 554332',NULL),(10,'booh','','','3544243',NULL),(11,'tets2','','','76553421',NULL),(12,'test4','','','65442321',NULL),(13,'prova','','','54433443232',NULL),(14,'prova9','','','34365765234',NULL),(15,'prova 10','','','654423',NULL),(16,'prova21','','','342323232',NULL),(17,'prova31','','','87654432',NULL),(18,'prova50','','','41235643',NULL),(19,'prova61','','','54235623',NULL),(20,'prova 99','','','53432',NULL),(21,'volta buona','','','65442334',NULL),(22,'volta buona 2','','','r543343243',NULL),(23,'questa si','','','5434343',NULL),(24,'','','','',NULL),(25,'44','','','',NULL),(26,'','','','',NULL),(27,'eeee','','','',NULL);
/*!40000 ALTER TABLE `tbl_users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-02-22 10:44:43
