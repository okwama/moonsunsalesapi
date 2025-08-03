#!/bin/bash

# Deploy Clock Sessions Stored Procedure
echo "🚀 Deploying Clock Sessions Stored Procedure..."

# Read database credentials from .env
source .env

# Execute the stored procedure
mysql -h $DB_HOST -u $DB_USERNAME -p$DB_PASSWORD $DB_DATABASE < create_clock_sessions_procedure.sql

if [ $? -eq 0 ]; then
    echo "✅ Clock sessions stored procedure deployed successfully!"
    echo "📊 Procedure: GetClockSessions"
    echo "🔧 Parameters: userId, startDate, endDate, limit"
else
    echo "❌ Failed to deploy clock sessions stored procedure"
    exit 1
fi

echo "🎯 Ready to use optimized clock session fetching!" 