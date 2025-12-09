import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth error:', error);
          navigate('/signin?error=auth_failed');
          return;
        }

        if (data.session) {
          // Successfully authenticated
          navigate('/select-plan');
        } else {
          navigate('/signin');
        }
      } catch (err) {
        console.error('Callback error:', err);
        navigate('/signin?error=callback_failed');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-12 h-12 border-4 border-lime-400 border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-neutral-400">Completing sign in...</p>
      </div>
    </div>
  );
}
