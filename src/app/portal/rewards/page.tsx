'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Voucher = {
  id: string;
  voucher_code: string;
  discount_percentage: number;
  valid_from: string;
  valid_to: string;
  is_used: boolean;
  used_at?: string;
};

type TierInfo = {
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  total_bookings: number;
  discount_percentage: number;
};

export default function PartnerRewards() {
  const [tier, setTier] = useState<TierInfo>({ tier: 'bronze', total_bookings: 0, discount_percentage: 5 });
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRewards = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch('/api/partner/auth', {
        headers: { Authorization: `Bearer ${session?.access_token}` }
      });
      
      const { tier } = await response.json();
      setTier(tier || {});

      // Get vouchers
      const voucherResponse = await fetch('/api/partner/vouchers', {
        headers: { Authorization: `Bearer ${session?.access_token}` }
      });
      
      const { vouchers } = await voucherResponse.json();
      setVouchers(vouchers || []);
      setLoading(false);
    };

    fetchRewards();
  }, []);

  const tierColors = {
    bronze: 'from-amber-600 to-amber-800',
    silver: 'from-slate-300 to-slate-500',
    gold: 'from-yellow-400 to-yellow-600',
    platinum: 'from-blue-400 to-blue-600'
  };

  const nextTierInfo = {
    bronze: { name: 'Silver', target: 15 },
    silver: { name: 'Gold', target: 30 },
    gold: { name: 'Platinum', target: 50 },
    platinum: { name: 'Max', target: 999 }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading rewards...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">My Rewards</h1>

      {/* Tier Status */}
      <div className="bg-neutral-900 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Your Tier Status</h2>
        <div className={`bg-gradient-to-r ${tierColors[tier?.tier || 'bronze']} rounded-lg p-6 text-center mb-4`}>
          <span className="text-4xl font-bold text-white capitalize">
            {tier?.tier || 'Bronze'} Partner
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <span className="text-2xl font-bold text-blue-400">{tier?.total_bookings || 0}</span>
            <span className="text-neutral-400 block">Bookings This Year</span>
          </div>
          <div>
            <span className="text-2xl font-bold text-green-400">{tier?.discount_percentage || 5}%</span>
            <span className="text-neutral-400 block">Discount</span>
          </div>
        </div>

        {/* Progress to next tier */}
        {tier?.tier !== 'platinum' && (
          <div className="mt-6">
            <p className="text-neutral-400 text-sm mb-2">
              {tier?.total_bookings || 0} / {nextTierInfo[tier?.tier || 'bronze'].target} bookings to reach {nextTierInfo[tier?.tier || 'bronze'].name}
            </p>
            <div className="w-full bg-neutral-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${Math.min(100, ((tier?.total_bookings || 0) / nextTierInfo[tier?.tier || 'bronze'].target) * 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Vouchers */}
      <div className="bg-neutral-900 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Your Vouchers</h2>
        
        {vouchers.length === 0 ? (
          <p className="text-neutral-400">No vouchers available yet. Make bookings to earn rewards!</p>
        ) : (
          <div className="space-y-3">
            {vouchers.map((voucher) => (
              <div key={voucher.id} className="bg-neutral-800 rounded-lg p-4 flex justify-between items-center">
                <div>
                  <span className="text-lg font-mono font-bold text-blue-400">{voucher.voucher_code}</span>
                  <span className="text-neutral-400 block text-sm">
                    {voucher.discount_percentage}% off | Valid: {voucher.valid_from} to {voucher.valid_to}
                  </span>
                </div>
                <span className={`px-3 py-1 rounded text-sm ${
                  voucher.is_used ? 'bg-neutral-700 text-neutral-400' : 'bg-green-600/20 text-green-400'
                }`}>
                  {voucher.is_used ? 'Used' : 'Available'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}