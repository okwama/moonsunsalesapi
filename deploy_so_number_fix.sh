#!/bin/bash

# Deploy SO number fix script
# This script fixes duplicate SO numbers in the database

echo "Starting SO number fix deployment..."

# Database connection details (update these as needed)
DB_HOST="localhost"
DB_NAME="citlogis_finance"
DB_USER="root"
DB_PASS=""

# Run the fix script
echo "Running SO number fix script..."
mysql -h $DB_HOST -u $DB_USER -p$DB_PASS $DB_NAME < fix_duplicate_so_numbers.sql

if [ $? -eq 0 ]; then
    echo "SO number fix completed successfully!"
else
    echo "Error: SO number fix failed!"
    exit 1
fi

echo "Deployment completed!" 