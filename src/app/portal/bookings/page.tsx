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
  guest_email: string;
  guest_phone?: string;
  booking_date: string;
  start_time: string;
  participants: number;
  total_price: number;
  status: string;
  special_requests?: string;
  experiences?: { title: string };
};

export default function PartnerBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch('/api/bookings', {
        headers: { Authorization: `Bearer ${session?.access_token}` }
      });

      const { bookings } = await response.json();
      setBookings(bookings || []);
      setLoading(false);
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading bookings...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">My Bookings</h1>
      
      {bookings.length === 0 ? (
        <div className="bg-neutral-900 rounded-lg p-8 text-center">
          <p className="text-neutral-400 mb-4">No bookings yet</p>
          <a href="/portal/experiences" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">
            Make Your First Booking
          </a>
        </div>
      ) : (
        <div className="bg-neutral-900 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-neutral-800">
              <tr className="text-left text-sm text-neutral-400">
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Guest</th>
                <th className="px-4 py-3">Experience</th>
                <th className="px-4 py-3">Passengers</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="text-neutral-300 text-sm">
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-t border-neutral-800">
                  <td className="px-4 py-3">{booking.booking_date} {booking.start_time}</td>
                  <td className="px-4 py-3">{booking.guest_name}</td>
                  <td className="px-4 py-3">{booking.experiences?.title || 'N/A'}</td>
                  <td className="px-4 py-3">{booking.participants}</td>
                  <td className="px-4 py-3">KES {booking.total_price?.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      booking.status === 'confirmed' ? 'bg-green-600/20 text-green-400' :
                      booking.status === 'pending' ? 'bg-yellow-600/20 text-yellow-400' :
                      'bg-neutral-700 text-neutral-300'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}