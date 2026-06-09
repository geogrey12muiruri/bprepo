'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Partner = {
  id: string;
  business_name: string;
  partner_code: string;
  email?: string;
};

type Tier = {
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  total_bookings: number;
  discount_percentage: number;
};

export default function PartnerDashboard() {
  const [partner, setPartner] = useState<Partner | null>(null);
  const [tier, setTier] = useState<Tier | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartnerData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      // Get partner info from user metadata would be ideal
      // For now, we'll fetch from API
      const response = await fetch('/api/partner/auth', {
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
        }
      });

      const data = await response.json();
      if (data.partner) setPartner(data.partner);
      if (data.tier) setTier(data.tier);
      setLoading(false);
    };

    fetchPartnerData();
  }, []);

  const tierColors = {
    bronze: 'from-amber-600 to-amber-800',
    silver: 'from-slate-300 to-slate-500',
    gold: 'from-yellow-400 to-yellow-600',
    platinum: 'from-blue-400 to-blue-600'
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-white mb-2">
        Welcome, {partner?.business_name}!
      </h1>
      <p className="text-neutral-400 mb-8">Partner Dashboard</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tier Status Card */}
        <div className="bg-neutral-900 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Your Tier Status</h2>
          <div className={`bg-gradient-to-r ${tierColors[tier?.tier || 'bronze']} rounded-lg p-4 text-center mb-4`}>
            <span className="text-3xl font-bold text-white capitalize">
              {tier?.tier || 'Bronze'} Partner
            </span>
          </div>
          <div className="text-center text-neutral-300">
            <span className="text-2xl font-bold text-white">{tier?.total_bookings || 0}</span>
            <span className="text-sm"> bookings this year</span>
          </div>
          <div className="mt-4 text-center">
            <span className="text-lg font-semibold text-green-400">
              {tier?.discount_percentage || 5}% discount
            </span>
            <span className="text-sm text-neutral-400 block">for next year</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-neutral-900 rounded-lg p-6 md:col-span-2">
          <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <a
              href="/portal/bookings/new"
              className="bg-blue-600 hover:bg-blue-700 rounded-lg p-4 text-center transition"
            >
              <Calendar className="w-8 h-8 mx-auto mb-2 text-white" />
              <span className="text-white font-medium">Make New Booking</span>
            </a>
            <a
              href="/portal/bookings"
              className="bg-neutral-800 hover:bg-neutral-700 rounded-lg p-4 text-center transition"
            >
              <List className="w-8 h-8 mx-auto mb-2 text-white" />
              <span className="text-white font-medium">View Bookings</span>
            </a>
          </div>
        </div>

        {/* Tier Progress */}
        <div className="bg-neutral-900 rounded-lg p-6 md:col-span-3">
          <h2 className="text-lg font-semibold text-white mb-4">Tier Progress</h2>
          <div className="grid grid-cols-4 gap-2">
            {['Bronze', 'Silver', 'Gold', 'Platinum'].map((t) => (
              <div key={t} className="text-center">
                <div className={`h-2 rounded-full mb-2 ${
                  t.toLowerCase() === tier?.tier 
                    ? 'bg-blue-600' 
                    : 'bg-neutral-700'
                }`} />
                <span className="text-sm text-neutral-300">{t}</span>
                <span className="text-xs text-neutral-500 block">
                  {t === 'Bronze' && '5-14'}
                  {t === 'Silver' && '15-29'}
                  {t === 'Gold' && '30-49'}
                  {t === 'Platinum' && '50+'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Missing icons - add them
function Calendar(props: any) {
  return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
}

function List(props: any) {
  return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><circle cx="4" cy="6" r="1"></circle><circle cx="4" cy="12" r="1"></circle><circle cx="4" cy="18" r="1"></circle></svg>;
}