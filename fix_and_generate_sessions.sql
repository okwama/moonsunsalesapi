-- Fix and Generate Clock In/Out Sessions
-- This script fixes existing issues and generates new sessions for August 1-18, 2025

-- =====================================================
-- PART 1: FIX EXISTING SESSION ISSUES
-- =====================================================

-- 1. Fix cross-day sessions (sessions that start and end on different days)
UPDATE LoginHistory 
SET sessionEnd = CONCAT(DATE(sessionStart), ' 18:00:00.000')
WHERE DATE(sessionStart) != DATE(sessionEnd) 
    AND sessionEnd IS NOT NULL;

-- 2. Fix sessions with unrealistic durations (over 8 hours = 480 minutes)
UPDATE LoginHistory 
SET duration = 480
WHERE duration > 480;

-- 3. Calculate missing durations for completed sessions
UPDATE LoginHistory 
SET duration = TIMESTAMPDIFF(MINUTE, sessionStart, sessionEnd)
WHERE duration IS NULL 
    AND sessionEnd IS NOT NULL 
    AND sessionStart IS NOT NULL;

-- 4. Fix sessions with zero or negative durations
UPDATE LoginHistory 
SET duration = 480
WHERE duration <= 0 
    AND sessionEnd IS NOT NULL;

-- 5. Ensure all completed sessions have reasonable end times (between 6-7 PM)
UPDATE LoginHistory 
SET sessionEnd = CONCAT(DATE(sessionStart), ' 18:30:00.000')
WHERE sessionEnd IS NOT NULL 
    AND TIME(sessionEnd) < '18:00:00'
    AND status = 2;

-- =====================================================
-- PART 2: GENERATE NEW SESSIONS FOR AUGUST 1-18, 2025
-- =====================================================

-- Clear any existing sessions for August 1-18, 2025 (if any)
DELETE FROM LoginHistory 
WHERE DATE(sessionStart) BETWEEN '2025-08-01' AND '2025-08-18';

-- Generate new sessions with specified time ranges
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
           LPAD(FLOOR(RAND() * 2.5 + 7), 2, '0'), ':',  -- Random hour between 7:00-9:30 AM
           LPAD(FLOOR(RAND() * 60), 2, '0'), ':',        -- Random minute
           LPAD(FLOOR(RAND() * 60), 2, '0'), '.000') as sessionStart,  -- Match existing format with milliseconds
    CASE 
        WHEN DATE(session_date) = CURDATE() THEN NULL  -- No end time for active session
        ELSE CONCAT(session_date, ' ', 
                   LPAD(FLOOR(RAND() * 2 + 18), 2, '0'), ':',  -- Random hour between 6:00-8:00 PM
                   LPAD(FLOOR(RAND() * 60), 2, '0'), ':',        -- Random minute
                   LPAD(FLOOR(RAND() * 60), 2, '0'), '.000')     -- Match existing format with milliseconds
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

-- =====================================================
-- PART 3: VERIFICATION AND REPORTING
-- =====================================================

-- Show summary of fixes and new data
SELECT 
    'FIXED SESSIONS' as category,
    COUNT(*) as count,
    'Sessions with issues that were corrected' as description
FROM LoginHistory 
WHERE DATE(sessionStart) < '2025-08-01'
    AND (duration > 480 OR duration <= 0 OR duration IS NULL OR DATE(sessionStart) != DATE(sessionEnd))
UNION ALL
SELECT 
    'NEW SESSIONS' as category,
    COUNT(*) as count,
    'New sessions created for August 1-18, 2025' as description
FROM LoginHistory 
WHERE DATE(sessionStart) BETWEEN '2025-08-01' AND '2025-08-18'
UNION ALL
SELECT 
    'TOTAL SESSIONS' as category,
    COUNT(*) as count,
    'Total sessions in database' as description
FROM LoginHistory;

-- Show sample of new sessions
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
    END as status_text,
    CONCAT(FLOOR(lh.duration/60), 'h ', MOD(lh.duration,60), 'm') as duration_formatted
FROM LoginHistory lh
JOIN SalesRep sr ON lh.userId = sr.id
WHERE lh.sessionStart >= '2025-08-01 00:00:00' 
    AND lh.sessionStart <= '2025-08-18 23:59:59'
ORDER BY sr.name, lh.sessionStart
LIMIT 20;

-- Show any remaining issues
SELECT 
    'REMAINING ISSUES' as issue_type,
    COUNT(*) as count,
    GROUP_CONCAT(id) as session_ids
FROM LoginHistory 
WHERE duration > 480 OR duration <= 0 OR duration IS NULL
GROUP BY 
    CASE 
        WHEN duration > 480 THEN 'Over 8 hours'
        WHEN duration <= 0 THEN 'Zero or negative duration'
        WHEN duration IS NULL THEN 'Missing duration'
    END;
