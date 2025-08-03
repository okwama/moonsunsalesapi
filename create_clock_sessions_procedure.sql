DELIMITER //

CREATE PROCEDURE GetClockSessions(
    IN p_userId INT,
    IN p_startDate DATE,
    IN p_endDate DATE,
    IN p_limit INT DEFAULT 50
)
BEGIN
    -- Get session history with optional date range (only what Flutter expects)
    SELECT 
        id,
        userId,
        sessionStart,
        sessionEnd,
        duration,
        status,
        timezone,
        -- Formatted fields for frontend
        DATE_FORMAT(sessionStart, '%Y-%m-%d %H:%i:%s') as formattedStart,
        DATE_FORMAT(sessionEnd, '%Y-%m-%d %H:%i:%s') as formattedEnd,
        CASE 
            WHEN duration >= 60 THEN CONCAT(FLOOR(duration/60), 'h ', MOD(duration, 60), 'm')
            ELSE CONCAT(duration, 'm')
        END as formattedDuration,
        CASE WHEN status = 1 THEN 1 ELSE 0 END as isActive
    FROM LoginHistory 
    WHERE userId = p_userId
        AND (p_startDate IS NULL OR DATE(sessionStart) >= p_startDate)
        AND (p_endDate IS NULL OR DATE(sessionStart) <= p_endDate)
    ORDER BY sessionStart DESC
    LIMIT p_limit;
END //

DELIMITER ; 