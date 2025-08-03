-- Test script to verify client route update functionality
-- This shows the before and after state when a journey plan is created

-- 1. Show current client route information
SELECT 
    c.id as client_id,
    c.name as client_name,
    c.route_id as current_route_id,
    c.route_name as current_route_name,
    c.route_id_update as current_route_id_update,
    c.route_name_update as current_route_name_update
FROM Clients c
WHERE c.id = 123; -- Replace with actual client ID

-- 2. Show sales rep route information
SELECT 
    sr.id as salesrep_id,
    sr.name as salesrep_name,
    sr.route_id as salesrep_route_id,
    sr.route as salesrep_route_name
FROM SalesRep sr
WHERE sr.id = 94; -- Replace with actual sales rep ID

-- 3. Show journey plan information (ordered by date instead of created_at)
SELECT 
    jp.id as journey_plan_id,
    jp.clientId,
    jp.userId,
    jp.routeId,
    jp.date,
    jp.status
FROM JourneyPlan jp
ORDER BY jp.date DESC, jp.id DESC
LIMIT 5;

-- 4. After creating a journey plan, check if client route was updated
-- Run this after creating a journey plan to verify the update
SELECT 
    c.id as client_id,
    c.name as client_name,
    c.route_id as updated_route_id,
    c.route_name as updated_route_name,
    c.route_id_update as updated_route_id_update,
    c.route_name_update as updated_route_name_update
FROM Clients c
WHERE c.id = 123; -- Replace with actual client ID 