#!/bin/bash
echo "🚀 Updating all existing clients to status 1 (active/approved)..."

source .env

# Run the SQL update
mysql -h $DB_HOST -u $DB_USERNAME -p$DB_PASSWORD $DB_DATABASE < update_clients_status.sql

if [ $? -eq 0 ]; then
    echo "✅ All existing clients updated to status 1 (active/approved)!"
    echo "📊 Client status summary:"
    mysql -h $DB_HOST -u $DB_USERNAME -p$DB_PASSWORD $DB_DATABASE -e "
    SELECT 
        COUNT(*) as total_clients,
        SUM(CASE WHEN status = 1 THEN 1 ELSE 0 END) as active_clients,
        SUM(CASE WHEN status = 0 THEN 1 ELSE 0 END) as pending_clients,
        SUM(CASE WHEN status = 2 THEN 1 ELSE 0 END) as rejected_clients
    FROM Clients;
    "
else
    echo "❌ Failed to update client statuses"
    exit 1
fi

echo "🎯 Client status logic now follows:"
echo "   - status = 0: Pending approval (new clients)"
echo "   - status = 1: Active/Approved clients"
echo "   - status = 2: Rejected clients" 