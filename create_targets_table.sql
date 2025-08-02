-- Create targets table
CREATE TABLE IF NOT EXISTS `targets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `salesRepId` int NOT NULL,
  `targetType` varchar(50) NOT NULL,
  `targetValue` int NOT NULL,
  `currentValue` int DEFAULT 0,
  `targetMonth` varchar(7) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `status` varchar(20) DEFAULT 'pending',
  `progress` int DEFAULT 0,
  `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_salesRepId` (`salesRepId`),
  KEY `idx_targetType` (`targetType`),
  KEY `idx_targetMonth` (`targetMonth`),
  KEY `idx_status` (`status`),
  CONSTRAINT `fk_targets_salesRep` FOREIGN KEY (`salesRepId`) REFERENCES `SalesRep` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci; 