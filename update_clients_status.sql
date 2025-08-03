-- Update all existing clients to status 1 (active/approved)
-- This script sets all current clients as approved since we're changing the status logic

UPDATE Clients 
SET status = 1 
WHERE status = 0;

-- Verify the update
SELECT 
    COUNT(*) as total_clients,
    SUM(CASE WHEN status = 1 THEN 1 ELSE 0 END) as active_clients,
    SUM(CASE WHEN status = 0 THEN 1 ELSE 0 END) as pending_clients,
    SUM(CASE WHEN status = 2 THEN 1 ELSE 0 END) as rejected_clients
FROM Clients;

-- Show sample of updated clients
SELECT 
    id,
    name,
    contact,
    region,
    status,
    created_at
FROM Clients 
ORDER BY created_at DESC 
LIMIT 10; 