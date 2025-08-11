console.log("=== AGGIEX ACCELERATOR SERVER ===");
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';
import Push from 'pushover-notifications';
import dotenv from 'dotenv';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import path, { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const prisma = new PrismaClient();
const app = express();

// Production-ready CORS
const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:5175';
app.use(cors({
  origin: allowedOrigin,
  credentials: true,
}));

// Logging
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Rate limiting for API routes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 50 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api', apiLimiter);

// CORS handling
app.use((req, res, next) => {
  console.log(`🌐 ${req.method} ${req.url} from ${req.headers.origin || 'no origin'}`);
  
  res.header('Access-Control-Allow-Origin', allowedOrigin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Max-Age', '86400');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

app.use(express.json({ limit: '1mb' })); // Reduced limit for security

// Initialize services
const resend = new Resend(process.env.RESEND_API_KEY);
const pushover = new Push({
  user: process.env.PUSHOVER_USER_KEY,
  token: process.env.PUSHOVER_APP_TOKEN
});

// 🧪 DEBUG ENDPOINT (Development only)
if (process.env.NODE_ENV !== 'production') {
  app.get('/api/debug', async (req, res) => {
    console.log('🔍 === DEBUG ENDPOINT ===');
    
    try {
      // Check database connection
      const dbCheck = await prisma.$queryRaw`SELECT 1 as test`;
      console.log('✅ Database connection:', dbCheck);

      // Count applications
      const appCount = await prisma.application.count();
      console.log('📊 Application count:', appCount);

      res.json({
        database: 'connected',
        appCount,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('❌ Debug error:', error);
      res.status(500).json({
        error: error.message,
        code: error.code
      });
    }
  });
}

app.get('/api/test', (req, res) => {
  console.log('🧪 TEST HIT!');
  res.json({ 
    message: 'AggieX Server Running!',
    timestamp: new Date().toISOString(),
    port: process.env.PORT || 3001
  });
});

// 🚀 APPLICATION SUBMISSION ENDPOINT
app.post('/api/apply', async (req, res) => {
  console.log('🔥 === APPLICATION SUBMISSION ===');
  
  try {
    const { firstName, lastName, email, affiliation, role, message } = req.body;
    
    // Input validation
    if (!firstName || !lastName || !email || !affiliation || !role) {
      console.log('❌ Missing required fields');
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate input lengths
    if (firstName.length > 50 || lastName.length > 50) {
      return res.status(400).json({ error: 'Name too long' });
    }

    if (email.length > 100) {
      return res.status(400).json({ error: 'Email too long' });
    }

    if (message && message.length > 2000) {
      return res.status(400).json({ error: 'Message too long' });
    }

    // Validate affiliation and role values
    const validAffiliations = ['current-student', 'alumni', 'faculty', 'researcher', 'partner', 'other'];
    const validRoles = ['founder', 'student-builder', 'alumni-mentor', 'advisor', 'investor', 'partner', 'other'];

    if (!validAffiliations.includes(affiliation)) {
      return res.status(400).json({ error: 'Invalid affiliation' });
    }

    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    // Check for duplicate applications (same email)
    const existingApplication = await prisma.application.findFirst({
      where: { email: email.trim().toLowerCase() }
    });

    if (existingApplication) {
      return res.status(409).json({ error: 'Application already submitted with this email' });
    }

    // Save to database
    console.log('💾 Saving application to DB...');
    const newApplication = await prisma.application.create({
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        affiliation,
        role,
        message: message ? message.trim() : null,
        status: 'pending'
      },
    });
    console.log('✅ Application saved with ID:', newApplication.id);

    // Send notifications (don't let them fail the request)
    try {
      if (process.env.RESEND_API_KEY) {
        console.log('📧 Sending email notification...');
        await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: process.env.NOTIFICATION_EMAIL || 'team@aggiex.org',
          subject: `🚀 New AggieX Application: ${firstName} ${lastName}`,
          html: `
            <h1>New AggieX Accelerator Application</h1>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Affiliation:</strong> ${affiliation}</p>
            <p><strong>Role:</strong> ${role}</p>
            <p><strong>Message:</strong> ${message || 'No additional message'}</p>
            <p><strong>Application ID:</strong> ${newApplication.id}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          `
        });
        console.log('✅ Email sent');
      }

      if (process.env.PUSHOVER_USER_KEY && process.env.PUSHOVER_APP_TOKEN) {
        console.log('📱 Sending push notification...');
        pushover.send({
          message: `New AggieX application from ${firstName} ${lastName} (${email}) - ${role}`,
          title: "🚀 AggieX Application",
          priority: 1
        });
        console.log('✅ Push sent');
      }
    } catch (notifError) {
      console.log('⚠️ Notification failed but continuing:', notifError.message);
    }

    console.log('🎉 SUCCESS - Application submitted');
    res.status(201).json({
      success: true,
      message: 'Application submitted successfully! We\'ll review your application and be in touch soon.',
      id: newApplication.id
    });

  } catch (error) {
    console.error('💥 APPLICATION ERROR:', error);
    res.status(500).json({
      error: 'Server error. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Serve static frontend in production
if (process.env.NODE_ENV === 'production') {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const distPath = resolve(__dirname, 'dist');
  console.log('Serving static from:', distPath);
  app.use(express.static(distPath));
  // SPA fallback for non-API routes
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 AGGIEX ACCELERATOR SERVER RUNNING');
  console.log(`📡 Server: http://localhost:${PORT}`);
  console.log(`🌐 CORS: Enabled for ${allowedOrigin}`);
  console.log(`🔒 Security: Rate limiting enabled`);
  console.log(`🎯 Ready to receive applications!`);
});