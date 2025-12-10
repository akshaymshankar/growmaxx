import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('Processing sign in...');

  useEffect(() => {
    let mounted = true;
    let authStateSubscription = null;
    
    const handleAuthCallback = async () => {
      try {
        setStatus('Completing authentication...');
        
        // Wait for Supabase to process the OAuth callback
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Listen for auth state change - this ensures AuthContext updates
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
          if (!mounted) return;
          
          if (event === 'SIGNED_IN' && session?.user) {
            const user = session.user;
            const userName = user.user_metadata?.name || 
                            user.user_metadata?.full_name ||
                            user.email?.split('@')[0] || 
                            'User';
            
            setStatus('Setting up your account...');
            
            // Create profile if it doesn't exist
            try {
              await supabase
                .from('profiles')
                .insert({ id: user.id, name: userName })
                .select()
                .single();
            } catch (profileError) {
              if (profileError.code !== '23505') {
                console.log('Profile creation:', profileError.message);
              }
            }
            
            // Wait for AuthContext to update (give it time to process)
            setStatus('Sign in successful! Redirecting...');
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Use navigate with replace - React Router will handle it
            if (mounted) {
              navigate('/dashboard', { replace: true });
            }
          }
        });
        
        authStateSubscription = subscription;
        
        // Fallback: If auth state change doesn't fire, check session directly
        setTimeout(async () => {
          if (!mounted) return;
          
          const { data: { session }, error: sessionError } = await supabase.auth.getSession();
          
          if (session?.user && !sessionError) {
            const user = session.user;
            const userName = user.user_metadata?.name || 
                            user.user_metadata?.full_name ||
                            user.email?.split('@')[0] || 
                            'User';
            
            setStatus('Setting up your account...');
            
            try {
              await supabase
                .from('profiles')
                .insert({ id: user.id, name: userName })
                .select()
                .single();
            } catch (profileError) {
              if (profileError.code !== '23505') {
                console.log('Profile creation:', profileError.message);
              }
            }
            
            setStatus('Sign in successful! Redirecting...');
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            if (mounted) {
              navigate('/dashboard', { replace: true });
            }
          } else if (!session) {
            // No session found
            if (mounted) {
              setStatus('Authentication failed. Redirecting...');
              setTimeout(() => {
                navigate('/signin?error=Sign in failed. Please try again.', { replace: true });
              }, 2000);
            }
          }
        }, 3000); // Wait 3 seconds for auth state change, then check session
        
      } catch (error) {
        console.error('Auth callback error:', error);
        if (mounted) {
          setStatus('Error occurred. Redirecting...');
          setTimeout(() => {
            navigate('/signin?error=An error occurred. Please try again.', { replace: true });
          }, 2000);
        }
      }
    };

    handleAuthCallback();
    
    return () => {
      mounted = false;
      if (authStateSubscription) {
        authStateSubscription.unsubscribe();
      }
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-12 h-12 border-4 border-lime-400 border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-neutral-400">{status}</p>
        <p className="text-neutral-500 text-sm mt-2">This may take a few seconds...</p>
      </div>
    </div>
  );
}
