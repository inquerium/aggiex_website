import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SectionRedirect({ section }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to home page with hash for the section
    navigate(`/#${section}`, { replace: true });
  }, [navigate, section]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-maroon-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to {section} section...</p>
      </div>
    </div>
  );
} 