import { Home, Shield } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
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