#!/bin/bash

# Deploy Journey Plans Stored Procedure
echo "🚀 Deploying Journey Plans Stored Procedure..."

# Read database credentials from .env
source .env

# Execute the stored procedure
mysql -h $DB_HOST -u $DB_USERNAME -p$DB_PASSWORD $DB_DATABASE < create_journey_plans_procedure.sql

if [ $? -eq 0 ]; then
    echo "✅ Stored procedure deployed successfully!"
    echo "📊 Procedure: GetJourneyPlans"
    echo "🔧 Parameters: userId, status, date, page, limit, offset"
else
    echo "❌ Failed to deploy stored procedure"
    exit 1
fi

echo "🎯 Ready to use optimized journey plan fetching!" 