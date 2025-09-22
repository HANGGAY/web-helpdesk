-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: helpdesk
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `category_name` (`category_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Hardware','2025-09-13 13:13:32','2025-09-13 13:13:32'),(2,'Network','2025-09-13 13:13:32','2025-09-13 13:13:32'),(3,'Software','2025-09-13 13:13:32','2025-09-13 13:13:32'),(4,'Sistem Operasi','2025-09-13 13:13:32','2025-09-13 13:13:32');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `published_by_user_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_news_user` (`published_by_user_id`),
  CONSTRAINT `fk_news_user` FOREIGN KEY (`published_by_user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_name` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin','2025-09-13 13:13:32','2025-09-13 13:13:32'),(2,'Technician','2025-09-13 13:13:32','2025-09-13 13:13:32'),(3,'User','2025-09-13 13:13:32','2025-09-13 13:13:32'),(4,'Manager','2025-09-13 13:13:32','2025-09-13 13:13:32');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_categories`
--

DROP TABLE IF EXISTS `sub_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `category_id` bigint unsigned NOT NULL,
  `sub_category_name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_category_subcategory` (`category_id`,`sub_category_name`),
  CONSTRAINT `fk_subcategories_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_categories`
--

LOCK TABLES `sub_categories` WRITE;
/*!40000 ALTER TABLE `sub_categories` DISABLE KEYS */;
INSERT INTO `sub_categories` VALUES (1,1,'Keyboard','2025-09-13 13:13:32','2025-09-13 13:13:32'),(2,1,'Mouse','2025-09-13 13:13:32','2025-09-13 13:13:32'),(3,1,'Barcode Scanner','2025-09-13 13:13:32','2025-09-13 13:13:32'),(4,1,'CCTV','2025-09-13 13:13:32','2025-09-13 13:13:32'),(5,1,'CPU','2025-09-13 13:13:32','2025-09-13 13:13:32'),(6,1,'Laptop','2025-09-13 13:13:32','2025-09-13 13:13:32'),(7,1,'Monitor','2025-09-13 13:13:32','2025-09-13 13:13:32'),(8,1,'PC','2025-09-13 13:13:32','2025-09-13 13:13:32'),(9,1,'Printer','2025-09-13 13:13:32','2025-09-13 13:13:32'),(10,1,'Telephone','2025-09-13 13:13:32','2025-09-13 13:13:32'),(11,2,'Internet','2025-09-13 13:13:32','2025-09-13 13:13:32'),(12,2,'Server','2025-09-13 13:13:32','2025-09-13 13:13:32'),(13,3,'Accurate','2025-09-13 13:13:32','2025-09-13 13:13:32'),(14,3,'WPS','2025-09-13 13:13:32','2025-09-13 13:13:32'),(15,3,'MS. Office','2025-09-13 13:13:32','2025-09-13 13:13:32'),(16,3,'Avast','2025-09-13 13:13:32','2025-09-13 13:13:32'),(17,3,'Browser (Chrome / Firefox)','2025-09-13 13:13:32','2025-09-13 13:13:32'),(18,3,'Installasi Lainnya','2025-09-13 13:13:32','2025-09-13 13:13:32'),(19,4,'Linux','2025-09-13 13:13:32','2025-09-13 13:13:32'),(20,4,'Windows','2025-09-13 13:13:32','2025-09-13 13:13:32');
/*!40000 ALTER TABLE `sub_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket_statuses`
--

DROP TABLE IF EXISTS `ticket_statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket_statuses` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `status_name` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `status_name` (`status_name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket_statuses`
--

LOCK TABLES `ticket_statuses` WRITE;
/*!40000 ALTER TABLE `ticket_statuses` DISABLE KEYS */;
INSERT INTO `ticket_statuses` VALUES (1,'Pending Approval','2025-09-13 13:13:32','2025-09-13 13:13:32'),(2,'In Progress','2025-09-13 13:13:32','2025-09-13 13:13:32'),(3,'Waiting for User Response','2025-09-13 13:13:32','2025-09-13 13:13:32'),(4,'Solved','2025-09-13 13:13:32','2025-09-13 13:13:32'),(5,'Closed','2025-09-13 13:13:32','2025-09-13 13:13:32'),(6,'Rejected','2025-09-13 13:13:32','2025-09-13 13:13:32');
/*!40000 ALTER TABLE `ticket_statuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket_types`
--

DROP TABLE IF EXISTS `ticket_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type_name` varchar(100) NOT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket_types`
--

LOCK TABLES `ticket_types` WRITE;
/*!40000 ALTER TABLE `ticket_types` DISABLE KEYS */;
INSERT INTO `ticket_types` VALUES (1,'Problem','Permasalahan umum pada sistem/hardware/software yang menghambat pekerjaan.','2025-09-14 14:45:16','2025-09-14 14:45:16'),(2,'Incident','Gangguan mendadak (misalnya error server, jaringan putus, aplikasi down).','2025-09-14 14:45:16','2025-09-14 14:45:16'),(3,'Other','Permintaan layanan IT seperti instalasi software, konfigurasi printer, pemasangan kabel, dll.','2025-09-14 14:45:16','2025-09-14 14:45:16');
/*!40000 ALTER TABLE `ticket_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket_updates`
--

DROP TABLE IF EXISTS `ticket_updates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket_updates` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `ticket_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `comment` text NOT NULL,
  `status_change` varchar(50) DEFAULT NULL,
  `progress_update` int DEFAULT NULL,
  `is_feedback` tinyint(1) DEFAULT '0',
  `reassigned_from_user_id` bigint unsigned DEFAULT NULL,
  `reassigned_to_user_id` bigint unsigned DEFAULT NULL,
  `reassignment_number` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_ticket_updates_ticket` (`ticket_id`),
  KEY `fk_ticket_updates_from` (`reassigned_from_user_id`),
  KEY `fk_ticket_updates_to` (`reassigned_to_user_id`),
  KEY `fk_ticket_updates_user` (`user_id`),
  CONSTRAINT `fk_ticket_updates_from` FOREIGN KEY (`reassigned_from_user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_ticket_updates_ticket` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_ticket_updates_to` FOREIGN KEY (`reassigned_to_user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_ticket_updates_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket_updates`
--

LOCK TABLES `ticket_updates` WRITE;
/*!40000 ALTER TABLE `ticket_updates` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticket_updates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tickets` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `ticket_code` varchar(50) NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `ticket_type_id` int DEFAULT NULL,
  `category_id` bigint unsigned NOT NULL,
  `sub_category_id` bigint unsigned NOT NULL,
  `urgency_id` bigint unsigned DEFAULT NULL,
  `subject` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `current_status_id` bigint unsigned NOT NULL,
  `assigned_to_user_id` bigint unsigned DEFAULT NULL,
  `assigned_by_user_id` bigint unsigned DEFAULT NULL,
  `approval_status` enum('Pending','Approved','Rejected') DEFAULT 'Pending',
  `progress_percentage` int DEFAULT '0',
  `feedback` text,
  `solved_at` timestamp NULL DEFAULT NULL,
  `closed_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ticket_code` (`ticket_code`),
  KEY `fk_tickets_category` (`category_id`),
  KEY `fk_tickets_subcategory` (`sub_category_id`),
  KEY `fk_tickets_urgency` (`urgency_id`),
  KEY `fk_tickets_status` (`current_status_id`),
  KEY `fk_tickets_assigned_to` (`assigned_to_user_id`),
  KEY `fk_tickets_assigned_by` (`assigned_by_user_id`),
  KEY `fk_ticket_type` (`ticket_type_id`),
  KEY `fk_tickets_user` (`user_id`),
  CONSTRAINT `fk_ticket_type` FOREIGN KEY (`ticket_type_id`) REFERENCES `ticket_types` (`id`),
  CONSTRAINT `fk_tickets_assigned_by` FOREIGN KEY (`assigned_by_user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_tickets_assigned_to` FOREIGN KEY (`assigned_to_user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_tickets_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_tickets_status` FOREIGN KEY (`current_status_id`) REFERENCES `ticket_statuses` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_tickets_subcategory` FOREIGN KEY (`sub_category_id`) REFERENCES `sub_categories` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_tickets_urgency` FOREIGN KEY (`urgency_id`) REFERENCES `urgencies` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_tickets_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickets`
--

LOCK TABLES `tickets` WRITE;
/*!40000 ALTER TABLE `tickets` DISABLE KEYS */;
/*!40000 ALTER TABLE `tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `urgencies`
--

DROP TABLE IF EXISTS `urgencies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `urgencies` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `urgency_level` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `urgency_level` (`urgency_level`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `urgencies`
--

LOCK TABLES `urgencies` WRITE;
/*!40000 ALTER TABLE `urgencies` DISABLE KEYS */;
INSERT INTO `urgencies` VALUES (1,'Low','2025-09-13 13:13:32','2025-09-13 13:13:32'),(2,'Medium','2025-09-13 13:13:32','2025-09-13 13:13:32'),(3,'High','2025-09-13 13:13:32','2025-09-13 13:13:32'),(4,'Urgent','2025-09-13 13:13:32','2025-09-13 13:13:32'),(5,'Top Management','2025-09-13 13:13:32','2025-09-13 13:13:32');
/*!40000 ALTER TABLE `urgencies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `role_id` bigint unsigned NOT NULL,
  `nrk` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `hashedPassword` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`nrk`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `nrk` (`nrk`),
  KEY `fk_users_role` (`role_id`),
  CONSTRAINT `fk_users_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (21,1,'2500150','admin@example.com','$2b$10$CKXbzjU8hHbC9Y5cK.eTn.6TJVwEeP7u.YF210Q9zxCAll5DbY1OK','Admin User','081111111111','Jakarta','2025-09-22 06:26:55',NULL),(22,2,'2500151','technician@example.com','$2b$10$4GprKAtxaYNXvVca7TRLL.3fX3V3FbKeS4qtuJr/M5PbnlayqVsnq','Technician User','081222222222','Bandung','2025-09-22 06:27:42',NULL),(24,3,'2500152','user@example.com','$2b$10$hpmzeJ./.7s6MfvNfd8gQ.o.bVucyFUKQQ/20E0ZbHOOOhKl/2Dv6','Regular User','081333333333','Karawang','2025-09-22 06:37:34',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-22 14:01:57
