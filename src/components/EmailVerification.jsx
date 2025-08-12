import { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function EmailVerification() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [source, setSource] = useState('');

  useEffect(() => {
    // Check if we have status from URL parameters (redirect from server)
    const urlStatus = searchParams.get('status');
    const urlEmail = searchParams.get('email');
    const urlSource = searchParams.get('source');
    const urlMessage = searchParams.get('message');

    if (urlStatus) {
      setStatus(urlStatus);
      if (urlEmail) setEmail(decodeURIComponent(urlEmail));
      if (urlSource) setSource(urlSource);
      if (urlMessage) setMessage(decodeURIComponent(urlMessage));
      return;
    }

    // If no URL parameters, verify via API
    const verifyEmail = async () => {
      try {
        const response = await fetch(`/api/email/verify/${token}`);
        const result = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage(result.message);
          setEmail(result.email);
          setSource(result.source);
        } else {
          setStatus('error');
          setMessage(result.error || 'Verification failed');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
        setMessage('Network error. Please try again.');
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token, searchParams]);

  const getSourceDisplay = (source) => {
    switch (source) {
      case 'application':
        return 'AggieX Accelerator';
      case 'podcast':
        return 'AggieX Podcast & Newsletter';
      default:
        return 'AggieX Community';
    }
  };

  const getSuccessMessage = (source) => {
    switch (source) {
      case 'application':
        return 'Your email has been verified and your application is now active! We\'ll be in touch soon with next steps.';
      case 'podcast':
        return 'Your email has been verified! You\'ll now receive updates about our podcast and newsletter.';
      default:
        return 'Your email has been verified! Welcome to the AggieX community.';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-maroon-900 to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8"
      >
        <div className="text-center space-y-6">
          {/* Logo/Header */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">AggieX</h1>
            <p className="text-gray-600">Email Verification</p>
          </div>

          {/* Status Display */}
          {status === 'verifying' && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <Loader2 className="h-12 w-12 text-maroon-600 animate-spin" />
              </div>
              <p className="text-gray-600">Verifying your email address...</p>
            </div>
          )}

          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="flex justify-center">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-900">Email Verified!</h2>
                <p className="text-gray-600">{getSuccessMessage(source)}</p>
                {email && (
                  <p className="text-sm text-gray-500">
                    Verified: {email}
                  </p>
                )}
                {source && (
                  <p className="text-sm text-gray-500">
                    Service: {getSourceDisplay(source)}
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="flex justify-center">
                <XCircle className="h-12 w-12 text-red-600" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-900">Verification Failed</h2>
                <p className="text-gray-600">{message}</p>
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <button
              onClick={() => navigate('/')}
              className="w-full bg-maroon-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-maroon-700 transition-colors"
            >
              Return to Home
            </button>
            
            {status === 'error' && (
              <button
                onClick={() => navigate('/apply')}
                className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Apply to AggieX
              </button>
            )}
          </div>

          {/* Footer */}
          <div className="pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Questions? Contact us at{' '}
              <a href="mailto:team@aggiex.org" className="text-maroon-600 hover:underline">
                team@aggiex.org
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 