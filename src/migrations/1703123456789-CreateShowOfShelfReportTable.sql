-- Migration: Create ShowOfShelfReport table
-- Date: 2025-01-01

CREATE TABLE `ShowOfShelfReport` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `journeyPlanId` int(11) NOT NULL,
  `clientId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `productName` varchar(255) NOT NULL,
  `totalItemsOnShelf` int(11) NOT NULL,
  `companyItemsOnShelf` int(11) NOT NULL,
  `comments` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `ShowOfShelfReport_journeyPlanId_idx` (`journeyPlanId`),
  KEY `ShowOfShelfReport_clientId_idx` (`clientId`),
  KEY `ShowOfShelfReport_userId_idx` (`userId`),
  CONSTRAINT `ShowOfShelfReport_journeyPlanId_fkey` FOREIGN KEY (`journeyPlanId`) REFERENCES `JourneyPlan` (`id`) ON DELETE CASCADE,
  CONSTRAINT `ShowOfShelfReport_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Clients` (`id`) ON DELETE CASCADE,
  CONSTRAINT `ShowOfShelfReport_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `SalesRep` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
