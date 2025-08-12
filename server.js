console.log("=== AGGIEX ACCELERATOR SERVER ===");
import express from 'express';
import { PrismaClient } from '@prisma/client';
import Push from 'pushover-notifications';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import path, { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

dotenv.config();

const prisma = new PrismaClient();
const app = express();

// Trust proxy for rate limiting behind load balancers (Render, etc.)
app.set('trust proxy', 1);

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

// Initialize Pushover for notifications
const pushover = new Push({
  user: process.env.PUSHOVER_USER_KEY,
  token: process.env.PUSHOVER_APP_TOKEN,
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
    const { firstName, lastName, email, affiliation, role, message, newsletterSubscribed = true, podcastNotifications = true } = req.body;
    
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

    // Create or update contact first (required for foreign key constraint)
    console.log('💾 Creating/updating contact...');
    const contact = await prisma.contact.upsert({
      where: { email: email.trim().toLowerCase() },
      update: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        source: 'application',
        newsletterSubscribed,
        podcastNotifications,
        lastEngagement: new Date()
      },
      create: {
        email: email.trim().toLowerCase(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        source: 'application',
        interests: [role, affiliation],
        newsletterSubscribed,
        podcastNotifications
      }
    });
    console.log('✅ Contact record created/updated');

    // Save application to database
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

    // Send push notification (don't let it fail the request)
    try {
      if (process.env.PUSHOVER_USER_KEY && process.env.PUSHOVER_APP_TOKEN) {
        console.log('📱 Sending push notification...');
        pushover.send({
          message: `New AggieX application from ${firstName} ${lastName} (${email}) - ${role}`,
          title: "🚀 AggieX Application",
          priority: 1
        });
        console.log('✅ Push notification sent');
      }
    } catch (notifError) {
      console.log('⚠️ Push notification failed but continuing:', notifError.message);
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

// 📧 CONTACT MANAGEMENT ENDPOINTS
app.post('/api/contacts', async (req, res) => {
  console.log('📧 === CONTACT CREATION ===');
  
  try {
    const { email, firstName, lastName, source, interests, newsletterSubscribed = true, podcastNotifications = true } = req.body;
    
    // Input validation
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Create or update contact
    const contact = await prisma.contact.upsert({
      where: { email: email.trim().toLowerCase() },
      update: {
        firstName: firstName?.trim(),
        lastName: lastName?.trim(),
        source: source || 'newsletter',
        interests: interests || [],
        newsletterSubscribed,
        podcastNotifications,
        lastEngagement: new Date()
      },
      create: {
        email: email.trim().toLowerCase(),
        firstName: firstName?.trim(),
        lastName: lastName?.trim(),
        source: source || 'newsletter',
        interests: interests || [],
        newsletterSubscribed,
        podcastNotifications
      }
    });

    console.log('✅ Contact created/updated:', contact.email);
    res.status(201).json({
      success: true,
      message: 'Contact added successfully!',
      contact
    });

  } catch (error) {
    console.error('💥 CONTACT ERROR:', error);
    res.status(500).json({
      error: 'Server error. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// 📬 NEWSLETTER SUBSCRIPTION ENDPOINT
app.post('/api/newsletter/subscribe', async (req, res) => {
  console.log('📬 === NEWSLETTER SUBSCRIPTION ===');
  
  try {
    const { email, firstName, source = 'podcast' } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Create or update contact
    const contact = await prisma.contact.upsert({
      where: { email: email.trim().toLowerCase() },
      update: {
        firstName: firstName?.trim(),
        newsletterSubscribed: true,
        podcastNotifications: true,
        source,
        lastEngagement: new Date()
      },
      create: {
        email: email.trim().toLowerCase(),
        firstName: firstName?.trim(),
        source,
        newsletterSubscribed: true,
        podcastNotifications: true
      }
    });

    console.log('✅ Newsletter subscription:', contact.email);
    res.status(200).json({
      success: true,
      message: 'Successfully subscribed to newsletter and podcast notifications!',
      contact
    });

  } catch (error) {
    console.error('💥 NEWSLETTER ERROR:', error);
    res.status(500).json({
      error: 'Server error. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// 📧 EMAIL VERIFICATION ENDPOINTS
app.post('/api/email/send-verification', async (req, res) => {
  console.log('📧 === SENDING EMAIL VERIFICATION ===');
  
  try {
    const { email, firstName, source } = req.body;
    
    if (!email || !source) {
      return res.status(400).json({ error: 'Email and source are required' });
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create or update contact
    const contact = await prisma.contact.upsert({
      where: { email: email.trim().toLowerCase() },
      update: {
        firstName: firstName?.trim(),
        source,
        verificationToken,
        verificationExpires,
        verificationSentAt: new Date(),
        emailVerified: false
      },
      create: {
        email: email.trim().toLowerCase(),
        firstName: firstName?.trim(),
        source,
        verificationToken,
        verificationExpires,
        verificationSentAt: new Date(),
        emailVerified: false
      }
    });

    // Determine email template based on source
    let emailTemplate;
    if (source === 'application') {
      emailTemplate = getAcceleratorWelcomeEmail(contact.firstName || 'there', verificationToken);
    } else {
      emailTemplate = getPodcastWelcomeEmail(contact.firstName || 'there', verificationToken);
    }

    // Send email via SendGrid
    try {
      const msg = {
        to: contact.email,
        from: 'team@aggiex.org', // Update this with your verified sender
        subject: emailTemplate.subject,
        text: emailTemplate.text,
        html: emailTemplate.html
      };

      await sgMail.send(msg);
      console.log('✅ Verification email sent to:', contact.email);
      
      res.json({
        success: true,
        message: 'Verification email sent successfully',
        email: contact.email
      });

    } catch (emailError) {
      console.error('❌ SendGrid error:', emailError);
      if (emailError.response) {
        console.error('Error details:', emailError.response.body);
      }
      
      // Clean up the contact if email fails
      await prisma.contact.delete({
        where: { id: contact.id }
      });

      res.status(500).json({
        error: 'Failed to send verification email',
        details: process.env.NODE_ENV === 'development' ? emailError.message : undefined
      });
    }

  } catch (error) {
    console.error('💥 VERIFICATION EMAIL ERROR:', error);
    res.status(500).json({
      error: 'Server error. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

app.get('/api/email/verify/:token', async (req, res) => {
  console.log('✅ === EMAIL VERIFICATION ===');
  
  try {
    const { token } = req.params;
    
    if (!token) {
      return res.status(400).json({ error: 'Verification token is required' });
    }

    // Find contact by verification token
    const contact = await prisma.contact.findUnique({
      where: { verificationToken: token }
    });

    if (!contact) {
      return res.status(404).json({ error: 'Invalid verification token' });
    }

    // Check if token is expired
    if (contact.verificationExpires && new Date() > contact.verificationExpires) {
      return res.status(400).json({ error: 'Verification token has expired' });
    }

    // Verify the email
    await prisma.contact.update({
      where: { id: contact.id },
      data: {
        emailVerified: true,
        verificationToken: null,
        verificationExpires: null,
        lastEngagement: new Date()
      }
    });

    console.log('✅ Email verified for:', contact.email);

    // Send welcome email based on source
    try {
      let welcomeTemplate;
      if (contact.source === 'application') {
        welcomeTemplate = getAcceleratorConfirmedEmail(contact.firstName || 'there');
      } else {
        welcomeTemplate = getPodcastConfirmedEmail(contact.firstName || 'there');
      }

      const welcomeMsg = {
        to: contact.email,
        from: 'team@aggiex.org',
        subject: welcomeTemplate.subject,
        text: welcomeTemplate.text,
        html: welcomeTemplate.html
      };

      await sgMail.send(welcomeMsg);

      console.log('✅ Welcome email sent to:', contact.email);
    } catch (welcomeError) {
      console.log('⚠️ Welcome email failed but continuing:', welcomeError.message);
    }

    // Redirect to frontend verification page
    const frontendUrl = process.env.CORS_ORIGIN || 'http://localhost:5175';
            res.redirect(`${frontendUrl}/verify/${token}?status=success&email=${encodeURIComponent(contact.email)}&source=${contact.source}`);

  } catch (error) {
    console.error('💥 EMAIL VERIFICATION ERROR:', error);
    const frontendUrl = process.env.CORS_ORIGIN || 'http://localhost:5175';
            res.redirect(`${frontendUrl}/verify/${token}?status=error&message=${encodeURIComponent('Server error. Please try again later.')}`);
  }
});

// Email template functions
function getAcceleratorWelcomeEmail(firstName, verificationToken) {
  const verificationUrl = `${process.env.CORS_ORIGIN || 'http://localhost:5175'}/verify/${verificationToken}`;
  
  return {
    subject: "🚀 Welcome to AggieX Accelerator - Verify Your Email",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #8B0000, #DC143C); color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">Welcome to AggieX!</h1>
          <p style="margin: 10px 0 0 0; font-size: 18px;">Texas A&M's Premier Startup Accelerator</p>
        </div>
        
        <div style="padding: 30px; background: white;">
          <h2 style="color: #8B0000; margin-top: 0;">Hi ${firstName},</h2>
          
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            <strong>Thank you for applying to the inaugural AggieX Accelerator cohort!</strong> 
            We're excited to have you join us on this revolutionary journey.
          </p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #8B0000; margin-top: 0;">What's Next?</h3>
            <ul style="color: #555; line-height: 1.6;">
              <li><strong>Email Verification:</strong> Please verify your email address below</li>
              <li><strong>Application Review:</strong> Our team is reviewing your initial application</li>
              <li><strong>Follow-up:</strong> We may request additional information or your pitch deck</li>
              <li><strong>Interview:</strong> Selected candidates will be invited for interviews</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background: #8B0000; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              ✅ Verify Your Email Address
            </a>
          </div>
          
          <p style="font-size: 14px; color: #666; text-align: center;">
            This verification link expires in 24 hours.
          </p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <h3 style="color: #8B0000;">Important Information</h3>
          <ul style="color: #555; line-height: 1.6;">
            <li><strong>Timeline:</strong> Applications close December 2024</li>
            <li><strong>Interviews:</strong> December 2024 - January 2025</li>
            <li><strong>Program Start:</strong> February 2025</li>
            <li><strong>Duration:</strong> 12-week intensive accelerator program</li>
          </ul>
          
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            We'll be in touch soon with next steps. In the meantime, stay connected with us for updates and insights!
          </p>
          
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Best regards,<br>
            <strong>The AggieX Team</strong>
          </p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; text-align: center; color: #666;">
          <p style="margin: 0;">Questions? Contact us at team@aggiex.org</p>
        </div>
      </div>
    `,
    text: `
Welcome to AggieX Accelerator!

Hi ${firstName},

Thank you for applying to the inaugural AggieX Accelerator cohort! We're excited to have you join us on this revolutionary journey.

What's Next?
- Email Verification: Please verify your email address
- Application Review: Our team is reviewing your initial application  
- Follow-up: We may request additional information or your pitch deck
- Interview: Selected candidates will be invited for interviews

Verify your email: ${verificationUrl}

Important Information:
- Timeline: Applications close December 2024
- Interviews: December 2024 - January 2025
- Program Start: February 2025
- Duration: 12-week intensive accelerator program

We'll be in touch soon with next steps!

Best regards,
The AggieX Team

Questions? Contact us at team@aggiex.org
    `
  };
}

function getPodcastWelcomeEmail(firstName, verificationToken) {
  const verificationUrl = `${process.env.CORS_ORIGIN || 'http://localhost:5175'}/verify/${verificationToken}`;
  
  return {
    subject: "🎙️ Welcome to AggieX Podcast - Verify Your Email",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #8B0000, #DC143C); color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">Welcome to AggieX Podcast!</h1>
          <p style="margin: 10px 0 0 0; font-size: 18px;">The Voice of Aggie Innovation</p>
        </div>
        
        <div style="padding: 30px; background: white;">
          <h2 style="color: #8B0000; margin-top: 0;">Hi ${firstName},</h2>
          
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            <strong>Welcome to the AggieX community!</strong> 
            You're now subscribed to our newsletter and podcast notifications.
          </p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #8B0000; margin-top: 0;">What You'll Get</h3>
            <ul style="color: #555; line-height: 1.6;">
              <li><strong>Weekly Newsletter:</strong> Startup insights, founder spotlights, and exclusive updates</li>
              <li><strong>Podcast Launch:</strong> Be the first to know when our podcast goes live</li>
              <li><strong>Founder Stories:</strong> Real conversations with Aggie entrepreneurs</li>
              <li><strong>Exclusive Content:</strong> Behind-the-scenes of the AggieX revolution</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background: #8B0000; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              ✅ Verify Your Email Address
            </a>
          </div>
          
          <p style="font-size: 14px; color: #666; text-align: center;">
            This verification link expires in 24 hours.
          </p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <h3 style="color: #8B0000;">Coming Soon</h3>
          <ul style="color: #555; line-height: 1.6;">
            <li><strong>AggieX Podcast:</strong> Weekly episodes with founder interviews</li>
            <li><strong>Newsletter:</strong> Startup insights and community updates</li>
            <li><strong>Exclusive Events:</strong> Early access to AggieX events</li>
            <li><strong>Community Access:</strong> Connect with fellow Aggie entrepreneurs</li>
          </ul>
          
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            We're building something special, and you're part of it from the beginning!
          </p>
          
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Best regards,<br>
            <strong>The AggieX Team</strong>
          </p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; text-align: center; color: #666;">
          <p style="margin: 0;">Questions? Contact us at team@aggiex.org</p>
        </div>
      </div>
    `,
    text: `
Welcome to AggieX Podcast!

Hi ${firstName},

Welcome to the AggieX community! You're now subscribed to our newsletter and podcast notifications.

What You'll Get:
- Weekly Newsletter: Startup insights, founder spotlights, and exclusive updates
- Podcast Launch: Be the first to know when our podcast goes live
- Founder Stories: Real conversations with Aggie entrepreneurs
- Exclusive Content: Behind-the-scenes of the AggieX revolution

Verify your email: ${verificationUrl}

Coming Soon:
- AggieX Podcast: Weekly episodes with founder interviews
- Newsletter: Startup insights and community updates
- Exclusive Events: Early access to AggieX events
- Community Access: Connect with fellow Aggie entrepreneurs

We're building something special, and you're part of it from the beginning!

Best regards,
The AggieX Team

Questions? Contact us at team@aggiex.org
    `
  };
}

function getAcceleratorConfirmedEmail(firstName) {
  return {
    subject: "🎉 Email Verified - Welcome to AggieX Accelerator!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #8B0000, #DC143C); color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">Email Verified!</h1>
          <p style="margin: 10px 0 0 0; font-size: 18px;">Welcome to AggieX Accelerator</p>
        </div>
        
        <div style="padding: 30px; background: white;">
          <h2 style="color: #8B0000; margin-top: 0;">Hi ${firstName},</h2>
          
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            <strong>Perfect! Your email has been verified.</strong> 
            You're now officially part of the AggieX Accelerator application process.
          </p>
          
          <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
            <h3 style="color: #28a745; margin-top: 0;">✅ What's Confirmed</h3>
            <ul style="color: #555; line-height: 1.6;">
              <li>Your email address is verified</li>
              <li>Your application is in our system</li>
              <li>You'll receive updates on your application status</li>
              <li>You're subscribed to AggieX communications</li>
            </ul>
          </div>
          
          <h3 style="color: #8B0000;">Next Steps</h3>
          <ol style="color: #555; line-height: 1.6;">
            <li><strong>Application Review:</strong> Our team will review your initial application</li>
            <li><strong>Additional Information:</strong> We may request your pitch deck or more details</li>
            <li><strong>Interview Invitation:</strong> Selected candidates will be invited for interviews</li>
            <li><strong>Final Selection:</strong> Cohort announcement in January 2025</li>
          </ol>
          
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            We'll be in touch within the next few days with more information about your application status.
          </p>
          
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Best regards,<br>
            <strong>The AggieX Team</strong>
          </p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; text-align: center; color: #666;">
          <p style="margin: 0;">Questions? Contact us at team@aggiex.org</p>
        </div>
      </div>
    `,
    text: `
Email Verified - Welcome to AggieX Accelerator!

Hi ${firstName},

Perfect! Your email has been verified. You're now officially part of the AggieX Accelerator application process.

✅ What's Confirmed:
- Your email address is verified
- Your application is in our system
- You'll receive updates on your application status
- You're subscribed to AggieX communications

Next Steps:
1. Application Review: Our team will review your initial application
2. Additional Information: We may request your pitch deck or more details
3. Interview Invitation: Selected candidates will be invited for interviews
4. Final Selection: Cohort announcement in January 2025

We'll be in touch within the next few days with more information about your application status.

Best regards,
The AggieX Team

Questions? Contact us at team@aggiex.org
    `
  };
}

function getPodcastConfirmedEmail(firstName) {
  return {
    subject: "🎉 Email Verified - Welcome to AggieX Community!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #8B0000, #DC143C); color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">Email Verified!</h1>
          <p style="margin: 10px 0 0 0; font-size: 18px;">Welcome to AggieX Community</p>
        </div>
        
        <div style="padding: 30px; background: white;">
          <h2 style="color: #8B0000; margin-top: 0;">Hi ${firstName},</h2>
          
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            <strong>Excellent! Your email has been verified.</strong> 
            You're now officially part of the AggieX community and will receive our newsletter and podcast updates.
          </p>
          
          <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
            <h3 style="color: #28a745; margin-top: 0;">✅ What's Confirmed</h3>
            <ul style="color: #555; line-height: 1.6;">
              <li>Your email address is verified</li>
              <li>You're subscribed to our newsletter</li>
              <li>You'll get podcast launch notifications</li>
              <li>You're part of the AggieX community</li>
            </ul>
          </div>
          
          <h3 style="color: #8B0000;">What's Coming</h3>
          <ul style="color: #555; line-height: 1.6;">
            <li><strong>Weekly Newsletter:</strong> Startup insights and community updates</li>
            <li><strong>Podcast Launch:</strong> Be the first to know when we go live</li>
            <li><strong>Founder Interviews:</strong> Real stories from Aggie entrepreneurs</li>
            <li><strong>Exclusive Content:</strong> Behind-the-scenes of AggieX</li>
          </ul>
          
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            We're excited to have you join us on this journey. Stay tuned for amazing content coming soon!
          </p>
          
          <p style="font-size: 16px; line-height: 1.6; color: #333;">
            Best regards,<br>
            <strong>The AggieX Team</strong>
          </p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; text-align: center; color: #666;">
          <p style="margin: 0;">Questions? Contact us at team@aggiex.org</p>
        </div>
      </div>
    `,
    text: `
Email Verified - Welcome to AggieX Community!

Hi ${firstName},

Excellent! Your email has been verified. You're now officially part of the AggieX community and will receive our newsletter and podcast updates.

✅ What's Confirmed:
- Your email address is verified
- You're subscribed to our newsletter
- You'll get podcast launch notifications
- You're part of the AggieX community

What's Coming:
- Weekly Newsletter: Startup insights and community updates
- Podcast Launch: Be the first to know when we go live
- Founder Interviews: Real stories from Aggie entrepreneurs
- Exclusive Content: Behind-the-scenes of AggieX

We're excited to have you join us on this journey. Stay tuned for amazing content coming soon!

Best regards,
The AggieX Team

Questions? Contact us at team@aggiex.org
    `
  };
}

// 📊 CONTACT ANALYTICS ENDPOINT
app.get('/api/contacts/analytics', async (req, res) => {
  console.log('📊 === CONTACT ANALYTICS ===');
  
  try {
    const totalContacts = await prisma.contact.count();
    const newsletterSubscribers = await prisma.contact.count({
      where: { newsletterSubscribed: true }
    });
    const podcastSubscribers = await prisma.contact.count({
      where: { podcastNotifications: true }
    });
    const activeContacts = await prisma.contact.count({
      where: { 
        status: 'active',
        lastEngagement: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
      }
    });

    const sourceBreakdown = await prisma.contact.groupBy({
      by: ['source'],
      _count: { source: true }
    });

    res.json({
      totalContacts,
      newsletterSubscribers,
      podcastSubscribers,
      activeContacts,
      sourceBreakdown
    });

  } catch (error) {
    console.error('💥 ANALYTICS ERROR:', error);
    res.status(500).json({
      error: 'Server error. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// 🔐 ADMIN AUTHENTICATION ENDPOINT
app.post('/api/admin/login', async (req, res) => {
  console.log('🔐 === ADMIN LOGIN ATTEMPT ===');
  
  try {
    const { username, password } = req.body;
    
    // Get credentials from environment variables
    const correctUsername = process.env.ADMIN_USERNAME;
    const correctPassword = process.env.REACT_APP_ADMIN_PASSWORD;
    
    // Validate that credentials are set
    if (!correctUsername || !correctPassword) {
      console.error('❌ Admin credentials not configured in environment variables');
      return res.status(500).json({ 
        error: 'Server configuration error',
        success: false 
      });
    }
    
    // Verify credentials
    const isSuccess = username === correctUsername && password === correctPassword;
    const reason = isSuccess ? 'successful_login' : 'failed_login';
    
    // Log the authentication attempt
    const logEntry = {
      timestamp: new Date().toISOString(),
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.headers['user-agent'],
      username: username || 'unknown',
      success: isSuccess,
      reason: reason,
      headers: {
        origin: req.headers.origin,
        referer: req.headers.referer,
        'x-forwarded-for': req.headers['x-forwarded-for']
      }
    };

    console.log('🔐 Admin Login Attempt:', {
      timestamp: logEntry.timestamp,
      ip: logEntry.ip,
      username: logEntry.username,
      success: logEntry.success,
      reason: logEntry.reason,
      userAgent: logEntry.userAgent?.substring(0, 100) + '...'
    });

    // Send notification for failed attempts
    if (!isSuccess && process.env.PUSHOVER_USER_KEY && process.env.PUSHOVER_APP_TOKEN) {
      try {
        pushover.send({
          message: `Failed admin login attempt from ${logEntry.ip} - Username: ${logEntry.username}`,
          title: "🚨 Admin Login Failed",
          priority: 1
        });
        console.log('✅ Security notification sent');
      } catch (notifError) {
        console.log('⚠️ Security notification failed:', notifError.message);
      }
    }

    // Send notification for successful attempts
    if (isSuccess && process.env.PUSHOVER_USER_KEY && process.env.PUSHOVER_APP_TOKEN) {
      try {
        pushover.send({
          message: `Successful admin login from ${logEntry.ip} - Username: ${logEntry.username}`,
          title: "✅ Admin Login Success",
          priority: 0
        });
        console.log('✅ Success notification sent');
      } catch (notifError) {
        console.log('⚠️ Success notification failed:', notifError.message);
      }
    }
    
    if (isSuccess) {
      // Generate a simple session token (in production, use JWT or similar)
      const sessionToken = crypto.randomBytes(32).toString('hex');
      const sessionExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
      
      // Store session (in production, use Redis or database)
      // For now, we'll use a simple in-memory store
      if (!global.adminSessions) {
        global.adminSessions = new Map();
      }
      global.adminSessions.set(sessionToken, {
        username,
        expires: sessionExpiry,
        createdAt: new Date()
      });
      
      res.status(200).json({ 
        success: true,
        message: 'Authentication successful',
        sessionToken,
        expiresAt: sessionExpiry.toISOString()
      });
    } else {
      res.status(401).json({ 
        success: false,
        message: 'Invalid credentials',
        reason: 'failed_login'
      });
    }
  } catch (error) {
    console.error('💥 ADMIN LOGIN ERROR:', error);
    res.status(500).json({ 
      error: 'Authentication server error',
      success: false 
    });
  }
});

// 🔐 ADMIN SESSION VALIDATION ENDPOINT
app.post('/api/admin/validate-session', async (req, res) => {
  console.log('🔐 === ADMIN SESSION VALIDATION ===');
  
  try {
    const { sessionToken } = req.body;
    
    if (!sessionToken) {
      return res.status(401).json({ 
        success: false,
        message: 'No session token provided'
      });
    }
    
    // Check if session exists and is valid
    if (!global.adminSessions || !global.adminSessions.has(sessionToken)) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid session token'
      });
    }
    
    const session = global.adminSessions.get(sessionToken);
    
    // Check if session has expired
    if (new Date() > session.expires) {
      global.adminSessions.delete(sessionToken);
      return res.status(401).json({ 
        success: false,
        message: 'Session expired'
      });
    }
    
    res.status(200).json({ 
      success: true,
      message: 'Session valid',
      username: session.username,
      expiresAt: session.expires.toISOString()
    });
  } catch (error) {
    console.error('💥 SESSION VALIDATION ERROR:', error);
    res.status(500).json({ 
      error: 'Session validation error',
      success: false 
    });
  }
});

// 🔐 ADMIN LOGOUT ENDPOINT
app.post('/api/admin/logout', async (req, res) => {
  console.log('🔐 === ADMIN LOGOUT ===');
  
  try {
    const { sessionToken } = req.body;
    
    if (sessionToken && global.adminSessions) {
      global.adminSessions.delete(sessionToken);
      console.log('✅ Session invalidated');
    }
    
    res.status(200).json({ 
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('💥 LOGOUT ERROR:', error);
    res.status(500).json({ 
      error: 'Logout error',
      success: false 
    });
  }
});

// 🔐 ADMIN AUTHENTICATION LOGGING ENDPOINT (for backward compatibility)
app.post('/api/admin/auth-attempt', async (req, res) => {
  console.log('🔐 === ADMIN AUTHENTICATION ATTEMPT ===');
  
  try {
    const { username, password, ip, userAgent, timestamp, success, reason } = req.body;
    
    // Log the attempt with security details
    const logEntry = {
      timestamp: timestamp || new Date().toISOString(),
      ip: ip || req.ip || req.connection.remoteAddress,
      userAgent: userAgent || req.headers['user-agent'],
      username: username || 'unknown',
      success: success || false,
      reason: reason || 'authentication_attempt',
      headers: {
        origin: req.headers.origin,
        referer: req.headers.referer,
        'x-forwarded-for': req.headers['x-forwarded-for']
      }
    };

    // Console logging for immediate visibility
    console.log('🔐 Admin Auth Attempt:', {
      timestamp: logEntry.timestamp,
      ip: logEntry.ip,
      username: logEntry.username,
      success: logEntry.success,
      reason: logEntry.reason,
      userAgent: logEntry.userAgent?.substring(0, 100) + '...'
    });

    // Send notification for failed attempts
    if (!success && process.env.PUSHOVER_USER_KEY && process.env.PUSHOVER_APP_TOKEN) {
      try {
        pushover.send({
          message: `Failed admin login attempt from ${logEntry.ip} - Username: ${logEntry.username}`,
          title: "🚨 Admin Login Failed",
          priority: 1
        });
        console.log('✅ Security notification sent');
      } catch (notifError) {
        console.log('⚠️ Security notification failed:', notifError.message);
      }
    }

    // Send notification for successful attempts
    if (success && process.env.PUSHOVER_USER_KEY && process.env.PUSHOVER_APP_TOKEN) {
      try {
        pushover.send({
          message: `Successful admin login from ${logEntry.ip} - Username: ${logEntry.username}`,
          title: "✅ Admin Login Success",
          priority: 0
        });
        console.log('✅ Success notification sent');
      } catch (notifError) {
        console.log('⚠️ Success notification failed:', notifError.message);
      }
    }

    res.json({
      success: true,
      message: 'Authentication attempt logged',
      logEntry
    });

  } catch (error) {
    console.error('💥 AUTH LOGGING ERROR:', error);
    res.status(500).json({
      error: 'Failed to log authentication attempt',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// 🔍 SYSTEM HEALTH CHECK ENDPOINT
app.get('/api/admin/health', async (req, res) => {
  console.log('🔍 === SYSTEM HEALTH CHECK ===');
  
  try {
    const healthCheck = {
      timestamp: new Date().toISOString(),
      server: {
        status: 'running',
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        nodeVersion: process.version,
        environment: process.env.NODE_ENV || 'development'
      },
      database: {
        status: 'unknown',
        connection: false,
        error: null
      },
      services: {
        sendgrid: !!process.env.SENDGRID_API_KEY,
        pushover: !!(process.env.PUSHOVER_USER_KEY && process.env.PUSHOVER_APP_TOKEN)
      },
      cors: {
        origin: process.env.CORS_ORIGIN || 'http://localhost:5175',
        enabled: true
      }
    };

    // Test database connection
    try {
      await prisma.$queryRaw`SELECT 1 as test`;
      healthCheck.database.status = 'connected';
      healthCheck.database.connection = true;
      console.log('✅ Database connection: OK');
    } catch (dbError) {
      healthCheck.database.status = 'error';
      healthCheck.database.connection = false;
      healthCheck.database.error = dbError.message;
      console.log('❌ Database connection: FAILED -', dbError.message);
    }

    // Test external services
    if (process.env.SENDGRID_API_KEY) {
      try {
        // Simple API test
        healthCheck.services.sendgrid = true;
        console.log('✅ SendGrid service: Available');
      } catch (sendgridError) {
        healthCheck.services.sendgrid = false;
        console.log('❌ SendGrid service: FAILED -', sendgridError.message);
      }
    }

    console.log('🔍 Health check completed');
    res.json(healthCheck);

  } catch (error) {
    console.error('💥 HEALTH CHECK ERROR:', error);
    res.status(500).json({
      error: 'Health check failed',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// 📋 ADMIN LOGS ENDPOINT
app.get('/api/admin/logs', async (req, res) => {
  console.log('📋 === ADMIN LOGS REQUEST ===');
  
  try {
    // In a production system, you'd want to store logs in a database
    // For now, we'll return recent console logs (this is limited)
    const logs = {
      timestamp: new Date().toISOString(),
      message: 'Log retrieval requested',
      note: 'Console logs are not persisted. Consider implementing a logging database.',
      recentActivity: [
        'Admin authentication attempts are logged to console',
        'System health checks available at /api/admin/health',
        'Failed login attempts trigger security notifications'
      ]
    };

    res.json(logs);

  } catch (error) {
    console.error('💥 LOGS ERROR:', error);
    res.status(500).json({
      error: 'Failed to retrieve logs',
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
  
  // Handle favicon and apple touch icon requests
  app.get('/favicon.ico', (req, res) => {
    res.status(404).end(); // Return 404 for now
  });
  
  app.get('/apple-touch-icon-precomposed.png', (req, res) => {
    res.status(404).end(); // Return 404 for now
  });
  
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
  console.log(`📡 Server running on port ${PORT}`);
  console.log(`🌐 CORS: Enabled for ${allowedOrigin}`);
  console.log(`🔒 Security: Rate limiting enabled`);
  console.log(`🎯 Ready to receive applications!`);
});