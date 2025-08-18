-- Generate Clock In/Out Sessions for All Users
-- Date Range: August 1st to 18th, 2025 (excluding Sundays)
-- This script creates realistic work sessions for all sales representatives

-- First, let's get all active sales representatives
-- Then create sessions for each working day

INSERT INTO LoginHistory (userId, timezone, duration, status, sessionStart, sessionEnd)
SELECT 
    sr.id as userId,
    'Africa/Nairobi' as timezone,
    FLOOR(RAND() * (480 - 360) + 360) as duration, -- Random duration between 6-8 hours (360-480 minutes)
    CASE 
        WHEN DATE(session_date) = CURDATE() THEN 1  -- Active session for today
        ELSE 2  -- Completed session for past days
    END as status,
    CONCAT(session_date, ' ', 
           LPAD(FLOOR(RAND() * (9 - 7) + 7), 2, '0'), ':',  -- Random hour between 7-9 AM
           LPAD(FLOOR(RAND() * 60), 2, '0'), ':',            -- Random minute
           LPAD(FLOOR(RAND() * 60), 2, '0')) as sessionStart,
    CASE 
        WHEN DATE(session_date) = CURDATE() THEN NULL  -- No end time for active session
        ELSE CONCAT(session_date, ' ', 
                   LPAD(FLOOR(RAND() * (19 - 17) + 17), 2, '0'), ':',  -- Random hour between 5-7 PM
                   LPAD(FLOOR(RAND() * 60), 2, '0'), ':',              -- Random minute
                   LPAD(FLOOR(RAND() * 60), 2, '0'))                   -- Random second
    END as sessionEnd
FROM 
    SalesRep sr
CROSS JOIN (
    -- Generate working days from August 1st to 18th, 2025 (excluding Sundays)
    SELECT 
        DATE_ADD('2025-08-01', INTERVAL seq DAY) as session_date
    FROM (
        SELECT 0 as seq UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL
        SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL
        SELECT 10 UNION ALL SELECT 11 UNION ALL SELECT 12 UNION ALL SELECT 13 UNION ALL SELECT 14 UNION ALL
        SELECT 15 UNION ALL SELECT 16 UNION ALL SELECT 17
    ) days
    WHERE 
        DAYOFWEEK(DATE_ADD('2025-08-01', INTERVAL seq DAY)) != 1  -- Exclude Sundays (1 = Sunday)
        AND DATE_ADD('2025-08-01', INTERVAL seq DAY) <= '2025-08-18'
) working_days
WHERE 
    sr.status = 1  -- Only active sales representatives
    AND sr.role = 'SALES_REP'  -- Only sales representatives
ORDER BY 
    sr.id, session_date;

-- Verify the data was inserted correctly
SELECT 
    COUNT(*) as total_sessions_created,
    COUNT(CASE WHEN status = 1 THEN 1 END) as active_sessions,
    COUNT(CASE WHEN status = 2 THEN 1 END) as completed_sessions
FROM LoginHistory 
WHERE sessionStart >= '2025-08-01 00:00:00' 
    AND sessionStart <= '2025-08-18 23:59:59';

-- Show sample of created sessions
SELECT 
    lh.id,
    sr.name as sales_rep_name,
    lh.sessionStart,
    lh.sessionEnd,
    lh.duration,
    lh.status,
    CASE 
        WHEN lh.status = 1 THEN 'Active'
        ELSE 'Completed'
    END as status_text
FROM LoginHistory lh
JOIN SalesRep sr ON lh.userId = sr.id
WHERE lh.sessionStart >= '2025-08-01 00:00:00' 
    AND lh.sessionStart <= '2025-08-18 23:59:59'
ORDER BY sr.name, lh.sessionStart
LIMIT 20;
