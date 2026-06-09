'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Booking = {
  id: string;
  guest_name: string;
  booking_date: string;
  participants: number;
  total_price: number;
  status: string;
  created_at: string;
  partners?: { business_name: string; partner_code: string };
  experiences?: { title: string };
};

type Stats = {
  total_bookings_today: number;
  total_passengers: number;
  total_revenue: number;
  active_partners: number;
};

type Partner = {
  id: string;
  business_name: string;
  partner_code: string;
  tier: string;
  total_bookings: number;
};

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [stats, setStats] = useState<Stats>({
    total_bookings_today: 0,
    total_passengers: 0,
    total_revenue: 0,
    active_partners: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;
      
      if (!token) return;

      const response = await fetch('/api/admin/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const { data } = await response.json();
      setBookings(data?.bookings || []);
      setPartners(data?.partners || []);
      setStats(data?.stats || stats);
      setLoading(false);
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-600 rounded-lg p-6">
          <span className="text-3xl font-bold text-white">{stats.total_bookings_today}</span>
          <span className="text-blue-100 block">Bookings Today</span>
        </div>
        <div className="bg-green-600 rounded-lg p-6">
          <span className="text-3xl font-bold text-white">{stats.total_passengers}</span>
          <span className="text-green-100 block">Total Passengers</span>
        </div>
        <div className="bg-purple-600 rounded-lg p-6">
          <span className="text-3xl font-bold text-white">KES {stats.total_revenue?.toLocaleString()}</span>
          <span className="text-purple-100 block">Revenue Today</span>
        </div>
        <div className="bg-neutral-800 rounded-lg p-6">
          <span className="text-3xl font-bold text-white">{stats.active_partners}</span>
          <span className="text-neutral-300 block">Active Partners</span>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-neutral-900 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Recent Bookings</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-neutral-700">
              <tr className="text-neutral-400">
                <th className="text-left pb-3">Guest</th>
                <th className="text-left pb-3">Partner</th>
                <th className="text-left pb-3">Experience</th>
                <th className="text-left pb-3">Date</th>
                <th className="text-right pb-3">Passengers</th>
                <th className="text-right pb-3">Total</th>
              </tr>
            </thead>
            <tbody className="text-neutral-300">
              {bookings.slice(0, 20).map((booking) => (
                <tr key={booking.id} className="border-b border-neutral-800">
                  <td className="py-3">{booking.guest_name}</td>
                  <td className="py-3">{booking.partners?.business_name || 'N/A'}</td>
                  <td className="py-3">{booking.experiences?.title || 'N/A'}</td>
                  <td className="py-3">{booking.booking_date}</td>
                  <td className="py-3 text-right">{booking.participants}</td>
                  <td className="py-3 text-right">KES {booking.total_price?.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Partner Overview */}
      <div className="bg-neutral-900 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Partner Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['none', 'bronze', 'silver', 'gold', 'platinum'].map((tier) => {
            const count = partners.filter(p => p.tier === tier).length;
            return (
              <div key={tier} className="bg-neutral-800 rounded-lg p-4 text-center">
                <span className="text-2xl font-bold text-white capitalize">{tier === 'none' ? 'No Tier' : tier}</span>
                <span className="text-neutral-300 block">{count} partners</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}