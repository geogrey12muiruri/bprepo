'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useSearchParams } from 'next/navigation';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Experience = {
  id: string;
  slug: string;
  title: string;
  description: string;
  duration_hours: number;
  price: number;
  capacity_per_slot: number;
};

type Slot = {
  slot_date: string;
  start_time: string;
  max_capacity: number;
  current_bookings: number;
  status: string;
};

export default function NewBooking() {
  const searchParams = useSearchParams();
  const experienceSlug = searchParams.get('experience');
  
  const [experience, setExperience] = useState<Experience | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    guest_name: '',
    guest_email: '',
    guest_phone: '',
    participants: 1,
    special_requests: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!experienceSlug) return;

      const { data: exp } = await supabase
        .from('experiences')
        .select('*')
        .eq('slug', experienceSlug)
        .single();

      setExperience(exp);

      const { data: availability } = await supabase
        .from('availability_slots')
        .select('*')
        .eq('experience_id', exp?.id)
        .gte('slot_date', new Date().toISOString().split('T')[0])
        .neq('status', 'full')
        .order('slot_date')
        .order('start_time');

      if (availability) {
        setSlots(availability);
        const availableDates = [...new Set(availability.map((a: any) => a.slot_date))];
        setSelectedDate(availableDates[0] || '');
      }

      setLoading(false);
    };

    fetchData();
  }, [experienceSlug]);

  const availableTimes = slots.filter(s => s.slot_date === selectedDate && s.status !== 'full');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const { data: { session } } = await supabase.auth.getSession();
    
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.access_token}`
      },
      body: JSON.stringify({
        experience_id: experience?.id,
        ...formData
      })
    });

    if (response.ok) {
      window.location.href = '/portal/bookings?success=true';
    }
    setSubmitting(false);
  };

  if (loading || !experience) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-white">New Booking</h1>
      <h2 className="text-xl text-blue-400">{experience.title}</h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-neutral-900 rounded-lg p-6">
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">Guest Name</label>
          <input
            type="text"
            value={formData.guest_name}
            onChange={(e) => setFormData({...formData, guest_name: e.target.value})}
            required
            className="w-full px-4 py-2 rounded-lg bg-neutral-800 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">Guest Email</label>
          <input
            type="email"
            value={formData.guest_email}
            onChange={(e) => setFormData({...formData, guest_email: e.target.value})}
            required
            className="w-full px-4 py-2 rounded-lg bg-neutral-800 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">Guest Phone</label>
          <input
            type="tel"
            value={formData.guest_phone}
            onChange={(e) => setFormData({...formData, guest_phone: e.target.value})}
            className="w-full px-4 py-2 rounded-lg bg-neutral-800 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">Date</label>
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg bg-neutral-800 text-white"
          >
            {[...new Set(slots.map(s => s.slot_date))].map(date => (
              <option key={date} value={date}>{date}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">Number of Passengers</label>
          <input
            type="number"
            min="1"
            max={experience.capacity_per_slot}
            value={formData.participants}
            onChange={(e) => setFormData({...formData, participants: parseInt(e.target.value)})}
            required
            className="w-full px-4 py-2 rounded-lg bg-neutral-800 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">Special Requests</label>
          <textarea
            value={formData.special_requests}
            onChange={(e) => setFormData({...formData, special_requests: e.target.value})}
            className="w-full px-4 py-2 rounded-lg bg-neutral-800 text-white"
            rows={3}
          />
        </div>

        <div className="pt-4 border-t border-neutral-700">
          <div className="flex justify-between items-center mb-4">
            <span className="text-neutral-300">Total:</span>
            <span className="text-2xl font-bold text-blue-400">
              KES {(experience.price * formData.participants).toLocaleString()}
            </span>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3 rounded-lg font-semibold transition"
          >
            {submitting ? 'Creating Booking...' : 'Confirm Booking'}
          </button>
        </div>
      </form>
    </div>
  );
}