-- Migration: Create ProductExpiryReport table
-- Date: 2025-01-01

CREATE TABLE `ProductExpiryReport` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `journeyPlanId` int(11) NOT NULL,
  `clientId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `productName` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `expiryDate` date DEFAULT NULL,
  `batchNumber` varchar(100) DEFAULT NULL,
  `comments` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `ProductExpiryReport_journeyPlanId_idx` (`journeyPlanId`),
  KEY `ProductExpiryReport_clientId_idx` (`clientId`),
  KEY `ProductExpiryReport_userId_idx` (`userId`),
  KEY `ProductExpiryReport_expiryDate_idx` (`expiryDate`),
  CONSTRAINT `ProductExpiryReport_journeyPlanId_fkey` FOREIGN KEY (`journeyPlanId`) REFERENCES `JourneyPlan` (`id`) ON DELETE CASCADE,
  CONSTRAINT `ProductExpiryReport_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Clients` (`id`) ON DELETE CASCADE,
  CONSTRAINT `ProductExpiryReport_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `SalesRep` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
