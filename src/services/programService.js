import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { programs } from '../data/programs';

/**
 * Fetch programs from Supabase or fallback
 */
export async function fetchPrograms() {
  if (!isSupabaseConfigured) {
    return programs;
  }

  try {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .order('created_at', { ascending: true });

    if (error || !data || data.length === 0) {
      return programs;
    }

    return data.map((row) => ({
      id: row.id,
      title: row.title,
      subtitle: row.subtitle,
      category: row.category,
      color: row.color,
      shortDescription: row.short_description,
      fullDescription: row.full_description,
      target: Number(row.target_amount),
      raised: Number(row.raised_amount),
      beneficiaries: row.beneficiary_target,
      schedule: row.schedule,
      location: row.location,
      status: row.status,
    }));
  } catch (err) {
    console.error('Error fetching programs:', err);
    return programs;
  }
}
