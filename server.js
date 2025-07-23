console.log("=== NUCLEAR CORS FIX - THIS WILL WORK ===");
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';
import Push from 'pushover-notifications';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import path, { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const prisma = new PrismaClient();
const app = express();

const ADMIN_USER = process.env.ADMIN_USER || 'ruzimane';
const ADMIN_HASH = process.env.ADMIN_HASH || '$2b$10$FnrB.6kniBH.ydjYZzfyOOBNT.PQswm0ay4nvNewYpZcp84fBWsAa';
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

// Production-ready CORS
const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:5175';
app.use(cors({
  origin: allowedOrigin,
  credentials: true,
}));

// Logging
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Rate limiting for admin and API routes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // stricter for admin login
  message: 'Too many login attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', apiLimiter);
app.use('/api/admin/login', adminLimiter);

function generateToken(user) {
  return jwt.sign({ user }, JWT_SECRET, { expiresIn: '2h' });
}

function verifyToken(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const decoded = jwt.verify(auth.split(' ')[1], JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// 🚨 NUCLEAR CORS - ALLOWS EVERYTHING (DEVELOPMENT ONLY)
app.use((req, res, next) => {
  console.log(`🌐 ${req.method} ${req.url} from ${req.headers.origin || 'no origin'}`);
  
  // Nuclear option - allow everything
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Max-Age', '86400');
  
  if (req.method === 'OPTIONS') {
    console.log('🔥 NUCLEAR OPTIONS response');
    return res.status(200).end();
  }
  
  next();
});

app.use(express.json({ limit: '10mb' }));

// Initialize services
const resend = new Resend(process.env.RESEND_API_KEY);
const pushover = new Push({
  user: process.env.PUSHOVER_USER_KEY,
  token: process.env.PUSHOVER_APP_TOKEN
});

// 🧪 DEBUG ENDPOINTS
// 🧪 TEST BLOG POST CREATION
app.post('/api/test-blog', async (req, res) => {
  console.log('🧪 === CREATING TEST BLOG POST ===');
  
  try {
    const testPost = await prisma.blogPost.create({
      data: {
        title: `Test Post ${Date.now()}`,
        content: '# Test Post\n\nThis is a test blog post created via API.',
        author: 'Test Author',
        excerpt: 'This is a test post to verify the database is working.',
        tags: 'test, api, debug',
        status: 'published'
      }
    });
    
    console.log('✅ Test post created:', testPost);
    res.json(testPost);
    
  } catch (error) {
    console.error('❌ Test post creation failed:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/debug', async (req, res) => {
  console.log('🔍 === DEBUG ENDPOINT ===');
  
  try {
    // Check database connection
    const dbCheck = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Database connection:', dbCheck);

    // Check if blog_posts table exists
    const tableCheck = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'blog_posts'
    `;
    console.log('📋 Table check:', tableCheck);

    // Count blog posts
    const postCount = await prisma.blogPost.count();
    console.log('📊 Post count:', postCount);

    // Get all posts with basic info
    const allPosts = await prisma.blogPost.findMany({
      select: {
        id: true,
        title: true,
        author: true,
        createdAt: true
      }
    });
    console.log('📝 All posts:', allPosts);

    res.json({
      database: 'connected',
      tableExists: tableCheck.length > 0,
      postCount,
      posts: allPosts,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Debug error:', error);
    res.status(500).json({
      error: error.message,
      code: error.code,
      details: 'Database or table might not exist'
    });
  }
});

// 🧪 ABSOLUTE BASIC TEST
app.get('/api/test', (req, res) => {
  console.log('🧪 TEST HIT!');
  res.json({ 
    message: 'NUCLEAR CORS WORKING!',
    timestamp: new Date().toISOString(),
    port: process.env.PORT || 3001
  });
});

app.get('/api/ping', (req, res) => {
  res.json({ pong: true, time: Date.now() });
});

// 🚀 CONTACT FORM - SIMPLIFIED
app.post('/api/contact', async (req, res) => {
  console.log('🔥 === CONTACT FORM HIT ===');
  console.log('Body:', req.body);
  
  try {
    const { name, email, message, company } = req.body;
    
    if (!name || !email || !message) {
      console.log('❌ Missing fields');
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Save to database
    console.log('💾 Saving to DB...');
    const newMessage = await prisma.message.create({
      data: {
        name,
        email,
        message,
        company: company || '',
        type: 'contact',
        isStudent: false,
      },
    });
    console.log('✅ Saved with ID:', newMessage.id);

    // Send notifications (don't let them fail the request)
    try {
      if (process.env.RESEND_API_KEY) {
        console.log('📧 Sending email...');
        await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: 'team@inquerium.com',
          subject: `🚨 New Contact: ${name}`,
          html: `
            <h1>New Contact Form</h1>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company || 'N/A'}</p>
            <p><strong>Message:</strong> ${message}</p>
            <p><strong>ID:</strong> ${newMessage.id}</p>
          `
        });
        console.log('✅ Email sent');
      }

      if (process.env.PUSHOVER_USER_KEY && process.env.PUSHOVER_APP_TOKEN) {
        console.log('📱 Sending push...');
        pushover.send({
          message: `New contact from ${name} (${email}): ${message.substring(0, 100)}...`,
          title: "🚨 Inquerium Contact",
          priority: 1
        });
        console.log('✅ Push sent');
      }
    } catch (notifError) {
      console.log('⚠️ Notification failed but continuing:', notifError.message);
    }

    console.log('🎉 SUCCESS - Returning response');
    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully!',
      id: newMessage.id
    });

  } catch (error) {
    console.error('💥 CONTACT FORM ERROR:', error);
    res.status(500).json({
      error: 'Server error',
      details: error.message
    });
  }
});

// 📝 BLOG ENDPOINTS - FULL CRUD WITH CACHE BUSTING
app.get('/api/blog', async (req, res) => {
  console.log('📚 Fetching all blog posts...');
  
  // 🚫 DISABLE CACHING COMPLETELY
  res.set({
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Surrogate-Control': 'no-store'
  });

  try {
    const posts = await prisma.blogPost.findMany({ 
      orderBy: { createdAt: 'desc' } 
    });
    console.log(`✅ Found ${posts.length} blog posts`);
    console.log('Posts data:', posts.map(p => ({ id: p.id, title: p.title, author: p.author })));
    res.json(posts);
  } catch (err) {
    console.error('❌ Blog fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch blog posts', details: err.message });
  }
});

app.post('/api/blog', verifyToken, async (req, res) => {
  console.log('📝 === CREATING NEW BLOG POST ===');
  console.log('Request body:', JSON.stringify(req.body, null, 2));
  
  try {
    const { title, content, author, excerpt, tags } = req.body;
    
    if (!title || !content || !author) {
      console.log('❌ Missing required fields:', { title: !!title, content: !!content, author: !!author });
      return res.status(400).json({ 
        error: 'Missing required fields: title, content, author',
        received: { title, content, author, excerpt, tags }
      });
    }

    console.log('✅ Validation passed, creating blog post...');

    const newPost = await prisma.blogPost.create({
      data: {
        title: title.trim(),
        content: content.trim(),
        author: author.trim(),
        excerpt: excerpt ? excerpt.trim() : '',
        tags: tags ? tags.trim() : '',
        status: 'published',
        createdAt: new Date()
      },
    });
    
    console.log('🎉 Blog post created successfully:', {
      id: newPost.id,
      title: newPost.title,
      author: newPost.author,
      createdAt: newPost.createdAt
    });

    // Add cache busting headers
    res.set({
      'Cache-Control': 'no-store',
      'ETag': `"${newPost.id}-${Date.now()}"`
    });
    
    res.status(201).json(newPost);
  } catch (err) {
    console.error('💥 Blog create error:', err);
    res.status(500).json({ error: 'Failed to create blog post', details: err.message });
  }
});

app.put('/api/blog/:id', verifyToken, async (req, res) => {
  console.log(`📝 === UPDATING BLOG POST ${req.params.id} ===`);
  console.log('Update data:', JSON.stringify(req.body, null, 2));
  
  try {
    const { id } = req.params;
    const { title, content, author, excerpt, tags } = req.body;
    
    const updatedPost = await prisma.blogPost.update({
      where: { id: parseInt(id) },
      data: {
        title: title.trim(),
        content: content.trim(),
        author: author.trim(),
        excerpt: excerpt ? excerpt.trim() : '',
        tags: tags ? tags.trim() : '',
        updatedAt: new Date()
      },
    });
    
    console.log('✅ Blog post updated:', updatedPost.id);

    // Add cache busting headers
    res.set({
      'Cache-Control': 'no-store',
      'ETag': `"${updatedPost.id}-${Date.now()}"`
    });

    res.json(updatedPost);
  } catch (err) {
    console.error('❌ Blog update error:', err);
    if (err.code === 'P2025') {
      res.status(404).json({ error: 'Blog post not found' });
    } else {
      res.status(500).json({ error: 'Failed to update blog post', details: err.message });
    }
  }
});

app.delete('/api/blog/:id', verifyToken, async (req, res) => {
  console.log(`🗑️ === DELETING BLOG POST ${req.params.id} ===`);
  
  try {
    const { id } = req.params;
    
    await prisma.blogPost.delete({
      where: { id: parseInt(id) },
    });
    
    console.log('✅ Blog post deleted:', id);

    // Add cache busting headers
    res.set({
      'Cache-Control': 'no-store'
    });

    res.json({ success: true, message: 'Blog post deleted successfully' });
  } catch (err) {
    console.error('❌ Blog delete error:', err);
    if (err.code === 'P2025') {
      res.status(404).json({ error: 'Blog post not found' });
    } else {
      res.status(500).json({ error: 'Failed to delete blog post', details: err.message });
    }
  }
});

app.post('/api/careers', async (req, res) => {
  try {
    const formData = req.body;
    const newMessage = await prisma.message.create({
      data: { ...formData, type: 'careers', isStudent: !!formData.major },
    });

    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'team@inquerium.com',
        subject: `💼 Career Application - ${formData.position}`,
        html: `<h1>Career Application</h1><p>Position: ${formData.position}</p><p>Name: ${formData.name}</p><p>Email: ${formData.email}</p>`
      });
    }

    res.status(201).json({ success: true, message: newMessage });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit application' });
  }
});

app.post('/api/track', async (req, res) => {
  try {
    const { type, page, details } = req.body;
    await prisma.userInteraction.create({
      data: { type, page, details: JSON.stringify(details) },
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to track interaction' });
  }
});

// Admin login endpoint
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  const token = generateToken(username);
  res.json({ token });
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

// Kill any existing process on this port first
process.on('SIGTERM', () => process.exit(0));
process.on('SIGINT', () => process.exit(0));

app.listen(PORT, '0.0.0.0', () => {
  console.log('🔥🔥🔥 NUCLEAR CORS SERVER RUNNING 🔥🔥🔥');
  console.log(`📡 Server: http://localhost:${PORT}`);
  console.log(`🌐 CORS: COMPLETELY DISABLED (allows all origins)`);
  console.log(`🧪 Test: curl http://localhost:${PORT}/api/test`);
  console.log('🚨 THIS WILL WORK OR I QUIT');
});