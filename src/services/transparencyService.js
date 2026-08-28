import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { yearlyReports, impactStats, fundAllocation } from '../data/transparency';

/**
 * Fetch transparency and LPJ reports
 */
export async function fetchTransparencyReports() {
  if (!isSupabaseConfigured) {
    return yearlyReports;
  }

  try {
    const { data, error } = await supabase
      .from('transparency_reports')
      .select('*')
      .order('year', { ascending: false });

    if (error || !data || data.length === 0) {
      return yearlyReports;
    }

    return data.map((row) => ({
      year: row.year,
      incoming: Number(row.incoming_amount),
      outgoing: Number(row.outgoing_amount),
      beneficiaries: Number(row.beneficiaries_count),
      documentUrl: row.document_url,
      documentTitle: row.document_title,
      status: row.status,
      breakdown: row.breakdown_json || { income: [], expense: [] },
    }));
  } catch (err) {
    console.error('Error fetching transparency reports:', err);
    return yearlyReports;
  }
}

export { impactStats, fundAllocation };
