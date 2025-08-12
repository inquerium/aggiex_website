# 🚀 AggieX Website - Complete Developer Guide

## 📋 Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Setup](#environment-setup)
- [Database Management](#database-management)
- [Email System](#email-system)
- [Admin Dashboard](#admin-dashboard)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## 🎯 Overview

AggieX is Texas A&M's premier startup accelerator, revolutionizing entrepreneurship education. This website serves as the digital hub for the AggieX ecosystem, featuring:

- **Accelerator Applications**: Student startup applications for the 12-week intensive program
- **Community Engagement**: Podcast, newsletter, and ecosystem updates
- **Admin Dashboard**: Contact analytics and system monitoring
- **Email Verification**: Secure email validation for all signups

### 🎪 Key Features
- **Real-time Application Processing**: Secure form submissions with email verification
- **Newsletter Management**: Podcast and community updates with subscriber management
- **Admin Analytics**: Hidden dashboard for contact and engagement analytics
- **Responsive Design**: Modern UI with Tailwind CSS and Framer Motion animations
- **Email Verification**: SendGrid-powered welcome and verification emails
- **Admin Notifications**: Pushover alerts for new applications and system events

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **React Router DOM** - Client-side routing
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Prisma** - Database ORM
- **PostgreSQL** - Database (Supabase)
- **SendGrid** - Email verification and welcome emails
- **Pushover** - Admin notifications and alerts

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **dotenv** - Environment management

---

## 📁 Project Structure

```
aggiex_website/
├── prisma/                    # Database schema and migrations
│   ├── schema.prisma         # Database schema
│   ├── migrations/           # Database migration files
│   └── seed.js              # Database seeding
├── public/                   # Static assets
│   ├── assets/              # Images and media
│   └── favicon.ico          # Site favicon
├── src/
│   ├── app/                 # Next.js app directory (if applicable)
│   ├── components/          # React components
│   │   ├── sections/        # Page sections
│   │   ├── ui/              # Reusable UI components
│   │   └── theme-provider.jsx
│   ├── context/             # React context providers
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   ├── pages/               # Page components
│   └── main.jsx            # App entry point
├── server.js               # Express backend server
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind configuration
├── vite.config.js          # Vite configuration
└── README.md              # This file
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** database (or Supabase account)
- **SendGrid** account for email functionality

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd aggiex_website
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Set up database**
```bash
npx prisma migrate dev
npx prisma generate
```

5. **Start development servers**
```bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend
node server.js
```

6. **Access the application**
- Frontend: http://localhost:5175 (or 5176 if 5175 is busy)
- Backend API: http://localhost:5176

---

## 🔧 Environment Setup

### Required Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@host:port/database"

# SendGrid Email Service (for verification and welcome emails)
SENDGRID_API_KEY="your_sendgrid_api_key_here"

# Frontend URL (for email verification links)
CORS_ORIGIN="http://localhost:5175"

# Pushover Notifications (for admin alerts)
PUSHOVER_USER="your_pushover_user"
PUSHOVER_TOKEN="your_pushover_token"

# Admin Dashboard Credentials (Backend - SECURE)
ADMIN_USERNAME="aggiex_admin_2025"
ADMIN_PASSWORD="aggiex2025secure"

# Node Environment
NODE_ENV="development"
```

### Environment Variable Descriptions

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Yes | `postgresql://user:pass@host:5432/db` |
| `SENDGRID_API_KEY` | SendGrid API key for verification emails | Yes | `SG.xxxxxxxxxxxxx` |
| `CORS_ORIGIN` | Frontend URL for CORS | Yes | `http://localhost:5175` |
| `PUSHOVER_USER` | Pushover user key for admin alerts | No | `u12345678` |
| `PUSHOVER_TOKEN` | Pushover app token for admin alerts | No | `a1b2c3d4e5f6g7h8` |
| `ADMIN_USERNAME` | Admin dashboard username (backend verification) | Yes | `aggiex_admin_2025` |
| `ADMIN_PASSWORD` | Admin dashboard password (backend verification) | Yes | `secure_password_here` |
| `NODE_ENV` | Node environment | No | `development` |

---

## 🗄️ Database Management

### Database Schema

The application uses Prisma ORM with the following main models:

#### Contact Model
```prisma
model Contact {
  id                    String   @id @default(cuid())
  email                 String   @unique
  firstName             String?
  lastName              String?
  phone                 String?
  source                String   // "podcast", "application", "newsletter"
  interests             String[]
  status                String   @default("active")
  newsletterSubscribed  Boolean  @default(true)
  podcastNotifications  Boolean  @default(true)
  lastEngagement        DateTime?
  engagementCount       Int      @default(0)
  
  // Email verification fields
  emailVerified         Boolean  @default(false)
  verificationToken     String?  @unique
  verificationExpires   DateTime?
  verificationSentAt    DateTime?
  
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt
  
  // Relations
  application           Application?
  newsletterRecipients  NewsletterRecipient[]
}
```

#### Application Model
```prisma
model Application {
  id                    String   @id @default(cuid())
  firstName             String
  lastName              String
  email                 String   @unique
  affiliation           String
  role                  String
  message               String
  newsletterSubscribed  Boolean  @default(true)
  podcastNotifications  Boolean  @default(true)
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt
  
  // Relations
  contact               Contact? @relation(fields: [email], references: [email])
}
```

### Database Commands

```bash
# Generate Prisma client
npx prisma generate

# Create new migration
npx prisma migrate dev --name migration_name

# Reset database (WARNING: Deletes all data)
npx prisma migrate reset --force

# View database in browser
npx prisma studio

# Seed database
node prisma/seed.js
```

---

## 📧 Email System

### Overview
The email system uses SendGrid exclusively for user-facing emails (verification and welcome emails). Admin notifications are handled by Pushover to avoid cluttering email inboxes. Different email templates are used based on the user's signup source (accelerator application vs podcast/newsletter).

### Email Flow

#### Accelerator Application
1. User submits application form
2. System creates contact record with `source: 'application'`
3. Sends accelerator welcome email with verification link
4. User clicks verification link
5. Email verified, sends confirmation email
6. User receives accelerator-specific next steps

#### Podcast/Newsletter Signup
1. User subscribes to podcast/newsletter
2. System creates contact record with `source: 'podcast'`
3. Sends podcast welcome email with verification link
4. User clicks verification link
5. Email verified, sends confirmation email
6. User receives podcast/newsletter updates

### Email Templates

#### Accelerator Welcome Email
- **Subject**: "🚀 Welcome to AggieX Accelerator - Verify Your Email"
- **Content**: Welcome message, verification link, accelerator timeline
- **Sent to**: Users who apply for the accelerator

#### Podcast Welcome Email
- **Subject**: "🎙️ Welcome to AggieX Podcast - Verify Your Email"
- **Content**: Welcome message, verification link, podcast information
- **Sent to**: Users who sign up for podcast/newsletter

#### Confirmation Emails
- **Accelerator**: "🎉 Email Verified - Welcome to AggieX Accelerator!"
- **Podcast**: "🎉 Email Verified - Welcome to AggieX Community!"

### SendGrid Setup

1. **Create SendGrid Account**
   - Sign up at [sendgrid.com](https://sendgrid.com)
   - Verify your account (free tier: 100 emails/day)

2. **Get API Key**
   - Go to Settings → API Keys
   - Create a new API Key with "Mail Send" permissions
   - Copy the API key to your `.env` file

3. **Verify Sender Domain (Recommended)**
   - Go to Settings → Sender Authentication
   - Verify your domain (improves deliverability)
   - Update the `from` email in `server.js` to use your verified domain

### Security Features
- **Token Expiration**: Verification tokens expire after 24 hours
- **Unique Tokens**: Each token is cryptographically secure
- **One-time Use**: Tokens are deleted after verification
- **Email Validation**: Emails are normalized (lowercase, trimmed)

### Admin Notifications
- **Pushover Integration**: Admin alerts for new applications and system events
- **No Email Spam**: Admin notifications use Pushover instead of email
- **Real-time Alerts**: Instant notifications for important events
- **Configurable**: Can be enabled/disabled via environment variables

---

## 🔐 Admin Dashboard

### Overview
The admin dashboard provides analytics and system monitoring. It's hidden by design for security and requires special access methods.

### Access Methods
1. **Keyboard Shortcut**: `Ctrl+Shift+A` (or `Cmd+Shift+A` on Mac)
2. **Alt Key**: Press `Alt+A`
3. **URL Hash**: Add `#admin` to any page URL
4. **Triple Click**: Triple-click anywhere on the page

### Features
- **Contact Analytics**: Total contacts, newsletter subscribers, podcast subscribers
- **Source Breakdown**: Statistics by signup source
- **System Health**: Database connection, server metrics
- **Authentication Logging**: All login attempts logged
- **Brute Force Protection**: 5 attempts, 5-minute lockout

### Security Features
- **Hidden Access**: Dashboard appears as "Page Not Found" initially
- **Backend Authentication**: Credentials verified on server, not client-side
- **Session Management**: Secure session tokens with 24-hour expiration
- **Backend Logging**: All login attempts logged with IP and user agent
- **Pushover Notifications**: Failed login attempts trigger security alerts
- **Rate Limiting**: 5 attempts, 5-minute lockout protection
- **Session Validation**: Server-side session validation on each request

### Credentials (Backend Verification)
- **Username**: Set in `ADMIN_USERNAME` environment variable
- **Password**: Set in `ADMIN_PASSWORD` environment variable
- **Security**: Credentials never exposed to frontend code

---

## 🌐 API Endpoints

### Application Endpoints

#### Submit Application
```http
POST /api/apply
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "affiliation": "Texas A&M University",
  "role": "Student",
  "message": "My startup idea...",
  "newsletterSubscribed": true,
  "podcastNotifications": true
}
```

#### Get Contact Analytics
```http
GET /api/contacts/analytics
Authorization: Bearer <admin_token>
```

### Email Endpoints

#### Send Verification Email
```http
POST /api/email/send-verification
Content-Type: application/json

{
  "email": "user@example.com",
  "firstName": "John",
  "source": "application" // or "podcast"
}
```

#### Verify Email
```http
GET /api/email/verify/:token
```

### Newsletter Endpoints

#### Subscribe to Newsletter
```http
POST /api/newsletter/subscribe
Content-Type: application/json

{
  "email": "user@example.com",
  "firstName": "John",
  "source": "podcast"
}
```

### Admin Endpoints

#### Admin Login (Secure Backend Authentication)
```http
POST /api/admin/login
Content-Type: application/json

{
  "username": "aggiex_admin_2025",
  "password": "secure_password"
}
```

#### Validate Admin Session
```http
POST /api/admin/validate-session
Content-Type: application/json

{
  "sessionToken": "your_session_token"
}
```

#### Admin Logout
```http
POST /api/admin/logout
Content-Type: application/json

{
  "sessionToken": "your_session_token"
}
```

#### Log Authentication Attempt (Legacy)
```http
POST /api/admin/auth-attempt
Content-Type: application/json

{
  "username": "admin",
  "success": true,
  "ipAddress": "192.168.1.1",
  "userAgent": "Mozilla/5.0..."
}
```

#### Get System Health
```http
GET /api/admin/health
```

#### Get Admin Logs
```http
GET /api/admin/logs
```

---

## 🚀 Deployment

### Production Environment Variables
```env
NODE_ENV="production"
CORS_ORIGIN="https://yourdomain.com"
DATABASE_URL="your_production_database_url"
SENDGRID_API_KEY="your_production_sendgrid_key"
```

### Build Commands
```bash
# Build frontend
npm run build

# Start production server
npm start
```

### Deployment Checklist
- [ ] Set production environment variables
- [ ] Configure production database
- [ ] Set up SendGrid production account
- [ ] Configure domain and SSL
- [ ] Set up monitoring and logging
- [ ] Test email functionality
- [ ] Verify admin dashboard access

---

## 🐛 Troubleshooting

### Common Issues

#### Frontend Issues
1. **Port already in use**
   ```bash
   # Kill process using port 5175
   lsof -ti:5175 | xargs kill -9
   ```

2. **Build errors**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

#### Backend Issues
1. **Database connection errors**
   ```bash
   # Check database connection
   npx prisma db push
   
   # Reset database
   npx prisma migrate reset --force
   ```

2. **Email not sending**
   ```bash
   # Test SendGrid API key
   curl -H "Authorization: Bearer YOUR_API_KEY" https://api.sendgrid.com/v3/user/profile
   
   # Test email endpoint
   curl -X POST http://localhost:5176/api/email/send-verification \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","firstName":"Test","source":"podcast"}'
   ```

3. **Admin notifications not working**
   ```bash
   # Check Pushover credentials
   curl -X POST https://api.pushover.net/1/messages.json \
     -d "token=YOUR_TOKEN&user=YOUR_USER&message=test&title=test"
   ```

3. **Environment variables not loading**
   ```bash
   # Check if .env file exists
   ls -la .env
   
   # Verify environment variables
   node -e "console.log(process.env.SENDGRID_API_KEY)"
   ```

#### Admin Dashboard Issues
1. **Can't access admin dashboard**
   - Try all access methods: `Ctrl+Shift+A`, `Alt+A`, `#admin`, triple-click
   - Check browser console for errors
   - Verify credentials in `.env` file

2. **Authentication failing**
   - Check `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `.env`
   - Clear browser session storage
   - Check server logs for authentication attempts

### Debug Commands
```bash
# Check server status
curl http://localhost:5176/api/admin/health

# Test database connection
npx prisma studio

# View server logs
tail -f server.log

# Check environment variables
node -e "console.log(process.env)"
```

### Log Locations
- **Server logs**: Console output when running `node server.js`
- **Frontend logs**: Browser developer console
- **Database logs**: Prisma Studio or database client
- **Email logs**: SendGrid dashboard

---

## 🤝 Contributing

### Development Workflow
1. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes**
   - Follow existing code style
   - Add tests if applicable
   - Update documentation

3. **Test changes**
   ```bash
   npm run dev
   node server.js
   # Test functionality thoroughly
   ```

4. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   git push origin feature/your-feature-name
   ```

### Code Style
- **JavaScript**: Use ES6+ features, prefer const/let over var
- **React**: Use functional components with hooks
- **CSS**: Use Tailwind CSS classes, avoid custom CSS
- **Naming**: Use camelCase for variables, PascalCase for components

### Testing Checklist
- [ ] Frontend renders correctly
- [ ] Backend API endpoints work
- [ ] Database operations succeed
- [ ] Email functionality works
- [ ] Admin dashboard accessible
- [ ] Responsive design on mobile
- [ ] No console errors
- [ ] All forms submit successfully

---

## 📞 Support

### Contact Information
- **Email**: team@aggiex.org
- **GitHub Issues**: [Repository Issues](https://github.com/your-repo/issues)
- **Documentation**: This README and inline code comments

### Resources
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [SendGrid Documentation](https://docs.sendgrid.com/)
- [Express.js Documentation](https://expressjs.com/)

---

## 📄 License

This project is proprietary to AggieX and Texas A&M University. All rights reserved.

---

## 🔄 Changelog

### Version 1.0.0 (Current)
- ✅ Complete email verification system
- ✅ Admin dashboard with analytics
- ✅ Application form with email integration
- ✅ Podcast/newsletter signup system
- ✅ Responsive design with animations
- ✅ Security features and logging
- ✅ Comprehensive documentation

---

*Last updated: December 2024*
