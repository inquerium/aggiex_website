import { useState, useEffect } from "react";
import { Users, Mail, Headphones, TrendingUp, Eye, Lock, Home, Shield } from "lucide-react";
import { Link } from "react-router-dom";


export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authAttempts, setAuthAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [systemHealth, setSystemHealth] = useState(null);
  const [healthLoading, setHealthLoading] = useState(false);

  // Hidden authentication - multiple trigger methods
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Method 1: Ctrl+Shift+A (AggieX)
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setShowAuthForm(true);
      }
      
      // Method 2: Alt+A (Alternative)
      if (e.altKey && e.key === 'A') {
        e.preventDefault();
        setShowAuthForm(true);
      }
      
      // Method 3: Triple click on the page
      if (e.target === document.body && e.detail === 3) {
        e.preventDefault();
        setShowAuthForm(true);
      }
    };

    // Method 4: URL hash trigger
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        setShowAuthForm(true);
        window.location.hash = ''; // Clear the hash
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('click', handleKeyPress);
    window.addEventListener('hashchange', checkHash);
    
    // Check hash on initial load
    checkHash();

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('click', handleKeyPress);
      window.removeEventListener('hashchange', checkHash);
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAnalytics();
      checkSystemHealth();
    }
  }, [isAuthenticated]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/contacts/analytics');
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      } else {
        setError('Failed to fetch analytics');
      }
    } catch (error) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const checkSystemHealth = async () => {
    setHealthLoading(true);
    try {
      const response = await fetch('/api/admin/health');
      if (response.ok) {
        const data = await response.json();
        setSystemHealth(data);
      } else {
        console.error('Health check failed');
      }
    } catch (error) {
      console.error('Health check error:', error);
    } finally {
      setHealthLoading(false);
    }
  };

  const handleAuthentication = async (username, password) => {
    try {
      // Call backend authentication endpoint
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Authentication successful
        setIsAuthenticated(true);
        setAuthAttempts(0);
        setShowAuthForm(false);
        
        // Store session token in session storage
        sessionStorage.setItem('aggiex_admin_session', data.sessionToken);
        sessionStorage.setItem('aggiex_admin_expires', data.expiresAt);
        
        console.log('✅ Admin authentication successful');
      } else {
        // Authentication failed
        setAuthAttempts(prev => prev + 1);
        if (authAttempts >= 4) {
          setIsLocked(true);
          setTimeout(() => {
            setIsLocked(false);
            setAuthAttempts(0);
          }, 300000); // 5 minute lockout
        }
        console.log('❌ Admin authentication failed:', data.message);
      }
    } catch (error) {
      console.error('💥 Authentication error:', error);
      setAuthAttempts(prev => prev + 1);
      if (authAttempts >= 4) {
        setIsLocked(true);
        setTimeout(() => {
          setIsLocked(false);
          setAuthAttempts(0);
        }, 300000); // 5 minute lockout
      }
    }
  };

  // Check for existing session
  useEffect(() => {
    const validateExistingSession = async () => {
      const sessionToken = sessionStorage.getItem('aggiex_admin_session');
      const expiresAt = sessionStorage.getItem('aggiex_admin_expires');
      
      if (!sessionToken || !expiresAt) {
        return;
      }
      
      // Check if session has expired
      if (new Date() > new Date(expiresAt)) {
        sessionStorage.removeItem('aggiex_admin_session');
        sessionStorage.removeItem('aggiex_admin_expires');
        return;
      }
      
      try {
        // Validate session with backend
        const response = await fetch('/api/admin/validate-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionToken
          }),
        });

        const data = await response.json();

        if (data.success) {
          setIsAuthenticated(true);
          console.log('✅ Session validated successfully');
        } else {
          // Session invalid, clear storage
          sessionStorage.removeItem('aggiex_admin_session');
          sessionStorage.removeItem('aggiex_admin_expires');
          console.log('❌ Session validation failed:', data.message);
        }
      } catch (error) {
        console.error('💥 Session validation error:', error);
        // Clear storage on error
        sessionStorage.removeItem('aggiex_admin_session');
        sessionStorage.removeItem('aggiex_admin_expires');
      }
    };

    validateExistingSession();
  }, []);

  // Hidden access page - looks like a 404 or maintenance page
  if (!showAuthForm && !isAuthenticated) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="h-12 w-12 text-gray-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
          <div className="text-sm text-gray-500 mb-4">
            Error 404 - Resource not available
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-maroon-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-maroon-700 transition-colors"
            >
              <Home className="h-4 w-4" />
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authentication form
  if (showAuthForm && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-maroon-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-maroon-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">System Access</h2>
            <p className="text-gray-600 mt-2">Enter credentials to continue</p>
          </div>
          
          {isLocked ? (
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-6 w-6 text-red-600" />
              </div>
              <p className="text-red-600 font-medium">Access temporarily locked</p>
              <p className="text-sm text-gray-500 mt-2">
                Too many failed attempts. Please try again in 5 minutes.
              </p>
            </div>
          ) : (
            <AuthForm 
              onAuthenticate={handleAuthentication}
              attempts={authAttempts}
              onCancel={() => setShowAuthForm(false)}
            />
          )}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-maroon-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchAnalytics}
            className="bg-maroon-600 text-white px-4 py-2 rounded-lg hover:bg-maroon-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6">
        {/* Header with logout */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">AggieX Admin Dashboard</h1>
            <p className="text-gray-600">Contact and newsletter analytics</p>
          </div>
          <button
            onClick={async () => {
              const sessionToken = sessionStorage.getItem('aggiex_admin_session');
              
              if (sessionToken) {
                try {
                  await fetch('/api/admin/logout', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      sessionToken
                    }),
                  });
                } catch (error) {
                  console.error('Logout error:', error);
                }
              }
              
              setIsAuthenticated(false);
              sessionStorage.removeItem('aggiex_admin_session');
              sessionStorage.removeItem('aggiex_admin_expires');
            }}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Logout
          </button>
        </div>

        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Contacts */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Contacts</p>
                  <p className="text-3xl font-bold text-gray-900">{analytics.totalContacts}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Newsletter Subscribers */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Newsletter Subscribers</p>
                  <p className="text-3xl font-bold text-gray-900">{analytics.newsletterSubscribers}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>

            {/* Podcast Subscribers */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Podcast Subscribers</p>
                  <p className="text-3xl font-bold text-gray-900">{analytics.podcastSubscribers}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Headphones className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>

            {/* Active Contacts */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Contacts</p>
                  <p className="text-3xl font-bold text-gray-900">{analytics.activeContacts}</p>
                </div>
                <div className="w-12 h-12 bg-maroon-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-maroon-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Source Breakdown */}
        {analytics?.sourceBreakdown && (
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Sources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {analytics.sourceBreakdown.map((source, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Eye className="h-5 w-5 text-gray-400" />
                    <span className="font-medium text-gray-700 capitalize">
                      {source.source.replace('-', ' ')}
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-maroon-600">
                    {source._count.source}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:border-maroon-300 hover:bg-maroon-50 transition-colors">
              <Mail className="h-6 w-6 text-maroon-600 mb-2" />
              <p className="font-medium text-gray-900">Send Newsletter</p>
              <p className="text-sm text-gray-600">Create and send newsletter</p>
            </button>
            
            <button className="p-4 border border-gray-200 rounded-lg hover:border-maroon-300 hover:bg-maroon-50 transition-colors">
              <Headphones className="h-6 w-6 text-maroon-600 mb-2" />
              <p className="font-medium text-gray-900">Podcast Launch</p>
              <p className="text-sm text-gray-600">Notify podcast subscribers</p>
            </button>
            
            <button className="p-4 border border-gray-200 rounded-lg hover:border-maroon-300 hover:bg-maroon-50 transition-colors">
              <Users className="h-6 w-6 text-maroon-600 mb-2" />
              <p className="font-medium text-gray-900">Export Contacts</p>
              <p className="text-sm text-gray-600">Download contact list</p>
            </button>
          </div>
        </div>

        {/* System Health */}
        <div className="mt-8 bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">System Health</h2>
            <button
              onClick={checkSystemHealth}
              disabled={healthLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {healthLoading ? 'Checking...' : 'Refresh'}
            </button>
          </div>
          
          {systemHealth && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Database Status */}
              <div className={`p-4 rounded-lg border ${
                systemHealth.database.connection 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${
                    systemHealth.database.connection ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <span className="font-semibold">Database</span>
                </div>
                <p className="text-sm text-gray-600">
                  {systemHealth.database.connection ? 'Connected' : 'Disconnected'}
                </p>
                {systemHealth.database.error && (
                  <p className="text-xs text-red-600 mt-1">{systemHealth.database.error}</p>
                )}
              </div>

              {/* Server Status */}
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-semibold">Server</span>
                </div>
                <p className="text-sm text-gray-600">
                  Uptime: {Math.floor(systemHealth.server.uptime / 60)}m
                </p>
                <p className="text-xs text-gray-500">
                  {systemHealth.server.environment}
                </p>
              </div>

              {/* Services Status */}
              <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="font-semibold">Services</span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">
                    SendGrid: {systemHealth.services.sendgrid ? '✅' : '❌'}
                  </p>
                  <p className="text-sm text-gray-600">
                    Pushover: {systemHealth.services.pushover ? '✅' : '❌'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {!systemHealth && !healthLoading && (
            <p className="text-gray-500 text-center py-4">
              Click "Refresh" to check system health
            </p>
          )}

          {healthLoading && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-maroon-600 mx-auto mb-2"></div>
              <p className="text-gray-500">Checking system health...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Separate authentication form component
function AuthForm({ onAuthenticate, attempts, onCancel }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate processing delay for security
    setTimeout(() => {
      onAuthenticate(username, password);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-colors"
          placeholder="Enter username"
          required
          autoFocus
        />
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-colors"
          placeholder="Enter password"
          required
        />
      </div>
      
      {attempts > 0 && (
        <p className="text-red-600 text-sm">
          Invalid credentials. {5 - attempts} attempts remaining.
        </p>
      )}
      
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-maroon-600 text-white px-4 py-3 rounded-lg hover:bg-maroon-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Verifying...
            </>
          ) : (
            'Access System'
          )}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
} 