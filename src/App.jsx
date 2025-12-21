import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Pages
import LandingPage from "./components/LandingPage";
import SignIn from "./pages/SignIn";
import AuthCallback from "./pages/AuthCallback";
import Dashboard from "./pages/Dashboard";
import SelectPlan from "./pages/SelectPlan";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCallback from "./pages/PaymentCallback";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import CancellationRefund from "./pages/CancellationRefund";
import ShippingExchange from "./pages/ShippingExchange";
import ContactUs from "./pages/ContactUs";

// Protected Route Component
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-lime-400 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-neutral-400">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  
  return children;
}

// Auth Route (redirect to dashboard if already logged in)
function AuthRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-lime-400 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-neutral-400">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Auth Routes */}
      <Route 
        path="/signin" 
        element={
          <AuthRoute>
            <SignIn />
          </AuthRoute>
        } 
      />
      
      {/* OAuth Callback */}
      <Route path="/auth/callback" element={<AuthCallback />} />
      
      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/select-plan" 
        element={
          <ProtectedRoute>
            <SelectPlan />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/payment" 
        element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/payment-success" 
        element={
          <ProtectedRoute>
            <PaymentSuccess />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/payment-callback" 
        element={<PaymentCallback />} 
      />
      
      {/* Legal Pages */}
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/cancellation-refund" element={<CancellationRefund />} />
      <Route path="/shipping-exchange" element={<ShippingExchange />} />
      <Route path="/contact" element={<ContactUs />} />
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  console.log('🚀 App component rendering...');
  
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
