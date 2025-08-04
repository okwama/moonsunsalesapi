-- Fix duplicate SO numbers in sales_orders table
-- This script identifies and fixes duplicate SO numbers

-- First, let's see if there are any duplicates
SELECT so_number, COUNT(*) as count
FROM sales_orders 
GROUP BY so_number 
HAVING COUNT(*) > 1
ORDER BY so_number;

-- If duplicates exist, we need to fix them
-- This script will update duplicate SO numbers to have unique values

-- Create a temporary table to store the duplicates with row numbers
CREATE TEMPORARY TABLE temp_duplicates AS
SELECT 
    id, 
    so_number,
    (@rn := IF(@prev = so_number, @rn + 1, 1)) as rn,
    (@prev := so_number) as prev_so
FROM sales_orders, (SELECT @rn := 0, @prev := '') as vars
WHERE so_number IN (
    SELECT so_number 
    FROM sales_orders 
    GROUP BY so_number 
    HAVING COUNT(*) > 1
)
ORDER BY so_number, id;

-- Update duplicate SO numbers (keeping the first one as is, updating others)
UPDATE sales_orders 
SET so_number = CONCAT(
    SUBSTRING(so_number, 1, LENGTH(so_number) - 4),
    LPAD(
        (SELECT rn FROM temp_duplicates WHERE temp_duplicates.id = sales_orders.id), 
        4, 
        '0'
    )
)
WHERE id IN (
    SELECT id 
    FROM temp_duplicates 
    WHERE rn > 1
);

-- Drop temporary table
DROP TEMPORARY TABLE IF EXISTS temp_duplicates;

-- Verify the fix
SELECT so_number, COUNT(*) as count
FROM sales_orders 
GROUP BY so_number 
HAVING COUNT(*) > 1
ORDER BY so_number;

-- Show the current SO numbers to verify they are unique
SELECT id, so_number, created_at 
FROM sales_orders 
ORDER BY so_number; 