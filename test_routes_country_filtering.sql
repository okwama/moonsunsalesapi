-- Test script to verify routes country filtering functionality
-- This shows how routes are filtered by country_id

-- 1. Show all routes in the database (before filtering)
SELECT 
    id,
    name,
    region,
    region_name,
    country_id,
    country_name,
    leader_id,
    leader_name,
    status
FROM routes
ORDER BY country_id, name;

-- 2. Show routes for specific countries
-- Kenya (country_id = 1)
SELECT 
    id,
    name,
    region_name,
    country_name,
    leader_name,
    status
FROM routes
WHERE country_id = 1
ORDER BY name;

-- Uganda (country_id = 2) - if exists
SELECT 
    id,
    name,
    region_name,
    country_name,
    leader_name,
    status
FROM routes
WHERE country_id = 2
ORDER BY name;

-- Tanzania (country_id = 3) - if exists
SELECT 
    id,
    name,
    region_name,
    country_name,
    leader_name,
    status
FROM routes
WHERE country_id = 3
ORDER BY name;

-- 3. Show active routes by country
SELECT 
    country_id,
    country_name,
    COUNT(*) as total_routes,
    SUM(CASE WHEN status = 1 THEN 1 ELSE 0 END) as active_routes
FROM routes
GROUP BY country_id, country_name
ORDER BY country_id;

-- 4. Test specific user scenarios
-- User from Kenya (country_id = 1) should only see Kenyan routes
SELECT 
    'Kenyan User' as user_type,
    COUNT(*) as accessible_routes
FROM routes
WHERE country_id = 1;

-- User from Uganda (country_id = 2) should only see Ugandan routes
SELECT 
    'Ugandan User' as user_type,
    COUNT(*) as accessible_routes
FROM routes
WHERE country_id = 2;

-- 5. Show routes by region within a country
-- Kenyan routes by region
SELECT 
    region,
    region_name,
    COUNT(*) as route_count
FROM routes
WHERE country_id = 1
GROUP BY region, region_name
ORDER BY region; 