#!/bin/bash

# Migration Script: woosh-api to NestJS
# This script helps migrate from the old Node.js/Express API to the new NestJS API

echo "🚀 Starting migration from woosh-api to NestJS..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the nestJs directory"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  Warning: .env file not found. Creating from example..."
    if [ -f "env.example" ]; then
        cp env.example .env
        echo "✅ Created .env file from example"
    else
        echo "❌ Error: env.example file not found"
        exit 1
    fi
fi

# Create uploads directory if it doesn't exist
if [ ! -d "uploads" ]; then
    echo "📁 Creating uploads directory..."
    mkdir -p uploads
fi

# Build the project
echo "🔨 Building the project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi

# Start the development server
echo "🌐 Starting development server..."
echo "📝 The API will be available at http://localhost:3000"
echo "📝 You can now update your Flutter app to use the new API endpoints"
echo ""
echo "🔧 To stop the server, press Ctrl+C"
echo "📚 For more information, see MIGRATION_GUIDE.md"

npm run start:dev 