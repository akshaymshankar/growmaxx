import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, getProfile } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Initialize auth state
  useEffect(() => {
    let mounted = true;
    let loadingSet = false;
    let authStateSubscription = null;
    
    // Timeout fallback - ALWAYS set loading to false after timeout
    const timeoutId = setTimeout(() => {
      if (mounted && !loadingSet) {
        console.warn('Auth loading timeout - proceeding anyway');
        setLoading(false);
        loadingSet = true;
      }
    }, 1000); // 1 second timeout - faster
    
    const setLoadComplete = () => {
      if (mounted && !loadingSet) {
        clearTimeout(timeoutId);
        setLoading(false);
        loadingSet = true;
      }
    };
    
    // Get initial session
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (!mounted) return;
        
        if (error) {
          console.error('Session error:', error);
          setLoadComplete();
          return;
        }
        
        if (session?.user) {
          setUser(session.user);
          
          // Load profile in background - don't block
          loadProfile(session.user.id)
            .catch(err => {
              console.error('Profile load error:', err);
            })
            .finally(() => {
              setLoadComplete();
            });
          return;
        }
        
        // No session
        setLoadComplete();
      } catch (err) {
        console.error('Session fetch error:', err);
        setLoadComplete();
      }
    };
    
    // Start session check
    checkSession();

    // Listen for auth changes (for new sign-ins/sign-outs)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;
      
      // Always ensure loading is false after auth state change
      if (!loadingSet) {
        setLoadComplete();
      }
      
      // Handle auth state changes
      if (session?.user) {
        // Update user if different
        setUser(prevUser => {
          if (prevUser?.id !== session.user.id) {
            // Load profile for new user
            loadProfile(session.user.id)
              .catch(err => {
                console.error('Profile load error:', err);
              });
            
            // Create profile on new sign-in
            if (event === 'SIGNED_IN') {
              const userId = session.user.id;
              const userName = session.user.user_metadata?.name || 
                              session.user.user_metadata?.full_name ||
                              session.user.email?.split('@')[0] || 
                              'User';
              
              // Create profile asynchronously
              (async () => {
                try {
                  const { error } = await supabase
                    .from('profiles')
                    .insert({ id: userId, name: userName });
                  
                  // Ignore duplicate errors
                  if (error && error.code !== '23505') {
                    console.log('Profile creation note:', error.message);
                  }
                } catch (err) {
                  // Silently ignore - profile might already exist
                  console.log('Profile creation skipped:', err);
                }
              })();
            }
            
            return session.user;
          }
          return prevUser;
        });
      } else {
        // Signed out
        setUser(null);
        setProfile(null);
      }
    });
    
    authStateSubscription = subscription;

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      if (authStateSubscription) {
        authStateSubscription.unsubscribe();
      }
    };
  }, []);

  // Load user profile
  const loadProfile = async (userId) => {
    try {
      const profileData = await getProfile(userId);
      setProfile(profileData);
    } catch (error) {
      console.error('Error loading profile:', error);
      // Don't fail the app if profile doesn't exist yet
      setProfile(null);
    }
  };

  // Sign up with email
  const signUpWithEmail = async (name, email, phone, password) => {
    console.log('🔐 Signing up user:', { email, name, phone: phone ? 'provided' : 'not provided' });
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          name,
          phone,
        },
      },
    });

    if (error) {
      console.error('❌ Signup error:', error);
      throw error;
    }

    console.log('✅ Signup response:', { user: data.user?.id, session: data.session ? 'exists' : 'none' });

    if (data.user) {
      // Wait a bit for the trigger to create the profile
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Try to create/update profile
      try {
        // First, try to insert (in case trigger didn't run)
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            name: name || data.user.email?.split('@')[0] || 'User',
            phone: phone || null,
          });

        // If insert fails (profile exists), update it
        if (insertError) {
          console.log('Profile exists, updating...', insertError);
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ 
              name: name || data.user.email?.split('@')[0] || 'User',
              phone: phone || null,
            })
            .eq('id', data.user.id);
          
          if (updateError) {
            console.error('Profile update error:', updateError);
          }
        }
      } catch (profileError) {
        console.error('Profile creation error:', profileError);
        // Don't fail signup if profile creation fails
      }
      
      setUser(data.user);
      await loadProfile(data.user.id);

      // Send welcome email on signup
      try {
        const apiUrl = import.meta.env.VITE_API_URL || (import.meta.env.PROD 
          ? `${window.location.origin}/api/send-welcome-email`
          : '/api/send-welcome-email');
        
        await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_email: email,
            user_name: name || data.user.email?.split('@')[0] || 'Customer',
          }),
        });
        console.log('✅ Welcome email sent to:', email);
      } catch (emailError) {
        console.error('Welcome email error (non-blocking):', emailError);
        // Don't fail signup if email fails
      }
    }

    return data;
  };

  // Sign in with email
  const signInWithEmail = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      setUser(data.user);
      await loadProfile(data.user.id);
    }

    return data;
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        console.error('OAuth error:', error);
        throw error;
      }

      // The redirect will happen automatically
      return data;
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      // Clear local state first
      setUser(null);
      setProfile(null);
      setSelectedPlan(null);
      localStorage.removeItem('growmaxx_plan');
      localStorage.clear(); // Clear all localStorage
      sessionStorage.clear(); // Clear session storage
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
      }
      
      // Force page reload to clear all state
      window.location.href = '/';
    } catch (err) {
      console.error('Sign out error:', err);
      // Still redirect even on error
      window.location.href = '/';
    }
  };

  // Select plan
  const selectPlan = (plan) => {
    setSelectedPlan(plan);
    localStorage.setItem('growmaxx_plan', JSON.stringify(plan));
  };

  // Update profile
  const updateProfileData = async (updates) => {
    if (!user) throw new Error('Not authenticated');
    
    console.log('📝 Updating profile:', { userId: user.id, updates });
    
    // First, check if profile exists
    const { data: existingProfile, error: fetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    // If profile doesn't exist, create it
    if (fetchError && fetchError.code === 'PGRST116') {
      console.log('Profile does not exist, creating...');
      const { data: newProfile, error: insertError } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          ...updates,
        })
        .select()
        .single();

      if (insertError) {
        console.error('Profile creation error:', insertError);
        throw new Error(`Failed to create profile: ${insertError.message}`);
      }

      setProfile(newProfile);
      return newProfile;
    }

    // Profile exists, update it
    // Add updated_at timestamp
    const updatesWithTimestamp = {
      ...updates,
      updated_at: new Date().toISOString(),
    };
    
    const { data, error } = await supabase
      .from('profiles')
      .update(updatesWithTimestamp)
      .eq('id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Profile update error:', error);
      throw new Error(`Failed to update profile: ${error.message}`);
    }
    
    console.log('✅ Profile updated successfully:', data);
    setProfile(data);
    return data;
  };

  const value = {
    user,
    profile,
    loading,
    selectedPlan,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signOut,
    selectPlan,
    updateProfileData,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-lime-400 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-neutral-400">Loading...</p>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
