#!/bin/bash

# Render Build Script for AggieX Website
echo "🚀 Starting AggieX build process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🗄️ Generating Prisma client..."
npx prisma generate

# Build the frontend
echo "🏗️ Building frontend..."
npm run build

echo "✅ Build completed successfully!" 