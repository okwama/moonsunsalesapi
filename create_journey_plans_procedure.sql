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
    
    -- First result set: Get journey plans with client and user data (matching NestJS expectations)
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
        -- Client data (nested object format for NestJS)
        c.id as 'client.id',
        c.name as 'client.name',
        c.address as 'client.address',
        c.latitude as 'client.latitude',
        c.longitude as 'client.longitude',
        c.balance as 'client.balance',
        c.email as 'client.email',
        c.region_id as 'client.region_id',
        c.region as 'client.region',
        c.route_id as 'client.route_id',
        c.route_name as 'client.route_name',
        c.route_id_update as 'client.route_id_update',
        c.route_name_update as 'client.route_name_update',
        c.contact as 'client.contact',
        c.tax_pin as 'client.tax_pin',
        c.location as 'client.location',
        c.status as 'client.status',
        c.client_type as 'client.client_type',
        c.outlet_account as 'client.outlet_account',
        c.countryId as 'client.countryId',
        c.added_by as 'client.added_by',
        c.created_at as 'client.created_at',
        -- User data (nested object format for NestJS)
        u.id as 'user.id',
        u.name as 'user.name',
        u.email as 'user.email',
        u.phoneNumber as 'user.phoneNumber',
        u.password as 'user.password',
        u.countryId as 'user.countryId',
        u.country as 'user.country',
        u.region_id as 'user.region_id',
        u.region as 'user.region',
        u.route_id as 'user.route_id',
        u.route as 'user.route',
        u.route_id_update as 'user.route_id_update',
        u.route_name_update as 'user.route_name_update',
        u.visits_targets as 'user.visits_targets',
        u.new_clients as 'user.new_clients',
        u.vapes_targets as 'user.vapes_targets',
        u.pouches_targets as 'user.pouches_targets',
        u.role as 'user.role',
        u.manager_type as 'user.manager_type',
        u.status as 'user.status',
        u.createdAt as 'user.createdAt',
        u.updatedAt as 'user.updatedAt',
        u.retail_manager as 'user.retail_manager',
        u.key_channel_manager as 'user.key_channel_manager',
        u.distribution_manager as 'user.distribution_manager',
        u.photoUrl as 'user.photoUrl',
        u.managerId as 'user.managerId'
    FROM JourneyPlan jp
    LEFT JOIN Clients c ON jp.clientId = c.id
    LEFT JOIN SalesRep u ON jp.userId = u.id
    WHERE (p_userId = 0 OR jp.userId = p_userId)
        AND (p_status = -1 OR jp.status = p_status)
        AND jp.date >= start_date 
        AND jp.date < end_date
    ORDER BY jp.date DESC, jp.time DESC
    LIMIT p_limit OFFSET p_offset;
    
    -- Second result set: Get total count (for pagination)
    SELECT COUNT(*) as total
    FROM JourneyPlan jp
    WHERE (p_userId = 0 OR jp.userId = p_userId)
        AND (p_status = -1 OR jp.status = p_status)
        AND jp.date >= start_date 
        AND jp.date < end_date;
END //

DELIMITER ; 