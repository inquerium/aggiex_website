#!/bin/bash

# Render build script for AggieX website
# This script ensures database migrations are run during deployment

echo "🚀 Starting AggieX deployment build..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Run database migrations
echo "🗄️ Running database migrations..."
npx prisma migrate deploy

# Build the application
echo "🏗️ Building application..."
npm run build

echo "✅ Build completed successfully!" 