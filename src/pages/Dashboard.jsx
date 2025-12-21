import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import PhoneOTPVerification from '../components/PhoneOTPVerification';

export default function Dashboard() {
  const { user, profile, signOut, updateProfileData } = useAuth();
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState(null);
  const [payments, setPayments] = useState([]);
  const [website, setWebsite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }
    loadDashboardData();
  }, [user, navigate]);

  // Refresh data when coming from payment success
  useEffect(() => {
    if (location.state?.refresh) {
      // Clear the refresh flag
      window.history.replaceState({}, document.title);
      // Refresh dashboard data
      setTimeout(() => {
        loadDashboardData();
      }, 2000); // Wait for webhook to process
    }
  }, [location.state]);

  // Refresh data when tab becomes visible (user returns after payment)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && user) {
        // Refresh after a short delay to allow webhook processing
        setTimeout(() => {
          loadDashboardData();
        }, 1000);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Load subscription (check for active or expired)
      const { data: subData, error: subError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle(); // Use maybeSingle() to handle missing data gracefully

      if (subData && !subError) {
        // Check if subscription is expired
        const endDate = new Date(subData.end_date);
        const now = new Date();
        if (endDate < now && subData.status === 'active') {
          // Subscription expired - update status and deactivate website
          await supabase
            .from('subscriptions')
            .update({ status: 'expired' })
            .eq('id', subData.id);
          
          // Deactivate website
          const { data: websiteData } = await supabase
            .from('websites')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();
          
          if (websiteData && websiteData.status === 'live') {
            await supabase
              .from('websites')
              .update({ status: 'suspended' })
              .eq('id', websiteData.id);
          }
          
          setSubscription({ ...subData, status: 'expired' });
        } else {
          setSubscription(subData);
        }
      }

      // Load payments (handle errors gracefully)
      try {
        const { data: paymentsData } = await supabase
          .from('payments')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(10);

        if (paymentsData) setPayments(paymentsData);
      } catch (payError) {
        console.warn('Payments table not available:', payError);
        setPayments([]);
      }

      // Load website (handle errors gracefully)
      try {
        const { data: websiteData } = await supabase
          .from('websites')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (websiteData) setWebsite(websiteData);
      } catch (webError) {
        console.warn('Websites table not available:', webError);
        setWebsite(null);
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-lime-400 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Header */}
      <header className="border-b border-white/[0.04] sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-xl">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <svg width={38} height={38} viewBox="0 0 100 100" fill="none">
                <rect x="0" y="0" width="100" height="100" rx="22" fill="#BFFF00"/>
                <path d="M28 62 L50 32 L72 62" stroke="#050505" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="50" cy="68" r="5" fill="#050505"/>
              </svg>
              <span className="font-display text-xl font-extrabold text-white">
                GROW<span className="text-lime-400">MAXX</span>
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <div className="text-sm text-white font-medium">{profile?.name || user?.email}</div>
                <div className="text-xs text-neutral-500">{user?.email}</div>
              </div>
              <button
                onClick={() => {
                  signOut().catch((err) => {
                    console.error('Sign out error:', err);
                    // Force redirect anyway
                    window.location.href = '/';
                  });
                }}
                className="px-4 py-2 text-sm text-neutral-400 hover:text-white transition-colors border border-white/10 rounded-lg hover:bg-white/5"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-custom py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-white mb-2">
                Welcome back, {profile?.name || user?.email?.split('@')[0] || 'there'}! 👋
              </h1>
              <p className="text-neutral-400">
                Manage your website, payments, and growth all in one place.
              </p>
            </div>
            {profile?.business_name && (
              <div className="text-right">
                <div className="text-sm text-neutral-500 mb-1">Organization</div>
                <div className="text-lg font-bold text-lime-400">{profile.business_name}</div>
              </div>
            )}
          </div>
          
          {/* Website Status Alert */}
          {website && subscription && subscription.status === 'expired' && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚠️</span>
                <div>
                  <div className="text-white font-medium">Website Suspended</div>
                  <div className="text-sm text-neutral-400">
                    Your subscription has expired. Please renew to reactivate your website at {website.site_url || 'your domain'}.
                  </div>
                </div>
                <Link
                  to="/select-plan"
                  className="ml-auto px-4 py-2 bg-lime-400 text-[#050505] rounded-lg font-bold hover:bg-lime-500 transition-colors"
                >
                  Renew Now
                </Link>
              </div>
            </div>
          )}
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#0A0A0A] border border-white/[0.04] rounded-2xl p-6"
          >
            <div className="text-2xl mb-2">📊</div>
            <div className="text-2xl font-bold text-lime-400 mb-1">
              {website ? '1.2k' : '0'}
            </div>
            <div className="text-sm text-neutral-500">Total Views</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#0A0A0A] border border-white/[0.04] rounded-2xl p-6"
          >
            <div className="text-2xl mb-2">💳</div>
            <div className="text-2xl font-bold text-lime-400 mb-1">
              {subscription ? subscription.plan_name : 'None'}
            </div>
            <div className="text-sm text-neutral-500">Current Plan</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#0A0A0A] border border-white/[0.04] rounded-2xl p-6"
          >
            <div className="text-2xl mb-2">🌐</div>
            <div className="text-2xl font-bold text-lime-400 mb-1">
              {website ? 'Live' : 'Pending'}
            </div>
            <div className="text-sm text-neutral-500">Website Status</div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-white/[0.04] overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'billing', label: 'Billing Plans', icon: '💳' },
            { id: 'website', label: 'My Website', icon: '🌐' },
            { id: 'profile', label: 'Organization', icon: '🏢' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'border-lime-400 text-lime-400'
                  : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'overview' && <OverviewTab subscription={subscription} website={website} />}
          {activeTab === 'billing' && <BillingTab subscription={subscription} payments={payments} navigate={navigate} />}
          {activeTab === 'website' && <WebsiteTab website={website} subscription={subscription} />}
          {activeTab === 'profile' && <ProfileTab profile={profile} updateProfile={updateProfileData} />}
        </div>
      </main>
    </div>
  );
}

