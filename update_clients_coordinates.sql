-- Update longitude and latitude for all clients to default values
-- Default coordinates for Nairobi, Kenya

UPDATE `Clients` 
SET 
    `latitude` = -1.2921,  -- Default latitude for Nairobi
    `longitude` = 36.8219  -- Default longitude for Nairobi
WHERE `latitude` IS NULL OR `longitude` IS NULL;

-- Alternative: Update ALL clients regardless of current values
-- UPDATE `Clients` 
-- SET 
--     `latitude` = -1.2921,
--     `longitude` = 36.8219;

-- Verify the update
SELECT COUNT(*) as total_clients, 
       COUNT(latitude) as clients_with_latitude,
       COUNT(longitude) as clients_with_longitude
FROM `Clients`;
