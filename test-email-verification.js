#!/usr/bin/env node

/**
 * 🧪 Email Verification Testing Script
 * Tests the complete email verification flow in testing environment
 */

const BASE_URL = 'http://localhost:3002'; // Testing port

// Test data - use timestamp to avoid conflicts
const timestamp = Date.now();
const testEmails = [
  `zachnowroozi@gmail.com`,
];

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logTest(testName, status, details = '') {
  const statusColor = status === 'PASS' ? 'green' : 'red';
  const statusIcon = status === 'PASS' ? '✅' : '❌';
  log(`${statusIcon} ${testName}: ${status}`, statusColor);
  if (details) {
    log(`   ${details}`, 'yellow');
  }
}

async function makeRequest(endpoint, method = 'GET', data = null) {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const responseData = await response.json();
      return {
        status: response.status,
        data: responseData,
        ok: response.ok
      };
    } else {
      const text = await response.text();
      return {
        status: response.status,
        data: { error: `Non-JSON response: ${text.substring(0, 100)}...` },
        ok: false
      };
    }
  } catch (error) {
    return {
      status: 0,
      data: { error: error.message },
      ok: false
    };
  }
}

async function testServerConnection() {
  log('\n🔌 Testing Server Connection...', 'cyan');
  
  const result = await makeRequest('/api/test');
  
  if (result.ok && result.data.message === 'AggieX Server Running!') {
    logTest('Server Connection', 'PASS', `Server running on port ${result.data.port}`);
    return true;
  } else {
    logTest('Server Connection', 'FAIL', `Server not responding: ${result.data.error || 'Unknown error'}`);
    return false;
  }
}

async function testAcceleratorApplication(email, index) {
  log(`\n🚀 Testing Accelerator Application ${index + 1}...`, 'cyan');
  
  const result = await makeRequest('/api/apply', 'POST', {
    email: email,
    firstName: `Test${index + 1}`,
    lastName: 'User',
    affiliation: 'current-student',
    role: 'founder',
    message: `Test application ${index + 1} for email verification testing`,
    newsletterSubscribed: true,
    podcastNotifications: false
  });
  
  if (result.ok) {
    logTest(`Accelerator Application ${index + 1}`, 'PASS', `Application created for ${email}`);
    
    // Test email verification sending
    const verificationResult = await makeRequest('/api/email/send-verification', 'POST', {
      email: email,
      firstName: `Test${index + 1}`,
      source: 'application'
    });
    
    if (verificationResult.ok) {
      logTest(`Email Verification ${index + 1}`, 'PASS', `Verification email sent to ${email}`);
      return { success: true, email };
    } else {
      logTest(`Email Verification ${index + 1}`, 'FAIL', `Failed to send verification: ${verificationResult.data.error}`);
      return { success: false, email };
    }
  } else {
    logTest(`Accelerator Application ${index + 1}`, 'FAIL', `Failed to create application: ${result.data.error}`);
    return { success: false, email };
  }
}

async function testPodcastSignup(email, index) {
  log(`\n🎧 Testing Podcast Signup ${index + 1}...`, 'cyan');
  
  const result = await makeRequest('/api/contacts', 'POST', {
    email: email,
    firstName: `Podcast${index + 1}`,
    lastName: 'User',
    source: 'podcast',
    newsletterSubscribed: true,
    podcastNotifications: true
  });
  
  if (result.ok) {
    logTest(`Podcast Signup ${index + 1}`, 'PASS', `Contact created for ${email}`);
    
    // Test email verification sending
    const verificationResult = await makeRequest('/api/email/send-verification', 'POST', {
      email: email,
      firstName: `Podcast${index + 1}`,
      source: 'podcast'
    });
    
    if (verificationResult.ok) {
      logTest(`Podcast Verification ${index + 1}`, 'PASS', `Verification email sent to ${email}`);
      return { success: true, email };
    } else {
      logTest(`Podcast Verification ${index + 1}`, 'FAIL', `Failed to send verification: ${verificationResult.data.error}`);
      return { success: false, email };
    }
  } else {
    logTest(`Podcast Signup ${index + 1}`, 'FAIL', `Failed to create contact: ${result.data.error}`);
    return { success: false, email };
  }
}