// Overview Tab
function OverviewTab({ subscription, website }) {
  return (
    <div className="space-y-6">
      {!subscription ? (
        <div className="bg-[#0A0A0A] border border-white/[0.04] rounded-2xl p-8 text-center">
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="text-xl font-bold text-white mb-2">Get Started with GrowMaxx</h3>
          <p className="text-neutral-400 mb-6">Choose a plan to start building your online presence</p>
          <Link to="/select-plan" className="btn-primary inline-block">
            Choose a Plan
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#0A0A0A] border border-white/[0.04] rounded-2xl p-6">
            <h3 className="font-bold text-white mb-4">Current Subscription</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-neutral-400">Plan</span>
                <span className="text-white font-medium">{subscription.plan_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Billing</span>
                <span className="text-white font-medium capitalize">{subscription.billing_cycle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Status</span>
                <span className="text-lime-400 font-medium capitalize">{subscription.status}</span>
              </div>
              {subscription.next_billing_date && (
                <div className="flex justify-between">
                  <span className="text-neutral-400">Next Billing</span>
                  <span className="text-white font-medium">
                    {new Date(subscription.next_billing_date).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-[#0A0A0A] border border-white/[0.04] rounded-2xl p-6">
            <h3 className="font-bold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link to="/select-plan" className="block w-full py-3 px-4 bg-lime-400/10 border border-lime-400/20 rounded-xl text-lime-400 font-medium hover:bg-lime-400/20 transition-colors text-center">
                Upgrade Plan
              </Link>
              <button className="block w-full py-3 px-4 bg-[#111] border border-white/10 rounded-xl text-white font-medium hover:bg-[#1a1a1a] transition-colors">
                Request Website Edit
              </button>
              <a
                href="https://wa.me/916380006001"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 px-4 bg-[#25D366] rounded-xl text-white font-medium hover:bg-[#20BD5C] transition-colors text-center"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Billing Tab
function BillingTab({ subscription, payments, navigate }) {
  const [cancelling, setCancelling] = useState(false);
  const { user } = useAuth();

  const handleCancelSubscription = async () => {
    if (!confirm('Are you sure you want to cancel your subscription? Your website will be deactivated.')) {
      return;
    }

    setCancelling(true);
    try {
      // Cancel subscription via Razorpay API
      if (subscription.razorpay_subscription_id) {
        const response = await fetch('/api/cancel-subscription', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subscription_id: subscription.razorpay_subscription_id,
            user_id: user.id,
          }),
        });

        if (response.ok) {
          alert('Subscription cancelled. Your website will be deactivated at the end of the billing period.');
          window.location.reload();
        } else {
          throw new Error('Failed to cancel subscription');
        }
      } else {
        // If no Razorpay subscription ID, just update database
        await supabase
          .from('subscriptions')
          .update({ status: 'cancelled' })
          .eq('user_id', user.id);
        
        alert('Subscription cancelled. Your website will be deactivated.');
        window.location.reload();
      }
    } catch (error) {
      console.error('Cancel subscription error:', error);
      alert('Failed to cancel subscription. Please contact support.');
    } finally {
      setCancelling(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Plan - Netflix Style */}
      {subscription && (
        <div className="bg-[#0A0A0A] border border-white/[0.04] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-white text-xl mb-1">{subscription.plan_name} Plan</h3>
              <p className="text-sm text-neutral-400">Active Subscription</p>
            </div>
            {subscription.status === 'active' && (
              <span className="px-4 py-2 bg-lime-400/10 text-lime-400 rounded-full text-sm font-medium">
                Active
              </span>
            )}
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#111] rounded-xl p-4">
              <div className="text-sm text-neutral-500 mb-1">Billing Amount</div>
              <div className="text-2xl font-bold text-white">₹{subscription.amount}</div>
              <div className="text-xs text-neutral-400 mt-1">
                per {subscription.billing_cycle === 'yearly' ? 'year' : 'month'}
              </div>
            </div>
            <div className="bg-[#111] rounded-xl p-4">
              <div className="text-sm text-neutral-500 mb-1">Next Billing Date</div>
              {subscription.next_billing_date ? (
                <>
                  <div className="text-xl font-bold text-white">
                    {new Date(subscription.next_billing_date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                  <div className="text-xs text-neutral-400 mt-1">
                    Auto-renewal {subscription.autopay_enabled ? 'enabled' : 'disabled'}
                  </div>
                </>
              ) : (
                <div className="text-neutral-400">Not scheduled</div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
            <div>
              <div className="text-sm text-neutral-500 mb-1">Auto-Renewal</div>
              <div className={`font-medium ${subscription.autopay_enabled ? 'text-lime-400' : 'text-neutral-400'}`}>
                {subscription.autopay_enabled ? '✅ Enabled' : '❌ Disabled'}
              </div>
            </div>
            <div className="flex gap-3">
              <Link 
                to="/select-plan" 
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm transition-colors"
              >
                Change Plan
              </Link>
              {subscription.status === 'active' && (
                <button
                  onClick={handleCancelSubscription}
                  disabled={cancelling}
                  className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-sm transition-colors disabled:opacity-50"
                >
                  {cancelling ? 'Cancelling...' : 'Cancel Subscription'}
                </button>
              )}
            </div>
          </div>

          {subscription.autopay_enabled && (
            <div className="mt-4 p-3 bg-lime-400/10 border border-lime-400/20 rounded-lg">
              <div className="text-xs text-lime-400">
                🔄 Your subscription will automatically renew on {subscription.next_billing_date ? new Date(subscription.next_billing_date).toLocaleDateString() : 'the next billing date'}. 
                You can cancel anytime before then.
              </div>
            </div>
          )}
        </div>
      )}

      {/* Payment History */}
      <div className="bg-[#0A0A0A] border border-white/[0.04] rounded-2xl p-6">
        <h3 className="font-bold text-white mb-4">Payment History</h3>
        {payments.length === 0 ? (
          <p className="text-neutral-400 text-center py-8">No payments yet</p>
        ) : (
          <div className="space-y-3">
            {payments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 bg-[#111] rounded-xl">
                <div>
                  <div className="text-white font-medium">₹{payment.amount}</div>
                  <div className="text-sm text-neutral-500">
                    {new Date(payment.created_at).toLocaleDateString()}
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  payment.status === 'success' ? 'bg-lime-400/10 text-lime-400' : 'bg-red-400/10 text-red-400'
                }`}>
                  {payment.status}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Website Tab
function WebsiteTab({ website, subscription }) {
  const isSuspended = website?.status === 'suspended' || subscription?.status === 'expired';
  
  return (
    <div className="space-y-6">
      {!website ? (
        <div className="bg-[#0A0A0A] border border-white/[0.04] rounded-2xl p-8 text-center">
          <div className="text-4xl mb-4">🌐</div>
          <h3 className="text-xl font-bold text-white mb-2">No Website Yet</h3>
          <p className="text-neutral-400 mb-6">Your website will appear here once you subscribe</p>
          <Link
            to="/select-plan"
            className="btn-primary inline-block"
          >
            Choose a Plan
          </Link>
        </div>
      ) : (
        <div className="bg-[#0A0A0A] border border-white/[0.04] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white">{website.site_name}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              website.status === 'live' && !isSuspended
                ? 'bg-lime-400/10 text-lime-400' 
                : isSuspended
                ? 'bg-red-400/10 text-red-400'
                : 'bg-yellow-400/10 text-yellow-400'
            }`}>
              {isSuspended ? 'Suspended' : website.status}
            </span>
          </div>
          
          {isSuspended && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <div className="text-red-400 text-sm">
                <strong>Website Deactivated:</strong> Your subscription has expired. 
                Renew your plan to reactivate your website.
              </div>
              <Link
                to="/select-plan"
                className="mt-3 inline-block px-4 py-2 bg-lime-400 text-[#050505] rounded-lg font-bold hover:bg-lime-500 transition-colors text-sm"
              >
                Renew Subscription
              </Link>
            </div>
          )}
          
          {website.site_url && (
            <div className="space-y-2">
              <div className="text-sm text-neutral-500">Website URL</div>
              <a
                href={website.site_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-lg font-medium ${
                  isSuspended 
                    ? 'text-neutral-500 line-through cursor-not-allowed' 
                    : 'text-lime-400 hover:underline'
                }`}
                onClick={(e) => {
                  if (isSuspended) {
                    e.preventDefault();
                    alert('Website is suspended. Please renew your subscription.');
                  }
                }}
              >
                {website.site_url} {!isSuspended && '→'}
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Profile Tab
function ProfileTab({ profile, updateProfile }) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [pendingPhone, setPendingPhone] = useState('');
  
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    phone: profile?.phone || '',
    business_name: profile?.business_name || '',
    business_type: profile?.business_type || '',
    city: profile?.city || '',
  });

  // Update form data when profile changes
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        phone: profile.phone || '',
        business_name: profile.business_name || '',
        business_type: profile.business_type || '',
        city: profile.city || '',
      });
    }
  }, [profile]);

  const handleSave = async () => {
    setSaving(true);
    setSaveError('');
    setSaveSuccess(false);
    
    try {
      // Check if phone is changed or not verified
      const phoneChanged = formData.phone && formData.phone !== profile?.phone;
      const phoneUnverified = formData.phone && !profile?.phone_verified;
      
      // If phone is changed or unverified, require verification
      if (phoneChanged || phoneUnverified) {
        setSaveError('Please verify your phone number before saving. Click "Verify Phone Number" to continue.');
        setSaving(false);
        return;
      }
      
      await updateProfile(formData);
      setSaveSuccess(true);
      setEditing(false);
      // Clear success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setSaveError(error.message || 'Failed to save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-[#0A0A0A] border border-white/[0.04] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-white">Profile Information</h3>
        {!editing ? (
          <button
            onClick={() => {
              setEditing(true);
              setSaveError('');
              setSaveSuccess(false);
            }}
            className="text-sm text-lime-400 hover:underline"
          >
            Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => {
                setEditing(false);
                setSaveError('');
                setSaveSuccess(false);
                // Reset form data
                setFormData({
                  name: profile?.name || '',
                  phone: profile?.phone || '',
                  business_name: profile?.business_name || '',
                  business_type: profile?.business_type || '',
                  city: profile?.city || '',
                });
              }}
              className="text-sm text-neutral-400 hover:text-white"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="text-sm text-lime-400 hover:underline disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        )}
      </div>

      {/* Success Message */}
      {saveSuccess && (
        <div className="mb-4 p-3 bg-lime-400/10 border border-lime-400/20 rounded-lg text-lime-400 text-sm">
          Profile updated successfully!
        </div>
      )}

      {/* Error Message */}
      {saveError && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {saveError}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-neutral-400 mb-2">Full Name</label>
          {editing ? (
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="input"
            />
          ) : (
            <div className="text-white">{formData.name || 'Not set'}</div>
          )}
        </div>

        <div>
          <label className="block text-sm text-neutral-400 mb-2">
            Phone (WhatsApp)
            {profile?.phone_verified && (
              <span className="ml-2 text-xs text-lime-400">✓ Verified</span>
            )}
          </label>
          {editing ? (
            <div className="space-y-2">
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="input"
                placeholder="+91 98765 43210"
              />
              {formData.phone && (
                <div className="space-y-2">
                  {formData.phone !== profile?.phone && (
                    <button
                      onClick={() => {
                        setPendingPhone(formData.phone);
                        setShowOTP(true);
                      }}
                      className="text-sm text-lime-400 hover:underline"
                    >
                      Verify Phone Number
                    </button>
                  )}
                  {formData.phone === profile?.phone && !profile?.phone_verified && (
                    <button
                      onClick={() => {
                        setPendingPhone(formData.phone);
                        setShowOTP(true);
                      }}
                      className="text-sm text-yellow-400 hover:underline"
                    >
                      Verify Phone Number (Required)
                    </button>
                  )}
                  {!profile?.phone_verified && formData.phone && (
                    <p className="text-xs text-yellow-400">
                      ⚠️ Phone must be verified before saving
                    </p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-white">{formData.phone || 'Not set'}</span>
              {!profile?.phone_verified && formData.phone && (
                <span className="text-xs text-yellow-400">(Not verified)</span>
              )}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm text-neutral-400 mb-2">Organization Name</label>
          {editing ? (
            <input
              type="text"
              value={formData.business_name}
              onChange={(e) => setFormData({...formData, business_name: e.target.value})}
              className="input"
              placeholder="Your Company Name"
            />
          ) : (
            <div className="text-white font-medium">{formData.business_name || 'Not set'}</div>
          )}
        </div>


        <div>
          <label className="block text-sm text-neutral-400 mb-2">Business Type</label>
          {editing ? (
            <select
              value={formData.business_type}
              onChange={(e) => setFormData({...formData, business_type: e.target.value})}
              className="input"
            >
              <option value="">Select type</option>
              <option value="bakery">Bakery</option>
              <option value="salon">Salon</option>
              <option value="clinic">Clinic</option>
              <option value="tuition">Tuition</option>
              <option value="tailor">Tailor</option>
              <option value="boutique">Boutique</option>
              <option value="other">Other</option>
            </select>
          ) : (
            <div className="text-white capitalize">{formData.business_type || 'Not set'}</div>
          )}
        </div>

        <div>
          <label className="block text-sm text-neutral-400 mb-2">City</label>
          {editing ? (
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
              className="input"
            />
          ) : (
            <div className="text-white">{formData.city || 'Not set'}</div>
          )}
        </div>
      </div>

      {/* OTP Verification Modal */}
      {showOTP && (
        <PhoneOTPVerification
          phone={pendingPhone}
          onVerify={async (verifiedPhone) => {
            try {
              await updateProfile({
                ...formData,
                phone: verifiedPhone,
                phone_verified: true,
              });
              setShowOTP(false);
              setSaveSuccess(true);
              setTimeout(() => setSaveSuccess(false), 3000);
            } catch (err) {
              console.error('OTP verification error:', err);
            }
          }}
          onCancel={() => {
            setShowOTP(false);
            setPendingPhone('');
          }}
        />
      )}
    </div>
  );
}
