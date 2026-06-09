'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

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
  is_active: boolean;
};

export default function PartnerExperiences() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .eq('is_active', true)
        .order('price');

      if (!error) {
        setExperiences(data || []);
      }
      setLoading(false);
    };

    fetchExperiences();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading experiences...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Available Experiences</h1>
      <p className="text-neutral-400">Book any experience for your guests</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((exp) => (
          <a
            key={exp.id}
            href={`/portal/bookings/new?experience=${exp.slug}`}
            className="bg-neutral-900 rounded-lg p-6 hover:bg-neutral-800 transition block"
          >
            <h3 className="text-xl font-semibold text-white mb-2">{exp.title}</h3>
            <p className="text-neutral-400 text-sm mb-4">{exp.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-blue-400 font-bold">
                KES {exp.price.toLocaleString()}
              </span>
              <span className="text-neutral-300 text-sm">
                {exp.duration_hours}h
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}