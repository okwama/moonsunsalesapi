-- Migration: Update Report Tables to use Product ID instead of Product Name
-- Date: 2025-01-01

-- Add productId column to ShowOfShelfReport table
ALTER TABLE `ShowOfShelfReport` 
ADD COLUMN `productId` int(11) DEFAULT NULL AFTER `productName`,
ADD KEY `ShowOfShelfReport_productId_idx` (`productId`),
ADD CONSTRAINT `ShowOfShelfReport_productId_fkey` 
FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE SET NULL;

-- Add productId column to ProductExpiryReport table
ALTER TABLE `ProductExpiryReport` 
ADD COLUMN `productId` int(11) DEFAULT NULL AFTER `productName`,
ADD KEY `ProductExpiryReport_productId_idx` (`productId`),
ADD CONSTRAINT `ProductExpiryReport_productId_fkey` 
FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE SET NULL;

-- Add productId column to ProductReport table (if not exists)
ALTER TABLE `ProductReport` 
ADD COLUMN `productId` int(11) DEFAULT NULL AFTER `productName`,
ADD KEY `ProductReport_productId_idx` (`productId`),
ADD CONSTRAINT `ProductReport_productId_fkey` 
FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE SET NULL;

-- Update existing records to link with products table (optional - for data migration)
-- This will be handled by the application logic when users select products
