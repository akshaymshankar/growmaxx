import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

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

  const loadDashboardData = async () => {
    try {
      // Load subscription
      const { data: subData } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (subData) setSubscription(subData);

      // Load payments
      const { data: paymentsData } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (paymentsData) setPayments(paymentsData);

      // Load website
      const { data: websiteData } = await supabase
        .from('websites')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (websiteData) setWebsite(websiteData);
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
                onClick={async () => {
                  try {
                    await signOut();
                  } catch (err) {
                    console.error('Sign out error:', err);
                    // Force redirect anyway
                    window.location.href = '/';
                  }
                }}
                className="px-4 py-2 text-sm text-neutral-400 hover:text-white transition-colors"
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
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            Welcome back, {profile?.name || 'there'}! 👋
          </h1>
          <p className="text-neutral-400">
            Manage your website, payments, and growth all in one place.
          </p>
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
        <div className="flex gap-2 mb-6 border-b border-white/[0.04]">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'billing', label: 'Payments & Billing', icon: '💳' },
            { id: 'website', label: 'My Website', icon: '🌐' },
            { id: 'profile', label: 'Profile', icon: '👤' },
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
          {activeTab === 'website' && <WebsiteTab website={website} />}
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
  return (
    <div className="space-y-6">
      {/* Current Plan */}
      {subscription && (
        <div className="bg-[#0A0A0A] border border-white/[0.04] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white">Current Plan</h3>
            <Link to="/select-plan" className="text-sm text-lime-400 hover:underline">
              Change Plan
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-neutral-500 mb-1">Plan</div>
              <div className="text-white font-medium">{subscription.plan_name}</div>
            </div>
            <div>
              <div className="text-sm text-neutral-500 mb-1">Amount</div>
              <div className="text-white font-medium">₹{subscription.amount}/mo</div>
            </div>
            <div>
              <div className="text-sm text-neutral-500 mb-1">Autopay</div>
              <div className={`font-medium ${subscription.autopay_enabled ? 'text-lime-400' : 'text-neutral-400'}`}>
                {subscription.autopay_enabled ? 'Enabled' : 'Disabled'}
              </div>
            </div>
          </div>
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
function WebsiteTab({ website }) {
  return (
    <div className="space-y-6">
      {!website ? (
        <div className="bg-[#0A0A0A] border border-white/[0.04] rounded-2xl p-8 text-center">
          <div className="text-4xl mb-4">🌐</div>
          <h3 className="text-xl font-bold text-white mb-2">No Website Yet</h3>
          <p className="text-neutral-400 mb-6">Your website will appear here once you subscribe</p>
          <a
            href="https://wa.me/916380006001?text=Hi!%20I%20want%20to%20start%20building%20my%20website"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-block"
          >
            Contact Us to Get Started
          </a>
        </div>
      ) : (
        <div className="bg-[#0A0A0A] border border-white/[0.04] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white">{website.site_name}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              website.status === 'live' ? 'bg-lime-400/10 text-lime-400' : 'bg-yellow-400/10 text-yellow-400'
            }`}>
              {website.status}
            </span>
          </div>
          {website.site_url && (
            <a
              href={website.site_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lime-400 hover:underline"
            >
              {website.site_url} →
            </a>
          )}
        </div>
      )}
    </div>
  );
}

// Profile Tab
function ProfileTab({ profile, updateProfile }) {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    phone: profile?.phone || '',
    business_name: profile?.business_name || '',
    business_type: profile?.business_type || '',
    city: profile?.city || '',
  });

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="bg-[#0A0A0A] border border-white/[0.04] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-white">Profile Information</h3>
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="text-sm text-lime-400 hover:underline"
          >
            Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => setEditing(false)}
              className="text-sm text-neutral-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="text-sm text-lime-400 hover:underline"
            >
              Save
            </button>
          </div>
        )}
      </div>

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
          <label className="block text-sm text-neutral-400 mb-2">Phone (WhatsApp)</label>
          {editing ? (
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="input"
            />
          ) : (
            <div className="text-white">{formData.phone || 'Not set'}</div>
          )}
        </div>

        <div>
          <label className="block text-sm text-neutral-400 mb-2">Business Name</label>
          {editing ? (
            <input
              type="text"
              value={formData.business_name}
              onChange={(e) => setFormData({...formData, business_name: e.target.value})}
              className="input"
            />
          ) : (
            <div className="text-white">{formData.business_name || 'Not set'}</div>
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
    </div>
  );
}
