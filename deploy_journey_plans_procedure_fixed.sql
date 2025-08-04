-- Drop existing procedure if it exists
DROP PROCEDURE IF EXISTS GetJourneyPlans;

-- Set delimiter for procedure creation
DELIMITER //

CREATE PROCEDURE GetJourneyPlans(
    IN p_userId INT,
    IN p_status INT,
    IN p_date DATE,
    IN p_page INT,
    IN p_limit INT,
    IN p_offset INT
)
BEGIN
    DECLARE start_date DATETIME;
    DECLARE end_date DATETIME;
    
    -- Set date range for the specified date
    SET start_date = p_date;
    SET end_date = DATE_ADD(p_date, INTERVAL 1 DAY);
    
    -- First result set: Get journey plans with client and user data
    SELECT 
        jp.id,
        jp.date,
        jp.time,
        jp.userId,
        jp.clientId,
        jp.status,
        jp.checkInTime,
        jp.latitude,
        jp.longitude,
        jp.imageUrl,
        jp.notes,
        jp.checkoutLatitude,
        jp.checkoutLongitude,
        jp.checkoutTime,
        jp.showUpdateLocation,
        jp.routeId,
        -- Client data
        c.id as client_id,
        c.name as client_name,
        c.address as client_address,
        c.latitude as client_latitude,
        c.longitude as client_longitude,
        c.balance as client_balance,
        c.email as client_email,
        c.region_id as client_region_id,
        c.region as client_region,
        c.route_id as client_route_id,
        c.route_name as client_route_name,
        c.route_id_update as client_route_id_update,
        c.route_name_update as client_route_name_update,
        c.contact as client_contact,
        c.tax_pin as client_tax_pin,
        c.location as client_location,
        c.status as client_status,
        c.client_type as client_client_type,
        c.outlet_account as client_outlet_account,
        c.countryId as client_countryId,
        c.added_by as client_added_by,
        c.created_at as client_created_at,
        -- User data
        u.id as user_id,
        u.name as user_name,
        u.email as user_email,
        u.phoneNumber as user_phoneNumber,
        u.password as user_password,
        u.countryId as user_countryId,
        u.country as user_country,
        u.region_id as user_region_id,
        u.region as user_region,
        u.route_id as user_route_id,
        u.route as user_route,
        u.route_id_update as user_route_id_update,
        u.route_name_update as user_route_name_update,
        u.visits_targets as user_visits_targets,
        u.new_clients as user_new_clients,
        u.vapes_targets as user_vapes_targets,
        u.pouches_targets as user_pouches_targets,
        u.role as user_role,
        u.manager_type as user_manager_type,
        u.status as user_status,
        u.createdAt as user_createdAt,
        u.updatedAt as user_updatedAt,
        u.retail_manager as user_retail_manager,
        u.key_channel_manager as user_key_channel_manager,
        u.distribution_manager as user_distribution_manager,
        u.photoUrl as user_photoUrl,
        u.managerId as user_managerId
    FROM JourneyPlan jp
    LEFT JOIN Clients c ON jp.clientId = c.id
    LEFT JOIN SalesRep u ON jp.userId = u.id
    WHERE (p_userId = 0 OR jp.userId = p_userId)
        AND (p_status = -1 OR jp.status = p_status)
        AND jp.date >= start_date 
        AND jp.date < end_date
    ORDER BY jp.date DESC, jp.time DESC
    LIMIT p_limit OFFSET p_offset;
    
    -- Second result set: Get total count
    SELECT COUNT(*) as total
    FROM JourneyPlan jp
    WHERE (p_userId = 0 OR jp.userId = p_userId)
        AND (p_status = -1 OR jp.status = p_status)
        AND jp.date >= start_date 
        AND jp.date < end_date;
END //

DELIMITER ; 