async function testRateLimiting() {
  log('\n🛡️ Testing Rate Limiting...', 'cyan');
  
  const requests = [];
  for (let i = 0; i < 10; i++) {
    requests.push(makeRequest('/api/test'));
  }
  
  const results = await Promise.all(requests);
  const successCount = results.filter(r => r.ok).length;
  const rateLimitedCount = results.filter(r => r.status === 429).length;
  
  if (successCount > 0 && rateLimitedCount > 0) {
    logTest('Rate Limiting', 'PASS', `${successCount} requests succeeded, ${rateLimitedCount} were rate limited`);
    return true;
  } else {
    logTest('Rate Limiting', 'FAIL', `Unexpected results: ${successCount} succeeded, ${rateLimitedCount} rate limited`);
    return false;
  }
}

async function testAdminAccess() {
  log('\n🔐 Testing Admin Access...', 'cyan');
  
  const result = await makeRequest('/api/admin/login', 'POST', {
    username: 'test_admin',
    password: 'test_password_123'
  });
  
  if (result.ok && result.data.success) {
    logTest('Admin Login', 'PASS', 'Admin authentication successful');
    return true;
  } else {
    logTest('Admin Login', 'FAIL', `Authentication failed: ${result.data.error || 'Unknown error'}`);
    return false;
  }
}

async function runAllTests() {
  log('\n🧪 AGGIEX TESTING ENVIRONMENT TEST SUITE', 'bright');
  log('==========================================', 'bright');
  
  const results = {
    serverConnection: false,
    acceleratorApplications: [],
    podcastSignups: [],
    rateLimiting: false,
    adminAccess: false
  };
  
  // Test server connection
  results.serverConnection = await testServerConnection();
  
  if (results.serverConnection) {
    // Test rate limiting
    results.rateLimiting = await testRateLimiting();
    
    // Test admin access
    results.adminAccess = await testAdminAccess();
    
    // Test accelerator applications
    for (let i = 0; i < 2; i++) {
      const result = await testAcceleratorApplication(testEmails[i], i);
      results.acceleratorApplications.push(result);
    }
    
    // Test podcast signups
    const result = await testPodcastSignup(testEmails[2], 0);
    results.podcastSignups.push(result);
  }
  
  // Summary
  log('\n📊 TEST SUMMARY', 'bright');
  log('===============', 'bright');
  
  logTest('Server Connection', results.serverConnection ? 'PASS' : 'FAIL');
  logTest('Rate Limiting', results.rateLimiting ? 'PASS' : 'FAIL');
  logTest('Admin Access', results.adminAccess ? 'PASS' : 'FAIL');
  
  const acceleratorSuccess = results.acceleratorApplications.filter(r => r.success).length;
  const podcastSuccess = results.podcastSignups.filter(r => r.success).length;
  
  logTest('Accelerator Applications', `${acceleratorSuccess}/2 PASS`);
  logTest('Podcast Signups', `${podcastSuccess}/1 PASS`);
  
  const totalTests = 5;
  const passedTests = (results.serverConnection ? 1 : 0) + 
                     (results.rateLimiting ? 1 : 0) + 
                     (results.adminAccess ? 1 : 0) + 
                     acceleratorSuccess + 
                     podcastSuccess;
  
  log(`\n🎯 Overall Result: ${passedTests}/${totalTests} tests passed`, passedTests === totalTests ? 'green' : 'red');
  
  if (passedTests === totalTests) {
    log('\n🎉 All tests passed! Testing environment is ready.', 'green');
    log('📧 Check your test emails for verification links.', 'cyan');
  } else {
    log('\n⚠️ Some tests failed. Please check the errors above.', 'yellow');
  }
}

// Run the tests
runAllTests().catch(error => {
  log(`\n💥 Test suite failed with error: ${error.message}`, 'red');
  process.exit(1);
}); 